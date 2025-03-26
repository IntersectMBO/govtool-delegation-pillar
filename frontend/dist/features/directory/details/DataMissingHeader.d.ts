import { SxProps } from '@mui/material';
import { MetadataValidationStatus } from '../../../types';
type DataMissingHeaderProps = {
    isDataMissing: MetadataValidationStatus | null;
    shareLink?: string;
    title?: string;
    titleStyle?: SxProps;
};
export declare const DataMissingHeader: ({ title, isDataMissing, shareLink, titleStyle, }: DataMissingHeaderProps) => import("react/jsx-runtime").JSX.Element;
export {};
