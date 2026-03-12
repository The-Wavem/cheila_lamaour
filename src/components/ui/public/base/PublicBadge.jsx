import React from 'react';
import { Box, Typography } from '@mui/material';
import { PUBLIC_BRAND } from '@/theme/branding';

const PublicBadge = ({ icon, children, variant = 'glass', sx }) => {
    const variantStyles = {
        glass: {
            bgcolor: 'rgba(255, 255, 255, 0.15)',
            color: PUBLIC_BRAND.colors.textOnDark,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: PUBLIC_BRAND.shadows.glass,
        },
        soft: {
            bgcolor: PUBLIC_BRAND.colors.accentSoft,
            color: PUBLIC_BRAND.colors.primaryDark,
            border: `1px solid ${PUBLIC_BRAND.colors.accentStrongSoft}`,
        },
    };

    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                px: 3,
                py: 1.5,
                borderRadius: '50px',
                ...variantStyles[variant],
                ...sx,
            }}
        >
            {icon && <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</Box>}
            <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>{children}</Typography>
        </Box>
    );
};

export default PublicBadge;