import { Fragment, useCallback } from 'react';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
} from 'react-hook-form';
import { Box } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { useRules, useTranslation } from '@/hooks';
import { DRepDataFormValues } from '@/types';
import { FieldDescription } from './FieldDescription';
import { Button, ControlledField } from '../../../../components';

const MAX_NUMBER_OF_LINKS = 7;

type ReferencesSectionProps = {
  type: 'link' | 'identity';
  control: Control<DRepDataFormValues>;
  errors: FieldErrors<DRepDataFormValues>;
  register: UseFormRegister<DRepDataFormValues>;
};

export const ReferencesSection = ({
  type,
  control,
  errors,
  register,
}: ReferencesSectionProps) => {
  const { fieldName, jsonldType } = (() => {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'link':
        return {
          fieldName: 'linkReferences',
          jsonldType: 'Link',
        } as const;
      case 'identity':
        return {
          fieldName: 'identityReferences',
          jsonldType: 'Identity',
        } as const;
    }
  })();

  const { t } = useTranslation();

  const {
    append,
    fields: references,
    remove,
  } = useFieldArray({
    control,
    name: fieldName,
  });

  const addLink = useCallback(
    () => append(getEmptyReference(jsonldType)),
    [append]
  );

  const removeLink = useCallback((index: number) => remove(index), [remove]);

  const Rules = useRules();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FieldDescription
        title={t(`forms.dRepData.referenceTypes.${type}.title`)}
        subtitle={t(`forms.dRepData.referenceTypes.${type}.description`)}
      />
      {references.map((field, index) => (
        <Fragment key={field.id}>
          <ControlledField.Input
            {...{ control, errors }}
            {...register(`${fieldName}.${index}.label`)}
            errors={errors}
            label={t('forms.dRepData.referenceDescription')}
            name={`${fieldName}.${index}.label`}
            helpfulText={t('forms.dRepData.referenceDescriptionHelpfulText')}
            dataTestId={`${type}-reference-description-${index + 1}-input`}
            errorDataTestId={`${type}-reference-description-${index + 1}-error`}
            helpfulTextDataTestId={`${type}-reference-description-${
              index + 1
            }-hint`}
            rules={Rules.LINK_DESCRIPTION}
          />
          <ControlledField.Input
            {...{ control, errors }}
            {...register(`${fieldName}.${index}.uri`)}
            errors={errors}
            endAdornment={
              references.length > 1 ? (
                <DeleteOutlineIcon
                  color="primary"
                  data-testid={`delete-link-${index + 1}-button`}
                  sx={{ cursor: 'pointer', height: 24, with: 24 }}
                  onClick={() => removeLink(index)}
                />
              ) : null
            }
            label={t('forms.dRepData.referenceURL')}
            layoutStyles={{ mb: 3 }}
            name={`${fieldName}.${index}.uri`}
            dataTestId={`${type}-reference-url-${index + 1}-input`}
            errorDataTestId={`${type}-reference-url-${index + 1}-error`}
            helpfulTextDataTestId={`${type}-reference-url-${index + 1}-hint`}
            rules={Rules.LINK_URL}
          />
        </Fragment>
      ))}
      {references?.length < MAX_NUMBER_OF_LINKS ? (
        <Button
          data-testid={`add-${type}-reference-button`}
          onClick={addLink}
          size="extraLarge"
          variant="text"
        >
          {t('addLink')}
        </Button>
      ) : null}
    </Box>
  );
};

const getEmptyReference = (type: 'Link' | 'Identity') => ({
  '@type': type,
  uri: '',
  label: '',
});
