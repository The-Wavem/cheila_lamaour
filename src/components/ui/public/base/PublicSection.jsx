import React from 'react';
import { Box } from '@mui/material';

const PublicSection = ({
    children,
    background,
    padding = '100px 60px',
    justifyContent = 'center',
    alignItems,
    sx,
}) => {
    return (
        <Box
            sx={{
                width: '100%',
                background,
                padding,
                display: 'flex',
                justifyContent,
                alignItems,
                position: 'relative',
                overflow: 'hidden',
                ...sx,
            }}
        >
            {children}
        </Box>
    );
};

export default PublicSection;