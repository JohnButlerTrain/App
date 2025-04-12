import React from 'react';
import { Grid } from '@mui/material';
import MajorWidget from './MajorWidget';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BuildIcon from '@mui/icons-material/Build';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const MajorWidgetsDisplay = ({ vehicle, calculations, fuelTypeColor }) => {
  const widgets = [
    {
      icon: AttachMoneyIcon,
      title: 'Purchase Price',
      cost: calculations.purchaseCost,
      details: '',
      color: fuelTypeColor,
    },
    {
      icon: LocalGasStationIcon,
      title: `Fuel Cost (${vehicle.yearsOfOwnership} years)`,
      cost: calculations.fuelCost,
      details: `${calculations.fuelCostPerYear.toLocaleString(undefined, { maximumFractionDigits: 2 })} per year`,
      color: fuelTypeColor,
    },
    {
      icon: VerifiedUserIcon,
      title: `Insurance (${vehicle.yearsOfOwnership} years)`,
      cost: calculations.insuranceCost,
      details: `${vehicle.insuranceCost.toLocaleString(undefined, { maximumFractionDigits: 2 })} per year`,
      color: fuelTypeColor,
    },
    {
      icon: BuildIcon,
      title: `Maintenance (${vehicle.yearsOfOwnership} years)`,
      cost: calculations.maintenanceCost,
      details: `${vehicle.maintenanceCost.toLocaleString(undefined, { maximumFractionDigits: 2 })} per year`,
      color: fuelTypeColor,
    },
  ];

  return (
    <>
      {widgets.map((widget, index) => (
        <Grid item xs={12} md={6} key={index}>
          <MajorWidget
            icon={widget.icon}
            title={widget.title}
            cost={widget.cost}
            details={widget.details}
            color={widget.color}
          />
        </Grid>
      ))}
    </>
  );
};

export default MajorWidgetsDisplay;