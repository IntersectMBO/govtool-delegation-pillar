import type { Preview } from '@storybook/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeWrapper } from '../src/theme/ThemeWrapper';
import { DataActionsBarProvider } from '../src/context/dataActionsBar';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <DataActionsBarProvider>
          <ThemeWrapper>
            <Story />
          </ThemeWrapper>
        </DataActionsBarProvider>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
