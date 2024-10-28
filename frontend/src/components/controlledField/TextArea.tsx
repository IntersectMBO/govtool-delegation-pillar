import { useCallback } from 'react';
import { Controller, get } from 'react-hook-form';

import { TextAreaFieldProps, Field } from '../field';
import { ControlledFieldProps, RenderInputProps } from './types';

type ControlledTextAreaProps = ControlledFieldProps & TextAreaFieldProps;

export const TextArea = ({
  control,
  name,
  errors,
  rules,
  ...props
}: ControlledTextAreaProps) => {
  const errorMessage = get(errors, name)?.message as string;

  const renderInput = useCallback(
    ({ field }: RenderInputProps) => (
      <Field.TextArea {...props} {...field} errorMessage={errorMessage} />
    ),
    [errorMessage, props]
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={renderInput}
    />
  );
};
