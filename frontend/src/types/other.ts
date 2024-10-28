export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [property: string]: JSONValue }
  | JSONValue[];

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Reference = {
  '@type': string;
  label: string;
  uri: string;
};

export type Infinite<T> = {
  elements: T[];
  page: number;
  pageSize: number;
  total: number;
};

export type CurrentDelegation = {
  dRepHash: string | null;
  dRepView: string | null;
  isDRepScriptBased: boolean;
  txHash: string | null;
} | null;

export type NetworkMetrics = {
  currentTime: string;
  currentEpoch: number;
  currentBlock: number;
  uniqueDelegators: number;
  totalDelegations: number;
  totalGovernanceActions: number;
  totalDRepVotes: number;
  totalRegisteredDReps: number;
  alwaysAbstainVotingPower: number;
  alwaysNoConfidenceVotingPower: number;
  networkName: string;
};
