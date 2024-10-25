import { Dispatch, SetStateAction, useCallback, useState } from 'react';
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
import { MetadataValidationStatus, DRepDataFormValues } from 'types';
import {
  downloadJson,
  ellipsizeText,
  generateJsonld,
  generateMetadataBody,
} from 'utils';

import { useValidateMutation } from '../mutations/metadataValidation';
import { useRegisterVoter } from '../actions/useRegisterVoter';

export const defaultRegisterAsDRepValues: DRepDataFormValues = {
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

export const useRegisterAsdRepForm = (
  setStep?: Dispatch<SetStateAction<number>>
) => {
  // Local state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hash, setHash] = useState<string | null>(null);
  const [json, setJson] = useState<NodeObject | null>(null);

  // App Management
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { closeModal, openModal } = useModal();
  const { registerVoter, isRegistering } = useRegisterVoter();

  // Queries
  const { validateMetadata } = useValidateMutation();

  // Form
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    register,
    watch,
  } = useFormContext<DRepDataFormValues>();

  const givenName = watch('givenName');
  const isError = Object.keys(errors).length > 0;

  // Navigation
  const backToForm = useCallback(() => {
    window.scrollTo(0, 0);
    setStep?.(2);
    closeModal();
  }, [setStep]);

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
      try {
        if (!hash) throw MetadataValidationStatus.INVALID_HASH;

        setIsLoading(true);
        showLoadingModal();

        const { status } = await validateMetadata({
          url: data.storingURL,
          hash,
        });

        if (status) {
          throw status;
        }

        await registerVoter({ hash, uri: data.storingURL });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    [registerVoter, hash]
  );

  return {
    control,
    errors,
    generateMetadata,
    getValues,
    isError,
    isRegistrationAsDRepLoading: isLoading || isRegistering,
    isValid,
    onClickDownloadJson,
    register,
    registerAsDrep: handleSubmit(onSubmit),
    watch,
  };
};
