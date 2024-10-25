import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Box } from '@mui/material';

import { ControlledField, Spacer, Typography } from 'components';
import { Rules } from 'consts';
import { useScreenDimension, useTranslation } from 'hooks';
import { DRepDataFormValues } from 'types';
import { InfoText } from './dRepDataForm/InfoText';
import { FieldDescription } from './dRepDataForm/FieldDescription';
import { ReferencesSection } from './dRepDataForm/ReferencesSection';

type Props = {
  control: Control<DRepDataFormValues>;
  errors: FieldErrors<DRepDataFormValues>;
  register: UseFormRegister<DRepDataFormValues>;
};

export const DRepDataForm = ({ control, errors, register }: Props) => {
  const { t } = useTranslation();
  const { isMobile } = useScreenDimension();

  return (
    <div>
      <Box textAlign="center">
        <InfoText label={t('dRepData.required')} />
        <Typography sx={{ mt: 0.5, mb: isMobile ? 3 : 4 }} variant="headline4">
          {t('dRepData.dRepName')}
        </Typography>
        <Typography fontWeight={400} sx={{ mb: 4 }} variant="body1">
          {t('dRepData.dRepNameDescription')}
        </Typography>
      </Box>
      <ControlledField.Input
        {...{ control, errors }}
        dataTestId="name-input"
        label={t('forms.dRepData.givenName')}
        name="givenName"
        helpfulText={t('forms.dRepData.givenNameHelpfulText')}
        rules={Rules.GIVEN_NAME}
      />
      <Spacer y={isMobile ? 5 : 6} />
      <Box textAlign="center">
        <InfoText label={t('dRepData.optional')} />
        <Typography sx={{ mt: 0.5, mb: isMobile ? 3 : 4 }} variant="headline4">
          {t('dRepData.aboutYou')}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <div>
          <FieldDescription
            title={t('forms.dRepData.objectives')}
            subtitle={t('forms.dRepData.objectivesHelpfulText')}
          />
          <ControlledField.TextArea
            {...{ control, errors }}
            data-testid="objectives-input"
            label={t('forms.dRepData.objectives')}
            hideLabel
            name="objectives"
            rules={Rules.OBJECTIVES}
            maxLength={Rules.OBJECTIVES.maxLength.value}
          />
        </div>
        <div>
          <FieldDescription
            title={t('forms.dRepData.motivations')}
            subtitle={t('forms.dRepData.motivationsHelpfulText')}
          />
          <ControlledField.TextArea
            {...{ control, errors }}
            data-testid="motivations-input"
            label={t('forms.dRepData.motivations')}
            hideLabel
            name="motivations"
            rules={Rules.MOTIVATIONS}
            maxLength={Rules.MOTIVATIONS.maxLength.value}
          />
        </div>
        <div>
          <FieldDescription
            title={t('forms.dRepData.qualifications')}
            subtitle={t('forms.dRepData.qualificationsHelpfulText')}
          />
          <ControlledField.TextArea
            {...{ control, errors }}
            data-testid="qualifications-input"
            label={t('forms.dRepData.qualifications')}
            hideLabel
            name="qualifications"
            rules={Rules.QUALIFICATIONS}
            maxLength={Rules.QUALIFICATIONS.maxLength.value}
          />
        </div>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 3 }}>
          <Typography
            variant="title2"
            fontWeight={600}
            sx={{ textAlign: 'center' }}
          >
            {t('forms.dRepData.references')}
          </Typography>
          <ReferencesSection
            type="link"
            control={control}
            errors={errors}
            register={register}
          />
          <ReferencesSection
            type="identity"
            control={control}
            errors={errors}
            register={register}
          />
        </Box>
        <div>
          <Typography
            variant="title2"
            fontWeight={600}
            sx={{ textAlign: 'center', mb: 1.5 }}
          >
            {t('forms.dRepData.paymentAddress')}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={400}
            sx={{ textAlign: 'center', mb: 0 }}
          >
            {t('forms.dRepData.paymentAddressHelpfulText')}
          </Typography>
        </div>
        <ControlledField.Input
          {...{ control, errors }}
          label={t('forms.dRepData.paymentAddress')}
          name="paymentAddress"
          rules={Rules.PAYMENT_ADDRESS}
        />
        <ControlledField.Checkbox
          {...{ control, errors }}
          label={t('forms.dRepData.doNotList')}
          labelStyles={{ fontSize: 16, fontWeight: 500 }}
          helpfulText={t('forms.dRepData.doNotListHelpfulText')}
          layoutStyles={{ ml: -1.5 }}
          name="doNotList"
          size="large"
        />
      </Box>
    </div>
  );
};
