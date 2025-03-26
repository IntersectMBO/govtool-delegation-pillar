type MetadataInfo = {
    hash: string;
    uri: string;
};
export declare const useUpdateVoter: () => {
    updateVoter: (metadata: MetadataInfo) => Promise<void>;
    isUpdatingVoter: boolean;
};
export {};
