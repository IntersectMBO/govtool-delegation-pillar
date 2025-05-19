/**
 * Checks if a given string is a base64-encoded image or SVG and returns its details.
 *
 * @param str - The string to check.
 * @returns An object with the MIME type, base64 prefix, and validity flag.
 */
export declare function getBase64ImageDetails(str: string): {
    type: string | null;
    base64Prefix: string | null;
    isValidBase64Image: boolean;
};
