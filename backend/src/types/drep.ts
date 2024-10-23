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
  active: boolean;
  latest_deposit: string;
  has_non_deregister_voting_anchor: boolean;
  deposit: string;
  voting_power?: string;
  latest_registration_date: string;
  latest_tx_hash?: string;
  metadata_error?: string;
  metadata_hash?: string;
  given_name: string | null;
  url?: string;
};

export type DRepListItemType = {
  drepId: string;
  view: string;
  isScriptBased: boolean;
  type: DRepType;
  status: DRepStatus;
  deposit: number;
  votingPower?: number;
  latestRegistrationDate: string;
  latestTxHash?: string;
  metadataError?: string;
  metadataHash?: string;
  givenName: string | null;
  url?: string;
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
