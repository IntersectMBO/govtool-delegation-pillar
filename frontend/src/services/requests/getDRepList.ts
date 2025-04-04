import axios from 'axios';
import { bech32 } from 'bech32';

import {
  type Infinite,
  type DRepStatus,
  type DRepListSort,
  DRepData,
  DrepDataDTO,
} from '@/types';

import { mapDtoToDrep } from '@/utils';

export type GetDRepListArguments = {
  filters?: string[];
  page?: number;
  pageSize?: number;
  sorting?: DRepListSort;
  status?: DRepStatus[];
  searchPhrase?: string;
};

export const getDRepList = async ({
  apiUrl,
  validationApiUrl,
  sorting,
  filters = [],
  page = 0,
  pageSize = 10,
  searchPhrase: rawSearchPhrase = '',
  status = [],
}: GetDRepListArguments & {
  apiUrl: string;
  validationApiUrl: string;
}): Promise<Infinite<DRepData>> => {
  // DBSync contains wrong representation of DRep view for script based DReps,
  // but it's still used by BE
  const searchPhrase = (() => {
    if (rawSearchPhrase.startsWith('drep_script')) {
      const { words } = bech32.decode(rawSearchPhrase);
      return bech32.encode('drep', words);
    }
    return rawSearchPhrase;
  })();

  const response = await axios.post<Infinite<DrepDataDTO>>(
    `${apiUrl}/drep/list`,
    {
      page,
      pageSize,
      ...(searchPhrase && { search: searchPhrase }),
      ...(filters.length && { type: filters }),
      ...(sorting && { sort: sorting }),
      ...(status.length && { status }),
    }
  );

  const validatedResponse = {
    ...response.data,
    elements: await Promise.all(
      response.data.elements.map(async (drep) =>
        mapDtoToDrep(validationApiUrl, drep)
      )
    ),
  };

  return validatedResponse;
};
