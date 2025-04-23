import { CircularProgress } from '@mui/material';

import { PATHS } from '@/consts';
import { usePillarContext } from '@/context';
import {
  useTranslation,
  useGetVoterInfo,
  useGetDRepDetailsQuery,
  useAbandonWarningModal,
} from '@/hooks';
import { TransactionBox, WrongRouteInfo, RegisterAsdRep } from '@/features';

export const RegisterAsdRepPage = () => {
  const { dRepID, useRouter } = usePillarContext();
  const { t } = useTranslation();
  const { voter } = useGetVoterInfo();
  const { dRep } = useGetDRepDetailsQuery(dRepID);
  const openAbandonWarningModal = useAbandonWarningModal();

  const router = useRouter();

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
          onPrimaryButton={() => {
            if (!dRep) return;

            router.push(
              `../${PATHS.dRepDetails}`.replace(':dRepId', dRep.view)
            );
          }}
        />
      </TransactionBox>
    );

  return (
    <TransactionBox>
      <RegisterAsdRep onCancel={openAbandonWarningModal} />
    </TransactionBox>
  );
};
