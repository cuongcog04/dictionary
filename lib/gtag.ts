/**
 * Google Analytics utility functions
 * Use these to track custom events
 */

// Declare gtag as global
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js',
            targetId: string | Date,
            config?: Record<string, unknown>
        ) => void;
    }
}

/**
 * Track a search event
 * @param searchTerm - The word being searched
 */
export function trackSearch(searchTerm: string) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'search', {
            search_term: searchTerm,
        });
    }
}

/**
 * Track TTS (Text-to-Speech) play event
 * @param word - The word being spoken
 */
export function trackTTSPlay(word: string) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'tts_play', {
            word: word,
        });
    }
}

/**
 * Track related word click event
 * @param word - The related word clicked
 * @param relationType - Type of relation (synonym, antonym, etc.)
 */
export function trackWordClick(word: string, relationType?: string) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'word_click', {
            word: word,
            relation_type: relationType || 'direct',
        });
    }
}

/**
 * Track definition copy event
 * @param word - The word whose definition was copied
 * @param definition - The definition text (truncated)
 */
export function trackCopyDefinition(word: string, definition: string) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'copy_definition', {
            word: word,
            definition_preview: definition.slice(0, 50),
        });
    }
}

/**
 * Track page view with custom parameters
 * @param pagePath - The page path
 * @param pageTitle - The page title
 */
export function trackPageView(pagePath: string, pageTitle: string) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', {
            page_path: pagePath,
            page_title: pageTitle,
        });
    }
}
