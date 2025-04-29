import { bech32 } from 'bech32';
import { Buffer } from 'buffer';

/**
 * Encodes a CIP129 identifier based on the provided transaction ID, index, and bech32 prefix.
 * @param txID - The transaction ID.
 * @param index - The index.
 * @param bech32Prefix - The bech32 prefix.
 * @returns The generated CIP129 identifier.
 */
export const encodeCIP129Identifier = ({
  txID,
  index,
  bech32Prefix,
}: {
  txID: string;
  index?: string;
  bech32Prefix: string;
}) => {
  const govActionBytes = Buffer.from(index ? txID + index : txID, 'hex');
  const words = bech32.toWords(govActionBytes);
  return bech32.encode(bech32Prefix, words);
};
