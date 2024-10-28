import { Dispatch, SetStateAction } from 'react';
import { Box, Link } from '@mui/material';

import { DOCS } from 'consts';
import { useDRepDataForm, useScreenDimension, useTranslation } from 'hooks';
import { ControlledField, Spacer, Typography } from 'components';
import { TransactionStepButtons } from '../common/TransactionStepButtons';

export const DRepStoreDataInfo = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const { t } = useTranslation();
  const { isMobile } = useScreenDimension();
  const { control, errors, watch } = useDRepDataForm({ type: 'register' });

  const onClickBackButton = () => setStep(2);

  const isContinueDisabled = !watch('storeData');

  const onClickContinue = () => setStep(4);

  return (
    <>
      <Typography sx={{ textAlign: 'center' }} variant="headline4">
        {t('registration.storeDataTitle')}
      </Typography>
      <Link
        href={DOCS.storingMetadata}
        target="_blank"
        sx={{
          fontSize: 16,
          fontWeight: 500,
          fontFamily: 'Poppins',
          my: 4,
          textAlign: 'center',
          textDecoration: 'none',
        }}
      >
        {t('registration.storeDataLink')}
      </Link>
      <ControlledField.Checkbox
        {...{ control, errors }}
        name="storeData"
        label={t('registration.storeDataCheckboxLabel')}
      />
      <Spacer y={isMobile ? 4 : 12.5} />
      <Box display="flex" flex={1} />
      <TransactionStepButtons
        onActionButton={onClickContinue}
        actionButtonText={t('register')}
        actionButtonDataTestId="register-button"
        disableActionButton={isContinueDisabled}
        onBackButton={onClickBackButton}
      />
    </>
  );
};
