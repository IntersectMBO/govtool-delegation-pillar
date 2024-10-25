import type { TypographyProps } from '../Typography';
import { Typography } from '../Typography';

export type FormHelpfulTextProps = {
  dataTestId?: string;
  helpfulText?: string;
  sx?: TypographyProps['sx'];
};

export const FormHelpfulText = ({
  dataTestId,
  helpfulText,
  sx,
}: FormHelpfulTextProps) => {
  if (!helpfulText) return null;

  return (
    <Typography
      color="#9792B5"
      data-testid={
        dataTestId ?? `${helpfulText.replace(/\s+/g, '-').toLowerCase()}-error`
      }
      fontSize={12}
      fontWeight={400}
      sx={{ mt: 0.5, ...sx }}
    >
      {helpfulText}
    </Typography>
  );
};
