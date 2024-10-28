import axios from 'axios';

export const getAdaHolderVotingPower = async ({
  apiUrl,
  stakeKey,
}: {
  apiUrl: string;
  stakeKey?: string;
}) => {
  const response = await axios.get(
    `${apiUrl}/ada-holder/get-voting-power/${stakeKey}`
  );

  return response.data;
};
