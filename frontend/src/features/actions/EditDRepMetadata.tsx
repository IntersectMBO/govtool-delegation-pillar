import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { defaultDRepDataFormValues } from 'hooks';
import { EditDRepForm } from './editMetadata/EditDRepForm';
import { EditDRepStoreDataInfo } from './editMetadata/EditDRepStoreDataInfo';
import { EditDRepStorageInformation } from './editMetadata/EditDRepStorageInformation';

type Props = {
  onCancel: () => void;
};

export const EditDRepMetadata = ({ onCancel }: Props) => {
  const [step, setStep] = useState<number>(1);
  const [loadUserData, setLoadUserData] = useState(true);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: defaultDRepDataFormValues,
  });

  return (
    <FormProvider {...methods}>
      {step === 1 && (
        <EditDRepForm
          onClickCancel={onCancel}
          setStep={setStep}
          loadUserData={loadUserData}
          setLoadUserData={setLoadUserData}
        />
      )}
      {step === 2 && <EditDRepStoreDataInfo setStep={setStep} />}
      {step === 3 && <EditDRepStorageInformation setStep={setStep} />}
    </FormProvider>
  );
};
