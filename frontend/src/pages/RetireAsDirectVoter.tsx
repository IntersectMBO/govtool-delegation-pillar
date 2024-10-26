import { CircularProgress } from '@mui/material';

import { useGetVoterInfo, useTranslation } from 'hooks';
import { TransactionBox, WrongRouteInfo, RetireAsDirectVoter } from 'features';

export const RetireAsDirectVoterPage = () => {
  const { t } = useTranslation();
  const { voter } = useGetVoterInfo();

  if (!voter)
    return (
      <TransactionBox hideBox>
        <CircularProgress />
      </TransactionBox>
    );

  if (!voter.isRegisteredAsSoleVoter)
    return (
      <TransactionBox>
        <WrongRouteInfo
          title={t('directVoter.notDirectVoter.title')}
          description={t('directVoter.notDirectVoter.description')}
        />
      </TransactionBox>
    );

  return (
    <TransactionBox>
      <RetireAsDirectVoter />
    </TransactionBox>
  );
};
