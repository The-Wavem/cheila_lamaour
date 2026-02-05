import { Box, Typography } from '@mui/material';
import DashboardHeader from '@/sections/admin/dashboard/DashboardHeader'; // Novo
import StatsOverview from '@/sections/admin/dashboard/StatsOverview'; // Já existia (Cards de números)
import ActionWidgets from '@/sections/admin/dashboard/ActionWidgets'; // Novo

export default function Dashboard() {
    return (
        <Box>
            {/* 1. Cabeçalho com Data */}
            <DashboardHeader />

            {/* 2. Visão Geral (Números Grandes) */}
            <StatsOverview />

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#555' }}>
                    Painel de Controle
                </Typography>

                {/* 3. Widgets de Ação, Editor e Bloco de Notas */}
                <ActionWidgets />
            </Box>

            {/* Área futura para o Gráfico */}
            <Box sx={{ mt: 5, p: 4, bgcolor: 'white', borderRadius: 3, textAlign: 'center', border: '1px dashed #ccc' }}>
                <Typography color="text.secondary">
                    📈 Gráfico de Performance Semanal (Em desenvolvimento...)
                </Typography>
            </Box>
        </Box>
    );
}