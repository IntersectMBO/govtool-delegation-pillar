import React from 'react';
import ReactDOM from 'react-dom/client';

import DelegationPillar from './DelegationPillar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <DelegationPillar
      walletApi={
        {
          dRepID: '8d6382cbb90a959ad7d779f526759ba7fd89d22cbd45f4eb431d7ba5',
          stakeKey:
            'e0a2ea5b649ac3931083da2b9723bdfa30d0ac139eb0a4d96fea7c94ea',
          pendingTransaction: {} as any,
        } as any
      }
      apiUrl={process.env.API_URL || ''}
      validationApiUrl={process.env.VALIDATION_API_URL || ''}
      dashboardPath="/"
      openFeedbackWindow={() => {
        throw new Error('Function not implemented.');
      }}
      epochParams={undefined}
      addSuccessAlert={(message: string) => {
        throw new Error(`Function not implemented. ${message}`);
      }}
      validateMetadata={(url: string, hash: string) => {
        throw new Error(`Function not implemented. ${url} ${hash}`);
      }}
      generateMetadata={() => {
        throw new Error('Function not implemented.');
      }}
      createJsonLD={(data: unknown) => {
        throw new Error(`Function not implemented. ${data}`);
      }}
      createHash={(json: unknown) => {
        throw new Error(`Function not implemented. ${json}`);
      }}
    />
  </React.StrictMode>
);
