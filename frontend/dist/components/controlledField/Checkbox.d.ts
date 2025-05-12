import { CheckboxFieldProps } from '../field';
import { ControlledFieldProps } from './types';
export type ControlledCheckboxProps = ControlledFieldProps & Omit<CheckboxFieldProps, 'onChange' | 'value'>;
export declare const Checkbox: ({ control, name, errors, rules, ...props }: ControlledCheckboxProps) => import("react/jsx-runtime").JSX.Element;
