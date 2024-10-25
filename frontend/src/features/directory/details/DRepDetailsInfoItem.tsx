import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';

import { Typography } from 'components';

type DrepDetailsInfoItemProps = PropsWithChildren & {
  label: string;
  text?: string | null;
  dataTestId: string;
};

export const DRepDetailsInfoItem = ({
  children,
  label,
  text,
  dataTestId,
}: DrepDetailsInfoItemProps) => {
  if (!children && !text) return null;
  const dataTestIdInfoItemCategoryPrefix = 'info-item';
  return (
    <div>
      <Box sx={{ mb: 0.5 }}>
        <Typography
          color="neutralGray"
          fontWeight={600}
          variant="body2"
          data-testid={`${dataTestId}-${dataTestIdInfoItemCategoryPrefix}-title`}
        >
          {label}
        </Typography>
      </Box>
      <div
        data-testid={`${dataTestId}-${dataTestIdInfoItemCategoryPrefix}-description`}
      >
        {text && (
          <Typography fontWeight={400} sx={{ maxWidth: 608 }} variant="body1">
            {text}
          </Typography>
        )}
        {children}
      </div>
    </div>
  );
};
