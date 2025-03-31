import type { MetadataValidationDTO, ValidateMetadataResult } from '@/types';
import axios from 'axios';

const TIMEOUT_IN_SECONDS = 30 * 1000; // 1000 ms is 1 s then its 30 s

const METADATA_API = axios.create({
  timeout: TIMEOUT_IN_SECONDS,
});

export const postValidate = async <MetadataType>(
  url: string,
  body: MetadataValidationDTO
) => {
  const response = await METADATA_API.post<
    ValidateMetadataResult<MetadataType>
  >(`${url}/validate`, body);

  return response.data;
};
