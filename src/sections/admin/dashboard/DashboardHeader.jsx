import { Box, Typography, Stack } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function DashboardHeader() {
    // Pegando a data atual formatada (Ex: "Quinta-feira, 05 de Fevereiro")
    const today = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    });

    return (
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
            <Box>
                <Typography variant="h4" fontWeight="bold" color="#333">
                    Bem-vinda, Cheila! 
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Aqui está o resumo do seu negócio hoje.
                </Typography>
            </Box>

            {/* Widget de Data no canto direito */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'white',
                px: 3, py: 1.5,
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                mt: { xs: 2, sm: 0 }
            }}>
                <CalendarTodayIcon sx={{ color: '#009688', mr: 1.5 }} />
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary" sx={{ textTransform: 'capitalize' }}>
                    {today}
                </Typography>
            </Box>
        </Stack>
    );
}