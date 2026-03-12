import React from 'react';
import { TextField } from '@mui/material';

const PublicTextField = ({ sx, ...props }) => {
  return <TextField {...props} variant="outlined" fullWidth sx={sx} />;
};

export default PublicTextField;