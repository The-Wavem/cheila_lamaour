import {
    Box,
    Button,
    Chip,
    Container,
    Stack,
    Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import { BRAND } from '@/theme/branding';

export default function ServicesHero({ data }) {
    const heroData = {
        title: data?.title || '',
        subtitle: data?.subtitle || '',
        bgImage: data?.bgImage || ''
    };

    const stats = [
        { value: '+25 anos', label: 'de vivência em gestão e liderança' },
        { value: '3 frentes', label: 'de atuação para momentos diferentes' },
        { value: '100% alinhado', label: 'ao posicionamento visual da marca' }
    ];

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                background: heroData.bgImage
                    ? `linear-gradient(135deg, ${alpha('#000000', 0.58)} 0%, ${alpha('#000000', 0.36)} 100%), url(${heroData.bgImage})`
                    : `linear-gradient(135deg, ${BRAND.secondaryLight} 0%, ${alpha(BRAND.primary, 0.12)} 100%)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                py: { xs: 8, md: 12 }
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                        `radial-gradient(circle at 10% 20%, ${alpha(BRAND.secondary, 0.22)} 0%, transparent 28%), ` +
                        `radial-gradient(circle at 88% 18%, ${alpha(BRAND.primary, 0.18)} 0%, transparent 26%), ` +
                        `linear-gradient(120deg, transparent 0%, ${alpha('#FFFFFF', 0.65)} 48%, transparent 100%)`
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', lg: '1.1fr 0.9fr' },
                        gap: { xs: 4, md: 6 },
                        alignItems: 'center'
                    }}
                >
                    <Stack spacing={3.5}>
                        <Typography
                            component="h1"
                            sx={{
                                fontFamily: BRAND.fontFamilyHeader,
                                fontSize: { xs: '2.6rem', md: '4.4rem' },
                                lineHeight: 1.05,
                                color: heroData.bgImage ? BRAND.paper : BRAND.textPrimary,
                                maxWidth: 780
                            }}
                        >
                            {heroData.title}
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: BRAND.fontFamilyBody,
                                fontSize: { xs: '1rem', md: '1.15rem' },
                                lineHeight: 1.9,
                                color: heroData.bgImage ? alpha(BRAND.paper, 0.9) : BRAND.textSecondary,
                                maxWidth: 720
                            }}
                        >
                            {heroData.subtitle}
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button
                                component="a"
                                href="#trilhas"
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: BRAND.primary,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '999px',
                                    boxShadow: BRAND.shadowSoft,
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    '&:hover': {
                                        bgcolor: BRAND.primaryDark
                                    }
                                }}
                            >
                                Explorar trilhas
                            </Button>
                            <Button
                                component="a"
                                href="#conversa"
                                variant="outlined"
                                size="large"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '999px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    color: BRAND.primaryDark,
                                    borderColor: alpha(BRAND.primary, 0.35),
                                    '&:hover': {
                                        borderColor: BRAND.primaryDark,
                                        bgcolor: alpha(BRAND.primary, 0.06)
                                    }
                                }}
                            >
                                Solicitar direcionamento
                            </Button>
                        </Stack>
                    </Stack>

                    <Box
                        sx={{
                            position: 'relative',
                            p: { xs: 3, md: 4 },
                            borderRadius: 2,
                            bgcolor: alpha(BRAND.paper, 0.88),
                            border: `1px solid ${alpha(BRAND.primary, 0.12)}`,
                            boxShadow: BRAND.shadowSoft,
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <Stack spacing={2.5}>
                            {stats.map((item, index) => (
                                <Box
                                    key={item.label}
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        alignItems: 'flex-start',
                                        pb: index === stats.length - 1 ? 0 : 2.5,
                                        borderBottom:
                                            index === stats.length - 1
                                                ? 'none'
                                                : `1px solid ${alpha(BRAND.border, 0.9)}`
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 52,
                                            height: 52,
                                            borderRadius: '18px',
                                            display: 'grid',
                                            placeItems: 'center',
                                            bgcolor: alpha(index === 1 ? BRAND.secondary : BRAND.primary, 0.14),
                                            color: index === 1 ? BRAND.secondary : BRAND.primaryDark,
                                            flexShrink: 0
                                        }}
                                    >
                                        {index === 0 && <WorkspacePremiumRoundedIcon />}
                                        {index === 1 && <Groups2RoundedIcon />}
                                        {index === 2 && <TrendingUpRoundedIcon />}
                                    </Box>

                                    <Box>
                                        <Typography
                                            sx={{
                                                fontFamily: BRAND.fontFamilyHeader,
                                                fontSize: '1.6rem',
                                                color: BRAND.textPrimary,
                                                lineHeight: 1.1,
                                                mb: 0.5
                                            }}
                                        >
                                            {item.value}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: BRAND.textSecondary,
                                                lineHeight: 1.7
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}