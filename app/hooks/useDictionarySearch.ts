import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LookupResult } from '../types';
import { encodeWordSlug } from '@/lib/urlSlug';
import { trackSearch } from '@/lib/gtag';

interface UseDictionarySearchOptions {
    initialWord?: string;
    initialResult?: LookupResult | null;
    updateUrl?: boolean;
}

export function useDictionarySearch(options: UseDictionarySearchOptions = {}) {
    const { initialWord = '', initialResult = null, updateUrl = false } = options;
    const router = useRouter();

    const [query, setQuery] = useState(initialWord);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [result, setResult] = useState<LookupResult | null>(initialResult);
    const [loading, setLoading] = useState(false);
    const [inlineCompletion, setInlineCompletion] = useState('');
    const [selectedLang, setSelectedLang] = useState(0);
    const [filterLang, setFilterLang] = useState(''); // Language filter for API
    const queryRef = useRef(query);
    const lastSearchedRef = useRef(initialWord);
    const skipSuggestRef = useRef(false);
    const filterLangRef = useRef(filterLang);
    const isInitialMount = useRef(true);

    // Keep refs in sync
    useEffect(() => {
        queryRef.current = query;
    }, [query]);

    useEffect(() => {
        filterLangRef.current = filterLang;
    }, [filterLang]);

    // Fetch suggestions
    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        if (skipSuggestRef.current) {
            skipSuggestRef.current = false;
            return;
        }

        // Hide suggestions if query exactly matches the current result
        // (e.g., user deleted space and now query matches the displayed result)
        if (result?.exists && result?.word?.toLowerCase() === query.toLowerCase()) {
            setSuggestions([]);
            setShowSuggestions(false);
            setInlineCompletion('');
            return;
        }

        const currentQuery = query;
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/v1/suggest?q=${encodeURIComponent(currentQuery)}`);
                const data = await res.json();
                // Double-check we still need suggestions (result might have loaded)
                if (queryRef.current === currentQuery && data.suggestions?.length > 0) {
                    setSuggestions(data.suggestions);
                    setShowSuggestions(true);
                    setSelectedIndex(-1);
                    setInlineCompletion(data.suggestions[0]);
                } else {
                    setSuggestions([]);
                    setShowSuggestions(false);
                    setInlineCompletion('');
                }
            } catch {
                setSuggestions([]);
            }
        }, 30);

        return () => clearTimeout(timer);
    }, [query, result]);

    const searchWord = useCallback(async (word: string, lang?: string) => {
        if (!word.trim()) {
            setResult(null);
            return;
        }

        // Extract wordLang from filterLang if lang not explicitly provided
        // filterLang is in format 'word_lang-def_lang' (e.g., 'vi-vi', 'en-vi')
        let langParam = lang;
        if (!langParam && filterLangRef.current) {
            const parts = filterLangRef.current.split('-');
            langParam = parts[0] || undefined; // Get wordLang part
        }

        setLoading(true);
        try {
            let url = `/api/v1/lookup?word=${encodeURIComponent(word.trim())}`;
            if (langParam) {
                url += `&lang=${encodeURIComponent(langParam)}`;
            }
            const res = await fetch(url);
            const data = await res.json();
            setResult(data);
            setSelectedLang(0);
            if (data.exists) {
                setShowSuggestions(false);
                setInlineCompletion('');

                // Track search event
                trackSearch(word.trim());

                // Update URL and title if enabled (use replaceState to avoid losing focus)
                if (updateUrl) {
                    const newUrl = `/word/${encodeWordSlug(word)}`;
                    window.history.replaceState(null, '', newUrl);
                    // Update document title to match the searched word
                    document.title = `${word.trim()} là gì? - API Từ Điển Tiếng Việt & Đa Ngôn Ngữ Miễn Phí | @minhqnd`;
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [updateUrl, router]);

    // Auto search with debounce (skip initial if we have initial result)
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            if (initialResult) {
                return; // Skip auto-search on mount if we have initial result
            }
        }

        const trimmedQuery = query.trim();
        if (trimmedQuery === lastSearchedRef.current) {
            return;
        }

        const timer = setTimeout(() => {
            lastSearchedRef.current = trimmedQuery;
            searchWord(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query, searchWord, initialResult]);

    const selectSuggestion = useCallback((word: string) => {
        skipSuggestRef.current = true;
        setQuery(word);
        setSuggestions([]);
        setShowSuggestions(false);
        setInlineCompletion('');
        searchWord(word);
        // Scroll to search section when selecting a related word
        const searchSection = document.getElementById('search');
        if (searchSection) {
            searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [searchWord]);

    return {
        query,
        setQuery,
        suggestions,
        showSuggestions,
        setShowSuggestions,
        selectedIndex,
        setSelectedIndex,
        result,
        setResult,
        loading,
        inlineCompletion,
        setInlineCompletion,
        selectedLang,
        setSelectedLang,
        filterLang,
        setFilterLang,
        searchWord,
        selectSuggestion
    };
}
