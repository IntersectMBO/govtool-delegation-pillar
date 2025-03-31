import axios from 'axios';
import { CurrentDelegation } from '@/types';
import { fixViewForScriptBasedDRep } from '@/utils';

export const getAdaHolderCurrentDelegation = async ({
  apiUrl,
  stakeKey,
}: {
  apiUrl: string;
  stakeKey?: string;
}) => {
  const response = await axios.get<CurrentDelegation>(
    `${apiUrl}/ada-holder/get-current-delegation/${stakeKey}`
  );

  if (!response.data) return response.data;

  // DBSync contains wrong representation of DRep view for script based DReps
  const view =
    response.data.dRepView &&
    fixViewForScriptBasedDRep(
      response.data.dRepView,
      response.data.isDRepScriptBased
    );

  return {
    ...response.data,
    dRepView: view,
  };
};
