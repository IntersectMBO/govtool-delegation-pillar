import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import { PATHS } from 'consts';
import { usePillarContext, useModal } from 'context';
import { useGetVoterInfo, useTranslation, useWalletErrorModal } from 'hooks';

type MetadataInfo = {
  hash: string;
  uri: string;
};

export const useRegisterVoter = () => {
  const {
    buildSignSubmitConwayCertTx,
    buildDRepRegCert,
    buildDRepUpdateCert,
    buildVoteDelegationCert,
    dRepID,
    cExplorerBaseUrl,
  } = usePillarContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const openWalletErrorModal = useWalletErrorModal();
  const { openModal, closeModal } = useModal();
  const { voter } = useGetVoterInfo();

  const [isLoading, setIsLoading] = useState(false);

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

  const registerVoter = useCallback(
    async (metadata?: MetadataInfo) => {
      setIsLoading(true);
      if (metadata && !metadata.hash) return;

      const builderArgs = metadata ? [metadata.uri, metadata.hash] : [];

      try {
        const certBuilder = await buildVoteDelegationCert(dRepID);
        const registerCert = voter?.isRegisteredAsDRep
          ? await buildDRepUpdateCert(...builderArgs)
          : await buildDRepRegCert(...builderArgs);
        certBuilder.add(registerCert);

        const result = await buildSignSubmitConwayCertTx({
          certBuilder,
          type: metadata ? 'registerAsDrep' : 'registerAsDirectVoter',
        });
        if (result) showSuccessModal(result);
      } catch (error: any) {
        Sentry.setTag(
          'hook',
          `useRegisterAs${metadata ? 'DRep' : 'DirectVoter'}`
        );
        Sentry.captureException(error);

        openWalletErrorModal({
          error,
          buttonText: t('modals.common.goToDashboard'),
          onSumbit: backToDashboard,
          dataTestId: 'registration-transaction-error-modal',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [
      buildSignSubmitConwayCertTx,
      buildDRepRegCert,
      dRepID,
      openModal,
      voter?.isRegisteredAsDRep,
    ]
  );

  return {
    registerVoter,
    isRegistering: isLoading,
  };
};
