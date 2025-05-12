import { PropsWithChildren } from 'react';
type DrepDetailsInfoItemProps = PropsWithChildren & {
    label: string;
    text?: string | null;
    dataTestId: string;
    isValidating?: boolean;
};
export declare const DRepDetailsInfoItem: ({ children, label, text, dataTestId, isValidating, }: DrepDetailsInfoItemProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
