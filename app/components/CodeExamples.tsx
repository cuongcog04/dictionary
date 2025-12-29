import { useState } from 'react';
import { CODES } from '../constants';

export default function CodeExamples() {
    const [codeTab, setCodeTab] = useState<'js' | 'python' | 'go' | 'java' | 'c' | 'curl'>('js');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const text = CODES[codeTab];
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
                Ví dụ triển khai
            </h4>
            <div className="flex overflow-x-auto rounded-t-xl border-x border-t border-gray-200 dark:border-gray-800">
                {['js', 'curl', 'python', 'go', 'java', 'c'].map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setCodeTab(lang as typeof codeTab)}
                        className={`px-5 py-2.5 text-xs font-medium transition-all border-b-2 ${codeTab === lang
                            ? 'bg-gray-50 dark:bg-[#141414] text-gray-900 dark:text-white border-blue-500'
                            : 'bg-white dark:bg-[#0a0a0a] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 border-transparent'
                            }`}
                    >
                        {lang === 'js' ? 'JavaScript' : lang === 'curl' ? 'cURL' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                ))}
            </div>
            <div className="relative group/code">
                <button
                    onClick={handleCopy}
                    className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 dark:bg-black/20 dark:hover:bg-black/40 rounded-lg text-xs font-medium text-gray-400 hover:text-white transition-all opacity-0 group-hover/code:opacity-100 backdrop-blur-sm border border-white/5"
                >
                    {copied ? '✓ Đã copy' : 'Copy'}
                </button>
                <pre className="bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-gray-800 p-6 rounded-b-xl overflow-x-auto text-[13px] leading-relaxed font-mono text-blue-600 dark:text-blue-400 shadow-inner">
                    <code>{CODES[codeTab]}</code>
                </pre>
            </div>
        </div>
    );
}
