import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
type RadioProps = {
    isChecked: boolean;
    name: string;
    title: string;
    value: string;
    setValue: UseFormSetValue<any>;
    register: UseFormRegister<any>;
    dataTestId?: string;
    disabled?: boolean;
};
export declare const Radio: ({ ...props }: RadioProps) => import("react/jsx-runtime").JSX.Element;
export {};
