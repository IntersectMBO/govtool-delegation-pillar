import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CssBaseline } from '@mui/material';
import { voltaireTheme } from '@/theme';
import {
  DataActionsBarProvider,
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
  console.log({ walletApi, apiUrl, validationApiUrl, routePath, props });

  return (
    <PillarProvider
      {...props}
      walletApi={walletApi}
      apiUrl={apiUrl}
      validationApiUrl={validationApiUrl}
    >
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={voltaireTheme}>
          <DataActionsBarProvider>
            <CssBaseline />
            <BrowserRouter basename={routePath}>
              <DelegationPillarRoutes />
            </BrowserRouter>
          </DataActionsBarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PillarProvider>
  );
};

export default DelegationPillar;
