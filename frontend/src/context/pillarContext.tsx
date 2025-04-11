import {
  Certificate,
  CertificatesBuilder,
} from '@emurgo/cardano-serialization-lib-asmjs';
import {
  createContext,
  FC,
  useMemo,
  useContext,
  PropsWithChildren,
} from 'react';

import {
  PendingTransaction,
  TransactionStateWithResource,
  TransactionStateWithoutResource,
  VoterInfo,
} from '@/types';

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
  buildDRepRegCert: (url?: string, hash?: string) => Promise<Certificate>;
  buildVoteDelegationCert: (vote: string) => Promise<CertificatesBuilder>;
  buildDRepUpdateCert: (url?: string, hash?: string) => Promise<Certificate>;
  buildDRepRetirementCert: (voterDeposit: string) => Promise<Certificate>;
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
        buildDRepRegCert: async () => ({}) as Certificate,
        buildVoteDelegationCert: async () => ({}) as CertificatesBuilder,
        buildDRepUpdateCert: async () => ({}) as Certificate,
        buildDRepRetirementCert: async () => ({}) as Certificate,
        isPendingTransaction: () => false,
      }),
      cExplorerBaseUrl:
        cExplorerBaseUrl ?? import.meta.env.C_EXPLORER_BASE_URL ?? '',
      routePath: routePath ?? '',
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
    ]
  );

  return (
    <PillarContext.Provider value={contextValue}>
      {children}
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
