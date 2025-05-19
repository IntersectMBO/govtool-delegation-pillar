import { DRepData, MetadataValidationStatus } from '../../../types';
type DRepDetailsProps = {
    dRepData: DRepData;
    isMe?: boolean;
    isMyDrep?: boolean;
    isValidating?: boolean;
    metadataStatus?: MetadataValidationStatus;
};
export declare const DRepDetailsCardHeader: ({ dRepData, isMe, isMyDrep, isValidating, metadataStatus, }: DRepDetailsProps) => import("react/jsx-runtime").JSX.Element;
export {};
