import { NextResponse } from 'next/server';

/**
 * API route: GET /api/v1/tts?word=...&lang=...
 * Proxies requests to Google Translate TTS
 * Falls back to English then Vietnamese if specified language is not supported
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const word = searchParams.get('word');
    const lang = searchParams.get('lang') || 'vi';

    console.log("[TTS] " + word + " lang:" + lang);

    if (!word) {
        return NextResponse.json({ error: 'Missing "word" parameter' }, { status: 400 });
    }

    // Try languages in order: specified lang -> English -> Vietnamese
    const langsToTry = [lang];
    if (lang !== 'en') langsToTry.push('en');
    if (lang !== 'vi') langsToTry.push('vi');

    for (const tryLang of langsToTry) {
        try {
            const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(word)}&tl=${tryLang}&client=tw-ob`;

            const response = await fetch(ttsUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            if (response.ok) {
                const audioBuffer = await response.arrayBuffer();
                console.log(`[TTS] "${word}" lang=${tryLang}${tryLang !== lang ? ` (fallback from ${lang})` : ''}`);
                return new NextResponse(audioBuffer, {
                    headers: {
                        'Content-Type': 'audio/mpeg',
                        'Cache-Control': 'public, max-age=31536000, immutable',
                    },
                });
            }
        } catch {
            // Continue to next language
        }
    }

    console.log(`[TTS] FAIL "${word}" lang=${lang}`);
    return NextResponse.json({ error: 'Failed to generate speech' }, { status: 500 });
}


