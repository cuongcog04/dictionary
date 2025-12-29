import { useState, useEffect, useCallback, useRef } from 'react';
import { LookupResult } from '../types';

export function useDictionarySearch() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [result, setResult] = useState<LookupResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [inlineCompletion, setInlineCompletion] = useState('');
    const [selectedLang, setSelectedLang] = useState(0);
    const [filterLang, setFilterLang] = useState(''); // Language filter for API
    const queryRef = useRef(query);
    const lastSearchedRef = useRef('');
    const skipSuggestRef = useRef(false);
    const filterLangRef = useRef(filterLang);

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

        const currentQuery = query;
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/v1/suggest?q=${encodeURIComponent(currentQuery)}`);
                const data = await res.json();
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
        }, 50);

        return () => clearTimeout(timer);
    }, [query]);

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
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Auto search with debounce
    useEffect(() => {
        const trimmedQuery = query.trim();
        if (trimmedQuery === lastSearchedRef.current) {
            return;
        }

        const timer = setTimeout(() => {
            lastSearchedRef.current = trimmedQuery;
            searchWord(query);
        }, 500);
        return () => clearTimeout(timer);
    }, [query, searchWord]);

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
