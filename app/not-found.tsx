'use client';

import { useState } from 'react';
import DictionaryHeader from './components/DictionaryHeader';
import DictionaryResult from './components/DictionaryResult';
import DictionaryFooter from './components/DictionaryFooter';
import Link from 'next/link';
import { LookupResult } from './types';

export default function NotFound() {
    const [selectedLang, setSelectedLang] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    // Fake dictionary result for "404"
    const fakeResult: LookupResult = {
        exists: true,
        word: '404 (Trang không tồn tại)',
        results: [
            {
                lang_code: 'vi',
                lang_name: 'Tiếng Việt',
                audio: '',
                pronunciations: [
                    { ipa: 'bốn không bốn', region: 'VI' },
                    { ipa: 'fɔːr oʊ fɔːr', region: 'EN' },
                ],
                meanings: [
                    {
                        definition: 'Mã lỗi HTTP cho biết trang web bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.',
                        definition_lang: 'vi',
                        example: '"Trang này trả về lỗi 404, có vẻ như nó đã bay màu rồi."',
                        pos: 'danh từ',
                        sub_pos: 'tin học',
                        source: 'minhqnd',
                        links: [],
                    },
                    {
                        definition: '(thông tục) Trạng thái lạc lối, không tìm thấy đường về.',
                        definition_lang: 'vi',
                        example: '"Tôi đang 404 trong cuộc đời."',
                        pos: 'tính từ',
                        sub_pos: 'tiếng lóng',
                        source: 'minhqnd',
                        links: [],
                    },
                ],
                translations: [],
                relations: [
                    { related_word: 'not found', relation_type: 'đồng nghĩa' },
                    { related_word: 'mất tích', relation_type: 'đồng nghĩa' },
                    { related_word: 'biến mất', relation_type: 'đồng nghĩa' },
                    { related_word: '200 OK', relation_type: 'trái nghĩa' },
                ],
            },
        ],
    };

    const handleWordClick = (word: string) => {
        window.location.href = `/word/${encodeURIComponent(word.replace(/\s+/g, '-'))}`;
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            const slug = searchQuery.trim().replace(/-/g, '--').replace(/\s+/g, '-');
            window.location.href = `/word/${encodeURIComponent(slug)}`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-[#e5e5e5] scroll-smooth selection:bg-blue-100 dark:selection:bg-blue-900/30">
            <DictionaryHeader />

            <main className="max-w-4xl mx-auto">
                {/* Functional Search bar */}
                <section id="demo" className="max-w-2xl mx-auto mb-8 text-sm">
                    <h2 className="text-xl font-semibold mb-5 pb-2 border-b border-gray-200 dark:border-gray-800">
                        Tra cứu ngay:
                    </h2>

                    <div className="relative mb-2">
                        <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all bg-white dark:bg-transparent">
                            <div className="pl-4 text-gray-400 pointer-events-none">
                                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Nhập từ cần tra..."
                                className="w-full py-3.5 pl-3 pr-4 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                            />
                            <button
                                onClick={handleSearch}
                                disabled={!searchQuery.trim()}
                                className="h-full px-8 cursor-pointer py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium transition-colors disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                Tra cứu
                            </button>
                        </div>
                    </div>
                </section>

                {/* Dictionary Result for 404 */}
                <DictionaryResult
                    result={fakeResult}
                    selectedLang={selectedLang}
                    setSelectedLang={setSelectedLang}
                    onWordClick={handleWordClick}
                />

                {/* CTA Section */}
                <section className="max-w-2xl mx-auto mt-8 mb-12">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            Trang bạn tìm không tồn tại.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link
                                href="/"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Về trang chủ
                            </Link>
                            {/* <Link
                                href="/#demo"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Tra từ khác
                            </Link> */}
                        </div>
                    </div>
                </section>
            </main>

            <DictionaryFooter />
        </div>
    );
}
