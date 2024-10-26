import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react';

import { PATHS } from 'consts';
import { usePillarContext, useModal } from 'context';
import { useWalletErrorModal } from '../useWalletErrorModal';

type MetadataInfo = {
  hash: string;
  uri: string;
};

export const useUpdateVoter = () => {
  const { cExplorerBaseUrl, buildDRepUpdateCert, buildSignSubmitConwayCertTx } =
    usePillarContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const openWalletErrorModal = useWalletErrorModal();
  const { openModal, closeModal } = useModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const backToDashboard = useCallback(() => {
    navigate(PATHS.dashboard);
    closeModal();
  }, []);

  const showSuccessModal = useCallback((link: string) => {
    openModal({
      type: 'statusModal',
      state: {
        status: 'success',
        title: t('modals.registration.title'),
        message: t('modals.registration.message'),
        link: `${cExplorerBaseUrl}/tx/${link}`,
        buttonText: t('modals.common.goToDashboard'),
        onSubmit: backToDashboard,
        dataTestId: 'registration-transaction-submitted-modal',
      },
    });
  }, []);

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

        if (result) showSuccessModal(result);
      } catch (error: any) {
        Sentry.setTag('hook', 'useUpdateVoter');
        Sentry.captureException(error);

        openWalletErrorModal({
          error,
          onSumbit: backToDashboard,
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
