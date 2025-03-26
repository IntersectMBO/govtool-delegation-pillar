import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { PropsWithChildren } from 'react';
type CardProps = PropsWithChildren & {
    border?: boolean;
    elevation?: number;
    dataTestId?: string;
    label?: string;
    labelDataTestId?: string;
    sx?: SxProps<Theme>;
    variant?: 'default' | 'error' | 'primary' | 'success' | 'warning';
    onCardClick?: () => void;
};
export declare const Card: ({ variant, border, dataTestId, children, elevation, label, labelDataTestId, sx, onCardClick, }: CardProps) => import("react/jsx-runtime").JSX.Element;
export {};
