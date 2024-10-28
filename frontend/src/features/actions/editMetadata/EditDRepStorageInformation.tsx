import { Dispatch, SetStateAction, useEffect } from 'react';
import { Box } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { DOCS, ICONS, Rules } from 'consts';
import { Button, ControlledField, Spacer, Typography } from 'components';
import { useTranslation, useScreenDimension, useDRepDataForm } from 'hooks';
import { ellipsizeText } from 'utils';
import { Step } from '../common/Step';
import { TransactionStepButtons } from '../common/TransactionStepButtons';

type StorageInformationProps = {
  setStep: Dispatch<SetStateAction<number>>;
};

export const EditDRepStorageInformation = ({
  setStep,
}: StorageInformationProps) => {
  const { t } = useTranslation();
  const {
    control,
    errors,
    generateMetadata,
    getValues,
    isSubmitting,
    onClickDownloadJson,
    onSubmit,
    watch,
  } = useDRepDataForm({ type: 'edit', onCancel: () => setStep(1) });
  const { screenWidth } = useScreenDimension();

  const fileName = getValues('givenName').replace(/\s/g, '');

  const isActionButtonDisabled = !watch('storingURL') || !!errors.storingURL;

  const onClickBack = () => setStep(2);

  useEffect(() => {
    generateMetadata();
  }, []);

  return (
    <>
      <Typography sx={{ textAlign: 'center' }} variant="headline4">
        {t('editMetadata.storingInformationTitle')}
      </Typography>
      <Button
        endIcon={
          <OpenInNewIcon
            sx={{
              color: 'primary',
              height: 17,
              width: 17,
            }}
          />
        }
        href={DOCS.storingMetadata}
        target="_blank"
        size="extraLarge"
        sx={{ alignSelf: 'center', width: 'fit-content' }}
        variant="text"
      >
        {t('editMetadata.storingInformationStep2Link')}
      </Button>
      <Typography fontWeight={400} sx={{ textAlign: 'center' }} variant="body1">
        {t('editMetadata.storingInformationDescription')}
      </Typography>
      <Box sx={{ my: 4 }}>
        <Step
          component={
            <Button
              data-testid="metadata-download-button"
              onClick={onClickDownloadJson}
              size="extraLarge"
              startIcon={<img alt="download" src={ICONS.download} />}
              sx={{
                width: 'fit-content',
                ml: screenWidth < 1024 ? 0 : 1.75,
                mt: screenWidth < 1024 ? 1.5 : 0,
              }}
              variant="outlined"
            >
              {`${ellipsizeText(fileName, 8)}.jsonld`}
            </Button>
          }
          label={t('editMetadata.storingInformationStep1Label')}
          componentsLayoutStyles={{
            alignItems: screenWidth < 1024 ? undefined : 'center',
            flexDirection: screenWidth < 1024 ? 'column' : 'row',
          }}
          stepNumber={1}
        />
        <Spacer y={6} />
        <Step
          layoutStyles={{ alignItems: 'center' }}
          label={t('editMetadata.storingInformationStep2Label')}
          stepNumber={2}
        />
        <Spacer y={6} />
        <Step
          component={
            <ControlledField.Input
              {...{ control, errors }}
              dataTestId="metadata-url-input"
              layoutStyles={{ mt: 1.5 }}
              name="storingURL"
              placeholder={t('editMetadata.storingInformationURLPlaceholder')}
              rules={Rules.STORING_LINK}
            />
          }
          label={t('editMetadata.storingInformationStep3Label')}
          stepNumber={3}
        />
      </Box>
      <TransactionStepButtons
        onActionButton={onSubmit}
        actionButtonText={t('submit')}
        actionButtonDataTestId="submit-button"
        disableActionButton={isActionButtonDisabled}
        isLoadingActionButton={isSubmitting}
        onBackButton={onClickBack}
      />
    </>
  );
};
