import React from 'react';
import { Box, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { PUBLIC_BRAND } from '@/theme/branding';

const SectionLinkCTA = ({ text, to }) => {
    return (
        <Box sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
        }}>
            <Typography
                component={Link}
                to={to}
                sx={{
                    textDecoration: 'none',
                    color: PUBLIC_BRAND.colors.primaryDark,
                    fontSize: '18px',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    mb: 2,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                        color: PUBLIC_BRAND.colors.primary,
                        transform: 'translateY(-2px)'
                    }
                }}
            >
                {text}
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Typography>

            <Box sx={{
                width: '300px',
                height: '3px',
                background: PUBLIC_BRAND.gradients.sectionLine,
                borderRadius: '2px'
            }} />
        </Box>
    );
};

export default SectionLinkCTA;