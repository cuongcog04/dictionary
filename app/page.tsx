import HomePageClient from './HomePageClient';

// JSON-LD Schema for homepage
function WebsiteSchema() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'API Từ Điển Tiếng Việt & Đa Ngôn Ngữ Miễn Phí | @minhqnd',
        'url': 'https://dict.minhqnd.com',
        'description': 'Tra cứu nghĩa 357,000+ từ vựng, 443,000+ định nghĩa với ví dụ, phát âm IPA, từ đồng nghĩa. RESTful API JSON miễn phí.',
        'potentialAction': {
            '@type': 'SearchAction',
            'target': {
                '@type': 'EntryPoint',
                'urlTemplate': 'https://dict.minhqnd.com/word/{search_term_string}'
            },
            'query-input': 'required name=search_term_string'
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

// Organization Schema
function OrganizationSchema() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'minhqnd',
        'url': 'https://dict.minhqnd.com',
        'logo': 'https://dict.minhqnd.com/favicon.ico'
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

export default function DictionaryPage() {
    return (
        <>
            <WebsiteSchema />
            <OrganizationSchema />
            <HomePageClient />
        </>
    );
}
