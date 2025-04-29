interface Props {
    actionButtonText?: string;
    actionButtonDataTestId?: string;
    onActionButton: () => void;
    isLoadingActionButton?: boolean;
    disableActionButton?: boolean;
    backButtonText?: string;
    onBackButton?: () => void;
}
export declare const TransactionStepButtons: ({ actionButtonText, actionButtonDataTestId, backButtonText, isLoadingActionButton, disableActionButton, onBackButton, onActionButton, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
