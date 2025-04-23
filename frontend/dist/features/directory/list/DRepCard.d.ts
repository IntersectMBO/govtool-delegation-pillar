import { DRepData } from '../../../types';
type DRepCardProps = {
    dRep: DRepData;
    isConnected: boolean;
    isDelegationLoading?: boolean;
    isInProgress?: boolean;
    isMe?: boolean;
    isMyDrep?: boolean;
    onDelegate?: () => void;
};
export declare const DRepCard: ({ dRep: { status, type, view, votingPower, givenName, metadataStatus, image, drepId, isScriptBased, }, isConnected, isDelegationLoading, isInProgress, isMe, isMyDrep, onDelegate, }: DRepCardProps) => import("react/jsx-runtime").JSX.Element;
export {};
