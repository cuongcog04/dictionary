// import Image from 'next/image';

export default function SourcesSection() {
    return (
        <>
            <div className="mt-10 p-6 rounded-2xl bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/20 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Nguồn dữ liệu & Giấy phép
                </h3>
                <div className="space-y-3 text-sm">
                    <SourceItem
                        emoji="📚"
                        label="Từ Điển Tiếng Việt Thông Dụng"
                        link="https://github.com/vntk/dictionary"
                        linkText="github.com/vntk/dictionary"
                        license="MIT License"
                        licenseUrl="https://opensource.org/licenses/MIT"
                    />
                    <SourceItem
                        emoji="📖"
                        label="Vietnamese Dictionary - Hồ Ngọc Đức"
                        description="Từ 'The Free Vietnamese Dictionary Project'"
                        license="GNU GPL"
                        licenseUrl="https://www.gnu.org/licenses/gpl-3.0.html"
                    />
                    <SourceItem
                        emoji="📕"
                        label="Vietnamese Explanatory Dictionary"
                        description="Từ điển giải thích tiếng Việt"
                        license="GNU GPL"
                        licenseUrl="https://www.gnu.org/licenses/gpl-3.0.html"
                    />
                    <SourceItem
                        emoji="📗"
                        label="Vietnamese Dictionary"
                        link="https://tudientv.com"
                        linkText="tudientv.com"
                        license="GNU GPL"
                        licenseUrl="https://www.gnu.org/licenses/gpl-3.0.html"
                    />
                    <SourceItem
                        emoji="🌐"
                        label="Wiktionary & Wikipedia Tiếng Việt"
                        description="Dữ liệu từ Wiktionary và Wikipedia tiếng Việt"
                        license="CC BY-SA 4.0"
                        licenseUrl="https://creativecommons.org/licenses/by-sa/4.0/deed.vi"
                    />
                    <div className="flex gap-3 items-start pt-2 border-t border-teal-100 dark:border-teal-900/30">
                        <span className="text-amber-500 mt-0.5">🤖</span>
                        <div>
                            <span className="font-medium text-gray-900 dark:text-white">Lưu ý về câu ví dụ</span>
                            <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                                Một số câu ví dụ được tạo bởi AI/LLM để bổ sung cho các mục từ chưa có ví dụ minh họa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Điều khoản sử dụng
                </h3>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <p>
                        API từ điển được cung cấp bởi <strong className="text-gray-900 dark:text-white">@minhqnd</strong> theo giấy phép
                        <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.vi" target="_blank" rel="noopener" className="mx-1 text-blue-500 hover:underline font-medium">CC BY-SA 4.0</a>.
                    </p>

                    <div className="space-y-2">
                        <p className="font-semibold text-gray-900 dark:text-white text-xs uppercase tracking-wider">Bạn được tự do:</p>
                        <ul className="space-y-1.5 pl-1">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span><strong className="text-gray-900 dark:text-white">Chia sẻ</strong> — sao chép và phân phối lại dữ liệu từ điển, kể cả thương mại.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span><strong className="text-gray-900 dark:text-white">Chuyển thể</strong> — chỉnh sửa, bổ sung và xây dựng dựa trên dữ liệu từ điển.</span>
                            </li>
                        </ul>
                        <p className="text-xs italic text-gray-500 dark:text-gray-500 pl-6">
                            Người cấp phép không thể thu hồi những quyền tự do này chừng nào bạn còn tuân thủ các điều khoản.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <p className="font-semibold text-gray-900 dark:text-white text-xs uppercase tracking-wider">Với điều kiện:</p>
                        <ul className="space-y-1.5 pl-1">
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 mt-0.5">•</span>
                                <span><strong className="text-gray-900 dark:text-white">Ghi công</strong> — ghi nguồn <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">@minhqnd</code>, liên kết đến <a href="https://dict.minhqnd.com" className="text-blue-500 hover:underline">dict.minhqnd.com</a> và ghi chú nếu có thay đổi.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 mt-0.5">•</span>
                                <span><strong className="text-gray-900 dark:text-white">Chia sẻ tương tự</strong> — phân phối bản chỉnh sửa theo cùng giấy phép CC BY-SA 4.0.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-amber-500 mt-0.5">•</span>
                                <span><strong className="text-gray-900 dark:text-white">Không hạn chế bổ sung</strong> — không được áp dụng điều khoản pháp lý hoặc biện pháp công nghệ hạn chế người khác.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                        <p className="text-blue-700 dark:text-blue-300 text-xs">
                            <strong>📌 Lưu ý:</strong> Khi sử dụng API, vui lòng dẫn link đến <a href="https://dict.minhqnd.com" className="underline font-medium">dict.minhqnd.com</a> để người dùng có thể xem các nguồn và giấy phép chi tiết của từng nguồn dữ liệu gốc.
                        </p>
                    </div>
                </div>
            </div>
            <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Liên hệ & Góp ý
                </h3>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <p>
                        Nếu bạn có bất kỳ thắc mắc nào về <strong className="text-gray-900 dark:text-white">bản quyền</strong>, muốn <strong className="text-gray-900 dark:text-white">góp ý cải thiện</strong> hoặc <strong className="text-gray-900 dark:text-white">bổ sung thêm từ vựng</strong> mới, vui lòng gửi email về:
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href="mailto:info@minhqnd.com"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#0a0a0a] border border-indigo-100 dark:border-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold hover:shadow-md hover:scale-[1.02] transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            info@minhqnd.com
                        </a>
                        <span className="text-xs text-gray-400 italic">
                            (Phản hồi trong vòng 24-48h làm việc)
                        </span>
                    </div>
                </div>
            </div>

        </>
    );
}

function SourceItem({ emoji, label, link, linkText, description, license, licenseUrl }: {
    emoji: string,
    label: string,
    link?: string,
    linkText?: string,
    description?: string,
    license?: string,
    licenseUrl?: string
}) {
    return (
        <div className="flex gap-3 items-start pt-3 border-t border-teal-100 dark:border-teal-900/30 first:border-0 first:pt-0">
            <span className="text-teal-500 mt-1 sm:mt-0.5 text-base sm:text-lg">{emoji}</span>
            <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                    <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">{label}</span>
                    {license && (
                        <div className="flex">
                            <a
                                href={licenseUrl}
                                target="_blank"
                                rel="noopener"
                                className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors whitespace-nowrap"
                            >
                                {license}
                            </a>
                        </div>
                    )}
                </div>
                {description && <p className="text-gray-500 dark:text-gray-400 text-[11px] sm:text-xs mt-0.5 leading-relaxed">{description}</p>}
                {link && (
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] sm:text-xs mt-0.5 truncate">
                        Nguồn từ: <a href={link} target="_blank" rel="noopener" className="text-teal-600 dark:text-teal-400 hover:underline">{linkText}</a>
                    </p>
                )}
            </div>
        </div>
    );
}
