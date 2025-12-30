import { Meaning } from '../types';
import { trackWordClick, trackCopyDefinition } from '@/lib/gtag';
import { ReactNode, useState } from 'react';

interface MeaningItemProps {
    meaning: Meaning;
    index: number;
    word?: string;
    onWordClick?: (word: string) => void;
}

// Render definition text with clickable links
function renderDefinitionWithLinks(
    definition: string,
    links: string[],
    onWordClick?: (word: string) => void
): ReactNode {
    if (!links || links.length === 0 || !onWordClick) {
        return definition;
    }

    // Build regex pattern to match any link (case-insensitive)
    // Escape special regex characters and join with |
    const escapedLinks = links.map(l => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const pattern = new RegExp(`(${escapedLinks.join('|')})`, 'gi');

    const parts = definition.split(pattern);

    return parts.map((part, idx) => {
        // Check if this part matches any link (case-insensitive)
        const matchedLink = links.find(l => l.toLowerCase() === part.toLowerCase());
        if (matchedLink) {
            return (
                <span
                    key={idx}
                    onClick={() => {
                        trackWordClick(matchedLink, 'definition_link');
                        onWordClick(matchedLink);
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                    {part}
                </span>
            );
        }
        return part;
    });
}

export default function MeaningItem({ meaning: m, index, word, onWordClick }: MeaningItemProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(m.definition);
        setCopied(true);
        trackCopyDefinition(word || 'unknown', m.definition);

        setTimeout(() => setCopied(false), 2000);
    };

    // Language badge for definition
    const langBadge = m.definition_lang === 'en' ? (
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wide">
            EN
        </span>
    ) : null;

    // Render definition with clickable links
    const definitionContent = renderDefinitionWithLinks(m.definition, m.links, onWordClick);

    return (
        <div className="group flex gap-4">
            <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold ring-1 ring-blue-500/20">
                {index + 1}
            </span>
            <div className="flex-grow min-w-0">
                {m.pos && (
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-500 dark:text-blue-400">
                            {m.pos}
                        </span>
                        {m.sub_pos && (
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                                / {m.sub_pos}
                            </span>
                        )}
                        {langBadge}
                        <span className="flex-grow"></span>
                        {m.source && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 font-medium border border-gray-200 dark:border-white/5">
                                {m.source}
                            </span>
                        )}
                    </div>
                )}
                <div className="flex items-start gap-2 mb-3 group/def relative">
                    {!m.pos && langBadge && (
                        <span className="flex-shrink-0 mt-1">{langBadge}</span>
                    )}
                    <p className="flex-grow text-[1.05rem] leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-line">
                        {definitionContent}
                    </p>

                    {/* Copy Button */}
                    <button
                        onClick={handleCopy}
                        className="opacity-0 group-hover/def:opacity-100 focus:opacity-100 transition-opacity p-1.5 text-gray-400 hover:text-blue-500 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
                        title="Sao chép định nghĩa"
                    >
                        {copied ? (
                            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m2 4h2a2 2 0 012 2v10a2 2 0 01-2 2h-4a2 2 0 01-2-2v-10a2 2 0 012-2z" />
                            </svg>
                        )}
                    </button>

                    {!m.pos && m.source && (
                        <span className="flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 font-medium border border-gray-200 dark:border-white/5">
                            {m.source}
                        </span>
                    )}
                </div>
                {m.example && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                        {m.example}
                    </p>
                )}
            </div>
        </div>
    );
}
