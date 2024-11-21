import { WalletApi } from 'context';
type AutomatedVotingOptionsProps = {
    currentDelegation?: string | null;
    delegate: (delegateTo: string) => void;
    votingPower: string;
    delegationInProgress?: string;
    isDelegationLoading?: string | null;
    pendingTransaction?: WalletApi['pendingTransaction'];
    txHash?: string | null;
};
export declare const AutomatedVotingOptions: ({ currentDelegation, delegate, delegationInProgress, isDelegationLoading, pendingTransaction, votingPower, txHash, }: AutomatedVotingOptionsProps) => import("react/jsx-runtime").JSX.Element;
export {};
