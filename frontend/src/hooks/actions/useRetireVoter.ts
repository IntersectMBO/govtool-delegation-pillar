import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PATHS } from 'consts';
import { usePillarContext, useModal } from 'context';
import { useGetVoterInfo, useTranslation, useWalletErrorModal } from 'hooks';

export const useRetireVoter = () => {
  const {
    cExplorerBaseUrl,
    isPendingTransaction,
    buildSignSubmitConwayCertTx,
    buildDRepRetirementCert,
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
        title: t('modals.retirement.title'),
        message: t('modals.retirement.message'),
        link: `${cExplorerBaseUrl}/tx/${link}`,
        buttonText: t('modals.common.goToDashboard'),
        dataTestId: 'retirement-transaction-submitted-modal',
        onSubmit: backToDashboard,
      },
    });
  }, []);

  const retireVoter = useCallback(
    async (type: 'Drep' | 'DirectVoter') => {
      try {
        setIsLoading(true);
        const isPendingTx = isPendingTransaction();
        if (isPendingTx) return;
        if (!voter?.deposit) throw new Error(t('errors.appCannotGetDeposit'));

        const certBuilder = await buildDRepRetirementCert(
          voter?.deposit?.toString()
        );
        const result = await buildSignSubmitConwayCertTx({
          certBuilder,
          type: `retireAs${type}`,
          voter,
        });
        if (result) showSuccessModal(result);
      } catch (error: any) {
        openWalletErrorModal({
          error,
          buttonText: t('modals.common.goToDashboard'),
          onSumbit: backToDashboard,
          dataTestId: 'retirement-transaction-error-modal',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [
      buildDRepRetirementCert,
      buildSignSubmitConwayCertTx,
      openModal,
      voter?.deposit,
    ]
  );

  return {
    retireVoter,
    isRetiring: isLoading,
  };
};
