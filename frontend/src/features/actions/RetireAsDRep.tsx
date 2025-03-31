import { useEffect } from 'react';
import * as Sentry from '@sentry/react';

import { useRetireVoter, useScreenDimension, useTranslation } from '@/hooks';
import { Typography } from '@/components';
import { TransactionStepButtons } from './common/TransactionStepButtons';

export const RetireAsDRep = ({
  onClickCancel,
}: {
  onClickCancel: () => void;
}) => {
  const { t } = useTranslation();
  const { isMobile } = useScreenDimension();

  const { retireVoter, isRetiring } = useRetireVoter();

  useEffect(() => {
    Sentry.setTag('component_name', 'WhatRetirementMeans');
  }, []);

  return (
    <>
      <Typography sx={{ textAlign: 'center' }} variant="headline4">
        {t('retirement.whatRetirementMeansTitle')}
      </Typography>
      <Typography
        fontWeight={400}
        sx={{
          pb: isMobile ? 4 : 6,
          pt: 4,
          textAlign: 'center',
          whiteSpace: 'pre-line',
        }}
        variant="body1"
      >
        {t('retirement.whatRetirementMeansDescription')}
      </Typography>
      <TransactionStepButtons
        actionButtonText={t('retirement.continue')}
        actionButtonDataTestId="continue-retirement-button"
        backButtonText={t('cancel')}
        isLoadingActionButton={isRetiring}
        onActionButton={() => retireVoter('Drep')}
        onBackButton={onClickCancel}
      />
    </>
  );
};
