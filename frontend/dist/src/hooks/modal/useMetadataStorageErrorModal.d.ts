import { useTranslation } from 'react-i18next';
import { ModalState } from 'context';
import { MetadataValidationStatus } from 'types';
type Props = {
    error: MetadataValidationStatus;
    onContinueAction: () => void;
};
export declare enum MetadataHashValidationErrors {
    INVALID_URL = "Invalid URL",
    INVALID_JSON = "Invalid JSON",
    INVALID_HASH = "Invalid hash",
    FETCH_ERROR = "Error fetching data"
}
export declare const useMetadataStorageErrorModal: () => ({ error, onContinueAction }: Props) => Promise<void>;
declare const externalDataDoesntMatchModal: (t: ReturnType<typeof useTranslation>['t']) => {
    readonly status: "warning";
    readonly title: string;
    readonly message: string;
    readonly buttonText: string;
    readonly cancelText: string;
    readonly feedbackText: string;
};
declare const urlCannotBeFound: (t: ReturnType<typeof useTranslation>['t']) => {
    title: string;
    message: string;
    link: string;
    linkText: string;
    buttonText: string;
    cancelText: string;
    feedbackText: string;
};
export declare const storageInformationErrorModals: Record<MetadataValidationStatus, ModalState<typeof externalDataDoesntMatchModal | typeof urlCannotBeFound>['state']>;
export {};
