export declare const useGetAdaHolderCurrentDelegationQuery: (stakeKey: string | undefined) => {
    currentDelegation: {
        dRepView: string | null;
        dRepHash: string | null;
        isDRepScriptBased: boolean;
        txHash: string | null;
    } | null | undefined;
    isCurrentDelegationLoading: boolean;
};
