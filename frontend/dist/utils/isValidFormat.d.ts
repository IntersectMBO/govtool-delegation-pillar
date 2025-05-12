export declare const URL_REGEX: RegExp;
export declare const HASH_REGEX: RegExp;
export declare const PAYMENT_ADDRESS_REGEX: RegExp;
export declare function isValidURLLength(s: string): string | true;
export declare const isReceivingAddress: (getAddress: (address: string) => never) => (address?: string) => Promise<string | true>;
