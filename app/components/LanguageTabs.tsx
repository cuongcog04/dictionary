import { LanguageResult } from '../types';

interface LanguageTabsProps {
    results: LanguageResult[];
    selectedLang: number;
    setSelectedLang: (idx: number) => void;
}

export default function LanguageTabs({ results, selectedLang, setSelectedLang }: LanguageTabsProps) {
    if (results.length <= 1) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {results.map((langResult, idx) => (
                <button
                    key={langResult.lang_code}
                    onClick={() => setSelectedLang(idx)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer ${selectedLang === idx
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white dark:bg-black/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-white/5'
                        }`}
                >
                    {langResult.lang_name}
                    <span className="ml-1 text-xs opacity-70">({langResult.meanings.length})</span>
                </button>
            ))}
        </div>
    );
}
