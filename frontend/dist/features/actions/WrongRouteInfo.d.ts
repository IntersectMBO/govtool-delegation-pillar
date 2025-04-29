type Props = {
    title?: string;
    description?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    onPrimaryButton?: () => void;
    onSecondaryButton?: () => void;
    hideSecondaryButton?: boolean;
};
export declare const WrongRouteInfo: ({ title, description, primaryButtonText, secondaryButtonText, hideSecondaryButton, onPrimaryButton, onSecondaryButton, }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
