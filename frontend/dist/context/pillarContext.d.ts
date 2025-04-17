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
    buildDRepRegCert: (url?: string, hash?: string) => Promise<any>;
    buildVoteDelegationCert: (vote: string) => Promise<any>;
    buildDRepUpdateCert: (url?: string, hash?: string) => Promise<any>;
    buildDRepRetirementCert: (voterDeposit: string) => Promise<any>;
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
    useLocation: () => {
        pathname: string;
        search: string;
        hash: string;
        state: any;
        key: any;
        readonly href: string;
    };
    useParams: (routePattern: any) => any;
    generatePath: (path: string, params?: Record<string, string | number>) => string;
    useRouter: () => {
        push: (href: any) => void;
        replace: (href: any) => void;
        prefetch: (href: any) => void;
        back: () => void;
        forward: () => void;
        refresh: () => void;
    };
    getAddressFromBech32: (address: string) => any;
};
export declare const PillarProvider: FC<PillarProviderProps & PropsWithChildren>;
export declare const usePillarContext: () => PillarContextType;
export {};
