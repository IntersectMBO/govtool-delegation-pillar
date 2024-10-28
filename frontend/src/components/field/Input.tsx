import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';

import { testIdFromLabel } from 'utils';
import { Input as InputBase, InputProps } from '../input';
import { Typography, TypographyProps } from '../Typography';
import { FormHelpfulText } from './FormHelpfulText';
import { FormErrorMessage } from './FormErrorMessage';

export type InputFieldProps = InputProps & {
  errorDataTestId?: string;
  errorMessage?: string;
  errorStyles?: TypographyProps;
  helpfulTextDataTestId?: string;
  helpfulText?: string;
  helpfulTextStyle?: TypographyProps;
  label?: string;
  labelStyles?: TypographyProps;
  layoutStyles?: BoxProps;
};

export const Input = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      errorDataTestId,
      errorMessage,
      errorStyles,
      helpfulTextDataTestId,
      helpfulText,
      helpfulTextStyle,
      label,
      labelStyles,
      layoutStyles,
      onBlur,
      onFocus,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
      inputRef.current?.focus();
    }, []);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
      inputRef.current?.blur();
    }, []);

    useImperativeHandle(
      ref,
      () =>
        ({
          focus: handleFocus,
          blur: handleBlur,
          ...inputRef.current,
        }) as unknown as HTMLInputElement,
      [handleBlur, handleFocus]
    );

    return (
      <Box sx={{ width: '100%', ...layoutStyles }}>
        {label && (
          <Typography
            fontWeight={400}
            sx={{ mb: 0.5 }}
            variant="body2"
            {...labelStyles}
          >
            {label}
          </Typography>
        )}
        <InputBase
          dataTestId={
            rest.dataTestId ?? `${label && `${testIdFromLabel(label)}-`}input`
          }
          errorMessage={errorMessage}
          {...rest}
          ref={inputRef}
        />
        <FormHelpfulText
          dataTestId={helpfulTextDataTestId}
          helpfulText={helpfulText}
          sx={helpfulTextStyle}
        />
        <FormErrorMessage
          dataTestId={errorDataTestId}
          errorMessage={errorMessage}
          sx={errorStyles}
        />
      </Box>
    );
  }
);
