import { useCallback } from 'react';
import { Controller, get } from 'react-hook-form';

import { CheckboxFieldProps, Field } from '../field';
import { ControlledFieldProps, RenderInputProps } from './types';

export type ControlledCheckboxProps = ControlledFieldProps &
  Omit<CheckboxFieldProps, 'onChange' | 'value'>;

export const Checkbox = ({
  control,
  name,
  errors,
  rules,
  ...props
}: ControlledCheckboxProps) => {
  const errorMessage = get(errors, name)?.message as string;

  const renderInput = useCallback(
    ({ field }: RenderInputProps) => (
      <Field.Checkbox
        checked={!!field.value}
        errorMessage={errorMessage}
        name={field.name}
        onChange={field.onChange}
        value={field.value}
        {...props}
      />
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
