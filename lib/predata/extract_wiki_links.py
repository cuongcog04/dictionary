#!/usr/bin/env python3
"""
Extract links from definition lines in Vietnamese Wiktionary XML dump.
Now extracts links PER DEFINITION, not per word.

Output format:
{"word": "từ", "definitions": [{"definition": "...", "links": ["a", "b"]}, ...]}

Definition lines are identified by:
- Lines starting with `:'''word'''` (old format)
- Lines starting with `#` (numbered definitions)
"""

import bz2
import re
import json
import sys

XML_PATH = './viwiktionary-latest-pages-articles.xml.bz2'
OUTPUT_PATH = './vi_wiki_links_defs_only_fix.jsonl'

# Match [[link]] or [[link|display]] - capture only the target
LINK_PATTERN = re.compile(r'\[\[([^\]|#]+)(?:[|#][^\]]+)?\]\]')

# Section headers to skip (not definitions)
SKIP_SECTIONS = [
    '{{-trans-}}', '{{-pron-}}', '{{-nôm-}}', '{{-etym-}}',
    '{{-ref-}}', '{{-info-}}', '{{-forms-}}', '{{-see-}}',
    '{{-rel-}}', '{{-syn-}}', '{{-ant-}}', '{{-der-}}',
    '{{top}}', '{{mid}}', '{{bottom}}', '{{đầu}}', '{{giữa}}', '{{cuối}}',
    '[[Thể loại:', '[[Category:'
]

# POS section headers (definitions come after these)
POS_SECTIONS = [
    '{{-noun-}}', '{{-verb-}}', '{{-adj-}}', '{{-adv-}}',
    '{{-pron-}}', '{{-prep-}}', '{{-conj-}}', '{{-intj-}}',
    '{{-num-}}', '{{-det-}}', '{{-part-}}', '{{-suffix-}}',
    '{{-prefix-}}', '{{-classifier-}}'
]


def is_definition_line(line):
    """Check if line is a definition line (not translation, pronunciation, etc)."""
    line_stripped = line.strip()
    
    # Skip empty lines
    if not line_stripped:
        return False
    
    # Skip section headers and translations
    for skip in SKIP_SECTIONS:
        if skip.lower() in line_stripped.lower():
            return False
    
    # Definition patterns:
    # 1. :'''word''': definition text
    # 2. # definition text
    # 3. ## sub-definition
    if line_stripped.startswith(":'''") or line_stripped.startswith("# ") or line_stripped.startswith("#"):
        return True
    
    return False


def clean_definition_text(line):
    """Extract clean definition text from a line (remove wiki markup)."""
    text = line.strip()
    
    # Remove leading # or :
    text = re.sub(r'^[#:]+\s*', '', text)
    
    # Remove '''bold''' markers
    text = re.sub(r"'''([^']+)'''", r'\1', text)
    
    # Replace [[link|display]] with display, [[link]] with link
    text = re.sub(r'\[\[([^\]|]+)\|([^\]]+)\]\]', r'\2', text)
    text = re.sub(r'\[\[([^\]]+)\]\]', r'\1', text)
    
    # Remove {{ templates }}
    text = re.sub(r'\{\{[^}]+\}\}', '', text)
    
    # Clean up whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    
    return text


def extract_definition_links():
    """Extract links at definition level."""
    
    stats = {
        'total_pages': 0,
        'pages_with_defs': 0,
        'total_definitions': 0,
        'definitions_with_links': 0,
        'total_links': 0,
        'skipped_namespaces': 0,
    }
    
    SKIP_PREFIXES = (
        'MediaWiki:', 'Bản mẫu:', 'Thể loại:', 'Mô đun:', 
        'Wiktionary:', 'Thành viên:', 'Thảo luận:', 'Trợ giúp:',
        'Tập tin:', 'Phụ lục:', 'Template:', 'Module:', 'Category:'
    )
    
    with bz2.open(XML_PATH, 'rt', encoding='utf-8') as infile, \
         open(OUTPUT_PATH, 'w', encoding='utf-8') as outfile:
        
        current_title = None
        current_text = []
        in_text = False
        
        for line_num, line in enumerate(infile, 1):
            if line_num % 100000 == 0:
                print(f"  Processed {line_num:,} lines, {stats['pages_with_defs']:,} pages with defs...", file=sys.stderr)
            
            # Find title
            title_match = re.search(r'<title>([^<]+)</title>', line)
            if title_match:
                current_title = title_match.group(1)
                current_text = []
                in_text = False
            
            # Find text content
            if '<text' in line:
                in_text = True
                text_match = re.search(r'<text[^>]*>(.+?)</text>', line)
                if text_match:
                    current_text.append(text_match.group(1))
                    in_text = False
                else:
                    text_match = re.search(r'<text[^>]*>(.+)', line)
                    if text_match:
                        current_text.append(text_match.group(1))
            elif '</text>' in line:
                in_text = False
                text_match = re.search(r'(.+)</text>', line)
                if text_match:
                    current_text.append(text_match.group(1))
            elif in_text:
                current_text.append(line)
            
            # End of page
            if '</page>' in line and current_title:
                stats['total_pages'] += 1
                
                if current_title.startswith(SKIP_PREFIXES):
                    stats['skipped_namespaces'] += 1
                    current_title = None
                    current_text = []
                    continue
                
                if current_text:
                    # Split into lines and extract per-definition links
                    all_text = ''.join(current_text)
                    lines = all_text.replace('\\n', '\n').split('\n')
                    
                    definitions = []  # List of {definition, links}
                    in_skip_section = False
                    
                    for text_line in lines:
                        # Check if entering a skip section
                        for skip in SKIP_SECTIONS:
                            if skip.lower() in text_line.lower():
                                in_skip_section = True
                                break
                        
                        # Check if entering a POS section (definitions follow)
                        for pos in POS_SECTIONS:
                            if pos.lower() in text_line.lower():
                                in_skip_section = False
                                break
                        
                        # Extract links from each definition line separately
                        if is_definition_line(text_line) and not in_skip_section:
                            raw_links = LINK_PATTERN.findall(text_line)
                            
                            # Clean and dedupe links for THIS definition only
                            seen = set()
                            def_links = []
                            for link in raw_links:
                                link = link.lower().strip()
                                if not link or ':' in link or link == current_title.lower():
                                    continue
                                if link not in seen:
                                    seen.add(link)
                                    def_links.append(link)
                            
                            # Get clean definition text
                            def_text = clean_definition_text(text_line)
                            
                            if def_text:  # Only add if has meaningful text
                                definitions.append({
                                    'definition': def_text,
                                    'links': def_links
                                })
                                stats['total_definitions'] += 1
                                if def_links:
                                    stats['definitions_with_links'] += 1
                                    stats['total_links'] += len(def_links)
                    
                    if definitions:
                        stats['pages_with_defs'] += 1
                        
                        record = {
                            'word': current_title,
                            'definitions': definitions
                        }
                        outfile.write(json.dumps(record, ensure_ascii=False) + '\n')
                
                current_title = None
                current_text = []
    
    return stats


def main():
    print("Extracting DEFINITION-LEVEL links from Vietnamese Wiktionary...")
    print(f"Input: {XML_PATH}")
    print(f"Output: {OUTPUT_PATH}")
    print()
    
    stats = extract_definition_links()
    
    print()
    print("=== Extraction Complete ===")
    print(f"  Total pages scanned: {stats['total_pages']:,}")
    print(f"  Skipped (namespaces): {stats['skipped_namespaces']:,}")
    print(f"  Pages with definitions: {stats['pages_with_defs']:,}")
    print(f"  Total definitions: {stats['total_definitions']:,}")
    print(f"  Definitions with links: {stats['definitions_with_links']:,}")
    print(f"  Total links extracted: {stats['total_links']:,}")
    print(f"\nOutput saved to: {OUTPUT_PATH}")
    
    # Show samples
    print("\n=== Sample entries ===")
    with open(OUTPUT_PATH, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f):
            if i >= 10:
                break
            entry = json.loads(line)
            print(f"\n  {entry['word']}:")
            for j, d in enumerate(entry['definitions'][:3]):
                def_preview = d['definition'][:60] + '...' if len(d['definition']) > 60 else d['definition']
                print(f"    [{j+1}] {def_preview}")
                if d['links']:
                    print(f"        links: {d['links'][:5]}{'...' if len(d['links']) > 5 else ''}")


if __name__ == '__main__':
    main()
