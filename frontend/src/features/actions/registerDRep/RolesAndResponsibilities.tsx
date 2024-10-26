import { Dispatch, SetStateAction } from 'react';
import { Trans } from 'react-i18next';
import { Link } from '@mui/material';

import { useScreenDimension, useTranslation } from 'hooks';
import { correctAdaFormat, openInNewTab } from 'utils';
import { usePillarContext } from 'context';
import { Typography } from 'components';
import { TransactionStepButtons } from '../common/TransactionStepButtons';

export const RolesAndResponsibilities = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const { epochParams } = usePillarContext();
  const { t } = useTranslation();
  const { isMobile } = useScreenDimension();

  const onClickContinue = () => setStep(2);

  const openLearnMoreAboutDrep = () =>
    openInNewTab(
      'https://docs.gov.tools/using-govtool/govtool-functions/dreps'
    );

  return (
    <>
      <Typography sx={{ textAlign: 'center' }} variant="headline4">
        {t('registration.rolesAndResponsibilitiesTitle')}
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
        <Trans
          components={[
            <Link
              key="1"
              onClick={openLearnMoreAboutDrep}
              sx={{ cursor: 'pointer' }}
            />,
          ]}
          i18nKey="registration.rolesAndResponsibilitiesDescription"
          values={{ deposit: correctAdaFormat(epochParams?.drep_deposit) }}
        />
      </Typography>
      <TransactionStepButtons
        onActionButton={onClickContinue}
        backButtonText={t('cancel')}
      />
    </>
  );
};
