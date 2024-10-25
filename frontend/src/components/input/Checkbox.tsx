import type { ChangeEvent } from 'react';
import { useId } from 'react';
import type { CheckboxProps as MUICheckboxProps } from '@mui/material';
import { Checkbox as MUICheckbox } from '@mui/material';

export type CheckboxProps = Omit<MUICheckboxProps, 'onChange' | 'value'> & {
  dataTestId?: string;
  errorMessage?: string;
  onChange: (newValue: ChangeEvent<Element> | boolean) => void;
  value: boolean;
};

export const Checkbox = ({
  dataTestId,
  errorMessage,
  sx,
  ...props
}: CheckboxProps) => {
  const id = useId();

  return (
    <MUICheckbox
      id={id}
      inputProps={
        {
          'data-testid': dataTestId,
        } as React.InputHTMLAttributes<HTMLInputElement>
      }
      sx={{
        '& .MuiSvgIcon-root': { fontSize: 18 },
        color: errorMessage ? 'red' : '#0033AD',
        ...sx,
      }}
      {...props}
    />
  );
};
