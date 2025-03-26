import { Navigate, useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { PATHS } from '@/consts';
import { useGetVoterInfo, useAbandonWarningModal } from '@/hooks';
import { TransactionBox, EditDRepMetadata } from '@/features';

export const EditDRepMetadataPage = () => {
  const { state } = useLocation();
  const { voter } = useGetVoterInfo({ enabled: !state });
  const openAbandonWarningModal = useAbandonWarningModal();

  if (voter && !voter?.isRegisteredAsDRep)
    return <Navigate to={PATHS.dashboard} />;

  return (
    <TransactionBox>
      {!voter?.isRegisteredAsDRep ? (
        <CircularProgress />
      ) : (
        <EditDRepMetadata onCancel={openAbandonWarningModal} />
      )}
    </TransactionBox>
  );
};
