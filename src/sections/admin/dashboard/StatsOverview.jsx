import { useEffect, useState } from 'react';
import { Grid, Card, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PublicIcon from '@mui/icons-material/Public';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { BRAND } from '@/theme/branding'; // Ajuste o path se necessário
import { getLeadsStats } from '@/services/homeAPI';
import { getHomeAccessStats } from '@/services/analytics';

function StatCard({ title, value, icon, iconColor }) {
  return (
    <Card 
      elevation={0}
      sx={{ 
        height: '100%', 
        display: 'flex', alignItems: 'center', p: 3, 
        borderRadius: 3,
        boxShadow: BRAND.shadowSoft,
        bgcolor: BRAND.paper,
        transition: '0.3s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: BRAND.shadowHover }
      }}
    >
      <Box sx={{ 
        p: 2, borderRadius: '50%', 
        bgcolor: `${iconColor}15`, // 15% de opacidade da cor passada
        color: iconColor, mr: 2.5 
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" sx={{ color: BRAND.textSecondary, fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: BRAND.textPrimary }}>
          {value}
        </Typography>
      </Box>
    </Card>
  );
}

export default function StatsOverview({ filterOptions = { periodDays: 7 } }) { 
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalGeneralAccesses: 0,
    totalUniqueAccesses: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [leads, accessStats] = await Promise.all([
          getLeadsStats(filterOptions),
          getHomeAccessStats(filterOptions)
        ]);

        setStats({
          totalLeads: leads.length,
          totalGeneralAccesses: accessStats.totalGeneralAccesses,
          totalUniqueAccesses: accessStats.totalUniqueAccesses
        });
      } catch (error) {
        console.error('Erro ao carregar visão geral do dashboard:', error);
      }
    };

    loadStats();
  }, [filterOptions]);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard 
          title="Total de Leads" 
          value={stats.totalLeads} 
          icon={<TrendingUpIcon fontSize="large" />} 
          iconColor={BRAND.primary}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard 
          title="Acessos na Home" 
          value={stats.totalGeneralAccesses} 
          icon={<PublicIcon fontSize="large" />} 
          iconColor={BRAND.secondary}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard 
          title="Visitantes Únicos" 
          value={stats.totalUniqueAccesses} 
          icon={<VerifiedUserIcon fontSize="large" />} 
          iconColor={BRAND.primaryDark}
        />
      </Grid>
    </Grid>
  );
}