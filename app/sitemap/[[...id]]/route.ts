import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';
import { encodeWordSlug } from '@/lib/urlSlug';

const URLS_PER_SITEMAP = 45000; // Keep under 50,000 limit with buffer
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
function getWordsForPage(pageNum: number): string[] {
    const dbPath = path.join(process.cwd(), 'lib', 'dictionary.db');
    const db = new Database(dbPath, { readonly: true, fileMustExist: true });

    const limitVal = URLS_PER_SITEMAP;
    const offsetVal = pageNum * URLS_PER_SITEMAP;

    const rows = db.prepare(`
        SELECT DISTINCT word FROM words 
        WHERE lang_code IN ('vi', 'en')
        ORDER BY 
            CASE lang_code WHEN 'vi' THEN 0 ELSE 1 END,
            word
        LIMIT ${limitVal} OFFSET ${offsetVal}
    `).all() as { word: string }[];

    db.close();
    return rows.map(r => r.word);
}

// Generate sitemap index XML
function generateSitemapIndex(sitemapCount: number): string {
    const sitemaps = Array.from({ length: sitemapCount }, (_, i) =>
        `  <sitemap>
    <loc>${BASE_URL}/sitemap/${i}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`
    ).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;
}

// Generate individual sitemap XML
function generateSitemap(pageId: number): string {
    const words = getWordsForPage(pageId);
    const today = new Date().toISOString().split('T')[0];

    // Static pages for first sitemap
    let urls = '';
    if (pageId === 0) {
        urls += `  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>\n`;
    }

    // Word pages
    urls += words.map(word =>
        `  <url>
    <loc>${BASE_URL}/word/${encodeWordSlug(word)}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    ).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id?: string[] }> }
) {
    const resolvedParams = await params;
    const idSegments = resolvedParams.id;

    const totalWords = getTotalWordCount();
    const sitemapCount = Math.ceil(totalWords / URLS_PER_SITEMAP);

    // No ID = sitemap index
    if (!idSegments || idSegments.length === 0) {
        const xml = generateSitemapIndex(sitemapCount);
        return new NextResponse(xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            },
        });
    }

    // Parse ID from first segment
    const pageId = parseInt(idSegments[0], 10);

    // Validate page ID
    if (isNaN(pageId) || pageId < 0 || pageId >= sitemapCount) {
        return new NextResponse('Sitemap not found', { status: 404 });
    }

    // Generate individual sitemap
    const xml = generateSitemap(pageId);
    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}
