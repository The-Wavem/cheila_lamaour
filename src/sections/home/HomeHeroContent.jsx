import React from 'react';
import { Box, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { PUBLIC_BRAND } from '@/theme/branding';

const HomeHeroContent = ({ headline, subheadline }) => {
    return (
        <>
            <Typography
                variant="h1"
                sx={{
                    fontFamily: PUBLIC_BRAND.fonts.display,
                    fontSize: { xs: '52px', sm: '64px', md: '80px', lg: '96px' },
                    color: PUBLIC_BRAND.colors.textOnDark,
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    lineHeight: 1.1,
                    mb: 1,
                    textWrap: 'balance'
                }}
            >
                {headline}
            </Typography>

            <Box sx={{
                width: { xs: '160px', sm: '220px' },
                height: '6px',
                background: PUBLIC_BRAND.gradients.accentLine,
                mt: 2,
                ml: 0,
                borderRadius: '3px',
                boxShadow: '0 2px 10px rgba(251, 174, 54, 0.4)',
                alignSelf: { xs: 'center', md: 'flex-start' }
            }}>
            </Box>

            <Typography
                variant="h6"
                sx={{
                    fontFamily: PUBLIC_BRAND.fonts.body,
                    color: PUBLIC_BRAND.colors.textOnDark,
                    mt: 3,
                    ml: 0,
                    fontSize: { xs: '1rem', sm: '1.05rem', md: '1.15rem', lg: '1.2rem' },
                    fontWeight: 400,
                    letterSpacing: '0.04em',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    maxWidth: '32ch'
                }}
            >
                {subheadline.includes('•') || subheadline.includes('-') ? (
                    subheadline.split(/[-•]/).map((item, index, arr) => (
                        <React.Fragment key={index}>
                            {item.trim()}
                            {index < arr.length - 1 && (
                                <span style={{ color: PUBLIC_BRAND.colors.accent, fontSize: '1.5rem', margin: '0 8px' }}>•</span>
                            )}
                        </React.Fragment>
                    ))
                ) : (
                    subheadline
                )}
            </Typography>
        </>
    );
};

export default HomeHeroContent;