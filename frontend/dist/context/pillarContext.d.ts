import { Certificate, CertificatesBuilder } from '@emurgo/cardano-serialization-lib-asmjs';
import { FC, PropsWithChildren } from 'react';
import { PendingTransaction, TransactionStateWithResource, TransactionStateWithoutResource, VoterInfo } from '../types';
type BuildSignSubmitConwayCertTxArgs = {
    certBuilder?: unknown;
    voter?: VoterInfo;
} & (Pick<TransactionStateWithoutResource, 'type' | 'resourceId'> | Pick<TransactionStateWithResource, 'type' | 'resourceId'>);
export type WalletApi = {
    dRepID: string;
    pendingTransaction: PendingTransaction;
    isEnabled: boolean;
    stakeKey: string;
    buildSignSubmitConwayCertTx: ({ certBuilder, resourceId, type, voter, }: BuildSignSubmitConwayCertTxArgs) => Promise<string>;
    buildDRepRegCert: (url?: string, hash?: string) => Promise<Certificate>;
    buildVoteDelegationCert: (vote: string) => Promise<CertificatesBuilder>;
    buildDRepUpdateCert: (url?: string, hash?: string) => Promise<Certificate>;
    buildDRepRetirementCert: (voterDeposit: string) => Promise<Certificate>;
    isPendingTransaction: () => boolean;
};
type EpochParams = {
    drep_deposit: number;
};
type PillarContextType = Required<Omit<PillarProviderProps, 'walletApi'>> & WalletApi;
export type PillarProviderProps = {
    walletApi: WalletApi | null;
    enable: (name: string) => Promise<{
        status: string;
        stakeKey?: boolean;
        error?: string;
    }>;
    isEnableLoading: string | null;
    apiUrl?: string;
    validationApiUrl?: string;
    cExplorerBaseUrl?: string;
    epochParams: EpochParams;
    connectWallet: () => void;
    openFeedbackWindow: () => void;
    addSuccessAlert: (message: string) => void;
    addErrorAlert: (message: string) => void;
    validateMetadata: (url: string, hash: string) => void;
    generateMetadata: () => void;
    createJsonLD: (data: unknown) => string;
    createHash: (json: unknown) => string;
    routePath?: string;
};
export declare const PillarProvider: FC<PillarProviderProps & PropsWithChildren>;
export declare const usePillarContext: () => PillarContextType;
export {};
