import { PATHS } from 'consts';
import { useModal } from 'context';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type WalletErrorModalProps = {
  error: unknown;
  onSumbit?: () => void;
  title?: string;
  buttonText?: string;
  dataTestId?: string;
};

export const useWalletErrorModal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const openWalletErrorModal = ({
    error,
    onSumbit,
    title,
    buttonText,
    dataTestId,
  }: WalletErrorModalProps) => {
    const errorMessage =
      error && typeof error === 'object' && 'info' in error
        ? error.info
        : error;

    openModal({
      type: 'statusModal',
      state: {
        status: 'warning',
        title: title ?? t('modals.common.oops'),
        message: errorMessage,
        buttonText: buttonText ?? t('modals.common.goToDashboard'),
        onSubmit: () => {
          if (onSumbit) onSumbit();
          else navigate(PATHS.dashboard);
          closeModal();
        },
        dataTestId: dataTestId ?? 'wallet-error-modal',
      },
    });
  };

  return openWalletErrorModal;
};
