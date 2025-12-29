export default function SystemStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-5 md:p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Dữ liệu hệ thống
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center justify-between">
                        <span>Tổng số từ vựng:</span>
                        <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">357,729</span>
                    </li>
                    <li className="flex items-center justify-between">
                        <span>Định nghĩa chi tiết:</span>
                        <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">443,116</span>
                    </li>
                    <li className="flex items-center justify-between">
                        <span>Từ vựng có ví dụ minh họa:</span>
                        <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">169,931</span>
                    </li>
                    <li className="flex items-center justify-between">
                        <span>Tổng số ngôn ngữ:</span>
                        <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">&gt; 1,500</span>
                    </li>
                </ul>
            </div>
            <div className="p-5 md:p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Đặc điểm nổi bật
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex gap-2">
                        <span className="text-amber-500 font-bold">●</span>
                        <span>Tìm kiếm không phân biệt hoa thường</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-amber-500 font-bold">●</span>
                        <span>Chuẩn hoá tiếng Việt (hoá/hóa, kì/kỳ)</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-amber-500 font-bold">●</span>
                        <span>Tốc độ phản hồi nhanh (SQLite)</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-amber-500 font-bold">●</span>
                        <span>Hỗ trợ RESTful API & JSON</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-amber-500 font-bold">●</span>
                        <span>Tra cứu đa ngôn ngữ (Anh, Trung, Nhật, Hàn...)</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
