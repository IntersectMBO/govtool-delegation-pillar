/// <reference types="react" />
import type { BoxProps } from '@mui/material';
import { TextAreaProps } from '../input';
import { TypographyProps } from '../Typography';
export type TextAreaFieldProps = TextAreaProps & {
    errorMessage?: string;
    errorStyles?: TypographyProps;
    helpfulText?: string;
    helpfulTextStyle?: TypographyProps;
    hideLabel?: boolean;
    label?: string;
    labelStyles?: TypographyProps;
    layoutStyles?: BoxProps;
};
export declare const TextArea: import("react").ForwardRefExoticComponent<Omit<TextAreaFieldProps, "ref"> & import("react").RefAttributes<HTMLTextAreaElement>>;
