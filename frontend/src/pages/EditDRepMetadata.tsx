import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { PATHS } from 'consts';
import { useModal } from 'context';
import { useTranslation, useGetVoterInfo } from 'hooks';
import { TransactionBox, EditDRepMetadata } from 'features';

export const EditDRepMetadataPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { closeModal, openModal } = useModal();
  const { state } = useLocation();
  const { voter } = useGetVoterInfo({ enabled: !state });

  const backToDashboard = () => {
    navigate(PATHS.dashboard);
    closeModal();
  };

  const onClickBackToDashboard = () =>
    openModal({
      type: 'statusModal',
      state: {
        status: 'warning',
        message: t('modals.registration.cancelDescription'),
        buttonText: t('modals.common.goToDashboard'),
        title: t('modals.registration.cancelTitle'),
        dataTestId: 'cancel-edit-drep-info-modal',
        onSubmit: backToDashboard,
      },
    });

  useEffect(() => {
    if (voter && !voter?.isRegisteredAsDRep) navigate(PATHS.dashboard);
  }, [voter]);

  return (
    <TransactionBox>
      {!voter || !voter.isRegisteredAsDRep ? (
        <CircularProgress />
      ) : (
        <EditDRepMetadata onCancel={onClickBackToDashboard} />
      )}
    </TransactionBox>
  );
};
