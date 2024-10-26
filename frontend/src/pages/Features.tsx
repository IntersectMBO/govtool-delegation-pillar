import { useState, MouseEvent } from 'react';
import { Link, Outlet, matchPath, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Typography } from 'components';
import { PATHS } from 'consts';

const EXCLUDED_PATHS = ['home', 'dashboard', 'dRepDetails', 'editDRepMetadata'];

export const Features = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { pathname } = useLocation();

  const pathKey = Object.entries(PATHS).find(([, pattern]) =>
    matchPath(pattern, pathname)
  )?.[0];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
        radial-gradient(ellipse at 0vw 20vh, rgba(214, 226, 255, 0.5) 0%, rgba(214, 226, 255, 0.5) 20%, transparent 40%),
        radial-gradient(ellipse at 80% 90%, rgba(255, 203, 173, 0.5) 0%, rgba(255, 203, 173, 0.4) 20%, transparent 40%)`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <AppBar position="fixed" sx={{ borderRadius: 0 }}>
        <Toolbar sx={{ gap: 2 }}>
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <Typography variant="headline5" color="#fff">
              Delegation Pillar
            </Typography>
          </Link>
          <Typography variant="title2" color="#fff9">
            {'/ '}
            {pathKey}
          </Typography>
          <IconButton
            id="basic-button"
            edge="end"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ ml: 'auto' }}
          >
            <MenuIcon htmlColor="#fff" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {Object.entries(PATHS)
              .filter(([key]) => !EXCLUDED_PATHS.includes(key))
              .map(([key, path]) => (
                <MenuItem key={key} component={Link} to={path}>
                  {key}
                </MenuItem>
              ))}
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          p: 6,
          pt: 12,
          width: '100%',
          maxWidth: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <Outlet />
      </Box>

      <Box
        sx={(theme) => ({
          width: '100%',
          backgroundColor: theme.palette.boxShadow2,
          px: 3,
          py: 1,
          mt: 'auto',
        })}
      >
        <Typography variant="caption">© 2024 Intersect MBO</Typography>
      </Box>
    </Box>
  );
};
