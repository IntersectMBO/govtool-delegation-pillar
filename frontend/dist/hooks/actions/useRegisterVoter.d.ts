type MetadataInfo = {
    hash: string;
    uri: string;
};
export declare const useRegisterVoter: () => {
    registerVoter: (metadata?: MetadataInfo) => Promise<void>;
    isRegistering: boolean;
};
export {};
