import { Box } from '@mui/material';

export type SpacerProps = {
  x?: number;
  y?: number;
};

export const Spacer = ({ x, y }: SpacerProps) => <Box pt={y} pr={x} />;
