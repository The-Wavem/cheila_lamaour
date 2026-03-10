import { useState } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useLocation, useNavigate } from 'react-router-dom';
import ToastNotification from '@components/ui/ToastNotification';
import { signInAdmin, getAuthErrorMessage } from '@services/auth';
import { BRAND } from '@theme/branding';

const INITIAL_FORM = {
  email: '',
  password: ''
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', type: 'error' });

  const redirectTo = location.state?.from?.pathname || '/admin';

  const handleChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setToast({ open: true, message: 'Preencha e-mail e senha para continuar.', type: 'warning' });
      return;
    }

    setIsSubmitting(true);

    try {
      await signInAdmin(formData.email.trim(), formData.password);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setToast({
        open: true,
        message: getAuthErrorMessage(error),
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
        background: 'linear-gradient(135deg, #F7FAFC 0%, #E6FFFA 100%)'
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 460,
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          boxShadow: BRAND.shadowHover,
          border: '1px solid #E2E8F0'
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1.5} alignItems="flex-start">
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '18px',
                display: 'grid',
                placeItems: 'center',
                bgcolor: '#E6FFFA',
                color: BRAND.primary
              }}
            >
              <LockOutlinedIcon />
            </Box>

            <Box>
              <Typography variant="h4" sx={{ fontFamily: BRAND.fontFamilyHeader, fontWeight: 700, color: BRAND.textPrimary }}>
                Login do Admin
              </Typography>
              <Typography variant="body1" sx={{ color: BRAND.textSecondary, mt: 1 }}>
                Somente usuarios autorizados no Firebase Authentication podem acessar o painel administrativo.
              </Typography>
            </Box>
          </Stack>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="E-mail"
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                fullWidth
                autoComplete="email"
              />

              <TextField
                label="Senha"
                type="password"
                value={formData.password}
                onChange={handleChange('password')}
                fullWidth
                autoComplete="current-password"
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  mt: 1,
                  py: 1.3,
                  borderRadius: 2,
                  bgcolor: BRAND.primary,
                  '&:hover': { bgcolor: BRAND.primaryDark }
                }}
              >
                {isSubmitting ? 'Entrando...' : 'Entrar no painel'}
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>

      <ToastNotification
        open={toast.open}
        onClose={() => setToast((current) => ({ ...current, open: false }))}
        message={toast.message}
        type={toast.type}
      />
    </Box>
  );
}