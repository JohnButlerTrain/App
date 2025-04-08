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
  ResponsiveContainer,
  ReferenceLine,
  Label
} from 'recharts';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  useTheme,
  Paper,
  Divider,
  Grid
} from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// More scientific color palette - less vibrant, more distinct
const COLORS = ['#0366d6', '#d73a49', '#28a745', '#6f42c1', '#e36209', '#005cc5'];

const ComparisonChart = (props) => {
  const { vehicles } = props;
  const theme = useTheme();
  
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
          const milesPerKwh = Number(fuelEfficiency);
          const kwhPerYear = annualMiles / milesPerKwh;
          fuelCostPerYear = kwhPerYear * fuelPriceNum;
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
        <Paper
          elevation={3}
          sx={{ 
            p: 2, 
            borderRadius: 1,
            bgcolor: 'background.paper',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            maxWidth: 300,
            border: '1px solid #e0e0e0' // Add border for more technical feel
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Year {label}
          </Typography>
          
          <Divider sx={{ my: 1 }} />
          
          {payload.map((entry, index) => {
            // Extract actual vehicle name from the data
            const vehicleIndex = entry.dataKey.replace('vehicle', '');
            const vehicleName = chartData[label][`vehicle${vehicleIndex}Name`];
            
            return (
              <Box key={`item-${index}`} sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                mb: 0.5,
                fontFamily: '"Roboto Mono", monospace' // Monospace font for data
              }}>
                <Typography variant="body2" sx={{ 
                  color: entry.color,
                  fontWeight: 500,
                  mr: 2
                }}>
                  {vehicleName}:
                </Typography>
                <Typography variant="body2">
                  ${entry.value.toLocaleString(undefined, { 
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2 // Consistent decimal places
                  })}
                </Typography>
              </Box>
            );
          })}
        </Paper>
      );
    }
    return null;
  };

  // Calculate cost difference between vehicles at final year
  const costComparison = useMemo(() => {
    if (!chartData || chartData.length === 0 || vehicles.length < 2) return null;
    
    const finalYear = chartData[chartData.length - 1];
    const results = [];
    
    // Find vehicle with lowest final cost
    let lowestCost = Infinity;
    let lowestVehicleIndex = 0;
    
    for (let i = 0; i < vehicles.length; i++) {
      const vehicleCost = finalYear[`vehicle${i}`];
      if (vehicleCost < lowestCost) {
        lowestCost = vehicleCost;
        lowestVehicleIndex = i;
      }
    }
    
    // Calculate savings compared to lowest cost vehicle
    for (let i = 0; i < vehicles.length; i++) {
      if (i === lowestVehicleIndex) continue;
      
      const costDifference = finalYear[`vehicle${i}`] - lowestCost;
      const percentage = (costDifference / lowestCost) * 100;
      
      results.push({
        higherCostVehicle: finalYear[`vehicle${i}Name`],
        lowerCostVehicle: finalYear[`vehicle${lowestVehicleIndex}Name`],
        savings: costDifference,
        percentage: percentage
      });
    }
    
    return {
      lowestCostVehicle: finalYear[`vehicle${lowestVehicleIndex}Name`],
      comparisons: results
    };
  }, [chartData, vehicles]);
  
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
    <Box sx={{ 
      width: '100%', 
      mt: 4, // Add margin top to separate from other elements
    
      clear: 'both' // Ensure it clears any floating elements
    }}>
      <Card 
        variant="outlined"
        sx={{ 
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          borderRadius: 1,
          width: '100%',
          border: '1px solid #e0e0e0',
          display: 'block' // Force block display
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TimelineIcon 
              sx={{ 
                color: theme.palette.primary.main,
                fontSize: 24
              }} 
            />
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                ml: 2,
                color: 'text.primary',
                fontWeight: 500
              }}
            >
              Vehicle Cost Analysis
            </Typography>
          </Box>
          
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: '#f8f9fa',
              mb: 3,
              height: 550,
              width: '100%',
              border: '1px solid #e0e0e0',
              overflow: 'hidden' // Prevent overflow
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year" 
                  label={{ 
                    value: 'Ownership Period (Years)', 
                    position: 'insideBottom', 
                    offset: -12,
                    fill: theme.palette.text.primary
                  }}
                  tick={{ fill: theme.palette.text.primary }}
                />
                <YAxis 
                  label={{ 
                    
                    angle: -90, 
                    position: 'insideLeft',
                    fill: theme.palette.text.primary
                  }}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  tick={{ fill: theme.palette.text.primary }}
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
                    strokeWidth={4}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </Box>
          
          {costComparison && vehicles.length > 1 && (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 1,
                bgcolor: '#f8f9fa',
                border: '1px solid #e0e0e0'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <InfoOutlinedIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                  Comparative Analysis
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                {costComparison.lowestCostVehicle} has the lowest total cost of ownership over the analysis period.
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                {costComparison.comparisons.map((comparison, index) => (
                  <Grid item xs={12} key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">
                        {comparison.higherCostVehicle} vs. {comparison.lowerCostVehicle}:
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: '"Roboto Mono", monospace' }}>
                        +${comparison.savings.toLocaleString(undefined, { 
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2 
                        })} ({comparison.percentage.toFixed(2)}%)
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ComparisonChart;