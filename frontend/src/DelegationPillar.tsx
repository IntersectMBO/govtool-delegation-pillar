import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline } from '@mui/material';
import { voltaireTheme } from '@/theme';
import {
  DataActionsBarProvider,
  ModalProvider,
  PillarProvider,
  PillarProviderProps,
} from '@/context';
import { DelegationPillarRoutes } from './DelegationPillarRoutes';

const DelegationPillar = ({
  walletApi,
  apiUrl,
  validationApiUrl,
  routePath,
  ...props
}: PillarProviderProps) => {
  return (
    <PillarProvider
      {...props}
      walletApi={walletApi}
      apiUrl={apiUrl}
      validationApiUrl={validationApiUrl}
    >
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={voltaireTheme}>
          <ModalProvider>
            <DataActionsBarProvider>
              <CssBaseline />
              <BrowserRouter basename={routePath}>
                <DelegationPillarRoutes />
              </BrowserRouter>
            </DataActionsBarProvider>
          </ModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PillarProvider>
  );
};

export default DelegationPillar;
