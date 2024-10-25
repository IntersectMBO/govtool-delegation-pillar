import axios from 'axios';
import { NetworkMetrics } from 'types';

export const getNetworkMetrics = async (apiUrl: string) => {
  const response = await axios.get<NetworkMetrics>(`${apiUrl}/network/metrics`);

  return response.data;
};
