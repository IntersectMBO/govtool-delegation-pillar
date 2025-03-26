import { TextAreaFieldProps } from '../field';
import { ControlledFieldProps } from './types';
type ControlledTextAreaProps = ControlledFieldProps & TextAreaFieldProps;
export declare const TextArea: ({ control, name, errors, rules, ...props }: ControlledTextAreaProps) => import("react/jsx-runtime").JSX.Element;
export {};
