import React from 'react';
import { AppBar, Toolbar, Box, Button, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { PUBLIC_BRAND } from '@/theme/branding';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Sobre Mim', href: '#sobre' },
  { label: 'Agendar Mentoria', to: '/agenda' },
  { label: 'Blog', href: '#blog' },
  { label: 'Serviços', to: '/servicos', hasDivider: false },
];

const APP_BAR_SX = {
  width: '100%',
  backdropFilter: 'blur(10px)',
  background: 'rgba(255, 255, 255, 0.95)',
  boxShadow: PUBLIC_BRAND.shadows.subtle,
};

const TOOLBAR_SX = {
  position: 'relative',
  py: 2.5,
  px: 6,
};

const LOGO_SX = {
  width: 50,
  height: 50,
  background: PUBLIC_BRAND.gradients.logo,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.4rem',
  boxShadow: PUBLIC_BRAND.shadows.logo,
  cursor: 'pointer',
};

const NAV_CONTAINER_SX = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  display: { xs: 'none', md: 'flex' },
  alignItems: 'center',
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={APP_BAR_SX}
    >
      <Toolbar sx={TOOLBAR_SX}>
        <Box
          onClick={() => navigate('/')}
          sx={LOGO_SX}
        >
          CL
        </Box>

        <Box sx={NAV_CONTAINER_SX}>
          {NAV_ITEMS.map((item) => (
            <React.Fragment key={item.label}>
              <Button
                component={item.to ? Link : undefined}
                to={item.to}
                href={item.href}
                color="inherit"
                sx={btnStyle}
              >
                {item.label}
              </Button>

              {item.hasDivider !== false && (
                <Divider orientation="vertical" flexItem sx={dividerStyle} />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const btnStyle = {
  fontFamily: PUBLIC_BRAND.fonts.body,
  fontWeight: 500,
  fontSize: '15px',
  color: PUBLIC_BRAND.colors.textPrimary,
  textTransform: 'none',
  px: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    color: PUBLIC_BRAND.colors.primary,
    bgcolor: PUBLIC_BRAND.colors.primarySoft,
  },
};

const dividerStyle = {
  mx: 2,
  bgcolor: 'rgba(0, 0, 0, 0.1)',
};

export default Header;
