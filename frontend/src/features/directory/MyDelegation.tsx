import { FC } from 'react';
import { Trans } from 'react-i18next';

import { usePillarContext } from '@/context';
import { useGetAdaHolderVotingPowerQuery } from '@/hooks';
import { correctAdaFormat, isSameDRep } from '@/utils';
import { DRepData } from '@/types';
import { Typography } from '@/components';
import { DRepCard } from './list/DRepCard';

interface Props {
  dRep: DRepData | null | undefined;
  inProgress?: boolean;
}

export const MyDelegation: FC<Props> = ({ dRep, inProgress }) => {
  const {
    dRepID: myDRepId,
    pendingTransaction,
    stakeKey,
    isEnabled: isConnected,
  } = usePillarContext();

  const inProgressDelegation = pendingTransaction.delegate?.resourceId;

  const { votingPower } = useGetAdaHolderVotingPowerQuery(stakeKey);
  const ada = correctAdaFormat(votingPower);

  if (!dRep) return null;

  if (inProgress)
    return (
      <DRepCard
        dRep={dRep}
        isConnected={isConnected}
        isMe={isSameDRep(dRep, myDRepId)}
        isInProgress
      />
    );

  return (
    <div>
      <Typography variant="title2" sx={{ mb: 2 }}>
        <Trans i18nKey="dRepDirectory.myDelegation" values={{ ada }} />
      </Typography>
      <DRepCard
        dRep={dRep}
        isConnected={isConnected}
        isInProgress={isSameDRep(dRep, inProgressDelegation)}
        isMe={isSameDRep(dRep, myDRepId)}
      />
    </div>
  );
};
