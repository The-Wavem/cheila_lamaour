import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import PublicCard from '@/components/ui/public/base/PublicCard';
import { PUBLIC_BRAND } from '@/theme/branding';

const TestimonialHighlight = ({ clientName, text }) => {
    return (
        <PublicCard tone="gradient" sx={{
            width: '100%',
            maxWidth: '1200px',
            padding: '80px',
            mt: 12,
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
            }
        }}>
            <FormatQuoteIcon sx={{
                position: 'absolute',
                top: 40,
                right: 60,
                fontSize: 100,
                color: 'rgba(255, 255, 255, 0.1)',
                transform: 'rotate(180deg)'
            }} />

            <Box
                sx={{
                    position: 'absolute',
                    top: 40,
                    left: 40,
                    width: 60,
                    height: 60,
                    background: PUBLIC_BRAND.gradients.logoBadge,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: PUBLIC_BRAND.colors.textOnDark,
                    fontWeight: 'bold',
                    fontSize: '1.6rem',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)'
                    }
                }}
            >
                CL
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1
            }}>
                <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                            key={star}
                            sx={{
                                fontSize: 45,
                                color: PUBLIC_BRAND.colors.accent,
                                filter: 'drop-shadow(0 4px 8px rgba(251, 174, 54, 0.3))',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.2) rotate(15deg)'
                                }
                            }}
                        />
                    ))}
                </Box>

                <Typography
                    sx={{
                        color: PUBLIC_BRAND.colors.textOnDark,
                        fontSize: '26px',
                        lineHeight: 1.7,
                        mb: 5,
                        maxWidth: '900px',
                        fontStyle: 'italic',
                        fontWeight: 300,
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    "{text}"
                </Typography>

                <Typography
                    sx={{
                        color: PUBLIC_BRAND.colors.textOnDark,
                        fontSize: '19px',
                        fontWeight: '600',
                        letterSpacing: '0.5px'
                    }}
                >
                    - {clientName}
                </Typography>
            </Box>
        </PublicCard>
    );
};

export default TestimonialHighlight;