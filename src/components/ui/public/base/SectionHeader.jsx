import React from 'react';
import { Box, Typography } from '@mui/material';
import { PUBLIC_BRAND } from '@/theme/branding';

const SectionHeader = ({
    overline,
    overlineIcon,
    title,
    subtitle,
    align = 'left',
    color = PUBLIC_BRAND.colors.textPrimary,
    decorativeLine = null
}) => {
    const textAlign = align;
    const alignment = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
    const contentAlignment = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: alignment,
                textAlign,
                width: '100%'
            }}
        >
            {overline && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
                        gap: 1,
                        mb: 1.5,
                        width: '100%'
                    }}
                >
                    {overlineIcon && (
                        <Box
                            component="span"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                color: PUBLIC_BRAND.colors.accent
                            }}
                        >
                            {overlineIcon}
                        </Box>
                    )}
                    <Typography
                        variant="overline"
                        sx={{
                            color: PUBLIC_BRAND.colors.accent,
                            letterSpacing: '0.24em',
                            fontWeight: 600,
                            lineHeight: 1.2
                        }}
                    >
                        {overline}
                    </Typography>
                </Box>
            )}

            {title && (
                <Typography
                    variant="h2"
                    sx={{
                        color,
                        fontWeight: 'bold',
                        lineHeight: 1.1,
                        mb: subtitle ? 2 : 0
                    }}
                >
                    {title}
                </Typography>
            )}

            {subtitle && (
                <Typography
                    variant="body1"
                    sx={{
                        color,
                        opacity: 0.78,
                        maxWidth: '60ch'
                    }}
                >
                    {subtitle}
                </Typography>
            )}

            {decorativeLine && (
                <Box
                    sx={{
                        width: decorativeLine.width || '100px',
                        height: decorativeLine.height || '4px',
                        background: decorativeLine.background || PUBLIC_BRAND.gradients.accentLine,
                        borderRadius: decorativeLine.borderRadius || '2px',
                        mt: decorativeLine.mt ?? 1.5,
                        mb: decorativeLine.mb ?? 0,
                        alignSelf: contentAlignment,
                        ...decorativeLine.sx
                    }}
                />
            )}
        </Box>
    );
};

export default SectionHeader;