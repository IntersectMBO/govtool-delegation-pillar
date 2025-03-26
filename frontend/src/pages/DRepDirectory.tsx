import { FC } from 'react';
import { Box } from '@mui/material';

import { AutomatedVotingOptions, MyDelegation, DRepList } from '@/features';
import { usePillarContext } from '@/context';
import {
  useDelegateTodRep,
  useGetAdaHolderCurrentDelegationQuery,
  useGetAdaHolderVotingPowerQuery,
  useGetDRepDetailsQuery,
} from '@/hooks';
import { correctAdaFormat } from '@/utils';
import { CircularLoader } from '@/components';

export const DRepDirectoryPage: FC = () => {
  const {
    pendingTransaction,
    stakeKey,
    isEnabled: isConnected,
  } = usePillarContext();

  const { delegate, isDelegating } = useDelegateTodRep();

  const { votingPower } = useGetAdaHolderVotingPowerQuery(stakeKey);
  const { currentDelegation } = useGetAdaHolderCurrentDelegationQuery(stakeKey);
  const inProgressDelegation = pendingTransaction.delegate?.resourceId;

  const { dRep: myDrep } = useGetDRepDetailsQuery(currentDelegation?.dRepView, {
    enabled: !!inProgressDelegation || !!currentDelegation,
  });

  if (
    (stakeKey && votingPower === undefined) ||
    (isConnected && currentDelegation === undefined)
  ) {
    return <CircularLoader />;
  }

  const ada = correctAdaFormat(votingPower);

  return (
    <Box display="flex" flex={1} flexDirection="column" gap={4}>
      <MyDelegation dRep={myDrep} />

      {isConnected && (
        <AutomatedVotingOptions
          currentDelegation={
            !pendingTransaction.delegate
              ? currentDelegation?.dRepView
              : undefined
          }
          delegate={delegate}
          delegationInProgress={inProgressDelegation}
          isDelegationLoading={isDelegating}
          votingPower={ada.toString()}
          pendingTransaction={pendingTransaction}
          txHash={
            !pendingTransaction.delegate ? currentDelegation?.txHash : undefined
          }
        />
      )}

      <DRepList />
    </Box>
  );
};
