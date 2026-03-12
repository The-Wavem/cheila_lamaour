import { createTheme } from '@mui/material/styles';
import { PUBLIC_BRAND } from './branding';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: PUBLIC_BRAND.colors.primary,
      dark: PUBLIC_BRAND.colors.primaryDark,
      contrastText: PUBLIC_BRAND.colors.textOnDark,
    },
    secondary: {
      main: PUBLIC_BRAND.colors.accent,
      contrastText: PUBLIC_BRAND.colors.textOnDark,
    },
    text: {
      primary: PUBLIC_BRAND.colors.textPrimary,
      secondary: PUBLIC_BRAND.colors.textSecondary,
    },
    background: {
      default: '#ffffff',
      paper: PUBLIC_BRAND.colors.textOnDark,
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: PUBLIC_BRAND.fonts.body,
    h1: {
      fontFamily: PUBLIC_BRAND.fonts.display,
    },
    h2: {
      fontFamily: PUBLIC_BRAND.fonts.body,
      fontWeight: 700,
    },
    h3: {
      fontFamily: PUBLIC_BRAND.fonts.body,
      fontWeight: 700,
    },
    button: {
      fontFamily: PUBLIC_BRAND.fonts.body,
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          font-family: ${PUBLIC_BRAND.fonts.body};
          color: ${PUBLIC_BRAND.colors.textPrimary};
          background: #ffffff;
        }
      `,
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      variants: [
        {
          props: { variant: 'publicPrimary' },
          style: {
            background: PUBLIC_BRAND.gradients.ctaPrimary,
            color: PUBLIC_BRAND.colors.textOnDark,
            '&:hover': {
              background: PUBLIC_BRAND.gradients.ctaPrimary,
              filter: 'brightness(0.96)',
            },
          },
        },
        {
          props: { variant: 'publicAccent' },
          style: {
            backgroundColor: PUBLIC_BRAND.colors.accent,
            color: PUBLIC_BRAND.colors.textOnDark,
            boxShadow: PUBLIC_BRAND.shadows.accentSoft,
            '&:hover': {
              backgroundColor: '#e09d2f',
              transform: 'translateY(-3px)',
              boxShadow: PUBLIC_BRAND.shadows.accentHover,
            },
          },
        },
        {
          props: { variant: 'publicOutline' },
          style: {
            border: `2px solid ${PUBLIC_BRAND.colors.primary}`,
            color: PUBLIC_BRAND.colors.primary,
            '&:hover': {
              border: `2px solid ${PUBLIC_BRAND.colors.primaryDark}`,
              color: PUBLIC_BRAND.colors.textOnDark,
              backgroundColor: PUBLIC_BRAND.colors.primaryDark,
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(0, 112, 112, 0.3)',
            },
          },
        },
        {
          props: { variant: 'publicGlass' },
          style: {
            border: `2px solid ${PUBLIC_BRAND.colors.textOnDark}`,
            color: PUBLIC_BRAND.colors.textOnDark,
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              border: `2px solid ${PUBLIC_BRAND.colors.accent}`,
              color: PUBLIC_BRAND.colors.accent,
              background: PUBLIC_BRAND.colors.accentSoft,
              transform: 'translateY(-3px)',
              boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)',
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 24,
          fontSize: '16px',
          fontWeight: 600,
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundColor: 'rgba(255,255,255,0.92)',
          '& fieldset': {
            borderColor: PUBLIC_BRAND.colors.primaryBorderSoft,
          },
          '&:hover fieldset': {
            borderColor: PUBLIC_BRAND.colors.primary,
          },
          '&.Mui-focused fieldset': {
            borderColor: PUBLIC_BRAND.colors.primary,
            borderWidth: 2,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: PUBLIC_BRAND.colors.textSecondary,
          '&.Mui-focused': {
            color: PUBLIC_BRAND.colors.primaryDark,
          },
        },
      },
    },
  },
});

export default muiTheme;