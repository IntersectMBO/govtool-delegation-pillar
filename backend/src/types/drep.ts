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
  metadata_url: string | null;
  metadata_hash: string | null;
  deposit: string;
  voting_power: string;
  status: DRepStatus;
  type: DRepType;
  latest_tx_hash: string;
  latest_registration_date: string;
  metadata_error: string | null;
  fetch_error: string | null;
  payment_address: string | null;
  given_name: string | null;
  objectives: string | null;
  motivations: string | null;
  qualifications: string | null;
  image_url: string | null;
  image_hash: string | null;
};

export type DRepListItemType = {
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
