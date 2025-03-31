import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { DRepDataFormValues } from '../../../../types';
type ReferencesSectionProps = {
    type: 'link' | 'identity';
    control: Control<DRepDataFormValues>;
    errors: FieldErrors<DRepDataFormValues>;
    register: UseFormRegister<DRepDataFormValues>;
};
export declare const ReferencesSection: ({ type, control, errors, register, }: ReferencesSectionProps) => import("react/jsx-runtime").JSX.Element;
export {};
