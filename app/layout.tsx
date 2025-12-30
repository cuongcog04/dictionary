import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'API Từ Điển Tiếng Việt & Đa Ngôn Ngữ Miễn Phí | @minhqnd',
    description: 'Tra cứu nghĩa 357,000+ từ vựng, 443,000+ định nghĩa với ví dụ, phát âm IPA, từ đồng nghĩa. RESTful API JSON miễn phí. Hỗ trợ Việt, Anh, Trung, Nhật, Hàn.',
    keywords: [
        'từ điển tiếng việt',
        'api từ điển',
        'vietnamese dictionary api',
        'tra từ tiếng việt',
        'api từ điển tiếng việt',
        'từ điển free',
        'api từ điển free',
        'api free tiếng việt',
        'từ điển online',
        'từ điển đa ngôn ngữ',
        'free dictionary api',
        'nghĩa tiếng việt'
    ],
    authors: [{ name: 'minhqnd', url: 'https://dict.minhqnd.com' }],
    creator: '@minhqnd',
    openGraph: {
        title: 'API Từ Điển Tiếng Việt & Đa Ngôn Ngữ Miễn Phí | @minhqnd',
        description: 'Tra cứu nghĩa 357,000+ từ vựng, 443,000+ định nghĩa với ví dụ, phát âm IPA, từ đồng nghĩa. RESTful API JSON miễn phí.',
        url: 'https://dict.minhqnd.com',
        siteName: 'dict.minhqnd.com',
        locale: 'vi_VN',
        type: 'website',
        images: [
            {
                url: 'https://minhqnd.com/api/og?title=API+T%E1%BB%AB+%C4%90i%E1%BB%83n+Ti%E1%BA%BFng+Vi%E1%BB%87t&description=Tra+c%E1%BB%A9u+ngh%C4%A9a+357,000%2B+t%E1%BB%AB+v%E1%BB%B1ng+mi%E1%BB%85n+ph%C3%AD&footer=API+T%E1%BB%AB+%C4%90i%E1%BB%83n+%C4%90a+Ng%C3%B4n+Ng%E1%BB%AF+Free+%7C+%40minhqnd&brand=T%E1%BB%AB+%C4%91i%E1%BB%83n+API&logo=true',
                width: 1200,
                height: 630,
                alt: 'API Từ Điển Free',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'API Từ Điển Tiếng Việt & Đa Ngôn Ngữ Miễn Phí | @minhqnd',
        description: 'Tra cứu nghĩa 357,000+ từ vựng, 443,000+ định nghĩa với ví dụ, phát âm IPA, từ đồng nghĩa. RESTful API JSON miễn phí.',
        creator: '@minhqnd',
        images: ['https://minhqnd.com/api/og?title=API+T%E1%BB%AB+%C4%90i%E1%BB%83n+Ti%E1%BA%BFng+Vi%E1%BB%87t&description=Tra+c%E1%BB%A9u+ngh%C4%A9a+357,000%2B+t%E1%BB%AB+v%E1%BB%B1ng+mi%E1%BB%85n+ph%C3%AD&footer=API+T%E1%BB%AB+%C4%90i%E1%BB%83n+%C4%90a+Ng%C3%B4n+Ng%E1%BB%AF+Free+%7C+%40minhqnd&brand=T%E1%BB%AB+%C4%91i%E1%BB%83n+API&logo=true'],
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://dict.minhqnd.com',
    },
};

export default function DictionaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
            <body className="bg-white dark:bg-[#0a0a0a]">
                {children}
            </body>
        </html>
    );
}
