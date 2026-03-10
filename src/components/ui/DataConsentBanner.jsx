import { Box, Button, Paper, Typography } from '@mui/material';
import { BRAND } from '@/theme/branding';

export default function DataConsentBanner({ open, onAccept, onReject }) {
    if (!open) {
        return null;
    }

    return (
        <Paper
            elevation={0}
            sx={{
                position: 'fixed',
                bottom: 24,
                left: 24,
                right: 24,
                zIndex: 1400,
                maxWidth: 860,
                mx: 'auto',
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: BRAND.shadowHover,
                border: `1px solid ${BRAND.border}`
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { xs: 'flex-start', md: 'center' },
                    justifyContent: 'space-between',
                    gap: 2,
                    p: 3,
                    bgcolor: 'white'
                }}
            >
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: BRAND.textPrimary, mb: 0.5 }}>
                        Aceite de captura de dados
                    </Typography>
                    <Typography variant="body2" sx={{ color: BRAND.textSecondary, maxWidth: 560 }}>
                        Usamos dados de navegação para diferenciar acessos gerais e visitantes únicos da Home. Ao aceitar, seu navegador será reconhecido como visitante único para fins analíticos.
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
                    <Button
                        variant="outlined"
                        onClick={onReject}
                        sx={{
                            borderColor: BRAND.border,
                            color: BRAND.textPrimary,
                            minWidth: 130,
                            flex: { xs: 1, md: 'initial' }
                        }}
                    >
                        Recusar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onAccept}
                        sx={{
                            bgcolor: BRAND.primary,
                            '&:hover': { bgcolor: BRAND.primaryDark },
                            minWidth: 130,
                            flex: { xs: 1, md: 'initial' }
                        }}
                    >
                        Aceitar
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}