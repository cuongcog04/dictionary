import { NextResponse } from 'next/server';
import { lookupWord } from '@/lib/dictionary';

// Cache: 1 day fresh + 1 year stale-while-revalidate + CORS
const CACHE_HEADERS = {
    'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=31536000',
    'CDN-Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=31536000',
    'Vercel-CDN-Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=31536000',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Multi-language dictionary lookup API
 * 
 * GET /api/dictionary/lookup?word=hello
 * GET /api/dictionary/lookup?word=hello&lang=vi  (specific language)
 * 
 * @returns JSON response with results grouped by language
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get('word');
    const lang = searchParams.get('lang') || undefined;

    if (!word) {
        return NextResponse.json({ error: 'Missing "word" parameter' }, { status: 400 });
    }

    const result = lookupWord(word, lang);

    if (!result.exists || result.results.length === 0) {
        return NextResponse.json({ exists: false, word: result.word }, { status: 404, headers: CACHE_HEADERS });
    }

    return NextResponse.json(result, { status: 200, headers: CACHE_HEADERS });
}
