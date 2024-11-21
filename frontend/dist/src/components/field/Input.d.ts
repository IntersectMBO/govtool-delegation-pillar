/// <reference types="react" />
import type { BoxProps } from '@mui/material';
import { InputProps } from '../input';
import { TypographyProps } from '../Typography';
export type InputFieldProps = InputProps & {
    errorDataTestId?: string;
    errorMessage?: string;
    errorStyles?: TypographyProps;
    helpfulTextDataTestId?: string;
    helpfulText?: string;
    helpfulTextStyle?: TypographyProps;
    label?: string;
    labelStyles?: TypographyProps;
    layoutStyles?: BoxProps;
};
export declare const Input: import("react").ForwardRefExoticComponent<Omit<InputFieldProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
