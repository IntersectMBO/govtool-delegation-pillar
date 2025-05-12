import { SxProps } from '@mui/material/styles';
interface Props {
    variant?: 'modal' | 'popup';
    onClose?: () => void;
    hideCloseButton?: boolean;
    children: React.ReactNode;
    dataTestId?: string;
    sx?: SxProps;
}
export declare const BaseWrapper: import('@emotion/styled').StyledComponent<import('@mui/system').MUIStyledCommonProps<import('@mui/material/styles').Theme> & Pick<Props, "variant">, import('react').DetailedHTMLProps<import('react').HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const CloseButton: import('@emotion/styled').StyledComponent<import('@mui/system').MUIStyledCommonProps<import('@mui/material/styles').Theme>, import('react').DetailedHTMLProps<import('react').ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, {}>;
export declare const ModalWrapper: import('react').ForwardRefExoticComponent<Props & import('react').RefAttributes<HTMLDivElement>>;
export {};
