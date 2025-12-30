import HomePageClient from './HomePageClient';

// JSON-LD Schema for homepage
function WebsiteSchema() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'API Từ Điển Tiếng Việt & Đa Ngôn Ngữ Miễn Phí',
        'alternateName': ['dict.minhqnd.com', 'minhqnd Dictionary API', 'API Từ Điển Free'],
        'url': 'https://dict.minhqnd.com',
        'description': 'Tra cứu nghĩa 357,000+ từ vựng, 443,000+ định nghĩa với ví dụ, phát âm IPA, từ đồng nghĩa. RESTful API JSON miễn phí.',
        'inLanguage': ['vi', 'en'],
        'publisher': {
            '@type': 'Person',
            'name': 'minhqnd',
            'url': 'https://minhqnd.com'
        },
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
        'logo': 'https://dict.minhqnd.com/favicon.ico',
        'sameAs': [
            'https://minhqnd.com',
            'https://github.com/minhqnd'
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

// WebApplication Schema for API
function WebApplicationSchema() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'API Từ Điển Tiếng Việt',
        'applicationCategory': 'ReferenceApplication',
        'operatingSystem': 'All',
        'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD'
        },
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '5',
            'ratingCount': '1'
        }
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
            <WebApplicationSchema />
            <HomePageClient />
        </>
    );
}
