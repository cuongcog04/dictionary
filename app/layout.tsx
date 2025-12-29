import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'API Từ Điển Đa Ngôn Ngữ Free| @minhqnd',
    description: 'API tra cứu từ điển đa ngôn ngữ miễn phí với hơn 370,000 từ và 500,000 định nghĩa. Hỗ trợ RESTful API, JSON response, tìm kiếm nhanh. Giấy phép CC BY-SA 4.0.',
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
        title: 'API Từ Điển Đa Ngôn Ngữ Free | @minhqnd',
        description: 'API tra cứu từ điển miễn phí với hơn 370,000 từ. RESTful API, JSON response, tìm kiếm nhanh.',
        url: 'https://dict.minhqnd.com',
        siteName: 'dict.minhqnd.com',
        locale: 'vi_VN',
        type: 'website',
        images: [
            {
                url: 'https://minhqnd.com/api/og?title=API+Từ+Điển+Đa%0A+Ngôn+Ngữ+Free&description=Tra+cứu+hơn+370,000+từ+miễn+phí+với+nghĩa+chi+tiết+và+ví+dụ.&logo=true',
                width: 1200,
                height: 630,
                alt: 'API Từ Điển Free',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'API Từ Điển Đa Ngôn Ngữ Free | @minhqnd',
        description: 'API tra cứu từ điển miễn phí với hơn 370,000 từ và 500,000 định nghĩa.',
        creator: '@minhqnd',
        images: ['https://minhqnd.com/api/og?title=API+Từ+Điển+Đa%0A+Ngôn+Ngữ+Free&description=Tra+cứu+hơn+370,000+từ+miễn+phí+với+nghĩa+chi+tiết+và+ví+dụ.&logo=true'],
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
