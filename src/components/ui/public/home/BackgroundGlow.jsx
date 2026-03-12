import React from 'react';
import { Box } from '@mui/material';

const BackgroundGlow = ({
    color,
    width,
    height,
    top,
    bottom,
    left,
    right,
    zIndex = 0
}) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                top,
                bottom,
                left,
                right,
                width,
                height,
                borderRadius: '50%',
                background: color,
                filter: 'blur(60px)',
                zIndex
            }}
        />
    );
};

export default BackgroundGlow;