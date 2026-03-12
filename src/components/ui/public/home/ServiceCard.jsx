import React from 'react';
import { Box, CardContent, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PublicCard from '@/components/ui/public/base/PublicCard';
import { PUBLIC_BRAND } from '@/theme/branding';

const ServiceCard = ({ title, description, icon, isFeatured = false }) => {
    return (
        <PublicCard
            hoverable
            beforeGradient={PUBLIC_BRAND.gradients.cardTop}
            sx={{
                flex: 1,
                maxWidth: '350px',
                boxShadow: isFeatured
                    ? PUBLIC_BRAND.shadows.card
                    : PUBLIC_BRAND.shadows.card,
                borderRadius: '24px',
                overflow: 'visible',
                '&:hover': {
                    '& .icon-circle': {
                        transform: 'scale(1.1) rotate(10deg)',
                        boxShadow: PUBLIC_BRAND.shadows.iconHover,
                    },
                    '& .saiba-mais': {
                        gap: 2
                    }
                }
            }}
        >
            <CardContent sx={{ p: 5 }}>
                <Box
                    className="icon-circle"
                    sx={{
                        width: '80px',
                        height: '80px',
                        background: PUBLIC_BRAND.gradients.ctaPrimary,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: PUBLIC_BRAND.colors.textOnDark,
                        mb: 4,
                        boxShadow: PUBLIC_BRAND.shadows.icon,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '10%',
                            left: '10%',
                            width: '30%',
                            height: '30%',
                            background: 'rgba(255, 255, 255, 0.3)',
                            borderRadius: '50%',
                            filter: 'blur(8px)'
                        }
                    }}
                >
                    {icon}
                </Box>

                <Typography
                    variant="h6"
                    sx={{
                        color: PUBLIC_BRAND.colors.primaryDark,
                        fontWeight: 'bold',
                        fontSize: '22px',
                        mb: 2,
                        lineHeight: 1.3
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        color: PUBLIC_BRAND.colors.textSecondary,
                        lineHeight: 1.8,
                        mb: 4,
                        fontSize: '15px'
                    }}
                >
                    {description}
                </Typography>

                <Box
                    className="saiba-mais"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: PUBLIC_BRAND.colors.accent,
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '15px',
                        transition: 'gap 0.3s ease',
                        '&:hover': {
                            color: PUBLIC_BRAND.colors.primaryDark,
                        }
                    }}
                >
                    <Typography sx={{ fontWeight: 600, fontSize: '15px' }}>
                        Saiba mais
                    </Typography>
                    <ArrowForwardIcon sx={{ fontSize: 18 }} />
                </Box>
            </CardContent>
        </PublicCard>
    );
};

export default ServiceCard;