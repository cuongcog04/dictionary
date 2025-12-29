import { useRef } from 'react';
import { LookupResult } from '../types';

// Dictionary types: word_lang -> def_lang
const DICTIONARY_TYPES = [
    { code: '', label: 'Tất cả', wordLang: '', defLang: '' },
    { code: 'vi-vi', label: '🇻🇳 VI-VI', wordLang: 'vi', defLang: 'vi' },
    { code: 'vi-en', label: '🇻🇳 VI-EN', wordLang: 'vi', defLang: 'en' },
    { code: 'en-vi', label: '🇬🇧 EN-VI', wordLang: 'en', defLang: 'vi' },
    { code: 'zh-vi', label: '🇨🇳 VI-ZH', wordLang: 'zh', defLang: 'vi' },
    { code: 'ja-vi', label: '🇯🇵 VI-JA', wordLang: 'ja', defLang: 'vi' },
    { code: 'ko-vi', label: '🇰🇷 VI-KO', wordLang: 'ko', defLang: 'vi' },
    { code: 'fr-vi', label: '🇫🇷 FR-VI', wordLang: 'fr', defLang: 'vi' },
    { code: 'de-vi', label: '🇩🇪 DE-VI', wordLang: 'de', defLang: 'vi' },
    { code: 'ru-vi', label: '🇷🇺 RU-VI', wordLang: 'ru', defLang: 'vi' },
    { code: 'th-vi', label: '🇹🇭 TH-VI', wordLang: 'th', defLang: 'vi' },
];

interface DictionarySearchProps {
    query: string;
    setQuery: (q: string) => void;
    suggestions: string[];
    showSuggestions: boolean;
    setShowSuggestions: (show: boolean) => void;
    selectedIndex: number;
    setSelectedIndex: (idx: number) => void;
    inlineCompletion: string;
    setInlineCompletion: (s: string) => void;
    loading: boolean;
    result: LookupResult | null;
    selectSuggestion: (word: string) => void;
    filterLang: string;
    setFilterLang: (lang: string) => void;
    searchWord: (word: string, lang?: string) => void;
}

export default function DictionarySearch({
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    selectedIndex,
    setSelectedIndex,
    inlineCompletion,
    setInlineCompletion,
    loading,
    result,
    selectSuggestion,
    filterLang,
    setFilterLang,
    searchWord
}: DictionarySearchProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions || suggestions.length === 0) {
            if (e.key === 'Tab' && inlineCompletion && inlineCompletion !== query) {
                e.preventDefault();
                selectSuggestion(inlineCompletion);
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const newIndex = selectedIndex < suggestions.length - 1 ? selectedIndex + 1 : selectedIndex;
            setSelectedIndex(newIndex);
            setInlineCompletion(suggestions[newIndex]);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const newIndex = selectedIndex > 0 ? selectedIndex - 1 : -1;
            setSelectedIndex(newIndex);
            setInlineCompletion(newIndex >= 0 ? suggestions[newIndex] : suggestions[0]);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            selectSuggestion(suggestions[selectedIndex]);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const completion = selectedIndex >= 0 ? suggestions[selectedIndex] : suggestions[0];
            selectSuggestion(completion);
        } else if (e.key === 'ArrowRight' && inlineCompletion && query.length > 0) {
            const cursorPos = e.currentTarget.selectionStart;
            if (cursorPos === query.length) {
                e.preventDefault();
                selectSuggestion(inlineCompletion);
            }
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setInlineCompletion('');
        }
    };

    const handleLangChange = (dictTypeCode: string) => {
        setFilterLang(dictTypeCode);
        if (query.trim()) {
            // Find the dictionary type to get wordLang and defLang
            const dictType = DICTIONARY_TYPES.find(d => d.code === dictTypeCode);
            searchWord(query, dictType?.wordLang || undefined);
        }
    };

    return (
        <section id="demo" className="max-w-2xl mx-auto mb-8 text-sm">
            <h2 className="text-xl font-semibold mb-5 pb-2 border-b border-gray-200 dark:border-gray-800">
                Tra cứu ngay:
            </h2>

            <div className="relative mb-2 ">
                {/* Combined Search Bar with Language Dropdown */}
                <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all bg-white dark:bg-transparent">
                    {/* Search Icon */}
                    <div className="pl-4 text-gray-400 pointer-events-none">
                        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>

                    {/* Input with Ghost Text */}
                    <div className="relative flex-1">
                        {inlineCompletion && query && !(result?.exists && result?.word === query) && inlineCompletion.toLowerCase().startsWith(query.toLowerCase()) && inlineCompletion.toLowerCase() !== query.toLowerCase() && (
                            <div
                                className="absolute inset-0 py-3.5 pl-3 pr-12 pointer-events-none select-none whitespace-pre overflow-hidden flex items-center"
                                aria-hidden="true"
                            >
                                <span className="text-transparent">{inlineCompletion.slice(0, query.length)}</span>
                                <span className="text-gray-400 dark:text-gray-500">{inlineCompletion.slice(query.length)}</span>
                            </div>
                        )}
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                            onBlur={() => {
                                setTimeout(() => {
                                    setShowSuggestions(false);
                                    setInlineCompletion('');
                                }, 150);
                            }}
                            placeholder="Nhập từ cần tra..."
                            className="w-full py-3.5 pl-3 pr-4 bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600"
                        />
                    </div>

                    {/* Loading Spinner */}
                    {loading && (
                        <div className="pr-2">
                            <div className="w-4 h-4 border-2 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Dictionary Type Dropdown */}
                    <div className="relative">
                        <select
                            value={filterLang}
                            onChange={(e) => handleLangChange(e.target.value)}
                            className="appearance-none h-full py-3.5 pl-3 pr-8 bg-gray-50 dark:bg-[#1a1a1a] border-l border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400 focus:outline-none cursor-pointer hover:bg-gray-100 dark:hover:bg-[#222] transition-colors"
                        >
                            {DICTIONARY_TYPES.map((dictType) => (
                                <option key={dictType.code} value={dictType.code}>
                                    {dictType.label}
                                </option>
                            ))}
                        </select>
                        {/* Custom Chevron Icon */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 right-0 mt-2 py-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden z-50">
                        {suggestions.map((s, idx) => (
                            <li
                                key={idx}
                                onMouseDown={() => selectSuggestion(s)}
                                onMouseEnter={() => {
                                    setSelectedIndex(idx);
                                    setInlineCompletion(s);
                                }}
                                className={`px-4 py-2.5 cursor-pointer transition-colors ${idx === selectedIndex
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                    : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                {s}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {!loading && result && !result.exists && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 italic">
                    Không tìm thấy từ &quot;{query}&quot;
                </div>
            )}
        </section>
    );
}
