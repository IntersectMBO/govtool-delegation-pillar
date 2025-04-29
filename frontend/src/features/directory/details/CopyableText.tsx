import { ButtonBase } from '@mui/material';

import { Typography } from '@/components';
import { ICONS } from '@/consts';

const ellipsisStyles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

type CopyableTextProps = {
  value: string;
  dataTestId: string;
  isSemiTransparent?: boolean;
};

export const CopyableText = ({
  value,
  dataTestId,
  isSemiTransparent,
}: CopyableTextProps) => (
  <ButtonBase
    onClick={(e) => {
      navigator.clipboard.writeText(value.toString());
      e.stopPropagation();
    }}
    data-testid={dataTestId}
    sx={{
      gap: 1,
      maxWidth: '100%',
      '&:hover': {
        opacity: 0.6,
        transition: 'opacity 0.3s',
      },
    }}
  >
    <Typography
      color="primary"
      fontWeight={500}
      sx={{ ...ellipsisStyles, opacity: isSemiTransparent ? 0.75 : 1 }}
    >
      {value}
    </Typography>
    <img alt="" src={ICONS.copyBlueIcon} />
  </ButtonBase>
);
