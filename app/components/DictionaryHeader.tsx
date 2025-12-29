import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGES = [
    { name: 'Tiếng Việt', flag: '🇻🇳' },
    { name: 'Tiếng Anh', flag: '🇬🇧' },
    { name: 'Tiếng Pháp', flag: '🇫🇷' },
    { name: 'Tiếng Trung', flag: '🇨🇳' },
    { name: 'Tiếng Nhật', flag: '🇯🇵' },
    { name: 'Tiếng Hàn', flag: '🇰🇷' },
    { name: 'Tiếng Đức', flag: '🇩🇪' },
    { name: 'các nước', flag: '🏳️‍🌈' }
];

export default function DictionaryHeader() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % LANGUAGES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="py-12 text-center select-none overflow-hidden">
            <motion.h1
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 flex flex-nowrap justify-center items-center gap-x-3"
            >
                <motion.span layout transition={{ duration: 0.5 }} className="flex-shrink-0">API Từ Điển</motion.span>

                <motion.span
                    layout
                    transition={{
                        layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
                    }}
                    className="relative inline-flex items-center text-blue-600 dark:text-blue-400 h-[1.2em] whitespace-nowrap flex-shrink-0 overflow-visible"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                            key={index}
                            initial={{ y: 25, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -25, opacity: 0 }}
                            transition={{
                                opacity: { duration: 0.3 },
                                y: { duration: 0.4, ease: "easeOut" }
                            }}
                            className="inline-flex items-center gap-2 whitespace-nowrap"
                        >
                            {LANGUAGES[index].name}
                            <span className="text-3xl md:text-4xl leading-none drop-shadow-sm">{LANGUAGES[index].flag}</span>
                        </motion.span>
                    </AnimatePresence>
                </motion.span>

                <motion.span
                    layout
                    transition={{
                        layout: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
                    }}
                >
                    Free
                </motion.span>
            </motion.h1>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto px-4">
                API tra cứu từ điển miễn phí với hơn 357,000 từ và 443,000 định nghĩa.
            </p>
        </header>
    );
}
