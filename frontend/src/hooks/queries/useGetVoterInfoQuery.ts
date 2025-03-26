import { UseQueryOptions, useQuery } from 'react-query';

import { QUERY_KEYS } from '@/consts';
import { usePillarContext } from '@/context';
import { getVoterInfo } from '@/services';

export const useGetVoterInfo = (options?: UseQueryOptions) => {
  const { apiUrl, dRepID, pendingTransaction } = usePillarContext();
  const { data } = useQuery({
    queryKey: [
      QUERY_KEYS.useGetDRepInfoKey,
      (
        pendingTransaction?.registerAsDrep ||
        pendingTransaction?.registerAsDirectVoter ||
        pendingTransaction?.retireAsDrep ||
        pendingTransaction?.retireAsDirectVoter
      )?.transactionHash,
    ],
    enabled: !!dRepID && options?.enabled,
    queryFn: () => getVoterInfo({ apiUrl, dRepID }),
  });

  return { voter: data };
};
