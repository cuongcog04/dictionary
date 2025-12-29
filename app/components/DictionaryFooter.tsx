import Link from 'next/link';
import Image from 'next/image';

export default function DictionaryFooter() {
    return (
        <footer className="mt-16 py-8 border-t border-gray-100 dark:border-[#1a1a1a] text-center text-gray-400 dark:text-gray-600 text-sm">
            <div className="flex justify-center items-center gap-4 mb-3">
                <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener" className="inline-block opacity-80 hover:opacity-100 transition-opacity">
                    <Image
                        src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-sa.png"
                        alt="CC BY-SA 4.0"
                        width={88}
                        height={31}
                        unoptimized
                    />
                </a>
            </div>
            <p className="mb-2">© 2025 <a href="https://minhqnd.com" target="_blank" rel="noopener" className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors">@minhqnd</a></p>
            <nav className="flex justify-center items-center gap-2">
                <Link href="/privacy" className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors">Chính sách Bảo mật</Link>
                <span className="text-gray-200 dark:text-gray-800">•</span>
                <Link href="/terms" className="text-gray-500 hover:text-gray-700 dark:hover:text-white transition-colors">Điều khoản Dịch vụ</Link>
            </nav>
        </footer>
    );
}
