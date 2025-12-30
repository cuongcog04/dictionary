import { MetadataRoute } from 'next';
import Database from 'better-sqlite3';
import path from 'path';
import { encodeWordSlug } from '@/lib/urlSlug';

const URLS_PER_SITEMAP = 45000; // Keep under 50,000 limit with some buffer
const BASE_URL = 'https://dict.minhqnd.com';

// Get total count of words
function getTotalWordCount(): number {
    const dbPath = path.join(process.cwd(), 'lib', 'dictionary.db');
    const db = new Database(dbPath, { readonly: true, fileMustExist: true });

    const result = db.prepare(`
        SELECT COUNT(DISTINCT word) as count FROM words 
        WHERE lang_code IN ('vi', 'en')
    `).get() as { count: number };

    db.close();
    return result.count;
}

// Get words for a specific sitemap page (paginated)
function getWordsForPage(page: number): string[] {
    const dbPath = path.join(process.cwd(), 'lib', 'dictionary.db');
    const db = new Database(dbPath, { readonly: true, fileMustExist: true });

    const offset = page * URLS_PER_SITEMAP;
    const rows = db.prepare(`
        SELECT DISTINCT word FROM words 
        WHERE lang_code IN ('vi', 'en')
        ORDER BY 
            CASE lang_code WHEN 'vi' THEN 0 ELSE 1 END,
            word
        LIMIT ? OFFSET ?
    `).all(URLS_PER_SITEMAP, offset) as { word: string }[];

    db.close();
    return rows.map(r => r.word);
}

// Generate sitemap index entries
// Next.js will create /sitemap/0.xml, /sitemap/1.xml, etc.
export async function generateSitemaps() {
    const totalWords = getTotalWordCount();
    const sitemapCount = Math.ceil(totalWords / URLS_PER_SITEMAP);

    // Return array of { id } for each sitemap
    return Array.from({ length: sitemapCount }, (_, i) => ({ id: i }));
}

// Generate sitemap for a specific ID
export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
    // First sitemap (id=0) includes static pages
    const entries: MetadataRoute.Sitemap = [];

    if (id === 0) {
        entries.push({
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        });
    }

    // Get words for this sitemap page
    const words = getWordsForPage(id);
    const wordPages: MetadataRoute.Sitemap = words.map(word => ({
        url: `${BASE_URL}/word/${encodeWordSlug(word)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...entries, ...wordPages];
}
