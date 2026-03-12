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
            <Box sx={{ display: 'flex', gap: 3, mt: 5, ml: 2 }}>
                <PublicButton
                    variant="publicAccent"
                    startIcon={<EmailIcon />}
                    href={ctaLink || '#contact'}
                    sx={{
                        px: 4,
                        py: 1.8,
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
                    }}
                >
                    {secondaryCtaText || 'Minha história'}
                </PublicButton>
            </Box>

            <PublicBadge
                variant="glass"
                icon={<AutoAwesomeIcon sx={{ fontSize: 20, color: PUBLIC_BRAND.colors.accent }} />}
                sx={{
                    mt: 6,
                    ml: 2,
                }}>
                {experienceText}
            </PublicBadge>
        </>
    );
};

export default HomeHeroActions;