import React from 'react';
import ReactDOM from 'react-dom/client';

import DelegationPillar from './DelegationPillar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <DelegationPillar
      walletApi={null}
      apiUrl={process.env.API_URL || ''}
      validationApiUrl={process.env.VALIDATION_API_URL || ''}
      dashboardPath="/"
      epochParams={{
        drep_deposit: 1000000,
      }}
      connectWallet={() => {
        throw new Error('Function not implemented.');
      }}
      openFeedbackWindow={() => {
        throw new Error('Function not implemented.');
      }}
      addSuccessAlert={(message: string) => {
        throw new Error(`Function not implemented. ${message}`);
      }}
      addErrorAlert={(message: string) => {
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
