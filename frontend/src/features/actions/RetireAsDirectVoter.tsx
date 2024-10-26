import { Trans } from 'react-i18next';
import { Link } from '@mui/material';

import { DOCS } from 'consts';
import {
  useGetVoterInfo,
  useRetireVoter,
  useScreenDimension,
  useTranslation,
} from 'hooks';
import { correctAdaFormat } from 'utils';
import { Typography } from 'components';
import { TransactionStepButtons } from './common/TransactionStepButtons';

export const RetireAsDirectVoter = () => {
  const { t } = useTranslation();
  const { isMobile } = useScreenDimension();
  const { voter } = useGetVoterInfo();

  const { retireVoter, isRetiring } = useRetireVoter();

  return (
    <>
      <Typography sx={{ mt: 1, textAlign: 'center' }} variant="headline4">
        {t('directVoter.retirementHeading')}
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
          i18nKey="directVoter.retirementDescription"
          values={{ deposit: correctAdaFormat(voter?.deposit) }}
          components={[
            <Link
              href={DOCS.functions}
              target="_blank"
              sx={{ textDecoration: 'none' }}
              key="0"
            />,
          ]}
        />
      </Typography>
      <TransactionStepButtons
        onActionButton={() => retireVoter('DirectVoter')}
        isLoadingActionButton={isRetiring}
        backButtonText={t('cancel')}
      />
    </>
  );
};
