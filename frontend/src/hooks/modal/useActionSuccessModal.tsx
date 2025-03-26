import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/consts';
import { useModal, usePillarContext } from '@/context';

type Props = {
  action: 'registration' | 'retirement';
  link?: string;
};

export const useActionSuccessModal = () => {
  const { cExplorerBaseUrl } = usePillarContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const openActionSuccessModal = ({ action, link }: Props) => {
    openModal({
      type: 'statusModal',
      state: {
        status: 'success',
        title: t(`modals.${action}.title`),
        message: t(`modals.${action}.message`),
        link: link && `${cExplorerBaseUrl}/tx/${link}`,
        buttonText: t('modals.common.goToDashboard'),
        onSubmit: () => {
          navigate(PATHS.dashboard);
          closeModal();
        },
        dataTestId: `${action}-transaction-submitted-modal`,
      },
    });
  };

  return openActionSuccessModal;
};
