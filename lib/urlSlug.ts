/**
 * URL Slug helpers for word pages
 * Converts between word and URL-friendly slug format
 * 
 * Format:
 * - Space → single hyphen (-)
 * - Hyphen → double hyphen (--)
 * 
 * Examples:
 * - "học tập" → "học-tập"
 * - "coca-cola" → "coca--cola"
 * - "Việt-Hàn đối chiếu" → "Việt--Hàn-đối-chiếu"
 */

/**
 * Encode word to URL slug format
 * @param word - Original word with spaces/hyphens
 * @returns URL-friendly slug
 */
export function encodeWordSlug(word: string): string {
    return word
        .trim()
        .replace(/-/g, '--')   // Real hyphens become double
        .replace(/\s+/g, '-'); // Spaces become single hyphen
}

/**
 * Decode URL slug back to original word
 * @param slug - URL slug (may be URI encoded)
 * @returns Original word with spaces/hyphens restored
 */
export function decodeWordSlug(slug: string): string {
    // First decode URI component for special chars
    const decoded = decodeURIComponent(slug);
    // Replace '--' with placeholder, then '-' with space, then restore
    return decoded
        .replace(/--/g, '\x00')  // Temp placeholder for real hyphens
        .replace(/-/g, ' ')       // Single hyphen becomes space
        .replace(/\x00/g, '-');   // Restore real hyphens
}
