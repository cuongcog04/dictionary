import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Analytics } from "@vercel/analytics/next"

const GA_MEASUREMENT_ID = 'G-YJKGC095KG';

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
        description: 'Tra cứu nghĩa 357,000+ từ vựng, 443,000+ định nghĩa với ví dụ, phát âm IPA, từ đồng nghĩa. RESTful API JSON miễn phí. Tra cứu ngay!',
        url: 'https://dict.minhqnd.com',
        siteName: 'dict.minhqnd.com',
        locale: 'vi_VN',
        type: 'website',
        images: [
            {
                url: 'https://minhqnd.com/api/og?title=API+Từ+Điển%0AĐa+Ngôn+Ngữ+Free&description=Tra+cứu+nghĩa%20357,000%2B+từ%20vựng,+443,000%2B+định+nghĩa+với+ví+dụ,+phát+âm+IPA,+từ+đồng+nghĩa.&footer=dict.minhqnd.com+%7C+%40minhqnd&brand=Từ+điển+API&logo=true',
                width: 1200,
                height: 630,
                alt: 'API Từ Điển Đa Ngôn Ngữ Miễn Phí',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'API Từ Điển Tiếng Việt & Đa Ngôn Ngữ Miễn Phí | @minhqnd',
        description: 'Tra cứu nghĩa 357,000+ từ vựng, 443,000+ định nghĩa với ví dụ, phát âm IPA, từ đồng nghĩa. RESTful API JSON miễn phí.',
        creator: '@minhqnd',
        images: ['https://minhqnd.com/api/og?title=API+Từ+Điển%0AĐa+Ngôn+Ngữ+Free&description=Tra+cứu+nghĩa%20357,000%2B+từ%20vựng,+443,000%2B+định+nghĩa+với+ví+dụ,+phát+âm+IPA,+từ+đồng+nghĩa.&footer=dict.minhqnd.com+%7C+%40minhqnd&brand=Từ+điển+API&logo=true'],
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
            <head>
                {/* Google Analytics */}
                <Analytics/>
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}');
                    `}
                </Script>
            </head>
            <body className="bg-white dark:bg-[#0a0a0a]">
                {children}
            </body>
        </html>
    );
}
