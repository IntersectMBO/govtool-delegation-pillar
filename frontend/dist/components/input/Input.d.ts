import { InputBaseProps } from '@mui/material';
export type InputProps = InputBaseProps & {
    dataTestId?: string;
    errorMessage?: string;
};
export declare const Input: import('react').ForwardRefExoticComponent<Omit<InputProps, "ref"> & import('react').RefAttributes<HTMLInputElement>>;
