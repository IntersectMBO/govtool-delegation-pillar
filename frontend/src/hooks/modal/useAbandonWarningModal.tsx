import { PATHS } from 'consts';
import { useModal } from 'context';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const useAbandonWarningModal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const openAbandonWarningModal = () => {
    openModal({
      type: 'statusModal',
      state: {
        status: 'warning',
        message: t('modals.registration.cancelDescription'),
        buttonText: t('modals.common.goToDashboard'),
        title: t('modals.registration.cancelTitle'),
        onSubmit: () => {
          navigate(PATHS.dashboard);
          closeModal();
        },
        dataTestId: 'cancel-registration-modal',
      },
    });
  };

  return openAbandonWarningModal;
};
