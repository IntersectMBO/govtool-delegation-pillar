import { Reference } from './other';
import { MetadataValidationStatus } from './metadataValidation';
export declare enum DRepStatus {
    Active = "Active",
    Inactive = "Inactive",
    Retired = "Retired",
    Yourself = "Yourself"
}
export declare enum DRepListSort {
    Random = "Random",
    VotingPower = "VotingPower",
    RegistrationDate = "RegistrationDate",
    Status = "Status"
}
export type DrepDataDTO = {
    deposit: number;
    drepId: string;
    isScriptBased: boolean;
    latestRegistrationDate: string;
    latestTxHash?: string;
    metadataHash?: string;
    status: DRepStatus;
    type: 'DRep' | 'SoleVoter';
    url?: string;
    view: string;
    votingPower?: number;
};
export type DRepData = DrepDataDTO & {
    paymentAddress: string | null;
    givenName: string;
    objectives: string | null;
    motivations: string | null;
    qualifications: string | null;
    references: Reference[];
    doNotList: boolean;
    metadataStatus: MetadataValidationStatus | null;
    metadataValid: boolean;
};
export type DRepDataFormValues = {
    doNotList: boolean;
    givenName: string;
    objectives: string;
    motivations: string;
    qualifications: string;
    paymentAddress: string;
    storeData?: boolean;
    storingURL: string;
    linkReferences?: Reference[];
    identityReferences?: Reference[];
};
export type VoterInfo = {
    dRepRegisterTxHash: string | null;
    dRepRetireTxHash: string | null;
    deposit: number;
    givenName: string | null;
    imageHash: string | null;
    imageUrl: string | null;
    isRegisteredAsDRep: boolean;
    isRegisteredAsSoleVoter: boolean;
    motivations: string | null;
    objectives: string | null;
    paymentAddress: string | null;
    qualifications: string | null;
    soleVoterRegisterTxHash: string | null;
    soleVoterRetireTxHash: string | null;
    url: string | null;
    votingPower: number | null;
    wasRegisteredAsDRep: boolean;
    wasRegisteredAsSoleVoter: boolean;
};
