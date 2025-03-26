import { InputFieldProps } from '../field';
import { ControlledFieldProps } from './types';
type ControlledInputProps = ControlledFieldProps & InputFieldProps;
export declare const Input: import('react').ForwardRefExoticComponent<Omit<ControlledInputProps, "ref"> & import('react').RefAttributes<HTMLInputElement>>;
export {};
