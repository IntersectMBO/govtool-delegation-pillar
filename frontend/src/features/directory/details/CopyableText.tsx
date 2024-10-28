import { ButtonBase } from '@mui/material';

import { Typography } from 'components';
import { ICONS } from 'consts';

const ellipsisStyles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

type CopyableTextProps = {
  value: string;
  dataTestId: string;
};

export const CopyableText = ({ value, dataTestId }: CopyableTextProps) => (
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
    <Typography color="primary" fontWeight={500} sx={ellipsisStyles}>
      {value}
    </Typography>
    <img alt="" src={ICONS.copyBlueIcon} />
  </ButtonBase>
);
