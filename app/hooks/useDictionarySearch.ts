import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LookupResult } from '../types';

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

        // Don't show suggestions if we already have a valid result for this query
        if (result?.exists && result?.word?.toLowerCase() === query.trim().toLowerCase()) {
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

                // Update URL if enabled
                if (updateUrl) {
                    const newUrl = `/word/${encodeURIComponent(word.trim())}`;
                    router.push(newUrl, { scroll: false });
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
