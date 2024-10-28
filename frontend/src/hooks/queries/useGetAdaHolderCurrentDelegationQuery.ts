import { useQuery } from 'react-query';

import { getAdaHolderCurrentDelegation } from 'services';
import { QUERY_KEYS } from 'consts';
import { usePillarContext } from 'context';

export const useGetAdaHolderCurrentDelegationQuery = (
  stakeKey: string | undefined
) => {
  const { apiUrl, pendingTransaction } = usePillarContext();

  const { data, isLoading } = useQuery({
    queryKey: [
      QUERY_KEYS.getAdaHolderCurrentDelegationKey,
      pendingTransaction.delegate?.transactionHash,
    ],
    queryFn: () => getAdaHolderCurrentDelegation({ apiUrl, stakeKey }),
    enabled: !!stakeKey,
  });

  return { currentDelegation: data, isCurrentDelegationLoading: isLoading };
};
