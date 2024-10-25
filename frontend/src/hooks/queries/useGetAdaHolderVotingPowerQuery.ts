import { useQuery } from 'react-query';

import { getAdaHolderVotingPower } from 'services';
import { QUERY_KEYS } from 'consts';
import { usePillarContext } from 'context';

const REFRESH_TIME = 20 * 1000;

export const useGetAdaHolderVotingPowerQuery = (stakeKey?: string) => {
  const { apiUrl } = usePillarContext();

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.getAdaHolderVotingPowerKey,
    queryFn: () => getAdaHolderVotingPower({ apiUrl, stakeKey }),
    enabled: !!stakeKey,
    refetchInterval: REFRESH_TIME,
  });

  return { votingPower: data, powerIsLoading: isLoading };
};
