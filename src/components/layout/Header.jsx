import React from 'react';
import { AppBar, Toolbar, Box, Button, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        width: '100%',
        backdropFilter: 'blur(10px)',
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Toolbar
        sx={{
          position: 'relative',
          py: 2.5,
          px: 6,
        }}
      >
        {/* Logo esquerda */}
        <Box
          onClick={() => navigate('/')}
          sx={{
            width: 50,
            height: 50,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.4rem',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
            cursor: 'pointer',
          }}
        >
          CL
        </Box>

        {/* Nav centralizado */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
          }}
        >
          <Button component={Link} to="/" color="inherit" sx={btnStyle}>
            Home
          </Button>

          <Divider orientation="vertical" flexItem sx={dividerStyle} />

          <Button href="#sobre" color="inherit" sx={btnStyle}>
            Sobre Mim
          </Button>

          <Divider orientation="vertical" flexItem sx={dividerStyle} />

          <Button component={Link} to="/agenda" color="inherit" sx={btnStyle}>
            Agendar Mentoria
          </Button>

          <Divider orientation="vertical" flexItem sx={dividerStyle} />

          <Button href="#blog" color="inherit" sx={btnStyle}>
            Blog
          </Button>

          <Divider orientation="vertical" flexItem sx={dividerStyle} />

          <Button component={Link} to="/servicos" color="inherit" sx={btnStyle}>
            Serviços
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const btnStyle = {
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 500,
  fontSize: '15px',
  color: '#333',
  textTransform: 'none',
  px: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#00A6A6',
    bgcolor: 'rgba(0, 166, 166, 0.05)',
  },
};

const dividerStyle = {
  mx: 2,
  bgcolor: 'rgba(0, 0, 0, 0.1)',
};

export default Header;
