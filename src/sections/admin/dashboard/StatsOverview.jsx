import { Grid, Card, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArticleIcon from '@mui/icons-material/Article';
import { BRAND } from '@/theme/branding'; // Ajuste o path se necessário

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

export default function StatsOverview() { 

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard 
          title="Total de Leads" 
          value="124" 
          icon={<TrendingUpIcon fontSize="large" />} 
          iconColor={BRAND.primary} // Verde
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <StatCard 
          title="Artigos Publicados" 
          value="12" 
          icon={<ArticleIcon fontSize="large" />} 
          iconColor={BRAND.secondary} // Dourado
        />
      </Grid>
    </Grid>
  );
}