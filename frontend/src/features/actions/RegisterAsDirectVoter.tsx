import { Trans } from 'react-i18next';
import { Link } from '@mui/material';

import { useRegisterVoter, useScreenDimension, useTranslation } from 'hooks';
import { correctAdaFormat, openInNewTab } from 'utils';
import { Typography } from 'components';
import { usePillarContext } from 'context';
import { TransactionStepButtons } from './common/TransactionStepButtons';

export const RegisterAsDirectVoter = () => {
  const { epochParams } = usePillarContext();
  const { t } = useTranslation();
  const { isMobile } = useScreenDimension();

  const { registerVoter, isRegistering } = useRegisterVoter();

  return (
    <>
      <Typography sx={{ mt: 1, textAlign: 'center' }} variant="headline4">
        {t('directVoter.registerHeading')}
      </Typography>
      <Typography
        fontWeight={400}
        sx={{
          mb: 7,
          mt: isMobile ? 4 : 10,
          textAlign: 'center',
          whiteSpace: 'pre-line',
        }}
        variant="body1"
      >
        <Trans
          i18nKey="directVoter.registerDescription"
          values={{ deposit: correctAdaFormat(epochParams?.drep_deposit) }}
          components={[
            <Link
              onClick={() => openInNewTab('https://sancho.network/')}
              sx={{ cursor: 'pointer' }}
              key="0"
            />,
          ]}
        />
      </Typography>
      <TransactionStepButtons
        onActionButton={registerVoter}
        isLoadingActionButton={isRegistering}
        backButtonText={t('cancel')}
      />
    </>
  );
};
