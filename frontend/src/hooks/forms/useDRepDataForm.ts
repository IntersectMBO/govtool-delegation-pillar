import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { blake2bHex } from 'blakejs';
import { NodeObject } from 'jsonld';

import {
  CIP_119,
  DREP_CONTEXT,
  PATHS,
  storageInformationErrorModals,
} from 'consts';
import { useModal } from 'context';
import {
  downloadJson,
  ellipsizeText,
  generateJsonld,
  generateMetadataBody,
} from 'utils';
import { DRepDataFormValues, MetadataValidationStatus } from 'types';
import { useValidateMutation } from '../mutations/metadataValidation';
import { useRegisterVoter } from '../actions/useRegisterVoter';
import { useUpdateVoter } from '../actions/useUpdateVoter';

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
  const [json, setJson] = useState<NodeObject | null>(null);

  // App Management
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { closeModal, openModal } = useModal();
  const { registerVoter } = useRegisterVoter();
  const { updateVoter } = useUpdateVoter();

  // Queries
  const { validateMetadata } = useValidateMutation();

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

  const backToDashboard = useCallback(() => {
    navigate(PATHS.dashboard);
    closeModal();
  }, []);

  // Business Logic
  const generateMetadata = useCallback(async () => {
    const { linkReferences, identityReferences, ...rest } = getValues();
    const body = generateMetadataBody({
      data: {
        ...rest,
        references: [...(linkReferences ?? []), ...(identityReferences ?? [])],
      },
      acceptedKeys: [
        'givenName',
        'objectives',
        'motivations',
        'qualifications',
        'paymentAddress',
        'references',
        'doNotList',
      ],
      standardReference: CIP_119,
    });

    const jsonld = await generateJsonld(body, DREP_CONTEXT, CIP_119);

    const jsonHash = blake2bHex(JSON.stringify(jsonld, null, 2), undefined, 32);

    setHash(jsonHash);
    setJson(jsonld);

    return jsonld;
  }, []);

  const onClickDownloadJson = async () => {
    if (!json) return;
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
      const url = data.storingURL;

      try {
        if (!hash) throw MetadataValidationStatus.INVALID_HASH;

        setIsLoading(true);
        showLoadingModal();

        const { status } = await validateMetadata({
          url,
          hash,
        });

        if (status) {
          throw status;
        }

        if (type === 'register') await registerVoter({ hash, uri: url });
        else await updateVoter({ hash, uri: url });
      } catch (error: any) {
        openModal({
          type: 'statusModal',
          state: {
            ...storageInformationErrorModals[error as MetadataValidationStatus],
            onSubmit: backToForm,
            onCancel: backToDashboard,
          },
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
