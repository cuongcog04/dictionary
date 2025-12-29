'use client';

import DictionaryHeader from '../../components/DictionaryHeader';
import DictionarySearch from '../../components/DictionarySearch';
import DictionaryResult from '../../components/DictionaryResult';
import DictionaryDocumentation from '../../components/DictionaryDocumentation';
import DictionaryFooter from '../../components/DictionaryFooter';
import { useDictionarySearch } from '../../hooks/useDictionarySearch';
import { LookupResult } from '../../types';

// Extract defLang from dictionary type code (e.g., 'vi-en' -> 'en')
function getDefLang(filterLang: string): string | undefined {
    if (!filterLang || !filterLang.includes('-')) return undefined;
    const parts = filterLang.split('-');
    return parts[1] || undefined;
}

interface WordPageClientProps {
    word: string;
    initialResult: LookupResult | null;
}

export default function WordPageClient({ word, initialResult }: WordPageClientProps) {
    const {
        query,
        setQuery,
        suggestions,
        showSuggestions,
        setShowSuggestions,
        selectedIndex,
        setSelectedIndex,
        result,
        loading,
        inlineCompletion,
        setInlineCompletion,
        selectedLang,
        setSelectedLang,
        filterLang,
        setFilterLang,
        searchWord,
        selectSuggestion
    } = useDictionarySearch({
        initialWord: word,
        initialResult: initialResult,
        updateUrl: true
    });

    const defLang = getDefLang(filterLang);

    return (
        <div className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 transition-colors duration-300 dark:bg-[#0a0a0a] dark:text-[#e5e5e5] scroll-smooth selection:bg-blue-100 dark:selection:bg-blue-900/30">
            <DictionaryHeader />

            <main className="max-w-4xl mx-auto">
                <DictionarySearch
                    query={query}
                    setQuery={setQuery}
                    suggestions={suggestions}
                    showSuggestions={showSuggestions}
                    setShowSuggestions={setShowSuggestions}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    inlineCompletion={inlineCompletion}
                    setInlineCompletion={setInlineCompletion}
                    loading={loading}
                    result={result}
                    selectSuggestion={selectSuggestion}
                    filterLang={filterLang}
                    setFilterLang={setFilterLang}
                    searchWord={searchWord}
                />

                {result && result.exists && (
                    <DictionaryResult
                        result={result}
                        selectedLang={selectedLang}
                        setSelectedLang={setSelectedLang}
                        onWordClick={selectSuggestion}
                        defLang={defLang}
                    />
                )}

                <DictionaryDocumentation />
            </main>

            <DictionaryFooter />
        </div>
    );
}
