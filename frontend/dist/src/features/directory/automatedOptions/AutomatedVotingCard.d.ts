export type AutomatedVotingCardProps = {
    description: string;
    dataTestId?: string;
    infoUrl: string;
    inProgress?: boolean;
    isSelected?: boolean;
    onClickDelegate: () => void;
    title: string;
    votingPower: string | number;
    isDelegateLoading?: boolean;
    transactionId?: string | null;
};
export declare const AutomatedVotingCard: ({ dataTestId, description, infoUrl, inProgress, isDelegateLoading, isSelected, onClickDelegate, title, transactionId, votingPower, }: AutomatedVotingCardProps) => import("react/jsx-runtime").JSX.Element;
