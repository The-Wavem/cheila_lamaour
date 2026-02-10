import { Box, Typography } from '@mui/material';
import DashboardHeader from '@/sections/admin/dashboard/DashboardHeader';
import StatsOverview from '@/sections/admin/dashboard/StatsOverview';
import ActionWidgets from '@/sections/admin/dashboard/ActionWidgets';
import { BRAND } from '@/theme/branding';
import AnalyticsCharts from '@/sections/admin/dashboard/AnalyticsCharts';
 
export default function Dashboard() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND.background, pb: 8 }}>
      {/* 1. Cabeçalho com Data e Saudação */}
      <DashboardHeader />

      {/* 2. Visão Geral (Métricas) */}
      <Box sx={{ mt: 4 }}>
        <StatsOverview />
      </Box>

      {/* 3. Gráficos de Análise */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: BRAND.textSecondary, letterSpacing: 1 }}>
          ANÁLISE DE PERFORMANCE
        </Typography>
        <AnalyticsCharts /> 
      </Box>

      {/* 4. Ações e Widgets */}
      <Box sx={{ mt: 5 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            fontWeight: 'bold',
            color: BRAND.textSecondary,
            letterSpacing: 1,
          }}
        >
          ACESSO RÁPIDO
        </Typography>
        <ActionWidgets />
      </Box>
    </Box>
  );
}