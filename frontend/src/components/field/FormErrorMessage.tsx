import type { TypographyProps } from '../Typography';
import { Typography } from '../Typography';

export type FormErrorMessageProps = {
  dataTestId?: string;
  errorMessage?: string;
  sx?: TypographyProps;
};

export const FormErrorMessage = ({
  dataTestId,
  errorMessage,
  sx,
}: FormErrorMessageProps) => {
  if (!errorMessage) return null;

  return (
    <Typography
      color="red"
      data-testid={
        dataTestId ?? `${errorMessage.replace(/\s+/g, '-').toLowerCase()}-error`
      }
      fontSize={12}
      fontWeight={400}
      sx={{ mt: 0.25, ...sx }}
    >
      {errorMessage}
    </Typography>
  );
};
