import { MetadataValidationDTO, ValidateMetadataResult } from '../../../types';
export declare const postValidate: <MetadataType>(url: string, body: MetadataValidationDTO) => Promise<ValidateMetadataResult<MetadataType>>;
