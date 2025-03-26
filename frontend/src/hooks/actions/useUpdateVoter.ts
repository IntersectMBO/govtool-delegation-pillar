import { useCallback, useState } from 'react';
import * as Sentry from '@sentry/react';

import { usePillarContext } from '@/context';
import { useActionSuccessModal } from '@/hooks';
import { useWalletErrorModal } from '../modal/useWalletErrorModal';

type MetadataInfo = {
  hash: string;
  uri: string;
};

export const useUpdateVoter = () => {
  const { buildDRepUpdateCert, buildSignSubmitConwayCertTx } =
    usePillarContext();
  const openActionSuccessModal = useActionSuccessModal();
  const openWalletErrorModal = useWalletErrorModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateVoter = useCallback(
    async (metadata: MetadataInfo) => {
      setIsLoading(true);
      if (metadata && !metadata.hash) return;

      const { hash, uri } = metadata;

      try {
        const updateDRepMetadataCert = await buildDRepUpdateCert(uri, hash);

        const result = await buildSignSubmitConwayCertTx({
          certBuilder: updateDRepMetadataCert,
          type: 'updateMetaData',
        });

        if (result)
          openActionSuccessModal({ action: 'registration', link: result });
      } catch (error: any) {
        Sentry.setTag('hook', 'useUpdateVoter');
        Sentry.captureException(error);

        openWalletErrorModal({
          error,
          dataTestId: 'edit-drep-transaction-error-modal',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [buildDRepUpdateCert, buildSignSubmitConwayCertTx]
  );

  return {
    updateVoter,
    isUpdatingVoter: isLoading,
  };
};
