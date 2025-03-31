import { FC, PropsWithChildren } from 'react';
import { Box } from '@mui/material';

import { useScreenDimension } from '@/hooks';
import { voltaireTheme as theme } from '@/theme';

interface Props {
  hideBox?: boolean;
}
export const TransactionBox: FC<PropsWithChildren<Props>> = ({
  hideBox,
  children,
}) => {
  const { isMobile } = useScreenDimension();
  const {
    palette: { boxShadow2 },
  } = theme;

  if (hideBox)
    return (
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Box>
    );

  return (
    <Box
      alignSelf="center"
      borderRadius="20px"
      boxShadow={isMobile ? '' : `2px 2px 20px 0px ${boxShadow2}`}
      boxSizing="border-box"
      mb={isMobile ? 2 : 1.5}
      px={isMobile ? 2 : 18.75}
      py={isMobile ? 6 : 8}
      height="auto"
      width="100%"
      maxWidth={isMobile ? 'none' : 900}
      display="flex"
      flexDirection="column"
    >
      {children}
    </Box>
  );
};
