import { SxProps } from '@mui/material';
import { Typography } from '../../../../components';

export type InfoTextProps = {
  label: string;
  sx?: SxProps;
};

export const InfoText = ({ label, sx }: InfoTextProps) => (
  <Typography color="#FF833B" sx={sx} variant="body1">
    {label.toLocaleUpperCase()}
  </Typography>
);
