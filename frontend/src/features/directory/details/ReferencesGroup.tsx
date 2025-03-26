import { Box, Link } from '@mui/material';

import { Typography } from '@/components';
import { ICONS } from '@/consts';
import { testIdFromLabel } from '@/utils';

type ReferenceItem = {
  label: string;
  uri: string;
};

export const ReferencesGroup = ({
  references,
}: {
  references: ReferenceItem[];
}) => (
  <Box display="flex" flexDirection="column" gap={3}>
    {references.map(({ label, uri }) => (
      <ReferencesLink key={uri} label={label} uri={uri} />
    ))}
  </Box>
);

const ReferencesLink = ({ label, uri }: ReferenceItem) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
    <Typography fontWeight={400}>{label}</Typography>
    <Link
      data-testid={`${testIdFromLabel(label)}-link`}
      href={uri}
      target="_blank"
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex',
        gap: 1,
        alignItems: 'center',
      }}
    >
      <Typography
        color="primary"
        fontWeight={400}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {uri}
      </Typography>
      <img alt="link" height={16} src={ICONS.externalLinkIcon} width={16} />
    </Link>
  </Box>
);
