import { Dispatch, SetStateAction } from 'react';
import { Box, Link } from '@mui/material';

import { DOCS } from '@/consts';
import { useScreenDimension, useTranslation, useDRepDataForm } from '@/hooks';
import { ControlledField, Spacer, Typography } from '@/components';
import { TransactionStepButtons } from '../common/TransactionStepButtons';

export const EditDRepStoreDataInfo = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const { t } = useTranslation();
  const { isMobile } = useScreenDimension();
  const { control, errors, watch } = useDRepDataForm({ type: 'edit' });

  const onClickBackButton = () => setStep(1);

  const onClickContinue = () => setStep(3);

  const isContinueDisabled = !watch('storeData');

  return (
    <>
      <Typography sx={{ textAlign: 'center' }} variant="headline4">
        {t('editMetadata.storeDataTitle')}
      </Typography>
      <Link
        href={DOCS.storingMetadata}
        target="_blank"
        sx={{
          cursor: 'pointer',
          fontSize: 16,
          fontWeight: 500,
          fontFamily: 'Poppins',
          my: 4,
          textAlign: 'center',
          textDecoration: 'none',
        }}
      >
        {t('editMetadata.storeDataLink')}
      </Link>
      <ControlledField.Checkbox
        {...{ control, errors }}
        name="storeData"
        label={t('editMetadata.storeDataCheckboxLabel')}
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
