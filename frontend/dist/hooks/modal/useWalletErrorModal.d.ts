type WalletErrorModalProps = {
    error: unknown;
    onSumbit?: () => void;
    title?: string;
    buttonText?: string;
    dataTestId?: string;
};
export declare const useWalletErrorModal: () => ({ error, onSumbit, title, buttonText, dataTestId, }: WalletErrorModalProps) => void;
export {};
