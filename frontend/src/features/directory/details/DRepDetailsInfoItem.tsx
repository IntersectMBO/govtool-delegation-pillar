import { PropsWithChildren } from 'react';
import { Box, Skeleton } from '@mui/material';

import { Typography } from '@/components';

type DrepDetailsInfoItemProps = PropsWithChildren & {
  label: string;
  text?: string | null;
  dataTestId: string;
  isValidating?: boolean;
};

export const DRepDetailsInfoItem = ({
  children,
  label,
  text,
  dataTestId,
  isValidating,
}: DrepDetailsInfoItemProps) => {
  if (!children && !text) return null;
  const dataTestIdInfoItemCategoryPrefix = 'info-item';
  return (
    <Box
      sx={{
        maxWidth: {
          xxs: '295px',
          md: '100%',
        },
      }}
    >
      {isValidating ? (
        <Skeleton sx={{ mb: 0.5 }} width="128px" height="20px" variant="text" />
      ) : (
        <Box
          sx={{
            mb: 0.5,
          }}
        >
          <Typography
            color="neutralGray"
            fontWeight={600}
            variant="body2"
            data-testid={`${dataTestId}-${dataTestIdInfoItemCategoryPrefix}-title`}
            component="h2"
          >
            {label}
          </Typography>
        </Box>
      )}
      <div
        data-testid={`${dataTestId}-${dataTestIdInfoItemCategoryPrefix}-description`}
      >
        {isValidating ? (
          <Skeleton
            variant="text"
            width="100%"
            height="20px"
            sx={{ maxWidth: 608 }}
          />
        ) : (
          <>
            {text && (
              <Typography
                fontWeight={400}
                sx={{ maxWidth: 608 }}
                variant="body1"
              >
                {text}
              </Typography>
            )}
            {children}
          </>
        )}
      </div>
    </Box>
  );
};
