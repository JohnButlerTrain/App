// filepath: c:\Users\Bradley James\Documents\Code\App\src\components\PerMileCostChart.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Paper, Typography } from '@mui/material';

const PerMileCostChart = ({ vehicles }) => {
  // Prepare data for the chart
  const data = vehicles.map((vehicle, index) => {
    const { name, totalCost, annualMileage, yearsOfOwnership, totalfuelCost, insuranceCost, maintenanceCost } = vehicle;

    // Calculate per-mile costs for each factor
    const totalMiles = annualMileage * yearsOfOwnership;
    const fuelPerMile = totalfuelCost / totalMiles;
    const insurancePerMile = (insuranceCost * yearsOfOwnership) / totalMiles;
    const maintenancePerMile = (maintenanceCost * yearsOfOwnership) / totalMiles;

    return {
      name: name || `Vehicle ${index + 1}`,
      fuelPerMile: fuelPerMile.toFixed(2),
      insurancePerMile: insurancePerMile.toFixed(2),
      maintenancePerMile: maintenancePerMile.toFixed(2),
    };
  });

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.default',
        mt: 4,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
        Per-Mile Cost Breakdown
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: 'Cost per Mile ($)',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Bar dataKey="fuelPerMile" stackId="a" fill="#8884d8" name="Fuel Cost" />
          <Bar dataKey="insurancePerMile" stackId="a" fill="#82ca9d" name="Insurance Cost" />
          <Bar dataKey="maintenancePerMile" stackId="a" fill="#ffc658" name="Maintenance Cost" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default PerMileCostChart;