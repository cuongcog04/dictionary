#!/usr/bin/env python3
"""
Import links from vi_wiki_links_defs_only.jsonl into definitions table.
Now matches by definition TEXT to correctly assign links per definition.

New JSONL format:
{"word": "từ", "definitions": [{"definition": "...", "links": ["a", "b"]}, ...]}
"""

import json
import sqlite3
import sys
import re

DB_PATH = '../dictionary.db'
LINKS_PATH = './vi_wiki_links_defs_only_fix.jsonl'


def normalize_text(text):
    """Normalize text for matching (lowercase, remove extra whitespace)."""
    if not text:
        return ''
    text = text.lower().strip()
    text = re.sub(r'\s+', ' ', text)
    return text


def text_similarity(text1, text2):
    """
    Calculate similarity between two texts.
    Returns a score from 0 to 1 (1 = exact match).
    """
    t1 = normalize_text(text1)
    t2 = normalize_text(text2)
    
    if t1 == t2:
        return 1.0
    
    # Check if one contains the other (for partial matches)
    if t1 in t2 or t2 in t1:
        shorter = min(len(t1), len(t2))
        longer = max(len(t1), len(t2))
        if longer > 0:
            return shorter / longer
    
    # Check word overlap
    words1 = set(t1.split())
    words2 = set(t2.split())
    if not words1 or not words2:
        return 0.0
    
    overlap = len(words1 & words2)
    total = len(words1 | words2)
    
    return overlap / total if total > 0 else 0.0


def main():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Stats
    stats = {
        'words_in_file': 0,
        'words_matched': 0,
        'words_not_found': 0,
        'definitions_in_file': 0,
        'definitions_matched': 0,
        'definitions_no_match': 0,
        'links_added': 0,
    }
    
    # STEP 1: Clear all existing links for source 4 definitions
    print("Clearing existing links for source 4 (Wiktionary) definitions...")
    cursor.execute("""
        UPDATE definitions SET links = NULL
        WHERE id IN (
            SELECT DISTINCT d.id 
            FROM definitions d
            JOIN word_definitions wd ON d.id = wd.definition_id
            WHERE wd.source_id = 4
        )
    """)
    cleared = cursor.rowcount
    conn.commit()
    print(f"  Cleared links from {cleared:,} definitions")
    
    # Build word -> definition data mapping for source 4 (Wiktionary)
    print("\nBuilding word -> definitions mapping (source 4 only)...")
    cursor.execute("""
        SELECT w.word, d.id as def_id, d.definition, d.links
        FROM words w
        JOIN word_definitions wd ON w.id = wd.word_id
        JOIN definitions d ON wd.definition_id = d.id
        WHERE wd.source_id = 4
    """)
    
    word_to_defs = {}
    for word, def_id, definition, existing_links in cursor.fetchall():
        word_lower = word.lower()
        if word_lower not in word_to_defs:
            word_to_defs[word_lower] = []
        word_to_defs[word_lower].append({
            'def_id': def_id,
            'definition': definition,
            'existing_links': existing_links
        })
    
    print(f"  Found {len(word_to_defs)} unique words with source 4 definitions")
    
    # Process links file
    print(f"\nImporting links from {LINKS_PATH}...")
    
    with open(LINKS_PATH, 'r', encoding='utf-8') as f:
        for line_num, line in enumerate(f, 1):
            if line_num % 50000 == 0:
                print(f"  Processed {line_num:,} entries, {stats['links_added']:,} links added...", file=sys.stderr)
                conn.commit()
            
            try:
                entry = json.loads(line)
                word = entry.get('word', '')
                definitions = entry.get('definitions', [])
                
                if not word or not definitions:
                    continue
                
                stats['words_in_file'] += 1
                stats['definitions_in_file'] += len(definitions)
                
                # Find definitions for this word in DB
                word_lower = word.lower()
                db_defs = word_to_defs.get(word_lower, [])
                
                if not db_defs:
                    stats['words_not_found'] += 1
                    continue
                
                stats['words_matched'] += 1
                
                # Match each definition from file to DB
                for file_def in definitions:
                    file_def_text = file_def.get('definition', '')
                    file_links = file_def.get('links', [])
                    
                    if not file_links:  # Skip if no links to add
                        continue
                    
                    # Find best matching DB definition
                    best_match = None
                    best_score = 0.0
                    
                    for db_def in db_defs:
                        score = text_similarity(file_def_text, db_def['definition'])
                        if score > best_score:
                            best_score = score
                            best_match = db_def
                    
                    # Only match if similarity is good enough (>0.3)
                    if best_match and best_score >= 0.3:
                        stats['definitions_matched'] += 1
                        
                        # Add links to this specific definition
                        def_id = best_match['def_id']
                        
                        # Parse existing links
                        existing_links = []
                        if best_match['existing_links']:
                            try:
                                existing_links = json.loads(best_match['existing_links'])
                            except:
                                pass
                        
                        # Add new links (avoid duplicates)
                        existing_set = set(existing_links)
                        for link in file_links:
                            link = link.lower().strip()
                            if link and link not in existing_set:
                                existing_links.append(link)
                                existing_set.add(link)
                                stats['links_added'] += 1
                        
                        # Update definition with new links
                        cursor.execute(
                            "UPDATE definitions SET links = ? WHERE id = ?",
                            (json.dumps(existing_links, ensure_ascii=False), def_id)
                        )
                        
                        # Update cached value
                        best_match['existing_links'] = json.dumps(existing_links, ensure_ascii=False)
                    else:
                        stats['definitions_no_match'] += 1
                        
            except Exception as e:
                print(f"Error on line {line_num}: {e}", file=sys.stderr)
                continue
    
    conn.commit()
    
    print("\n=== Import Complete ===")
    print(f"  Words in file: {stats['words_in_file']:,}")
    print(f"  Words matched in DB: {stats['words_matched']:,}")
    print(f"  Words not found: {stats['words_not_found']:,}")
    print(f"  Definitions in file: {stats['definitions_in_file']:,}")
    print(f"  Definitions matched: {stats['definitions_matched']:,}")
    print(f"  Definitions no match: {stats['definitions_no_match']:,}")
    print(f"  Links added: {stats['links_added']:,}")
    
    conn.close()
    print("\nDone!")


if __name__ == '__main__':
    main()
