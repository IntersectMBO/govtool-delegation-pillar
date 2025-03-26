import { PropsWithChildren } from 'react';
type DrepDetailsInfoItemProps = PropsWithChildren & {
    label: string;
    text?: string | null;
    dataTestId: string;
};
export declare const DRepDetailsInfoItem: ({ children, label, text, dataTestId, }: DrepDetailsInfoItemProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
