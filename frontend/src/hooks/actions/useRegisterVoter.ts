import { useCallback, useState } from 'react';
import * as Sentry from '@sentry/react';

import { usePillarContext } from '@/context';
import {
  useActionSuccessModal,
  useGetVoterInfo,
  useWalletErrorModal,
} from '@/hooks';

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
  } = usePillarContext();
  const openActionSuccessModal = useActionSuccessModal();
  const openWalletErrorModal = useWalletErrorModal();
  const { voter } = useGetVoterInfo();

  const [isLoading, setIsLoading] = useState(false);

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
        if (result)
          openActionSuccessModal({ action: 'registration', link: result });
      } catch (error: any) {
        Sentry.setTag(
          'hook',
          `useRegisterAs${metadata ? 'DRep' : 'DirectVoter'}`
        );
        Sentry.captureException(error);

        openWalletErrorModal({
          error,
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
      voter?.isRegisteredAsDRep,
    ]
  );

  return {
    registerVoter,
    isRegistering: isLoading,
  };
};
