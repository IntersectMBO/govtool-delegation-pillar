import { PropsWithChildren } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { voltaireTheme } from '.';

export const ThemeWrapper = ({ children }: PropsWithChildren) => (
  <ThemeProvider theme={voltaireTheme}>{children}</ThemeProvider>
);
