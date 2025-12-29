import { Translation } from '../types';

interface TranslationListProps {
    translations: Translation[];
    onWordClick: (word: string) => void;
}

export default function TranslationList({ translations, onWordClick }: TranslationListProps) {
    if (!translations || translations.length === 0) return null;

    return (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Bản dịch
            </h3>
            <div className="flex flex-wrap gap-2">
                {translations.map((t, idx) => (
                    <button
                        key={idx}
                        onClick={() => onWordClick(t.translation)}
                        className="px-3 py-1.5 text-sm rounded-lg bg-purple-50 dark:bg-purple-900/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors cursor-pointer"
                    >
                        <span className="text-xs text-purple-400 dark:text-purple-500 mr-1">[{t.lang_name}]</span>
                        {t.translation}
                    </button>
                ))}
            </div>
        </div>
    );
}
