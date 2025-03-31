import { default as MuiModal } from '@mui/material/Modal';
import { ComponentProps } from 'react';
export type MuiModalChildren = ComponentProps<typeof MuiModal>['children'];
interface Props {
    open: boolean;
    children: MuiModalChildren;
    handleClose?: () => void;
}
export declare const Modal: ({ open, children, handleClose }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
