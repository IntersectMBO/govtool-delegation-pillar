import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Sentry from '@sentry/react';

import { usePillarContext } from '@/context';
import { useGetVoterInfo } from '../queries/useGetVoterInfoQuery';
import { useWalletErrorModal } from '../modal/useWalletErrorModal';

export const useDelegateTodRep = () => {
  const {
    buildSignSubmitConwayCertTx,
    buildVoteDelegationCert,
    buildDRepRetirementCert,
    addSuccessAlert,
    addErrorAlert,
  } = usePillarContext();
  const { t } = useTranslation();
  const openWalletErrorModal = useWalletErrorModal();
  const { voter } = useGetVoterInfo();

  const [isDelegating, setIsDelegating] = useState<string | null>(null);

  const delegate = useCallback(
    async (dRepId: string | undefined) => {
      if (!dRepId) return;
      setIsDelegating(dRepId);
      try {
        if (voter?.isRegisteredAsSoleVoter && !voter?.deposit) {
          throw new Error(t('errors.appCannotGetDeposit'));
        }

        const certBuilder = await buildVoteDelegationCert(dRepId);
        if (voter?.isRegisteredAsSoleVoter) {
          const retirementCert = await buildDRepRetirementCert(
            voter?.deposit?.toString()
          );
          certBuilder.add(retirementCert);
        }
        await buildSignSubmitConwayCertTx({
          certBuilder,
          type: 'delegate',
          resourceId: dRepId,
          voter,
        });
      } catch (error) {
        openWalletErrorModal({
          error,
          buttonText: t('cancel'),
          onSumbit: () => {},
          dataTestId: 'delegate-transaction-error-modal',
        });
        Sentry.setTag('hook', 'useDelegateTodRep');
        Sentry.captureException(error);
      } finally {
        setIsDelegating(null);
      }
    },
    [
      addErrorAlert,
      addSuccessAlert,
      buildSignSubmitConwayCertTx,
      buildVoteDelegationCert,
      t,
      voter?.deposit,
      voter?.isRegisteredAsSoleVoter,
    ]
  );

  return {
    delegate,
    isDelegating,
  };
};
