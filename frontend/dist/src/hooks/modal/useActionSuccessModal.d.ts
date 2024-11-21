type Props = {
    action: 'registration' | 'retirement';
    link?: string;
};
export declare const useActionSuccessModal: () => ({ action, link }: Props) => void;
export {};
