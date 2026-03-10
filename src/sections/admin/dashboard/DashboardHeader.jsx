import { Box, Typography, Stack } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { BRAND } from '../../../theme/branding';

export default function DashboardHeader() {
    // Lógica da data formatada
    const today = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long', day: 'numeric', month: 'long'
    });

    // Lógica de saudação baseada na hora
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
            <Box>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: BRAND.fontFamilyHeader, // Fonte Serifada da Marca
                        fontWeight: 'bold',
                        color: BRAND.textPrimary
                    }}
                >
                    {greeting}, Cheila!
                </Typography>
                <Typography variant="body1" sx={{ color: BRAND.textSecondary, mt: 0.5 }}>
                    Aqui está o resumo do seu negócio hoje.
                </Typography>
            </Box>

            {/* Widget de Data */}
            <Box sx={{
                display: 'flex', alignItems: 'center',
                bgcolor: BRAND.paper,
                px: 3, py: 1.5, borderRadius: 2,
                boxShadow: BRAND.shadowSoft, // Sombra suave do tema
                mt: { xs: 2, sm: 0 },
                borderLeft: `4px solid ${BRAND.primary}` // Detalhe verde institucional
            }}>
                <CalendarTodayIcon sx={{ color: BRAND.primary, mr: 1.5 }} />
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: BRAND.textPrimary, textTransform: 'capitalize' }}>
                    {today}
                </Typography>
            </Box>
        </Stack>
    );
}