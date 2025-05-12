/**
 * Encodes a CIP129 identifier based on the provided transaction ID, index, and bech32 prefix.
 * @param txID - The transaction ID.
 * @param index - The index.
 * @param bech32Prefix - The bech32 prefix.
 * @returns The generated CIP129 identifier.
 */
export declare const encodeCIP129Identifier: ({ txID, index, bech32Prefix, }: {
    txID: string;
    index?: string | undefined;
    bech32Prefix: string;
}) => string;
