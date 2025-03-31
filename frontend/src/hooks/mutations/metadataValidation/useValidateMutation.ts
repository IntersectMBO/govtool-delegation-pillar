import { useMutation } from 'react-query';

import { postValidate } from '@/services';
import { MUTATION_KEYS } from '@/consts';
import { MetadataValidationDTO } from '@/types';
import { usePillarContext } from '@/context';

export const useValidateMutation = <MetadataType>() => {
  const { validationApiUrl } = usePillarContext();
  const { data, isLoading, mutateAsync } = useMutation({
    mutationFn: (body: MetadataValidationDTO) =>
      postValidate<MetadataType>(validationApiUrl, body),
    mutationKey: [MUTATION_KEYS.postValidateKey],
  });

  return {
    validateMetadata: mutateAsync,
    validationStatus: data,
    isValidating: isLoading,
  };
};
