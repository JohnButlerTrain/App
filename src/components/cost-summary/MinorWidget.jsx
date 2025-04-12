import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const MinorWidget = ({ icon: Icon, title, value }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Icon sx={{ color: 'text.secondary', mr: 1 }} />
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h6" color="text.primary">
        {value}
      </Typography>
    </Paper>
  );
};

export default MinorWidget;