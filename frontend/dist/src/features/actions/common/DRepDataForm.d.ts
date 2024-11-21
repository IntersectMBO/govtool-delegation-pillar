import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { DRepDataFormValues } from 'types';
type Props = {
    control: Control<DRepDataFormValues>;
    errors: FieldErrors<DRepDataFormValues>;
    register: UseFormRegister<DRepDataFormValues>;
};
export declare const DRepDataForm: ({ control, errors, register }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
