import { useCallback, useState } from 'react';

import { usePillarContext } from 'context';
import {
  useActionSuccessModal,
  useGetVoterInfo,
  useTranslation,
  useWalletErrorModal,
} from 'hooks';

export const useRetireVoter = () => {
  const {
    isPendingTransaction,
    buildSignSubmitConwayCertTx,
    buildDRepRetirementCert,
  } = usePillarContext();
  const { t } = useTranslation();
  const openActionSuccessModal = useActionSuccessModal();
  const openWalletErrorModal = useWalletErrorModal();
  const { voter } = useGetVoterInfo();

  const [isLoading, setIsLoading] = useState(false);

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
        if (result)
          openActionSuccessModal({ action: 'retirement', link: result });
      } catch (error: any) {
        openWalletErrorModal({
          error,
          dataTestId: 'retirement-transaction-error-modal',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [buildDRepRetirementCert, buildSignSubmitConwayCertTx, voter?.deposit]
  );

  return {
    retireVoter,
    isRetiring: isLoading,
  };
};
