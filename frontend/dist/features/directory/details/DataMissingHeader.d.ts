import { SxProps } from '@mui/material';
import { MetadataValidationStatus } from '../../../types';
type DataMissingHeaderProps = {
    isDataMissing?: MetadataValidationStatus;
    title?: string;
    titleStyle?: SxProps;
    isDRep?: boolean;
    isValidating?: boolean;
    image?: string | null;
    shareLink?: string;
};
export declare const DataMissingHeader: ({ title, isDataMissing, titleStyle, isValidating, isDRep, image, shareLink, }: DataMissingHeaderProps) => import("react/jsx-runtime").JSX.Element;
export {};
