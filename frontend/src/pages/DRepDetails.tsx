import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { usePillarContext } from 'context';
import {
  useGetAdaHolderCurrentDelegationQuery,
  useGetDRepDetailsQuery,
} from 'hooks';
import { isSameDRep } from 'utils';
import { CircularLoader } from 'components';
import { EmptyStateDrepDirectory, DRepDetailsCard } from 'features';

export const DRepDetailsPage = () => {
  const { dRepID: myDRepId, pendingTransaction, stakeKey } = usePillarContext();
  const { dRepId: dRepParam } = useParams();
  const { currentDelegation } = useGetAdaHolderCurrentDelegationQuery(stakeKey);

  const { dRep, isLoading } = useGetDRepDetailsQuery(dRepParam);

  if (isLoading) return <CircularLoader />;

  if (!dRep)
    return (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <EmptyStateDrepDirectory />
      </Box>
    );

  return (
    <DRepDetailsCard
      dRepData={dRep}
      isMe={isSameDRep(dRep, myDRepId)}
      isMyDrep={isSameDRep(dRep, currentDelegation?.dRepView)}
      isMyDrepInProgress={isSameDRep(
        dRep,
        pendingTransaction.delegate?.resourceId
      )}
    />
  );
};
