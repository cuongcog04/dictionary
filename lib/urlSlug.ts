/**
 * URL Slug helpers for word pages
 * Converts between word and URL-friendly slug format
 * 
 * Format (Wiktionary-style):
 * - Space → underscore (_)
 * - Vietnamese/special chars → URL encoded
 * 
 * Examples:
 * - "học sinh" → "h%E1%BB%8Dc_sinh"
 * - "coca-cola" → "coca-cola"
 */

/**
 * Encode word to URL slug format
 * @param word - Original word with spaces
 * @returns URL-friendly slug (encoded with underscores for spaces)
 */
export function encodeWordSlug(word: string): string {
    return encodeURIComponent(
        word.trim().replace(/\s+/g, '_')
    );
}

/**
 * Decode URL slug back to original word
 * @param slug - URL slug (may be URI encoded)
 * @returns Original word with spaces restored
 */
export function decodeWordSlug(slug: string): string {
    // First decode URI component for special chars
    const decoded = decodeURIComponent(slug);
    // Replace underscores with spaces
    return decoded.replace(/_/g, ' ');
}
