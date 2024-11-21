import type { BoxProps } from '@mui/material';
import { CheckboxProps } from '../input';
import { TypographyProps } from '../Typography';
export type CheckboxFieldProps = CheckboxProps & {
    errorMessage?: string;
    errorStyles?: TypographyProps;
    helpfulText?: string;
    helpfulTextStyle?: TypographyProps;
    label?: string;
    labelStyles?: TypographyProps;
    layoutStyles?: BoxProps;
};
export declare const Checkbox: ({ errorMessage, errorStyles, helpfulText, helpfulTextStyle, label, labelStyles, layoutStyles, onChange, value, ...rest }: CheckboxFieldProps) => import("react/jsx-runtime").JSX.Element;
