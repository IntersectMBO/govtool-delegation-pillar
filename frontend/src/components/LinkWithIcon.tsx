import { Box, SxProps } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import { Typography } from './Typography';

export type LinkWithIconProps = {
  label: string;
  onClick: () => void;
  icon?: JSX.Element;
  sx?: SxProps;
  cutWithEllipsis?: boolean;
  dataTestId?: string;
};

export const LinkWithIcon = ({
  dataTestId,
  label,
  onClick,
  icon,
  sx,
  cutWithEllipsis,
}: LinkWithIconProps) => (
  <Box
    data-testid={dataTestId ?? `${label.split(' ').join('-')}-link`}
    sx={{
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      width: 'fit-content',
      ...(cutWithEllipsis && {
        overflow: 'hidden',
        width: 'auto',
      }),
      ...sx,
    }}
    onClick={onClick}
  >
    {icon || <ArrowBackIosIcon color="primary" sx={{ fontSize: 14 }} />}
    <Typography
      color="primary"
      fontWeight={400}
      variant="body2"
      sx={{
        ml: 0.5,
        ...(cutWithEllipsis && {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }),
      }}
    >
      {label}
    </Typography>
  </Box>
);
