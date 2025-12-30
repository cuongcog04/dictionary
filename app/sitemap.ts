import { MetadataRoute } from 'next';
import Database from 'better-sqlite3';
import path from 'path';
import { encodeWordSlug } from '@/lib/urlSlug';

// Get all words from database for sitemap
function getAllWords(): string[] {
    const dbPath = path.join(process.cwd(), 'lib', 'dictionary.db');
    const db = new Database(dbPath, { readonly: true, fileMustExist: true });

    // Get distinct words, prioritizing Vietnamese words
    const rows = db.prepare(`
        SELECT DISTINCT word FROM words 
        WHERE lang_code IN ('vi', 'en')
        ORDER BY 
            CASE lang_code WHEN 'vi' THEN 0 ELSE 1 END,
            word
        LIMIT 50000
    `).all() as { word: string }[];

    db.close();
    return rows.map(r => r.word);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://dict.minhqnd.com';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];

    // Dynamic word pages
    const words = getAllWords();
    const wordPages: MetadataRoute.Sitemap = words.map(word => ({
        url: `${baseUrl}/word/${encodeWordSlug(word)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...staticPages, ...wordPages];
}

