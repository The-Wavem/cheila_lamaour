import { forwardRef, useMemo, useState } from 'react';
import { Alert, Box, Button, Dialog, IconButton, Stack, Tab, Tabs, TextField, Typography, useMediaQuery, useTheme, Slide } from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import CloseIcon from '@mui/icons-material/Close';
import DashboardHeader from '@/sections/admin/dashboard/DashboardHeader';
import StatsOverview from '@/sections/admin/dashboard/StatsOverview';
import ActionWidgets from '@/sections/admin/dashboard/ActionWidgets';
import { BRAND } from '@/theme/branding';
import AnalyticsCharts from '@/sections/admin/dashboard/AnalyticsCharts';
import { getDateInputValue, resolveFilterRange } from '@/services/analyticsDateRange';

const PERIOD_OPTIONS = [7, 15, 30];
const CUSTOM_PERIOD_VALUE = 'custom';
const MOBILE_ANALYTICS_TABS = [
  { value: 'capture', label: 'Captação' },
  { value: 'access', label: 'Acessos' },
  { value: 'origin', label: 'Origem' }
];

const MobileChartsTransition = forwardRef(function MobileChartsTransition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
 
export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const initialRange = resolveFilterRange({ periodDays: 7 });
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  const [customRange, setCustomRange] = useState({
    startDate: getDateInputValue(initialRange.start),
    endDate: getDateInputValue(initialRange.end)
  });
  const [isChartsModalOpen, setIsChartsModalOpen] = useState(false);
  const [mobileAnalyticsTab, setMobileAnalyticsTab] = useState('capture');

  const isCustomRangeInvalid =
    selectedPeriod === CUSTOM_PERIOD_VALUE &&
    Boolean(customRange.startDate) &&
    Boolean(customRange.endDate) &&
    new Date(`${customRange.startDate}T00:00:00`).getTime() > new Date(`${customRange.endDate}T00:00:00`).getTime();

  const filterOptions = useMemo(() => (
    selectedPeriod === CUSTOM_PERIOD_VALUE
      ? { dateRange: customRange }
      : { periodDays: selectedPeriod }
  ), [customRange, selectedPeriod]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BRAND.background, pb: 8 }}>
      {/* 1. Cabeçalho com Data e Saudação */}
      <DashboardHeader />

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        sx={{ mt: 4 }}
      >

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', md: 'auto' } }}>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {PERIOD_OPTIONS.map((days) => {
            const isSelected = selectedPeriod === days;

            return (
              <Button
                key={days}
                variant={isSelected ? 'contained' : 'outlined'}
                onClick={() => setSelectedPeriod(days)}
                sx={{
                  minWidth: 84,
                  borderRadius: 999,
                  textTransform: 'none',
                  fontWeight: 700,
                  bgcolor: isSelected ? BRAND.primary : 'transparent',
                  borderColor: isSelected ? BRAND.primary : BRAND.border,
                  color: isSelected ? 'white' : BRAND.textPrimary,
                  '&:hover': {
                    bgcolor: isSelected ? BRAND.primaryDark : 'rgba(0, 150, 136, 0.06)',
                    borderColor: BRAND.primary
                  }
                }}
              >
                {days} dias
              </Button>
            );
          })}
          <Button
            variant={selectedPeriod === CUSTOM_PERIOD_VALUE ? 'contained' : 'outlined'}
            onClick={() => setSelectedPeriod(CUSTOM_PERIOD_VALUE)}
            sx={{
              minWidth: 148,
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 700,
              bgcolor: selectedPeriod === CUSTOM_PERIOD_VALUE ? BRAND.secondary : 'transparent',
              borderColor: selectedPeriod === CUSTOM_PERIOD_VALUE ? BRAND.secondary : BRAND.border,
              color: selectedPeriod === CUSTOM_PERIOD_VALUE ? 'white' : BRAND.textPrimary,
              '&:hover': {
                bgcolor: selectedPeriod === CUSTOM_PERIOD_VALUE ? '#b28e4f' : 'rgba(197, 166, 105, 0.08)',
                borderColor: BRAND.secondary
              }
            }}
          >
            Período específico
          </Button>
          </Stack>

          {selectedPeriod === CUSTOM_PERIOD_VALUE && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} sx={{ width: { xs: '100%', md: 'auto' } }}>
              <TextField
                label="Início"
                type="date"
                size="small"
                value={customRange.startDate}
                onChange={(event) => setCustomRange((prev) => ({ ...prev, startDate: event.target.value }))}
                InputLabelProps={{ shrink: true }}
                error={isCustomRangeInvalid}
                helperText={isCustomRangeInvalid ? 'A data inicial deve ser menor ou igual à final.' : ' '}
                sx={{ minWidth: 150, bgcolor: 'white', borderRadius: 2 }}
              />
              <TextField
                label="Fim"
                type="date"
                size="small"
                value={customRange.endDate}
                onChange={(event) => setCustomRange((prev) => ({ ...prev, endDate: event.target.value }))}
                InputLabelProps={{ shrink: true }}
                error={isCustomRangeInvalid}
                helperText={isCustomRangeInvalid ? 'Corrija o período para aplicar o filtro.' : ' '}
                sx={{ minWidth: 150, bgcolor: 'white', borderRadius: 2 }}
              />
            </Stack>
          )}
        </Stack>
      </Stack>

      {isCustomRangeInvalid && (
        <Alert severity="warning" sx={{ mt: 2, borderRadius: 3 }}>
          O período específico está inválido. Ajuste as datas para que a data final não seja menor que a inicial.
        </Alert>
      )}

      {isMobile && (
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<InsightsIcon />}
            onClick={() => {
              setMobileAnalyticsTab('capture');
              setIsChartsModalOpen(true);
            }}
            disabled={isCustomRangeInvalid}
            sx={{
              bgcolor: BRAND.primary,
              '&:hover': { bgcolor: BRAND.primaryDark },
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 700,
              width: '100%'
            }}
          >
            Ver gráficos em tela cheia
          </Button>
        </Box>
      )}

      {/* 2. Visão Geral (Métricas) */}
      <Box sx={{ mt: 4 }}>
        {!isCustomRangeInvalid && <StatsOverview filterOptions={filterOptions} />}
      </Box>

      {/* 3. Gráficos de Análise */}
      {!isMobile && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: BRAND.textSecondary, letterSpacing: 1 }}>
            ANÁLISE DE PERFORMANCE
          </Typography>
          {!isCustomRangeInvalid && <AnalyticsCharts filterOptions={filterOptions} />}
        </Box>
      )}

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

      <Dialog
        fullScreen
        open={isChartsModalOpen}
        onClose={() => setIsChartsModalOpen(false)}
        TransitionComponent={MobileChartsTransition}
      >
        <Box sx={{ minHeight: '100vh', bgcolor: BRAND.background, p: 2.5, pb: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: BRAND.textPrimary }}>
                Análise de Performance
              </Typography>
              <Typography variant="body2" sx={{ color: BRAND.textSecondary }}>
                Visualização otimizada para mobile.
              </Typography>
            </Box>
            <IconButton onClick={() => setIsChartsModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Tabs
            value={mobileAnalyticsTab}
            onChange={(_, nextValue) => setMobileAnalyticsTab(nextValue)}
            variant="fullWidth"
            sx={{
              mb: 2,
              bgcolor: 'white',
              borderRadius: 999,
              p: 0.5,
              minHeight: 48,
              boxShadow: BRAND.shadowSoft,
              '& .MuiTabs-indicator': {
                height: '100%',
                borderRadius: 999,
                bgcolor: BRAND.primary,
                zIndex: 0
              },
              '& .MuiTab-root': {
                minHeight: 40,
                textTransform: 'none',
                fontWeight: 700,
                color: BRAND.textSecondary,
                zIndex: 1
              },
              '& .Mui-selected': {
                color: 'white !important'
              }
            }}
          >
            {MOBILE_ANALYTICS_TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>

          <Box sx={{ animation: 'fadeInMobileCharts 240ms ease-out' }}>
            {!isCustomRangeInvalid && <AnalyticsCharts filterOptions={filterOptions} visibleSections={[mobileAnalyticsTab]} />}
          </Box>
        </Box>
      </Dialog>

      <style>
        {`
          @keyframes fadeInMobileCharts {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
}