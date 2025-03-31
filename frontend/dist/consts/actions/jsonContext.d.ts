export declare const CIP_100 = "https://github.com/cardano-foundation/CIPs/blob/master/CIP-0100/README.md#";
export declare const CIP_119 = "https://github.com/cardano-foundation/CIPs/blob/master/CIP-0119/README.md#";
export declare const DREP_CONTEXT: {
    '@language': string;
    CIP100: string;
    CIP119: string;
    hashAlgorithm: string;
    body: {
        '@id': string;
        '@context': {
            references: {
                '@id': string;
                '@container': "@set";
                '@context': {
                    GovernanceMetadata: string;
                    Identity: string;
                    Link: string;
                    Other: string;
                    label: string;
                    uri: string;
                    referenceHash: {
                        '@id': string;
                        '@context': {
                            hashDigest: string;
                            hashAlgorithm: string;
                        };
                    };
                };
            };
            paymentAddress: string;
            givenName: string;
            image: string;
            objectives: string;
            motivations: string;
            qualifications: string;
            doNotList: string;
        };
    };
    authors: {
        '@id': string;
        '@container': "@set";
        '@context': {
            name: string;
            witness: {
                '@id': string;
                '@context': {
                    witnessAlgorithm: string;
                    publicKey: string;
                    signature: string;
                };
            };
        };
    };
};
