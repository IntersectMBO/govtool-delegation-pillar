import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { PATHS } from 'consts';
import { usePillarContext, useModal } from 'context';
import { useTranslation, useGetVoterInfo, useGetDRepDetailsQuery } from 'hooks';
import { TransactionBox, WrongRouteInfo, RegisterAsdRep } from 'features';

export const RegisterAsdRepPage = () => {
  const { dRepID } = usePillarContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { closeModal, openModal } = useModal();
  const { voter } = useGetVoterInfo();
  const { dRep } = useGetDRepDetailsQuery(dRepID);

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
        dataTestId: 'cancel-registration-modal',
        onSubmit: backToDashboard,
      },
    });

  if (!voter)
    return (
      <TransactionBox hideBox>
        <CircularProgress />
      </TransactionBox>
    );

  if (voter.isRegisteredAsDRep)
    return (
      <TransactionBox>
        <WrongRouteInfo
          title={t(`registration.alreadyRegistered.title`)}
          description={t(`registration.alreadyRegistered.description`)}
          primaryButtonText={t('registration.alreadyRegistered.viewDetails')}
          onPrimaryButton={() =>
            dRep &&
            navigate(PATHS.dRepDetails.replace(':dRepId', dRep.view), {
              state: { enteredFromWithinApp: true },
            })
          }
        />
      </TransactionBox>
    );

  return (
    <TransactionBox>
      <RegisterAsdRep onCancel={onClickBackToDashboard} />
    </TransactionBox>
  );
};
