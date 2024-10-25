import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { PATHS } from 'consts';
import { usePillarContext } from 'context';
import { useGetVoterInfo, useTranslation } from 'hooks';
import {
  RegisterAsDirectVoter,
  TransactionBox,
  WrongRouteInfo,
} from 'features';

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
