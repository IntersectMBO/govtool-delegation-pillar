import { ChipProps } from '@mui/material';
import { DRepStatus } from 'types';
interface StatusPillProps {
    status: DRepStatus;
    dataTestId?: string;
    label?: string;
    size?: 'small' | 'medium';
    sx?: ChipProps['sx'];
}
export declare const StatusPill: ({ dataTestId, status, label, size, sx, }: StatusPillProps) => import("react/jsx-runtime").JSX.Element;
export {};
