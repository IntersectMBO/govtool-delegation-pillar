import { Reference } from './other';

export enum DRepType {
  DRep = 'DRep',
  DirectVoter = 'DirectVoter',
}

export enum DRepStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Retired = 'Retired',
  Yourself = 'Yourself',
}

export enum DRepListSort {
  Random = 'Random',
  VotingPower = 'VotingPower',
  RegistrationDate = 'RegistrationDate',
  Status = 'Status',
}

export type DRepData = {
  drepId: string;
  view: string;
  url: string | null;
  metadataHash: string | null;
  deposit: number;
  votingPower: number;
  latestTxHash: string;
  latestRegistrationDate: string;
  metadataError: string | null;
  paymentAddress: string | null;
  givenName: string | null;
  objectives: string | null;
  motivations: string | null;
  qualifications: string | null;
  imageUrl: string | null;
  imageHash: string | null;
  type: DRepType;
  status: DRepStatus;
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
