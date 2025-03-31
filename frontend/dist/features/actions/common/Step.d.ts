import { SxProps } from '@mui/material';
export type StepProps = {
    label: string;
    stepNumber: number | string;
    component?: React.ReactNode;
    componentsLayoutStyles?: SxProps;
    layoutStyles?: SxProps;
};
export declare const Step: ({ component, componentsLayoutStyles, label, layoutStyles, stepNumber, }: StepProps) => import("react/jsx-runtime").JSX.Element;
