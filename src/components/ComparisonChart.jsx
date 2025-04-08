// src/components/ComparisonChart.jsx
import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

// Array of colors for different vehicle lines
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F'];

const ComparisonChart = (props) => {
  // Make sure to access vehicles from props
  const { vehicles } = props;
  
  // Generate data for the chart
  const chartData = useMemo(() => {
    if (!vehicles || vehicles.length === 0) return [];
    
    // Find max years of ownership for chart range
    const maxYears = Math.max(...vehicles.map(v => Number(v.yearsOfOwnership)));
    
    // Create data points for each year (0 to maxYears)
    return Array.from({ length: maxYears + 1 }, (_, year) => {
      // Start with the year as a data point
      const dataPoint = { year };
      
      // Calculate cumulative cost for each vehicle at this year
      vehicles.forEach((vehicle, index) => {
        const {
          purchasePrice,
          fuelType,
          fuelEfficiency,
          fuelPrice,
          annualMileage,
          insuranceCost,
          maintenanceCost
        } = vehicle;
        
        // Convert values to numbers
        const price = Number(purchasePrice);
        const annualMiles = Number(annualMileage);
        const insurance = Number(insuranceCost);
        const maintenance = Number(maintenanceCost);
        const fuelPriceNum = Number(fuelPrice);
        
        // Calculate annual fuel cost
        let fuelCostPerYear = 0;
        if (fuelType === 'electric') {
          const kwhPerMile = Number(fuelEfficiency);
          fuelCostPerYear = annualMiles * kwhPerMile * fuelPriceNum;
        } else {
          const mpg = Number(fuelEfficiency);
          const gallonsPerYear = annualMiles / mpg;
          fuelCostPerYear = gallonsPerYear * fuelPriceNum;
        }
        
        // Calculate total cost at this year
        const vehicleCost = 
          price + // Purchase price (upfront)
          (fuelCostPerYear * year) + // Fuel costs accumulated so far
          (insurance * year) + // Insurance costs accumulated so far
          (maintenance * year); // Maintenance costs accumulated so far
        
        // Add this vehicle's cost to the data point using a safe name
        const safeVehicleName = `vehicle${index}`;
        dataPoint[safeVehicleName] = vehicleCost;
        
        // Also store the actual name for reference
        dataPoint[`${safeVehicleName}Name`] = vehicle.name;
      });
      
      return dataPoint;
    });
  }, [vehicles]);
  
  // Custom tooltip to show the actual vehicle names
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{`Year ${label}`}</p>
          {payload.map((entry, index) => {
            // Extract actual vehicle name from the data
            const vehicleIndex = entry.dataKey.replace('vehicle', '');
            const vehicleName = chartData[label][`vehicle${vehicleIndex}Name`];
            
            return (
              <p key={`item-${index}`} style={{ 
                color: entry.color,
                margin: '5px 0'
              }}>
                {`${vehicleName}: $${entry.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };
  
  if (!vehicles || vehicles.length === 0) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">Add vehicles to see cost comparison</Typography>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Cost Comparison Over Time
        </Typography>
        
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="year" 
              label={{ value: 'Years of Ownership', position: 'insideBottomRight', offset: -10 }} 
            />
            <YAxis 
              label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {vehicles.map((vehicle, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={`vehicle${index}`}
                name={vehicle.name}
                stroke={COLORS[index % COLORS.length]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;