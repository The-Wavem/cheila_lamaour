import React from 'react';
import { Card } from '@mui/material';
import { PUBLIC_BRAND } from '@/theme/branding';

const PublicCard = ({
    children,
    tone = 'paper',
    beforeGradient,
    hoverable = false,
    sx,
    ...props
}) => {
    const toneStyles = {
        paper: {
            bgcolor: PUBLIC_BRAND.colors.textOnDark,
            border: `1px solid ${PUBLIC_BRAND.colors.primaryBorderSoft}`,
            boxShadow: PUBLIC_BRAND.shadows.card,
        },
        gradient: {
            background: PUBLIC_BRAND.gradients.testimonial,
            boxShadow: PUBLIC_BRAND.shadows.testimonial,
            color: PUBLIC_BRAND.colors.textOnDark,
        },
    };

    return (
        <Card
            {...props}
            sx={{
                borderRadius: '30px',
                position: 'relative',
                overflow: 'hidden',
                ...toneStyles[tone],
                ...(beforeGradient
                    ? {
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '5px',
                            background: beforeGradient,
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                        },
                    }
                    : {}),
                ...(hoverable
                    ? {
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'translateY(-12px)',
                            boxShadow: PUBLIC_BRAND.shadows.cardHover,
                        },
                        '&:hover::before': {
                            opacity: 1,
                        },
                    }
                    : {}),
                ...sx,
            }}
        >
            {children}
        </Card>
    );
};

export default PublicCard;