import { Box, MenuItem, MenuList } from '@mui/material';
import { Link } from 'react-router-dom';

import { Card, Typography } from 'components';
import { PATHS } from 'consts';

const EXCLUDED_PATHS = ['home', 'dashboard', 'dRepDetails', 'editDRepMetadata'];

export const IntroPage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        pb: '10vh',
        background: `
        radial-gradient(circle, rgba(214, 226, 255, 1) 0%, transparent 70%),
        radial-gradient(circle, rgba(255, 203, 173, 0.8) 0%, transparent 70%)`,
        backgroundPosition: '-20vw -20vh, 30vw 15vh',
      }}
    >
      <Typography variant="headline2" color="primary">
        Delegation Pillar
      </Typography>
      <Card sx={{ p: 0 }}>
        <MenuList sx={{ color: '#000' }}>
          {Object.entries(PATHS)
            .filter(([key]) => !EXCLUDED_PATHS.includes(key))
            .map(([key, path]) => (
              <MenuItem
                key={key}
                component={Link}
                to={path}
                sx={{ px: 6, py: 1.5 }}
              >
                {key}
              </MenuItem>
            ))}
        </MenuList>
      </Card>
    </Box>
  );
};
