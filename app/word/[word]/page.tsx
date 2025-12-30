import { Metadata } from 'next';
import { lookupWord } from '@/lib/dictionary';
import { encodeWordSlug, decodeWordSlug } from '@/lib/urlSlug';
import WordPageClient from './WordPageClient';

interface PageProps {
    params: Promise<{ word: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { word: encodedWord } = await params;
    const word = decodeWordSlug(encodedWord);
    const result = lookupWord(word);

    // Clean definition from quotes and newlines to avoid breaking HTML meta tags
    const rawDefinition = result.exists && result.results?.[0]?.meanings?.[0]?.definition
        ? result.results[0].meanings[0].definition.slice(0, 150)
        : `Tra cứu nghĩa, cách dùng và ví dụ`;
    const firstDefinition = rawDefinition.replace(/["\n\r]/g, '');

    return {
        title: `"${word}" là gì? Nghĩa của từ "${word}" | API Từ Điển Free | minhqnd`,
        description: `${word}: ${firstDefinition}. Tra cứu miễn phí với ví dụ đặt câu, từ đồng nghĩa, phát âm của từ "${word}"`,
        keywords: [
            `${word} nghĩa là gì`,
            `${word} là gì`,
            `nghĩa của từ ${word}`,
            `${word} tiếng việt`,
            `cách dùng ${word}`,
            `ví dụ ${word}`,
        ],
        openGraph: {
            title: `"${word}" là gì? | API Từ Điển Free | minhqnd`,
            description: `${firstDefinition}. Tra cứu nghĩa và ví dụ miễn phí.`,
            url: `https://dict.minhqnd.com/word/${encodeWordSlug(word)}`,
            siteName: 'dict.minhqnd.com',
            locale: 'vi_VN',
            type: 'article',
            images: [
                {
                    url: `https://minhqnd.com/api/og?title=${encodeURIComponent('"' + word + '" nghĩa là gì?')}&description=${encodeURIComponent(firstDefinition.slice(0, 100))}&footer=${encodeURIComponent('API Từ Điển Đa Ngôn Ngữ Free | @minhqnd')}&brand=${encodeURIComponent('Từ điển API')}`,
                    width: 1200,
                    height: 630,
                    alt: `Nghĩa của từ ${word}`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `"${word}" là gì?`,
            description: `${firstDefinition}. Tra cứu nghĩa miễn phí.`,
        },
        alternates: {
            canonical: `https://dict.minhqnd.com/word/${encodeWordSlug(word)}`,
        },
    };
}

// Server component
export default async function WordPage({ params }: PageProps) {
    const { word: encodedWord } = await params;
    const word = decodeWordSlug(encodedWord);
    const result = lookupWord(word);

    // Convert to client-compatible format
    const clientResult = {
        exists: result.exists,
        word: result.word,
        results: result.results,
    };

    // JSON-LD Schema for SEO
    const jsonLd = result.exists ? {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        'name': word,
        'description': result.results?.[0]?.meanings?.[0]?.definition || '',
        'inDefinedTermSet': {
            '@type': 'DefinedTermSet',
            'name': 'API Từ Điển Tiếng Việt & Đa Ngôn Ngữ Miễn Phí | @minhqnd',
            'url': 'https://dict.minhqnd.com'
        }
    } : null;

    // Breadcrumb Schema
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Trang chủ',
                'item': 'https://dict.minhqnd.com'
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': word,
                'item': `https://dict.minhqnd.com/word/${encodeWordSlug(word)}`
            }
        ]
    };

    // FAQ Schema
    const faqJsonLd = result.exists ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
            {
                '@type': 'Question',
                'name': `${word} nghĩa là gì?`,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': `${word} có nghĩa là: ${result.results?.[0]?.meanings?.[0]?.definition || 'một từ trong tiếng Việt.'}`
                }
            },
            {
                '@type': 'Question',
                'name': `Cách phát âm ${word}?`,
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': result.results?.[0]?.pronunciations?.[0]?.ipa
                        ? `Phiên âm IPA: /${result.results[0].pronunciations[0].ipa}/`
                        : `Nhấn vào nút phát âm để nghe cách phát âm ${word}.`
                }
            }
        ]
    } : null;

    return (
        <>
            {/* JSON-LD Schema */}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}

            <WordPageClient word={word} initialResult={clientResult} />
        </>
    );
}
