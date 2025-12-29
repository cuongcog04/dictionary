import SystemStats from './SystemStats';
import CodeExamples from './CodeExamples';
import SourcesSection from './SourcesSection';

export default function DictionaryDocumentation() {
    return (
        <section id="docs" className=" mx-auto pt-12">
            <h2 className="text-xl font-semibold mb-8 pb-2 border-b border-gray-200 dark:border-gray-800">
                Tài liệu API
            </h2>

            <div className="space-y-16">
                <SystemStats />

                {/* Lookup API */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded">GET</span>
                        <div className="overflow-x-auto">
                            <code className="text-lg font-mono font-bold text-gray-900 dark:text-white">https://minhqnd.com/api/dictionary/lookup</code>
                        </div>
                    </div>

                    <div className="space-y-10 ml-1">
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                                Tham số truy vấn (Query)
                            </h4>
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 dark:bg-[#111] text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-800">
                                        <tr>
                                            <th className="px-5 py-3">Tham số</th>
                                            <th className="px-5 py-3 text-center">Bắt buộc</th>
                                            <th className="px-5 py-3">Mô tả</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        <tr className="dark:hover:bg-white/5 transition-colors">
                                            <td className="px-5 py-4 font-mono text-xs text-orange-600 dark:text-orange-400 font-bold">word</td>
                                            <td className="px-5 py-4 text-center">
                                                <span className="text-[10px] px-1.5 py-0.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded">YES</span>
                                            </td>
                                            <td className="px-5 py-4 text-gray-500 dark:text-gray-400">Từ cần tra cứu. Ví dụ: &quot;học sinh&quot;</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <CodeExamples />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 ml-1">
                                    Tìm thấy từ (200 Found)
                                </h4>
                                <pre className="bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-4 rounded-xl overflow-x-auto text-[12px] leading-relaxed font-mono text-emerald-600 dark:text-emerald-400">
                                    {`{
    "exists": true,
    "word": "học sinh",
    "results": [
        {
            "lang_code": "vi",
            "lang_name": "Tiếng Việt",
            "meanings": [
                {
                    "definition": "người học ở bậc phổ thông",
                    "example": "học sinh tiểu học ~ thời học sinh",
                    "pos": "Danh từ",
                    "source": "Tiếng Việt Thông Dụng"
                }
            ]
        }
    ]
}`}
                                </pre>
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 ml-1">
                                    Không tìm thấy (404 Not Found)
                                </h4>
                                <pre className="bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-4 rounded-xl overflow-x-auto text-[12px] leading-relaxed font-mono text-pink-600 dark:text-pink-400">
                                    {`{
  "exists": false
}`}
                                </pre>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                Cấu trúc dữ liệu JSON
                            </h4>
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl">
                                <table className="w-full text-[13px] text-left">
                                    <thead className="bg-gray-50 dark:bg-[#111] text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-800">
                                        <tr>
                                            <th className="px-5 py-3">Trường</th>
                                            <th className="px-5 py-3">Kiểu</th>
                                            <th className="px-5 py-3">Mô tả</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        <DataRow field="exists" type="boolean" desc="Dữ liệu có tồn tại trong từ điển không." />
                                        <DataRow field="word" type="string" desc="Từ gốc được chuẩn hóa." />
                                        <DataRow field="results" type="array<LanguageResult>" desc="Danh sách kết quả theo từng ngôn ngữ." />
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Error Codes */}
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                Mã lỗi HTTP
                            </h4>
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl">
                                <table className="w-full text-[13px] text-left">
                                    <thead className="bg-gray-50 dark:bg-[#111] text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-800">
                                        <tr>
                                            <th className="px-5 py-3">Mã</th>
                                            <th className="px-5 py-3">Trạng thái</th>
                                            <th className="px-5 py-3">Mô tả</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        <tr className="dark:hover:bg-white/5 transition-colors">
                                            <td className="px-5 py-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold">200</td>
                                            <td className="px-5 py-4 text-gray-600 dark:text-gray-400">OK</td>
                                            <td className="px-5 py-4 text-gray-500 dark:text-gray-400">Tìm thấy từ, trả về định nghĩa.</td>
                                        </tr>
                                        <tr className="dark:hover:bg-white/5 transition-colors">
                                            <td className="px-5 py-4 font-mono text-amber-600 dark:text-amber-400 font-bold">400</td>
                                            <td className="px-5 py-4 text-gray-600 dark:text-gray-400">Bad Request</td>
                                            <td className="px-5 py-4 text-gray-500 dark:text-gray-400">Thiếu tham số word.</td>
                                        </tr>
                                        <tr className="dark:hover:bg-white/5 transition-colors">
                                            <td className="px-5 py-4 font-mono text-pink-600 dark:text-pink-400 font-bold">404</td>
                                            <td className="px-5 py-4 text-gray-600 dark:text-gray-400">Not Found</td>
                                            <td className="px-5 py-4 text-gray-500 dark:text-gray-400">Từ không tồn tại trong từ điển.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="p-5 rounded-xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Lưu ý về Encoding
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Tiếng Việt có dấu cần được encode theo chuẩn <strong>UTF-8 URL encoding</strong>.
                            </p>
                        </div>

                        <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 1040 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                CORS (Cross-Origin)
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                API hỗ trợ <strong>CORS</strong>. Bạn có thể gọi API từ bất kỳ domain nào.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Suggest API Section */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded">GET</span>
                        <div className="overflow-x-auto">
                            <code className="text-lg font-mono font-bold text-gray-900 dark:text-white">https://minhqnd.com/api/dictionary/suggest</code>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium">
                        API gợi ý từ dựa trên prefix. Trả về danh sách các từ khớp với chuỗi tìm kiếm.
                    </p>
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl mb-6">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-[#111] text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-800">
                                <tr>
                                    <th className="px-5 py-3">Tham số</th>
                                    <th className="px-5 py-3 text-center">Bắt buộc</th>
                                    <th className="px-5 py-3">Mô tả</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                <tr className="dark:hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-4 font-mono text-xs text-orange-600 dark:text-orange-400 font-bold">q</td>
                                    <td className="px-5 py-4 text-center"><span className="text-[10px] px-1.5 py-0.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded">YES</span></td>
                                    <td className="px-5 py-4 text-gray-500 dark:text-gray-400">Chuỗi prefix (ví dụ: &quot;học&quot;)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* TTS API Section */}
                <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded">GET</span>
                        <div className="overflow-x-auto">
                            <code className="text-lg font-mono font-bold text-gray-900 dark:text-white">https://minhqnd.com/api/dictionary/tts</code>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Endpoint tạo file âm thanh (TTS) cho từ vựng. Trả về file định dạng <code className="text-orange-500">audio/mpeg</code>.
                    </p>
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl mb-6">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-[#111] text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-800">
                                <tr>
                                    <th className="px-5 py-3">Tham số</th>
                                    <th className="px-5 py-3 text-center">Bắt buộc</th>
                                    <th className="px-5 py-3">Mô tả</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                <tr className="dark:hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-4 font-mono text-xs text-orange-600 dark:text-orange-400 font-bold">word</td>
                                    <td className="px-5 py-4 text-center"><span className="text-[10px] px-1.5 py-0.5 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold rounded">YES</span></td>
                                    <td className="px-5 py-4 text-gray-500 dark:text-gray-400">Từ cần phát âm</td>
                                </tr>
                                <tr className="dark:hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-4 font-mono text-xs text-orange-600 dark:text-orange-400 font-bold">lang</td>
                                    <td className="px-5 py-4 text-center"><span className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold rounded">NO</span></td>
                                    <td className="px-5 py-4 text-gray-500 dark:text-gray-400">Mã ngôn ngữ (mặc định: vi)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <SourcesSection />
            </div>
        </section>
    );
}

function DataRow({ field, type, desc }: { field: string, type: string, desc: string }) {
    return (
        <tr className="dark:hover:bg-white/5 transition-colors">
            <td className="px-5 py-4 font-mono text-indigo-500 dark:text-indigo-400 font-bold">{field}</td>
            <td className="px-5 py-4 text-gray-400">{type}</td>
            <td className="px-5 py-4 text-gray-600 dark:text-gray-400">{desc}</td>
        </tr>
    );
}
