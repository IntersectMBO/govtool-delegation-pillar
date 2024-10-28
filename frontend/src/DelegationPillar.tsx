import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query';

import { voltaireTheme } from 'theme';
import {
  DataActionsBarProvider,
  PillarProvider,
  PillarProviderProps,
} from 'context';
import { CssBaseline } from '@mui/material';
import { DelegationPillarRoutes } from 'DelegationPillarRoutes';

const DelegationPillar = ({
  walletApi,
  apiUrl,
  validationApiUrl,
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
          <DataActionsBarProvider>
            <CssBaseline />
            <BrowserRouter>
              <DelegationPillarRoutes />
            </BrowserRouter>
          </DataActionsBarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </PillarProvider>
  );
};

// That exports pages of the VotingPillar component
export default DelegationPillar;
