import type { VoterInfo } from 'types';
export declare const getVoterInfo: ({ apiUrl, dRepID, }: {
    apiUrl: string;
    dRepID: string;
}) => Promise<VoterInfo>;
