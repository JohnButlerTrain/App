import React from 'react';
import { Grid } from '@mui/material';
import MinorWidget from './MinorWidget';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';

const MinorWidgetsDisplay = ({ calculations }) => {
  const widgets = [
    {
      icon: AccessTimeIcon,
      title: 'Cost per Year',
      value: `$${calculations.costPerYear.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
    },
    {
      icon: SpeedIcon,
      title: 'Cost per Mile',
      value: `$${calculations.costPerMile.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
    },
  ];

  return (
    <>
      {widgets.map((widget, index) => (
        <Grid item xs={12} md={6} key={index}>
          <MinorWidget
            icon={widget.icon}
            title={widget.title}
            value={widget.value}
          />
        </Grid>
      ))}
    </>
  );
};

export default MinorWidgetsDisplay;