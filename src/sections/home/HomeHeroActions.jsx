import React from 'react';
import { Box, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmailIcon from '@mui/icons-material/Email';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PublicBadge from '@/components/ui/public/base/PublicBadge';
import PublicButton from '@/components/ui/public/base/PublicButton';
import { PUBLIC_BRAND } from '@/theme/branding';

const HomeHeroActions = ({
    ctaText,
    ctaLink,
    secondaryCtaText,
    secondaryCtaLink,
    experienceText
}) => {
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                width: '100%',
                gap: 2,
                mt: { xs: 4, md: 5 },
                ml: 0,
                justifyContent: { xs: 'center', md: 'flex-start' },
                alignItems: { xs: 'stretch', sm: 'center' }
            }}>
                <PublicButton
                    variant="publicAccent"
                    startIcon={<EmailIcon />}
                    href={ctaLink || '#contact'}
                    sx={{
                        px: 4,
                        py: 1.8,
                        minWidth: { sm: 190 },
                        width: { xs: '100%', sm: 'auto' },
                    }}
                >
                    {ctaText}
                </PublicButton>

                <PublicButton
                    variant="publicGlass"
                    startIcon={<MenuBookIcon />}
                    href={secondaryCtaLink || '#sobre'}
                    sx={{
                        px: 4,
                        py: 1.8,
                        minWidth: { sm: 190 },
                        width: { xs: '100%', sm: 'auto' },
                    }}
                >
                    {secondaryCtaText || 'Minha história'}
                </PublicButton>
            </Box>

            <PublicBadge
                variant="glass"
                icon={<AutoAwesomeIcon sx={{ fontSize: 20, color: PUBLIC_BRAND.colors.accent }} />}
                sx={{
                    mt: { xs: 4, md: 5 },
                    ml: 0,
                    alignSelf: { xs: 'center', md: 'flex-start' },
                    px: { xs: 2.5, md: 3 },
                }}>
                {experienceText}
            </PublicBadge>
        </>
    );
};

export default HomeHeroActions;