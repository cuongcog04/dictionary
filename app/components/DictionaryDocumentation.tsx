import { useState } from 'react';
import SystemStats from './SystemStats';
import CodeExamples from './CodeExamples';
import SourcesSection from './SourcesSection';
import { EXAMPLE_JSON_SUCCESS, EXAMPLE_JSON_NOT_FOUND } from '../constants';

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
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                        <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded">GET</span>
                            <div className="overflow-x-auto">
                                <code className="text-base sm:text-lg font-mono font-bold text-gray-900 dark:text-white whitespace-nowrap">https://dict.minhqnd.com/api/v1/lookup</code>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-10 ml-1">
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                                Tham số truy vấn (Query)
                            </h4>
                            <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl">
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
                                        <tr className="dark:hover:bg-white/5 transition-colors">
                                            <td className="px-5 py-4 font-mono text-xs text-orange-600 dark:text-orange-400 font-bold">lang</td>
                                            <td className="px-5 py-4 text-center">
                                                <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold rounded">NO</span>
                                            </td>
                                            <td className="px-5 py-4 text-gray-500 dark:text-gray-400">Ngôn ngữ của từ. Ví dụ: &quot;vi&quot;, &quot;en&quot;, &quot;zh&quot;</td>
                                        </tr>
                                        <tr className="dark:hover:bg-white/5 transition-colors">
                                            <td className="px-5 py-4 font-mono text-xs text-orange-600 dark:text-orange-400 font-bold">def_lang</td>
                                            <td className="px-5 py-4 text-center">
                                                <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold rounded">NO</span>
                                            </td>
                                            <td className="px-5 py-4 text-gray-500 dark:text-gray-400">Lọc theo ngôn ngữ định nghĩa. Ví dụ: &quot;en&quot; để chỉ lấy nghĩa tiếng Anh (hiện chỉ có vi/en)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <CodeExamples />

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 ml-1">
                                    Tìm thấy từ (200 Found)
                                </h4>
                                <CopyableJSON content={EXAMPLE_JSON_SUCCESS} colorClass="text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 my-3 ml-1">
                                    Không tìm thấy (404 Not Found)
                                </h4>
                                <CopyableJSON content={EXAMPLE_JSON_NOT_FOUND} colorClass="text-pink-600 dark:text-pink-400" />
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                Cấu trúc dữ liệu JSON
                            </h4>

                            {/* Root Object */}
                            <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl mb-4">
                                <div className="px-5 py-2 bg-gray-100 dark:bg-[#0a0a0a] text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 shadow-sm">Root Object</div>
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
                                        <DataRow field="results" type="LanguageResult[]" desc="Danh sách kết quả theo từng ngôn ngữ." />
                                    </tbody>
                                </table>
                            </div>

                            {/* LanguageResult Object */}
                            <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl mb-4">
                                <div className="px-5 py-2 bg-gray-100 dark:bg-[#0a0a0a] text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 shadow-sm">LanguageResult</div>
                                <table className="w-full min-w-[500px] text-[13px] text-left">
                                    <thead className="bg-gray-50 dark:bg-[#111] text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-800">

                                        <tr>
                                            <th className="px-5 py-3">Trường</th>
                                            <th className="px-5 py-3">Kiểu</th>
                                            <th className="px-5 py-3">Mô tả</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        <DataRow field="lang_code" type="string" desc="Mã ngôn ngữ (ISO 639): vi, en, zh..." />
                                        <DataRow field="lang_name" type="string" desc="Tên ngôn ngữ: Tiếng Việt, English..." />
                                        <DataRow field="audio" type="string" desc="URL endpoint phát âm TTS." />
                                        <DataRow field="meanings" type="Meaning[]" desc="Danh sách định nghĩa." />
                                        <DataRow field="pronunciations" type="Pronunciation[]" desc="Phiên âm IPA theo vùng miền." />
                                        <DataRow field="translations" type="Translation[]" desc="Bản dịch sang các ngôn ngữ khác." />
                                        <DataRow field="relations" type="Relation[]" desc="Từ liên quan (đồng nghĩa, trái nghĩa)." />
                                    </tbody>
                                </table>
                            </div>

                            {/* Meaning Object */}
                            <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl mb-4">
                                <div className="px-5 py-2 bg-gray-100 dark:bg-[#0a0a0a] text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 shadow-sm">Meaning</div>
                                <table className="w-full min-w-[500px] text-[13px] text-left">
                                    <thead className="bg-gray-50 dark:bg-[#111] text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-800">

                                        <tr>
                                            <th className="px-5 py-3">Trường</th>
                                            <th className="px-5 py-3">Kiểu</th>
                                            <th className="px-5 py-3">Mô tả</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        <DataRow field="definition" type="string" desc="Nội dung định nghĩa." />
                                        <DataRow field="definition_lang" type="string" desc="Ngôn ngữ định nghĩa: vi, en..." />
                                        <DataRow field="example" type="string?" desc="Ví dụ minh hoạ (null nếu không có)." />
                                        <DataRow field="pos" type="string?" desc="Từ loại: Danh từ, Động từ, Tính từ..." />
                                        <DataRow field="sub_pos" type="string?" desc="Từ loại phụ chi tiết hơn." />
                                        <DataRow field="source" type="string" desc="Nguồn dữ liệu: Wiktionary, TVTD..." />
                                        <DataRow field="links" type="string[]" desc="Các từ liên quan trong định nghĩa." />
                                    </tbody>
                                </table>
                            </div>

                            {/* Sub-objects in a grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl">
                                    <div className="px-4 py-2 bg-gray-100 dark:bg-[#0a0a0a] text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pronunciation</div>
                                    <table className="w-full text-[12px] text-left">
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            <DataRow field="ipa" type="string" desc="Phiên âm IPA" />
                                            <DataRow field="region" type="string" desc="Vùng miền" />
                                        </tbody>
                                    </table>
                                </div>
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl">
                                    <div className="px-4 py-2 bg-gray-100 dark:bg-[#0a0a0a] text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Translation</div>
                                    <table className="w-full text-[12px] text-left">
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            <DataRow field="lang_code" type="string" desc="Mã ngôn ngữ" />
                                            <DataRow field="lang_name" type="string" desc="Tên ngôn ngữ" />
                                            <DataRow field="translation" type="string" desc="Bản dịch" />
                                        </tbody>
                                    </table>
                                </div>
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl">
                                    <div className="px-4 py-2 bg-gray-100 dark:bg-[#0a0a0a] text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Relation</div>
                                    <table className="w-full text-[12px] text-left">
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                            <DataRow field="related_word" type="string" desc="Từ liên quan" />
                                            <DataRow field="relation_type" type="string" desc="Loại quan hệ" />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Error Codes */}
                        <div>
                            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                                Mã lỗi HTTP
                            </h4>
                            <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl">
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
                                Tiếng Việt có dấu cần được encode theo chuẩn <strong>UTF-8 URL encoding</strong>:
                            </p>
                            <div className="bg-white dark:bg-[#0a0a0a] rounded-lg p-3 font-mono text-xs overflow-x-auto border border-blue-100 dark:border-blue-900/30">
                                <div className="text-gray-500 dark:text-gray-500">{`// JavaScript`}</div>
                                <div><span className="text-blue-600 dark:text-blue-400">encodeURIComponent</span>(<span className="text-emerald-600 dark:text-emerald-400">&quot;học sinh&quot;</span>)</div>
                                <div className="text-gray-400 dark:text-gray-600 mt-1">→ &quot;h%E1%BB%8Dc%20sinh&quot;</div>
                            </div>
                        </div>

                        <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
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
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                        <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded">GET</span>
                            <div className="overflow-x-auto">
                                <code className="text-base sm:text-lg font-mono font-bold text-gray-900 dark:text-white whitespace-nowrap">https://dict.minhqnd.com/api/v1/suggest</code>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 font-medium">
                        API gợi ý từ dựa trên prefix. Trả về danh sách các từ khớp với chuỗi tìm kiếm.
                    </p>
                    <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl mb-6">
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
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                        <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 bg-green-500 text-white text-xs font-bold rounded">GET</span>
                            <div className="overflow-x-auto">
                                <code className="text-base sm:text-lg font-mono font-bold text-gray-900 dark:text-white whitespace-nowrap">https://dict.minhqnd.com/api/v1/tts</code>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        Endpoint tạo file âm thanh (TTS) cho từ vựng. Trả về file định dạng <code className="text-orange-500">audio/mpeg</code>.
                    </p>
                    <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl mb-6">
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

function CopyableJSON({ content, colorClass }: { content: string; colorClass: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(content);
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = content;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group/code">
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/40 rounded-lg text-xs font-medium text-gray-400 hover:text-white transition-all sm:opacity-0 group-hover/code:opacity-100 backdrop-blur-sm border border-white/5 z-10"
            >
                {copied ? '✓ Đã copy' : 'Copy'}
            </button>
            <pre className={`bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-4 rounded-xl overflow-x-auto text-[12px] leading-relaxed font-mono ${colorClass}`}>
                <code>{content}</code>
            </pre>
        </div>
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
