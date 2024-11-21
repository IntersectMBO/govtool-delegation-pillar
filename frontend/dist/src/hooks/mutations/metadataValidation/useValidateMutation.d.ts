import { MetadataValidationDTO } from 'types';
export declare const useValidateMutation: <MetadataType>() => {
    validateMetadata: import("react-query").UseMutateAsyncFunction<import("types").ValidateMetadataResult<MetadataType>, unknown, MetadataValidationDTO, unknown>;
    validationStatus: import("types").ValidateMetadataResult<MetadataType> | undefined;
    isValidating: boolean;
};
