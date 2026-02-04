import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArticleIcon from '@mui/icons-material/Article';

// Componente auxiliar simples para Cards
function StatCard({ title, value, icon, color }) {
    return (
        <Card sx={{ height: '100%', display: 'flex', alignItems: 'center', p: 2 }}>
            <Box sx={{ p: 1.5, borderRadius: '50%', bgcolor: `${color}20`, color: color, mr: 2 }}>
                {icon}
            </Box>
            <Box>
                <Typography color="text.secondary" variant="body2">{title}</Typography>
                <Typography variant="h4" fontWeight="bold">{value}</Typography>
            </Box>
        </Card>
    );
}

export default function StatsOverview() {
    // Dados Fakes por enquanto (Depois virão do Firebase)
    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <StatCard title="Total de Leads" value="124" icon={<TrendingUpIcon fontSize="large" />} color="#009688" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <StatCard title="Artigos Publicados" value="12" icon={<ArticleIcon fontSize="large" />} color="#C5A669" />
            </Grid>
            {/* Adicione mais cards aqui se precisar */}
        </Grid>
    );
}