import React from 'react';
import { Button } from '@mui/material';
const PublicButton = ({ variant = 'publicPrimary', sx, children, ...props }) => {
  return (
    <Button
      {...props}
      variant={variant}
      sx={{
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default PublicButton;