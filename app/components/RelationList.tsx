import { Relation } from '../types';
import { trackWordClick } from '@/lib/gtag';

interface RelationListProps {
    relations: Relation[];
    onWordClick: (word: string) => void;
}

export default function RelationList({ relations, onWordClick }: RelationListProps) {
    if (!relations || relations.length === 0) return null;

    const handleWordClick = (word: string, type: string) => {
        trackWordClick(word, type);
        onWordClick(word);
    };

    const renderRelationGroup = (type: string, label: string, bgColor: string, txtColor: string, borderColor: string, hoverColor: string) => {
        const filtered = relations.filter(r => r.relation_type === type);
        if (filtered.length === 0) return null;

        return (
            <div>
                <h4 className={`text-[10px] font-bold uppercase tracking-wider ${txtColor}/80 mb-2 ml-1`}>{label}</h4>
                <div className="flex flex-wrap gap-2">
                    {filtered.map((r, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleWordClick(r.related_word, type)}
                            className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${bgColor} ${txtColor} ${borderColor} ${hoverColor} cursor-pointer`}
                        >
                            {r.related_word}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Từ Liên Quan
            </h3>
            <div className="space-y-4">
                {renderRelationGroup('Đồng nghĩa', 'Đồng nghĩa', 'bg-green-50 dark:bg-green-900/10', 'text-green-700 dark:text-green-400', 'border-green-200 dark:border-green-900/30', 'hover:bg-green-100 dark:hover:bg-green-900/20')}
                {renderRelationGroup('Trái nghĩa', 'Trái nghĩa', 'bg-red-50 dark:bg-red-900/10', 'text-red-700 dark:text-red-400', 'border-red-200 dark:border-red-900/30', 'hover:bg-red-100 dark:hover:bg-red-900/20')}

                {/* Other Relations */}
                {relations.filter(r => r.relation_type !== 'Đồng nghĩa' && r.relation_type !== 'Trái nghĩa').length > 0 && (
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 ml-1">Khác</h4>
                        <div className="flex flex-wrap gap-2">
                            {relations.filter(r => r.relation_type !== 'Đồng nghĩa' && r.relation_type !== 'Trái nghĩa').map((r, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleWordClick(r.related_word, r.relation_type)}
                                    className="px-2.5 py-1 text-xs rounded-md border transition-colors bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    title={r.relation_type}
                                >
                                    {r.related_word}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
