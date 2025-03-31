import { MetadataValidationStatus } from '@/types';

/**
 * Retrieves the label for the given metadata validation status.
 *
 * @param status - The metadata validation status.
 * @returns The string corresponding to the status.
 */
export const getMetadataDataMissingStatusTranslation = (
  status: MetadataValidationStatus
): string => {
  const errorLabel = {
    [MetadataValidationStatus.URL_NOT_FOUND]: 'Data Missing',
    [MetadataValidationStatus.INVALID_JSONLD]: 'Data Formatted Incorrectly',
    [MetadataValidationStatus.INCORRECT_FORMAT]: 'Data Formatted Incorrectly',
    [MetadataValidationStatus.INVALID_HASH]: 'Data Not Verifiable',
  }[status];

  return errorLabel || 'Data missing';
};
