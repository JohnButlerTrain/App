import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const MajorWidget = ({ icon: Icon, title, cost, details, color }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Icon sx={{ color, mr: 1 }} />
        <Typography variant="subtitle1">{title}</Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 500, mt: 'auto' }}>
        ${cost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </Typography>
      {/* Ternary Logic ~ if details exists, show details, else show invisible placeholder */}
      {details ? (
        <Typography variant="caption" color="text.secondary">
          ${details}
        </Typography>
      ) : (
        <Typography variant="caption" color="text.secondary" sx={{ visibility: 'hidden' }}>
          Placeholder
        </Typography>
      )}
    </Paper>
  );
};

export default MajorWidget;