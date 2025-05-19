export declare const getAdaHolderCurrentDelegation: ({ apiUrl, stakeKey, }: {
    apiUrl: string;
    stakeKey?: string | undefined;
}) => Promise<{
    dRepView: string | null;
    dRepHash: string | null;
    isDRepScriptBased: boolean;
    txHash: string | null;
} | null>;
