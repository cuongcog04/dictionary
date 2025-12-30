/**
 * URL Slug helpers for word pages
 * Converts between word and URL-friendly slug format
 * 
 * Format (SEO-friendly with hyphen escape):
 * - Real hyphen (-) → double hyphen (--)
 * - Space → single hyphen (-)
 * - Vietnamese/special chars → URL encoded
 * 
 * Examples:
 * - "học sinh" → "h%E1%BB%8Dc-sinh"
 * - "coca-cola" → "coca--cola"
 * - "Việt-Hàn đối chiếu" → "Vi%E1%BB%87t--H%C3%A0n-%C4%91%E1%BB%91i-chi%E1%BA%BFu"
 */

/**
 * Encode word to URL slug format
 * @param word - Original word with spaces and/or hyphens
 * @returns URL-friendly slug (hyphens escaped, spaces become hyphens)
 */
export function encodeWordSlug(word: string): string {
    const slug = word
        .trim()
        .replace(/-/g, '--')   // Escape real hyphens first
        .replace(/\s+/g, '-'); // Then convert spaces to hyphens
    return encodeURIComponent(slug);
}

/**
 * Decode URL slug back to original word
 * @param slug - URL slug (may be URI encoded)
 * @returns Original word with spaces and hyphens restored
 */
export function decodeWordSlug(slug: string): string {
    // First decode URI component for special chars
    const decoded = decodeURIComponent(slug);
    // Replace single hyphens with spaces, then restore double hyphens to single
    return decoded
        .replace(/--/g, '\x00')  // Temp placeholder for real hyphens
        .replace(/-/g, ' ')       // Single hyphen becomes space
        .replace(/\x00/g, '-');   // Restore real hyphens
}
