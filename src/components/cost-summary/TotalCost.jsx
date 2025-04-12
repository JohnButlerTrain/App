import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Paper } from '@mui/material';

const TotalCost = ({ calculations }) => {
  return (
    <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 2,
      bgcolor: 'primary.main',
      color: 'white',
      mb: 3
    }}
  >
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
      Total Cost of Ownership
    </Typography>
    <Typography variant="h3" sx={{ fontWeight: 600 }}>
      ${calculations.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
    </Typography>
  </Paper>
  );
};

export default TotalCost;