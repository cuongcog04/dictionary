// import Image from 'next/image';

export default function SourcesSection() {
    return (
        <>
            <div className="mt-10 p-6 rounded-2xl bg-teal-50/50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-900/20 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Nguồn dữ liệu
                </h3>
                <div className="space-y-3 text-sm">
                    <SourceItem emoji="📚" label="Từ Điển Tiếng Việt Thông Dụng" link="https://github.com/vntk/dictionary/tree/master/data" linkText="github.com/vntk/dictionary" />
                    <SourceItem emoji="📖" label="Vietnamese Dictionary - Hồ Ngọc Đức" description="Từ 'The Free Vietnamese Dictionary Project' của tác giả Hồ Ngọc Đức" />
                    <SourceItem emoji="📕" label="Vietnamese Explanatory Dictionary" description="Từ điển giải thích tiếng Việt" />
                    <SourceItem emoji="📗" label="Vietnamese Dictionary" link="https://tudientv.com" linkText="tudientv.com" />
                    <SourceItem emoji="🀄" label="Chữ Nôm Dictionary" link="https://chunom.org" linkText="chunom.org" />
                    <SourceItem emoji="🌐" label="Wiktionary & Wikipedia Tiếng Việt" description="Dữ liệu từ Wiktionary và Wikipedia tiếng Việt" />
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
                    Giấy phép & Sử dụng
                </h3>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <p>
                        Dữ liệu được cung cấp hoàn toàn miễn phí dưới giấy phép
                        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener" className="mx-1 text-blue-500 hover:underline font-medium">CC BY 4.0</a>.
                        Bạn có thể:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                            <span>Sao chép và phân phối lại</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                            <span>Chỉnh sửa và tạo sản phẩm phái sinh</span>
                        </li>
                    </ul>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20 text-blue-600 dark:text-blue-400 font-medium">
                        💡 Ghi nguồn @minhqnd và liên kết đến trang này khi sử dụng.
                    </div>
                </div>
            </div>
        </>
    );
}

function SourceItem({ emoji, label, link, linkText, description }: { emoji: string, label: string, link?: string, linkText?: string, description?: string }) {
    return (
        <div className="flex gap-3 items-start pt-2 border-t border-teal-100 dark:border-teal-900/30 first:border-0 first:pt-0">
            <span className="text-teal-500 mt-0.5">{emoji}</span>
            <div>
                <span className="font-medium text-gray-900 dark:text-white">{label}</span>
                {description && <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">{description}</p>}
                {link && (
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                        Nguồn từ <a href={link} target="_blank" rel="noopener" className="text-teal-600 dark:text-teal-400 hover:underline">{linkText}</a>
                    </p>
                )}
            </div>
        </div>
    );
}
