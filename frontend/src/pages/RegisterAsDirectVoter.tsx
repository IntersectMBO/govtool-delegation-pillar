import { CircularProgress } from '@mui/material';

import { useGetVoterInfo, useTranslation } from '@/hooks';
import {
  RegisterAsDirectVoter,
  TransactionBox,
  WrongRouteInfo,
} from '@/features';

export const RegisterAsDirectVoterPage = () => {
  const { t } = useTranslation();
  const { voter } = useGetVoterInfo();

  if (!voter)
    return (
      <TransactionBox hideBox>
        <CircularProgress />
      </TransactionBox>
    );

  if (voter?.isRegisteredAsSoleVoter)
    return (
      <TransactionBox>
        <WrongRouteInfo
          title={t(`directVoter.alreadyRegistered.title`)}
          description={t(`directVoter.alreadyRegistered.description`)}
        />
      </TransactionBox>
    );

  return (
    <TransactionBox>
      <RegisterAsDirectVoter />
    </TransactionBox>
  );
};
