import { Typography, Box } from '@mui/material';
import StatsOverview from '@sections/admin/dashboard/StatsOverview';

export default function Dashboard() {
    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
                Bem-vinda, Cheila!
            </Typography>

            {/* Seção de Métricas */}
            <StatsOverview />

            {/* Espaço para gráficos ou últimas atividades futuramente */}
            <Typography variant="h6" sx={{ mb: 2 }}>Últimas Atividades</Typography>
            <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 2, textAlign: 'center', color: '#999' }}>
                Gráficos virão aqui em breve...
            </Box>
        </Box>
    );
}