import { 
  Box, Grid, Paper, Typography, Stack 
} from '@mui/material';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import { BRAND } from '@/theme/branding';

const leadsData = [
  { name: 'Seg', leads: 4 },
  { name: 'Ter', leads: 7 },
  { name: 'Qua', leads: 5 },
  { name: 'Qui', leads: 12 },
  { name: 'Sex', leads: 9 },
  { name: 'Sáb', leads: 3 },
  { name: 'Dom', leads: 6 },
];

const topArticlesData = [
  { name: 'Liderança Fem.', acessos: 120 },
  { name: 'Síndrome Impostor', acessos: 98 },
  { name: 'Gestão de Tempo', acessos: 86 },
  { name: 'Carreira 2026', acessos: 65 },
];

const originData = [
  { name: 'Instagram', value: 45 },
  { name: 'LinkedIn', value: 30 },
  { name: 'Google', value: 15 },
  { name: 'Indicação', value: 10 },
];

const PIE_COLORS = [BRAND.primary, BRAND.secondary, '#2D3748', '#A0AEC0'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ 
        bgcolor: 'white', 
        p: 1.5, 
        border: `1px solid ${BRAND.border}`, 
        boxShadow: BRAND.shadowHover,
        borderRadius: 2
      }}>
        <Typography variant="caption" color="text.secondary" fontWeight="bold">{label}</Typography>
        <Typography variant="body2" color={BRAND.primary} fontWeight="bold">
          {payload[0].value} {payload[0].name === 'leads' ? 'Novos Contatos' : 'Acessos'}
        </Typography>
      </Box>
    );
  }
  return null;
};

export default function AnalyticsCharts() {
  return (
    <Grid container spacing={3}>
      
      {/* 1. GRÁFICO PRINCIPAL: EVOLUÇÃO DE LEADS (Area Chart) */}
      <Grid size={{ xs: 12, lg: 8 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, borderRadius: 3, 
            boxShadow: BRAND.shadowSoft,
            bgcolor: 'white',
            display: 'flex', flexDirection: 'column'
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
            <Box>
              <Typography variant="h6" fontWeight="bold" fontFamily={BRAND.fontFamilyHeader}>
                Performance de Captação
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Novos leads cadastrados nos últimos 7 dias.
              </Typography>
            </Box>
            <Box sx={{ bgcolor: '#E0F2F1', color: BRAND.primary, px: 1.5, py: 0.5, borderRadius: 1, fontWeight: 'bold', fontSize: '0.875rem' }}>
              +12% essa semana
            </Box>
          </Stack>

          <Box sx={{ width: '100%', height: 320, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadsData}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND.primary} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={BRAND.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#999', fontSize: 12}} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="leads" stroke={BRAND.primary} strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* 2. COLUNA LATERAL (2 Gráficos Menores) */}
      <Grid size={{ xs: 12, lg: 4 }}>
        <Stack spacing={3}>
          
          {/* A. ORIGEM DO TRÁFEGO (Donut Chart) */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, borderRadius: 3, boxShadow: BRAND.shadowSoft, 
              display: 'flex', flexDirection: 'column' 
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Origem dos Contatos</Typography>
            
            <Box sx={{ position: 'relative', width: '100%', height: 250, minWidth: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={originData}
                    cx="50%" cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {originData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', pointerEvents: 'none' }}>
                <Typography variant="h4" fontWeight="bold" color={BRAND.primary}>100%</Typography>
              </Box>
            </Box>
            
            <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 1 }}>
               {originData.map((entry, index) => (
                 <Stack key={index} direction="row" alignItems="center" spacing={0.5}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: PIE_COLORS[index] }} />
                    <Typography variant="caption" color="text.secondary">{entry.name}</Typography>
                 </Stack>
               ))}
            </Stack>
          </Paper>

          {/* B. TOP ARTIGOS (Bar Chart) */}
          <Paper 
            elevation={0}
            sx={{ 
                p: 3, borderRadius: 3, boxShadow: BRAND.shadowSoft,
                display: 'flex', flexDirection: 'column'
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Top Artigos Lidos</Typography>
            
            <Box sx={{ width: '100%', height: 200, minWidth: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topArticlesData} layout="vertical" barSize={15}>
                    <XAxis type="number" hide />
                    <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100} 
                    tick={{fontSize: 11, fill: '#555'}} 
                    axisLine={false} 
                    tickLine={false}
                    />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: 8 }} />
                    <Bar dataKey="acessos" fill={BRAND.secondary} radius={[0, 4, 4, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </Box>
          </Paper>

        </Stack>
      </Grid>
    </Grid>
  );
}