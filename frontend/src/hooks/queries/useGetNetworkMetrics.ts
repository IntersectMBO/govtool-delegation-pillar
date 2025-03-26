import { useQuery } from 'react-query';

import { getNetworkMetrics } from '@/services';
import { QUERY_KEYS } from '@/consts';
import { usePillarContext } from '@/context';

export const useGetNetworkMetrics = () => {
  const { apiUrl } = usePillarContext();

  const { data: networkMetrics, refetch: fetchNetworkMetrics } = useQuery({
    queryKey: QUERY_KEYS.useGetNetworkMetricsKey,
    queryFn: () => getNetworkMetrics(apiUrl),
    enabled: false,
  });

  return { networkMetrics, fetchNetworkMetrics };
};
