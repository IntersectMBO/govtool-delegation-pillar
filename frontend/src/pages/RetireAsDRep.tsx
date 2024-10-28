import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { PATHS } from 'consts';
import { useGetVoterInfo, useTranslation } from 'hooks';
import { WrongRouteInfo, TransactionBox, RetireAsDRep } from 'features';

export const RetireAsDRepPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { voter } = useGetVoterInfo();

  const onClickBackToDashboard = () => navigate(PATHS.dashboard);

  if (!voter)
    return (
      <TransactionBox hideBox>
        <CircularProgress />
      </TransactionBox>
    );

  return (
    <TransactionBox>
      {!voter.isRegisteredAsDRep ? (
        <WrongRouteInfo
          title={t('retirement.notADRep.title')}
          description={t('retirement.notADRep.description')}
        />
      ) : (
        <RetireAsDRep onClickCancel={onClickBackToDashboard} />
      )}
    </TransactionBox>
  );
};
