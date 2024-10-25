import axios from 'axios';
import type { VoterInfo } from 'types';

export const getVoterInfo = async ({
  apiUrl,
  dRepID,
}: {
  apiUrl: string;
  dRepID: string;
}) => {
  const response = await axios.get<VoterInfo>(`${apiUrl}/drep/info/${dRepID}`);

  return response.data;
};
