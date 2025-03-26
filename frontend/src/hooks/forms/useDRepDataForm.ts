import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';

import { useModal, usePillarContext } from '@/context';
import { downloadJson, ellipsizeText } from '@/utils';
import { DRepDataFormValues, MetadataValidationStatus } from '@/types';
import { useRegisterVoter } from '../actions/useRegisterVoter';
import { useUpdateVoter } from '../actions/useUpdateVoter';
import { useMetadataStorageErrorModal } from '../modal/useMetadataStorageErrorModal';

export const defaultDRepDataFormValues: DRepDataFormValues = {
  doNotList: false,
  givenName: '',
  objectives: '',
  motivations: '',
  qualifications: '',
  paymentAddress: '',
  linkReferences: [{ '@type': 'Link', uri: '', label: '' }],
  identityReferences: [{ '@type': 'Identity', uri: '', label: '' }],
  storeData: false,
  storingURL: '',
};

export const useDRepDataForm = ({
  type,
  onCancel,
}: {
  type: 'register' | 'edit';
  onCancel?: () => void;
}) => {
  // Local state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hash, setHash] = useState<string | null>(null);

  // App Management
  const { validateMetadata, generateMetadata, createJsonLD, createHash } =
    usePillarContext();
  const { t } = useTranslation();
  const { closeModal, openModal } = useModal();
  const { registerVoter } = useRegisterVoter();
  const { updateVoter } = useUpdateVoter();
  const openMetadataStorageErrorModal = useMetadataStorageErrorModal();

  // Form
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    register,
    reset,
    watch,
  } = useFormContext<DRepDataFormValues>();
  const givenName = watch('givenName');
  const isError = Object.keys(errors).length > 0;

  // Navigation
  const backToForm = useCallback(() => {
    window.scrollTo(0, 0);
    if (onCancel) onCancel();
    closeModal();
  }, [onCancel]);

  const onClickDownloadJson = async () => {
    const { linkReferences, identityReferences, ...rest } = getValues();
    const json = createJsonLD({
      ...rest,
      references: [...(linkReferences ?? []), ...(identityReferences ?? [])],
    });
    setHash(createHash(json));
    downloadJson(json, ellipsizeText(givenName, 16, ''));
  };

  const showLoadingModal = useCallback(() => {
    openModal({
      type: 'loadingModal',
      state: {
        title: t('modals.pendingValidation.title'),
        message: t('modals.pendingValidation.message'),
        dataTestId: 'storing-information-loading',
      },
    });
  }, []);

  const onSubmit = useCallback(
    async (data: DRepDataFormValues) => {
      const uri = data.storingURL;

      try {
        if (!hash) throw MetadataValidationStatus.INVALID_HASH;

        setIsLoading(true);
        showLoadingModal();

        await validateMetadata(uri, hash);

        if (type === 'register') await registerVoter({ hash, uri });
        else await updateVoter({ hash, uri });
      } catch (error: any) {
        openMetadataStorageErrorModal({
          error,
          onContinueAction: backToForm,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [registerVoter, updateVoter, hash]
  );

  return {
    control,
    errors,
    generateMetadata,
    getValues,
    isError,
    isSubmitting: isLoading,
    isValid,
    onClickDownloadJson,
    register,
    onSubmit: handleSubmit(onSubmit),
    watch,
    reset,
  };
};
