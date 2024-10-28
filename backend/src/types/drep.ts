export enum DRepType {
  DRep = 'DRep',
  DirectVoter = 'DirectVoter',
}

export enum DRepStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Retired = 'Retired',
}

export enum DRepSort {
  Random = 'Random',
  VotingPower = 'VotingPower',
  RegistrationDate = 'RegistrationDate',
  Status = 'Status',
}

export type Reference = {
  '@type': string;
  label: string;
  uri: string;
};

export type GetDRepListParams = {
  page?: number;
  pageSize?: number;
  sort?: DRepSort;
  status?: DRepStatus[];
  search?: string;
};

export type RawQueryDRepListItemType = {
  drep_id: string;
  view: string;
  has_script: boolean;
  url: string | null;
  data_hash: string | null;
  deposit: string;
  voting_power?: string;
  status: DRepStatus;
  active: boolean;
  tx_hash: string;
  last_register_time: string;
  latest_deposit: string;
  has_non_deregister_voting_anchor: boolean;
  fetch_error: string | null;
  payment_address: string | null;
  given_name: string | null;
  objectives: string | null;
  motivations: string | null;
  qualifications: string | null;
  image_url: string | null;
  image_hash: string | null;
  type: DRepType;
};

export type DRepListItemType = {
  dRepHash: string;
  dRepView: string;
  isScriptBased: boolean;
  url: string | null;
  dataHash: string | null;
  deposit: number;
  votingPower?: number;
  isActive: boolean;
  txHash: string;
  date: string;
  latestDeposit: number;
  latestNonDeregisterVotingAnchorWasNotNull: boolean;
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

export type RawQueryDRepDetailsType = RawQueryDRepListItemType & {
  payment_address: string | null;
  objectives: string | null;
  motivations: string | null;
  qualifications: string | null;
  references: Reference[];
};

export type DRepDetailsType = DRepListItemType & {
  paymentAddress: string | null;
  objectives: string | null;
  motivations: string | null;
  qualifications: string | null;
  references: Reference[];
};
