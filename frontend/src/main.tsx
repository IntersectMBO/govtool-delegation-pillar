import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DelegationPillar from './DelegationPillar';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DelegationPillar
      walletApi={null}
      enable={(message: string) => {
        throw new Error(`Function not implemented. ${message}`);
      }}
      isEnableLoading=""
      apiUrl={import.meta.env.API_URL as string}
      validationApiUrl={import.meta.env.VALIDATION_API_URL as string}
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
      useLocation={() => {
        throw new Error('Function not implemented.');
      }}
      useParams={() => {
        throw new Error('Function not implemented.');
      }}
      generatePath={() => {
        throw new Error('Function not implemented.');
      }}
      useRouter={() => {
        throw new Error('Function not implemented.');
      }}
      getAddressFromBech32={() => {
        throw new Error('Function not implemented.');
      }}
    />
  </StrictMode>
);
