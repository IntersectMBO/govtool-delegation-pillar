import { Dispatch, SetStateAction } from 'react';
import { Box } from '@mui/material';

import { useRegisterAsdRepForm, useTranslation } from 'hooks';
import { VoterInfo } from 'types';
import { DRepDataForm } from '../common/DRepDataForm';
import { TransactionStepButtons } from '../common/TransactionStepButtons';

export const RegisterAsDRepForm = ({
  onClickCancel,
  setStep,
  voter,
}: {
  onClickCancel: () => void;
  setStep: Dispatch<SetStateAction<number>>;
  voter?: VoterInfo;
}) => {
  const { t } = useTranslation();
  const { control, errors, isError, register, watch } = useRegisterAsdRepForm();

  const onClickContinue = () => setStep(3);

  const onClickBack = () => setStep(1);

  const isContinueButtonDisabled = !watch('givenName') || isError;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <DRepDataForm control={control} errors={errors} register={register} />
      <TransactionStepButtons
        onActionButton={onClickContinue}
        disableActionButton={isContinueButtonDisabled}
        onBackButton={voter?.wasRegisteredAsDRep ? onClickCancel : onClickBack}
        backButtonText={voter?.wasRegisteredAsDRep ? t('cancel') : t('back')}
      />
    </Box>
  );
};
