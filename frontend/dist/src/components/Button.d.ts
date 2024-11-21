import type { ButtonProps as MUIButtonProps } from '@mui/material';
export type ButtonProps = Omit<MUIButtonProps, 'size'> & {
    isLoading?: boolean;
    size?: 'small' | 'medium' | 'large' | 'extraLarge';
    dataTestId?: string;
    target?: string;
};
export declare const Button: ({ size, variant, sx, isLoading, ...props }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
