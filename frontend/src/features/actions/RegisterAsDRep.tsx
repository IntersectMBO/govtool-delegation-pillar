import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { defaultDRepDataFormValues, useGetVoterInfo } from 'hooks';
import { RolesAndResponsibilities } from './registerDRep/RolesAndResponsibilities';
import { RegisterAsDRepForm } from './registerDRep/RegisterAsDRepForm';
import { DRepStoreDataInfo } from './registerDRep/DRepStoreDataInfo';
import { DRepStorageInformation } from './registerDRep/DRepStorageInformation';

type Props = {
  onCancel: () => void;
};

export const RegisterAsdRep = ({ onCancel }: Props) => {
  const [step, setStep] = useState<number>(1);
  const { voter } = useGetVoterInfo();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: defaultDRepDataFormValues,
  });

  useEffect(() => {
    if (voter?.wasRegisteredAsDRep) setStep(2);
  }, [voter?.wasRegisteredAsDRep]);

  return (
    <>
      {step === 1 && !voter?.wasRegisteredAsDRep && (
        <RolesAndResponsibilities setStep={setStep} />
      )}
      <FormProvider {...methods}>
        {step === 2 && (
          <RegisterAsDRepForm
            onClickCancel={onCancel}
            setStep={setStep}
            voter={voter}
          />
        )}
        {step === 3 && <DRepStoreDataInfo setStep={setStep} />}
        {step === 4 && <DRepStorageInformation setStep={setStep} />}
      </FormProvider>
    </>
  );
};
