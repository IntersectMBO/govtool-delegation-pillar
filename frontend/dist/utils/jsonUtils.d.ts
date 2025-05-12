/**
 * Downloads a JSON object as a file.
 * @param json - The JSON object to be downloaded.
 * @param fileName - The name of the file to be downloaded.
 * If not provided, the default name will be "data.jsonld".
 */
export declare const downloadJson: (json: unknown, fileName?: string) => void;
