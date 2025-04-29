import { ChangeEvent } from 'react';
import { CheckboxProps as MUICheckboxProps } from '@mui/material';
export type CheckboxProps = Omit<MUICheckboxProps, 'onChange' | 'value'> & {
    dataTestId?: string;
    errorMessage?: string;
    onChange: (newValue: ChangeEvent<Element> | boolean) => void;
    value: boolean;
};
export declare const Checkbox: ({ dataTestId, errorMessage, sx, ...props }: CheckboxProps) => import("react/jsx-runtime").JSX.Element;
