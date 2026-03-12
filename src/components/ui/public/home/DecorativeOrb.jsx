import React from 'react';
import { Box } from '@mui/material';

const DecorativeOrb = ({
    width,
    height,
    top,
    bottom,
    left,
    right,
    zIndex = 1,
    background = 'linear-gradient(135deg, #FBAE36 0%, #f59e0b 100%)',
    boxShadow = '0 20px 60px rgba(251, 174, 54, 0.4)'
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
                background,
                borderRadius: '50%',
                zIndex,
                boxShadow,
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '20%',
                    left: '20%',
                    width: '40%',
                    height: '40%',
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    filter: 'blur(20px)'
                }
            }}
        />
    );
};

export default DecorativeOrb;