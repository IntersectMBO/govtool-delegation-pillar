import { useCallback } from 'react';
import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';

import { Checkbox as CheckboxBase, CheckboxProps } from '../input';
import { Typography, TypographyProps } from '../Typography';
import { FormHelpfulText } from './FormHelpfulText';
import { FormErrorMessage } from './FormErrorMessage';

export type CheckboxFieldProps = CheckboxProps & {
  errorMessage?: string;
  errorStyles?: TypographyProps;
  helpfulText?: string;
  helpfulTextStyle?: TypographyProps;
  label?: string;
  labelStyles?: TypographyProps;
  layoutStyles?: BoxProps;
};

export const Checkbox = ({
  errorMessage,
  errorStyles,
  helpfulText,
  helpfulTextStyle,
  label,
  labelStyles,
  layoutStyles,
  onChange,
  value,
  ...rest
}: CheckboxFieldProps) => {
  const handleValue = useCallback(() => {
    onChange(!value);
  }, [value]);

  return (
    <Box sx={{ width: '100%', ...layoutStyles }}>
      <Box
        onClick={handleValue}
        sx={{
          alignItems: 'center',
          cursor: 'pointer',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gridTemplateAreas: '"checkbox label" ". helpfulText"',
          width: 'fit-content',
        }}
      >
        <CheckboxBase
          {...{ onChange, value }}
          errorMessage={errorMessage}
          {...rest}
        />
        {label && (
          <Typography variant="caption" {...labelStyles}>
            {label}
          </Typography>
        )}
        <FormHelpfulText
          helpfulText={helpfulText}
          sx={{ gridArea: 'helpfulText', ...helpfulTextStyle }}
        />
      </Box>
      <FormErrorMessage errorMessage={errorMessage} sx={errorStyles} />
    </Box>
  );
};
