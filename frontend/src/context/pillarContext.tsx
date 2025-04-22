import {
  createContext,
  FC,
  useMemo,
  useContext,
  PropsWithChildren,
} from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import {
  PendingTransaction,
  TransactionStateWithResource,
  TransactionStateWithoutResource,
  VoterInfo,
} from '@/types';
import { DataActionsBarProvider } from './dataActionsBar';

type BuildSignSubmitConwayCertTxArgs = {
  certBuilder?: unknown;
  voter?: VoterInfo;
} & (
  | Pick<TransactionStateWithoutResource, 'type' | 'resourceId'>
  | Pick<TransactionStateWithResource, 'type' | 'resourceId'>
);

export type WalletApi = {
  dRepID: string;
  pendingTransaction: PendingTransaction;
  isEnabled: boolean;
  stakeKey: string;
  buildSignSubmitConwayCertTx: ({
    certBuilder,
    resourceId,
    type,
    voter,
  }: BuildSignSubmitConwayCertTxArgs) => Promise<string>;
  // TODO: define types from '@emurgo/cardano-serialization-lib-asmjs'
  buildDRepRegCert: (url?: string, hash?: string) => Promise<any>;
  buildVoteDelegationCert: (vote: string) => Promise<any>;
  buildDRepUpdateCert: (url?: string, hash?: string) => Promise<any>;
  buildDRepRetirementCert: (voterDeposit: string) => Promise<any>;
  isPendingTransaction: () => boolean;
};

type EpochParams = {
  drep_deposit: number;
};

type PillarContextType = Required<Omit<PillarProviderProps, 'walletApi'>> &
  WalletApi;

const PillarContext = createContext<PillarContextType | undefined>(undefined);

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
  generatePath: (
    path: string,
    params?: Record<string, string | number>
  ) => string;
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

export const PillarProvider: FC<PillarProviderProps & PropsWithChildren> = ({
  children,
  apiUrl,
  walletApi,
  validationApiUrl,
  cExplorerBaseUrl,
  epochParams,
  connectWallet,
  openFeedbackWindow,
  addSuccessAlert,
  addErrorAlert,
  validateMetadata,
  generateMetadata,
  createJsonLD,
  createHash,
  routePath,
  enable,
  isEnableLoading,
  useLocation,
  useParams,
  generatePath,
  useRouter,
  getAddressFromBech32,
}) => {
  const contextValue = useMemo(
    (): PillarContextType => ({
      apiUrl: apiUrl ?? import.meta.env.API_URL ?? '',
      validationApiUrl:
        validationApiUrl ?? import.meta.env.VALIDATION_API_URL ?? '',
      epochParams,
      connectWallet,
      openFeedbackWindow,
      addSuccessAlert,
      addErrorAlert,
      validateMetadata,
      generateMetadata,
      createJsonLD,
      createHash,
      enable,
      isEnableLoading,
      useLocation,
      useParams,
      generatePath,
      useRouter,
      ...(walletApi || {
        dRepID: '',
        pendingTransaction: {
          delegate: null,
          registerAsDrep: null,
          retireAsDrep: null,
          registerAsDirectVoter: null,
          retireAsDirectVoter: null,
          updateMetaData: null,
        },
        isEnabled: false,
        stakeKey: '',
        buildSignSubmitConwayCertTx: async () => '',
        buildDRepRegCert: async () => ({}) as any,
        buildVoteDelegationCert: async () => ({}) as any,
        buildDRepUpdateCert: async () => ({}) as any,
        buildDRepRetirementCert: async () => ({}) as any,
        isPendingTransaction: () => false,
      }),
      cExplorerBaseUrl:
        cExplorerBaseUrl ?? import.meta.env.C_EXPLORER_BASE_URL ?? '',
      routePath: routePath ?? '',
      getAddressFromBech32,
    }),
    [
      apiUrl,
      validationApiUrl,
      walletApi,
      cExplorerBaseUrl,
      epochParams,
      connectWallet,
      openFeedbackWindow,
      addSuccessAlert,
      addErrorAlert,
      validateMetadata,
      generateMetadata,
      createJsonLD,
      createHash,
      enable,
      isEnableLoading,
      useLocation,
      useParams,
      generatePath,
      useRouter,
    ]
  );

  return (
    <PillarContext.Provider value={contextValue}>
      <QueryClientProvider client={new QueryClient()}>
        <DataActionsBarProvider>{children}</DataActionsBarProvider>
      </QueryClientProvider>
    </PillarContext.Provider>
  );
};

export const usePillarContext = (): PillarContextType => {
  const context = useContext(PillarContext);
  if (context === undefined) {
    throw new Error('usePillarContext must be used within a PillarProvider');
  }
  return context;
};
