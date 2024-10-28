import type { BoxProps } from '@mui/material';
import { Box, CircularProgress } from '@mui/material';

type Props = {
  sx?: BoxProps['sx'];
};

export const CircularLoader = ({ sx }: Props) => (
  <Box
    sx={{
      display: 'flex',
      flex: 1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      ...sx,
    }}
  >
    <CircularProgress />
  </Box>
);
