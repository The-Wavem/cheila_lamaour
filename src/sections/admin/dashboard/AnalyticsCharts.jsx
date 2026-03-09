import { useEffect, useState } from 'react';
import { 
  Box, Grid, Paper, Typography, Stack, useMediaQuery, useTheme
} from '@mui/material';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, LabelList
} from 'recharts';
import { BRAND } from '@/theme/branding';
import { getLeadsStats } from '@/services/homeAPI';
import { getHomeAccessStats } from '@/services/analytics';
import { buildPreviousRange, buildTimelineFromRange, formatRangeLabel, resolveFilterRange } from '@/services/analyticsDateRange';

const PIE_COLORS = [BRAND.primary, BRAND.secondary, '#2D3748', '#A0AEC0'];
const ACCESS_COLORS = [BRAND.primary, BRAND.secondary];
const DEFAULT_ORIGIN_ITEM = [{ name: 'Sem origem', value: 0 }];

const getXAxisInterval = (periodDays) => {
  if (periodDays <= 7) {
    return 0;
  }

  if (periodDays <= 15) {
    return 1;
  }

  return 3;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const pointData = payload[0].payload;
    const relativeTimeLabel = pointData.daysAgo === 0
      ? 'Hoje'
      : pointData.daysAgo === 1
        ? 'Ontem'
        : `${pointData.daysAgo} dias atrás`;

    return (
      <Box sx={{ 
        bgcolor: 'white', p: 1.5, border: '1px solid #eee', 
        boxShadow: BRAND.shadowHover || '0 4px 20px rgba(0,0,0,0.1)', borderRadius: 2 
      }}>
        <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
          {pointData.fullDateLabel}
        </Typography>
        <Typography variant="caption" display="block" color="text.secondary" sx={{ mb: 0.5 }}>
          {relativeTimeLabel}
        </Typography>
        <Typography variant="body2" color={BRAND.primary} fontWeight="bold">
          {payload[0].value} {payload[0].name === 'leads' ? 'Novos Contatos' : 'Acessos'}
        </Typography>
      </Box>
    );
  }
  return null;
};

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} y={y} 
      fill={BRAND.textPrimary || '#333'} 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      style={{ fontSize: '12px', fontWeight: 'bold' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const getOriginTotal = (items) => items.reduce((total, item) => total + item.value, 0);

function OriginList({ data }) {
  const safeData = data.length ? data : DEFAULT_ORIGIN_ITEM;
  const total = getOriginTotal(safeData);

  return (
    <Stack spacing={1.25} sx={{ mt: 1 }}>
      {safeData.map((entry, index) => {
        const percent = total ? Math.round((entry.value / total) * 100) : 0;

        return (
          <Stack
            key={`${entry.name}-${index}`}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              p: 1.25,
              borderRadius: 2,
              bgcolor: '#F8FAFC',
              border: '1px solid #EDF2F7'
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ minWidth: 0 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: PIE_COLORS[index % PIE_COLORS.length], flexShrink: 0 }} />
              <Typography variant="body2" sx={{ color: BRAND.textPrimary, fontWeight: 600 }} noWrap>
                {entry.name}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography variant="caption" sx={{ color: BRAND.textSecondary, fontWeight: 700 }}>
                {percent}%
              </Typography>
              <Typography variant="body2" sx={{ color: BRAND.textPrimary, fontWeight: 700 }}>
                {entry.value}
              </Typography>
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}

function OriginCard({ title, description, data, isMobile, comparison }) {
  const safeData = data.length ? data : DEFAULT_ORIGIN_ITEM;
  const total = getOriginTotal(safeData);

  return (
    <Paper 
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        boxShadow: BRAND.shadowSoft,
        minHeight: { xs: 300, md: 300 },
        minWidth: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>

      {comparison && (
        <ComparisonSummary
          currentLabel={comparison.currentLabel}
          previousLabel={comparison.previousLabel}
          currentValue={comparison.currentValue}
          previousValue={comparison.previousValue}
          accentColor={BRAND.secondary}
        />
      )}

      <Box
        sx={{
          mt: { xs: 0.5, md: 1 },
          pt: { xs: 1.75, md: 2.25 },
          borderTop: '1px solid #EDF2F7',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
      {isMobile ? (
        <OriginList data={safeData} />
      ) : (
        <>
          <Box sx={{ height: 220, position: 'relative', minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={safeData.length ? safeData : [{ name: 'Sem origem', value: 1 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                  label={renderCustomizedLabel}
                  labelLine={{ stroke: '#ccc' }}
                >
                  {safeData.map((entry, index) => (
                    <Cell key={`${entry.name}-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <Typography variant="h5" fontWeight="bold" color={BRAND.primary}>{total}</Typography>
            </Box>
          </Box>

          <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={2} sx={{ mt: 'auto', pt: 1.5 }}>
            {safeData.map((entry, index) => (
              <Stack key={`${entry.name}-legend-${index}`} direction="row" alignItems="center" spacing={0.5}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: PIE_COLORS[index % PIE_COLORS.length] }} />
                <Typography variant="caption" color="text.secondary">{entry.name}</Typography>
              </Stack>
            ))}
          </Stack>
        </>
      )}
      </Box>
    </Paper>
  );
}

const getVariation = (currentValue, previousValue) => {
  if (!previousValue) {
    return currentValue > 0 ? '+100%' : '0%';
  }

  const percent = Math.round(((currentValue - previousValue) / previousValue) * 100);
  return `${percent > 0 ? '+' : ''}${percent}%`;
};

function ComparisonSummary({ currentLabel, previousLabel, currentValue, previousValue, accentColor = BRAND.primary }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} sx={{ mb: 2 }}>
      <Box sx={{ px: 1.5, py: 1, borderRadius: 2, bgcolor: `${accentColor}12`, color: accentColor }}>
        <Typography variant="caption" sx={{ display: 'block', fontWeight: 700 }}>
          Atual
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {currentLabel}: {currentValue}
        </Typography>
      </Box>
      <Box sx={{ px: 1.5, py: 1, borderRadius: 2, bgcolor: '#F8FAFC', color: BRAND.textPrimary, border: '1px solid #EDF2F7' }}>
        <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, color: BRAND.textSecondary }}>
          Período anterior
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {previousLabel}: {previousValue}
        </Typography>
      </Box>
      <Box sx={{ px: 1.5, py: 1, borderRadius: 2, bgcolor: '#FFF8E1', color: BRAND.secondary }}>
        <Typography variant="caption" sx={{ display: 'block', fontWeight: 700 }}>
          Variação
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 700 }}>
          {getVariation(currentValue, previousValue)}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function AnalyticsCharts({ filterOptions = { periodDays: 7 }, visibleSections = ['capture', 'access', 'origin'] }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [leadOriginData, setLeadOriginData] = useState([]);
  const [accessOriginData, setAccessOriginData] = useState([]);
  const [leadsData, setLeadsData] = useState([]);
  const [accessComparisonData, setAccessComparisonData] = useState([]);
  const [acceptanceRate, setAcceptanceRate] = useState(0);
  const [comparisonStats, setComparisonStats] = useState({
    currentLabel: '',
    previousLabel: '',
    currentLeads: 0,
    previousLeads: 0,
    currentAccesses: 0,
    previousAccesses: 0,
    currentUniqueAccesses: 0,
    previousUniqueAccesses: 0,
    currentLeadOrigins: 0,
    previousLeadOrigins: 0,
    currentAccessOrigins: 0,
    previousAccessOrigins: 0
  });
  const [loading, setLoading] = useState(true);

  const showCapture = visibleSections.includes('capture');
  const showAccess = visibleSections.includes('access');
  const showOrigin = visibleSections.includes('origin');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const currentRange = resolveFilterRange(filterOptions);
        const previousRange = buildPreviousRange(currentRange);

        const [leads, homeAccessStats, previousLeads, previousHomeAccessStats] = await Promise.all([
          getLeadsStats(filterOptions),
          getHomeAccessStats(filterOptions),
          getLeadsStats({ dateRange: previousRange }),
          getHomeAccessStats({ dateRange: previousRange })
        ]);

        const counts = leads.reduce((acc, lead) => {
          const source = lead.utm_source || 'Direto';
          acc[source] = (acc[source] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.keys(counts).map(key => ({
          name: key,
          value: counts[key]
        }));

        const timeline = buildTimelineFromRange(currentRange);
        const timelineMap = new Map(timeline.map((item) => [item.key, item]));

        leads.forEach((lead) => {
          if (!lead.createdAt?.toDate) {
            return;
          }

          const createdAt = lead.createdAt.toDate();
          const key = new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate())
            .toISOString()
            .slice(0, 10);

          if (!timelineMap.has(key)) {
            return;
          }

          timelineMap.get(key).leads += 1;
        });

        const formattedLeadsData = timeline.map(({ dateLabel, fullDateLabel, daysAgo, leads }) => ({
          name: dateLabel,
          dateLabel,
          fullDateLabel,
          daysAgo,
          leads
        }));

        setLeadOriginData(formattedData);
        setAccessOriginData(homeAccessStats.originData || []);
        setLeadsData(formattedLeadsData);
        setAccessComparisonData(homeAccessStats.comparisonData);
        setAcceptanceRate(homeAccessStats.consentAcceptanceRate);
        setComparisonStats({
          currentLabel: formatRangeLabel(currentRange),
          previousLabel: formatRangeLabel(previousRange),
          currentLeads: leads.length,
          previousLeads: previousLeads.length,
          currentAccesses: homeAccessStats.totalGeneralAccesses,
          previousAccesses: previousHomeAccessStats.totalGeneralAccesses,
          currentUniqueAccesses: homeAccessStats.totalUniqueAccesses,
          previousUniqueAccesses: previousHomeAccessStats.totalUniqueAccesses,
          currentLeadOrigins: getOriginTotal(formattedData),
          previousLeadOrigins: getOriginTotal(previousLeads.reduce((acc, lead) => {
            const source = lead.utm_source || 'Direto';
            const existingItem = acc.find((item) => item.name === source);
            if (existingItem) {
              existingItem.value += 1;
            } else {
              acc.push({ name: source, value: 1 });
            }
            return acc;
          }, [])),
          currentAccessOrigins: getOriginTotal(homeAccessStats.originData || []),
          previousAccessOrigins: getOriginTotal(previousHomeAccessStats.originData || [])
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterOptions]);

  if (loading) return <Typography sx={{ p: 3 }}>Carregando dados...</Typography>;

  return (
    <Grid container spacing={3}>
      
      {/* 1. PERFORMANCE DE CAPTAÇÃO (ÁREA) */}
      {showCapture && (
      <Grid size={{ xs: 12, lg: showAccess ? 8 : 12 }} sx={{ minWidth: 0 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            minHeight: { xs: 380, md: 420 },
            boxShadow: BRAND.shadowSoft, bgcolor: 'white'
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1.5} sx={{ mb: 3 }}>
            <Box>
              <Typography variant="h6" fontWeight="bold" fontFamily={BRAND.fontFamilyHeader}>
                Performance de Captação
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Novos leads cadastrados no intervalo selecionado.
              </Typography>
            </Box>
            <Box sx={{ bgcolor: '#E0F2F1', color: BRAND.primary, px: 1.5, py: 0.5, borderRadius: 1, fontWeight: 'bold', fontSize: '0.875rem' }}>
              {leadsData.reduce((total, item) => total + item.leads, 0)} leads no período
            </Box>
          </Stack>

          <ComparisonSummary
            currentLabel={comparisonStats.currentLabel}
            previousLabel={comparisonStats.previousLabel}
            currentValue={comparisonStats.currentLeads}
            previousValue={comparisonStats.previousLeads}
          />

          <Box sx={{ mt: { xs: 0.5, md: 1 }, pt: { xs: 1.75, md: 2.25 }, borderTop: '1px solid #EDF2F7' }}>
          <Box sx={{ width: '100%', minWidth: 0, height: { xs: 265, md: 300 } }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadsData} margin={{ top: 20, right: isMobile ? 8 : 30, left: isMobile ? -18 : 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND.primary} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={BRAND.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="dateLabel"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#999', fontSize: isMobile ? 10 : 12 }}
                  dy={10}
                  interval={getXAxisInterval(leadsData.length || 7)}
                  minTickGap={leadsData.length > 15 ? 24 : 8}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: isMobile ? 10 : 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="leads" 
                  stroke={BRAND.primary} 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorLeads)" 
                >
                  <LabelList 
                    dataKey="leads" 
                    position="top" 
                    offset={10} 
                    style={{ fill: BRAND.primary, fontSize: isMobile ? 10 : 12, fontWeight: 'bold' }} 
                  />
                </Area>
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          </Box>
        </Paper>
      </Grid>
      )}

      {showAccess && (
      <Grid size={{ xs: 12, lg: showCapture ? 4 : 12 }} sx={{ minWidth: 0 }}>
        <Paper 
          elevation={0}
          sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, boxShadow: BRAND.shadowSoft, minHeight: { xs: 280, md: 420 }, minWidth: 0, height: '100%' }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'flex-start' }} spacing={1.5} sx={{ mb: 2 }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">Acessos da Home</Typography>
              <Typography variant="body2" color="text.secondary">
                Comparativo entre visitas totais e visitantes únicos com consentimento.
              </Typography>
            </Box>
            <Box sx={{ bgcolor: '#FFF8E1', color: BRAND.secondary, px: 1.5, py: 0.5, borderRadius: 1, fontWeight: 'bold', fontSize: '0.875rem' }}>
              {acceptanceRate}% aceite
            </Box>
          </Stack>

          <ComparisonSummary
            currentLabel={comparisonStats.currentLabel}
            previousLabel={comparisonStats.previousLabel}
            currentValue={comparisonStats.currentAccesses}
            previousValue={comparisonStats.previousAccesses}
            accentColor={BRAND.secondary}
          />

          <Typography variant="caption" sx={{ display: 'block', color: BRAND.textSecondary, mb: 2 }}>
            Únicos: {comparisonStats.currentUniqueAccesses} no período atual vs {comparisonStats.previousUniqueAccesses} no período anterior.
          </Typography>

          <Box sx={{ mt: { xs: 0.5, md: 1 }, pt: { xs: 1.75, md: 2.25 }, borderTop: '1px solid #EDF2F7' }}>
          <Box sx={{ width: '100%', minWidth: 0, height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accessComparisonData} margin={{ top: 16, right: 10, left: isMobile ? -18 : 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#777', fontSize: isMobile ? 10 : 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#777', fontSize: isMobile ? 10 : 12 }} allowDecimals={false} />
                <Tooltip cursor={{ fill: 'rgba(0, 150, 136, 0.06)' }} />
                <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                  {accessComparisonData.map((entry, index) => (
                    <Cell key={entry.name} fill={ACCESS_COLORS[index % ACCESS_COLORS.length]} />
                  ))}
                  <LabelList dataKey="total" position="top" style={{ fill: BRAND.textPrimary, fontSize: isMobile ? 10 : 12, fontWeight: 'bold' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
          </Box>
        </Paper>
      </Grid>
      )}

      {showOrigin && (
        <Grid size={{ xs: 12, lg: 6 }} sx={{ minWidth: 0 }}>
          <OriginCard
            title="Origem das Captações"
            description="De onde vieram os clientes que efetivamente captaram contato pelo site."
            data={leadOriginData}
            isMobile={isMobile}
            comparison={{
              currentLabel: comparisonStats.currentLabel,
              previousLabel: comparisonStats.previousLabel,
              currentValue: comparisonStats.currentLeadOrigins,
              previousValue: comparisonStats.previousLeadOrigins
            }}
          />
        </Grid>
      )}

      {showOrigin && (
        <Grid size={{ xs: 12, lg: 6 }} sx={{ minWidth: 0 }}>
          <OriginCard
            title="Origem dos Acessos da Home"
            description="De onde vieram os visitantes que chegaram na Home, sem depender do clique em botão."
            data={accessOriginData}
            isMobile={isMobile}
            comparison={{
              currentLabel: comparisonStats.currentLabel,
              previousLabel: comparisonStats.previousLabel,
              currentValue: comparisonStats.currentAccessOrigins,
              previousValue: comparisonStats.previousAccessOrigins
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}