import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ModalState, useModal } from 'context';
import { MetadataValidationStatus } from 'types';
import { DOCS, PATHS } from 'consts';

type Props = {
  error: MetadataValidationStatus;
  onContinueAction: () => void;
};

export enum MetadataHashValidationErrors {
  INVALID_URL = 'Invalid URL',
  INVALID_JSON = 'Invalid JSON',
  INVALID_HASH = 'Invalid hash',
  FETCH_ERROR = 'Error fetching data',
}

export const useMetadataStorageErrorModal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { closeModal, openModal } = useModal();

  const openMetadataStorageErrorModal = useCallback(
    async ({ error, onContinueAction }: Props) => {
      const getModalState =
        storageInformationErrorModals[error as MetadataValidationStatus];

      openModal({
        type: 'statusModal',
        state: {
          status: 'warning',
          ...(getModalState && getModalState(t)),
          onSubmit: onContinueAction,
          onCancel: () => {
            navigate(PATHS.dashboard);
            closeModal();
          },
        },
      });
    },
    []
  );

  return openMetadataStorageErrorModal;
};

const externalDataDoesntMatchModal = (
  t: ReturnType<typeof useTranslation>['t']
) =>
  ({
    status: 'warning',
    title: t('modals.externalDataDoesntMatch.title'),
    message: t('modals.externalDataDoesntMatch.message'),
    buttonText: t('modals.externalDataDoesntMatch.buttonText'),
    cancelText: t('modals.externalDataDoesntMatch.cancelRegistrationText'),
    feedbackText: t('modals.externalDataDoesntMatch.feedbackText'),
  }) as const;

const urlCannotBeFound = (t: ReturnType<typeof useTranslation>['t']) => ({
  title: t('modals.urlCannotBeFound.title'),
  message: t('modals.urlCannotBeFound.message'),
  link: DOCS.dRepErrors,
  linkText: t('modals.urlCannotBeFound.linkText'),
  buttonText: t('modals.urlCannotBeFound.buttonText'),
  cancelText: t('modals.urlCannotBeFound.cancelRegistrationText'),
  feedbackText: t('modals.urlCannotBeFound.feedbackText'),
});

export const storageInformationErrorModals: Record<
  MetadataValidationStatus,
  ModalState<
    typeof externalDataDoesntMatchModal | typeof urlCannotBeFound
  >['state']
> = {
  [MetadataValidationStatus.URL_NOT_FOUND]: urlCannotBeFound,
  [MetadataValidationStatus.INCORRECT_FORMAT]: externalDataDoesntMatchModal,
  [MetadataValidationStatus.INVALID_JSONLD]: externalDataDoesntMatchModal,
  [MetadataValidationStatus.INVALID_HASH]: externalDataDoesntMatchModal,
};
