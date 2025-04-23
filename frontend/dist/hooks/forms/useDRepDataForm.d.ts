import { DRepDataFormValues } from '../../types';
export declare const defaultDRepDataFormValues: DRepDataFormValues;
export declare const useDRepDataForm: ({ type, onCancel, }: {
    type: 'register' | 'edit';
    onCancel?: (() => void) | undefined;
}) => {
    control: import('react-hook-form').Control<DRepDataFormValues, any, DRepDataFormValues>;
    errors: import('react-hook-form').FieldErrors<DRepDataFormValues>;
    generateMetadata: () => void;
    getValues: import('react-hook-form').UseFormGetValues<DRepDataFormValues>;
    isError: boolean;
    isSubmitting: boolean;
    isValid: boolean;
    onClickDownloadJson: () => Promise<void>;
    register: import('react-hook-form').UseFormRegister<DRepDataFormValues>;
    onSubmit: (e?: import('react').BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    watch: import('react-hook-form').UseFormWatch<DRepDataFormValues>;
    reset: import('react-hook-form').UseFormReset<DRepDataFormValues>;
};
