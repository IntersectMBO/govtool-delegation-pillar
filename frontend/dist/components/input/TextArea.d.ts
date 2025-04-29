import { TextareaAutosizeProps } from '@mui/material';
export type TextAreaProps = TextareaAutosizeProps & {
    errorMessage?: string;
    isModifiedLayout?: boolean;
};
export declare const TextArea: import('react').ForwardRefExoticComponent<Omit<TextAreaProps, "ref"> & import('react').RefAttributes<HTMLTextAreaElement>>;
