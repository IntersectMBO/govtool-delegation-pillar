import { DRepData } from 'types';
export declare const isSameDRep: ({ drepId, view }: DRepData, dRepIdOrView: string | undefined | null) => boolean;
export declare const fixViewForScriptBasedDRep: (view: string, isScriptBased: boolean) => string;
