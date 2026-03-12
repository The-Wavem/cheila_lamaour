import React from 'react';
import { Box, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { PUBLIC_BRAND } from '@/theme/branding';

const HomeHeroContent = ({ headline, subheadline }) => {
    return (
        <>
            <AutoAwesomeIcon sx={{
                fontSize: 45,
                color: PUBLIC_BRAND.colors.accent,
                mb: 2,
                filter: 'drop-shadow(0 4px 8px rgba(251, 174, 54, 0.3))'
            }} />

            <Typography
                variant="h1"
                sx={{
                    fontFamily: PUBLIC_BRAND.fonts.display,
                    fontSize: '110px',
                    color: PUBLIC_BRAND.colors.textOnDark,
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                    lineHeight: 1.1,
                    mb: 1
                }}
            >
                {headline}
            </Typography>

            <Box sx={{
                width: '220px',
                height: '6px',
                background: PUBLIC_BRAND.gradients.accentLine,
                mt: 2,
                ml: 2,
                borderRadius: '3px',
                boxShadow: '0 2px 10px rgba(251, 174, 54, 0.4)'
            }}>
            </Box>

            <Typography
                variant="h6"
                sx={{
                    fontFamily: PUBLIC_BRAND.fonts.body,
                    color: PUBLIC_BRAND.colors.textOnDark,
                    mt: 3,
                    ml: 2,
                    fontSize: '1.3rem',
                    fontWeight: 400,
                    letterSpacing: '1px',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
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