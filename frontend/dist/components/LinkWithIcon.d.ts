import { SxProps } from '@mui/material';
export type LinkWithIconProps = {
    label: string;
    onClick: () => void;
    icon?: JSX.Element;
    sx?: SxProps;
    cutWithEllipsis?: boolean;
    dataTestId?: string;
};
export declare const LinkWithIcon: ({ dataTestId, label, onClick, icon, sx, cutWithEllipsis, }: LinkWithIconProps) => import("react/jsx-runtime").JSX.Element;
