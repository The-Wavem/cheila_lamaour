import { Box, Typography } from '@mui/material';
import DashboardHeader from '@/sections/admin/dashboard/DashboardHeader';
import StatsOverview from '@/sections/admin/dashboard/StatsOverview';
import ActionWidgets from '@/sections/admin/dashboard/ActionWidgets';
import { BRAND } from '@/theme/branding';
 
export default function Dashboard() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND.background, pb: 4 }}>
      {/* 1. Cabeçalho com Data e Saudação */}
      <DashboardHeader />

      {/* 2. Visão Geral (Métricas) */}
      <Box sx={{ mt: 4 }}>
        <StatsOverview />
      </Box>

      {/* 3. Ações e Widgets */}
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

      {/* Área do Gráfico (Futuro) - Estilizado com o Tema */}
      <Box
        sx={{
          mt: 5,
          p: 6,
          bgcolor: BRAND.paper,
          borderRadius: 3,
          textAlign: 'center',
          border: `1px dashed ${BRAND.border}`,
          color: BRAND.textSecondary,
        }}
      >
        <Typography>📈 Gráfico de Performance Semanal (Em breve)</Typography>
      </Box>
    </Box>
  );
}