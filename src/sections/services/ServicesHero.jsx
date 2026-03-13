import {
    Box,
    Container,
    Typography
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { BRAND } from '@/theme/branding.js';
import BackgroundGlow from '@/components/ui/public/home/BackgroundGlow';

export default function ServicesHero({ data }) {
    const heroData = {
        title: data?.title || '',
        subtitle: data?.subtitle || ''
    };

    return (
        <Box
            sx={{
                position: 'relative',
                overflow: 'hidden',
                bgcolor: BRAND.primary,
                py: { xs: 10, md: 15 }
            }}
        >
            <BackgroundGlow
                color={alpha(BRAND.secondary, 0.22)}
                width={{ xs: 220, md: 340 }}
                height={{ xs: 220, md: 340 }}
                top={{ xs: -80, md: -110 }}
                right={{ xs: -70, md: -90 }}
            />

            <Box
                aria-hidden="true"
                sx={{
                    position: 'absolute',
                    width: { xs: 240, md: 360 },
                    height: { xs: 240, md: 360 },
                    left: { xs: -90, md: -120 },
                    bottom: { xs: -120, md: -160 },
                    borderRadius: '50%',
                    bgcolor: alpha(BRAND.secondary, 0.16),
                    filter: 'blur(80px)',
                    zIndex: 0
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ textAlign: 'center', maxWidth: 920, mx: 'auto' }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        sx={{
                            fontFamily: BRAND.fontFamilyHeader,
                            fontWeight: 700,
                            color: BRAND.paper,
                            lineHeight: 1.1,
                            mb: 2,
                            fontSize: { xs: '2.4rem', md: '3.6rem' }
                        }}
                    >
                        {heroData.title}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: BRAND.paper,
                            fontFamily: BRAND.fontFamilyBody,
                            fontWeight: 400,
                            lineHeight: 1.7,
                            maxWidth: 760,
                            mx: 'auto'
                        }}
                    >
                        {heroData.subtitle}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}