// src/components/CostSummary.jsx
import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  useTheme,
  Grid
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import MajorWidgetsDisplay from './cost-summary/MajorWidgetsDisplay';
import TotalCost from './cost-summary/TotalCost';
import MinorWidgetsDisplay from './cost-summary/MinorWidgetsDisplay';

const CostSummary = ({ vehicle }) => {
  const theme = useTheme();
  

  // Calculate total costs over ownership period
  const calculations = useMemo(() => {
    if (!vehicle) return null;
    
    const {
      purchasePrice,
      fuelType,
      fuelEfficiency,
      fuelPrice,
      annualMileage,
      insuranceCost,
      maintenanceCost,
      yearsOfOwnership
    } = vehicle;
    
    // Convert string inputs to numbers
    const price = Number(purchasePrice);
    const years = Number(yearsOfOwnership);
    const annualMiles = Number(annualMileage);
    const insurance = Number(insuranceCost);
    const maintenance = Number(maintenanceCost);
    const fuelPriceNum = Number(fuelPrice);
    
    // Calculate fuel costs
    let fuelCostPerYear = 0;
    if (fuelType === 'electric') {
      // Electricity cost using miles/kWh
      const milesPerKwh = Number(fuelEfficiency);
      const kwhPerYear = annualMiles / milesPerKwh;
      fuelCostPerYear = kwhPerYear * fuelPriceNum;
    } else {
      // Gas/Diesel cost
      const mpg = Number(fuelEfficiency);
      const gallonsPerYear = annualMiles / mpg;
      fuelCostPerYear = gallonsPerYear * fuelPriceNum;
    }
    
    // Calculate total costs
    const totalFuelCost = fuelCostPerYear * years;
    const totalInsuranceCost = insurance * years;
    const totalMaintenanceCost = maintenance * years;
    const totalCost = price + totalFuelCost + totalInsuranceCost + totalMaintenanceCost;
    
    // Calculate cost per mile
    const totalMiles = annualMiles * years;
    const costPerMile = totalCost / totalMiles;
    
    return {
      purchaseCost: price,
      fuelCost: totalFuelCost,
      insuranceCost: totalInsuranceCost,
      maintenanceCost: totalMaintenanceCost,
      totalCost,
      costPerMile,
      costPerYear: totalCost / years,
      fuelCostPerYear
    };
  }, [vehicle]);
  
  if (!vehicle || !calculations) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">No vehicle data available</Typography>
        </CardContent>
      </Card>
    );
  }

  // Get color based on fuel type
  const getFuelTypeColor = () => {
    switch(vehicle.fuelType) {
      case 'electric':
        return '#64b5f6'; // Light blue for electric
      case 'hybrid':
        return '#81c784'; // Light green for hybrid
      case 'diesel':
        return '#ffb74d'; // Orange for diesel
      default:
        return theme.palette.primary.main; // Primary color for gas
    }
  };
  
  const fuelTypeColor = getFuelTypeColor();
  
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        height: '100%',
        boxShadow: '0 8px 40px -12px rgba(0,0,0,0.2)',
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 16px 70px -12px rgba(0,0,0,0.25)',
        },
        borderRadius: 2
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <DirectionsCarIcon 
            sx={{ 
              color: fuelTypeColor,
              fontSize: 28 
            }} 
          />
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              ml: 2,
              color: 'primary.main',
              fontWeight: 500
            }}
          >
            {vehicle.name} - Cost Summary
          </Typography>
        </Box>
        
        {/* Calculated Cost Summary Widgets */}
        <Grid container spacing={3}>
          <MajorWidgetsDisplay 
            vehicle={vehicle} 
            calculations={calculations} 
            fuelTypeColor={fuelTypeColor} 
          />
        </Grid>

        <Divider sx={{ my: 3 }} />
        
        {/* Total Cost Summary Box */}
        <TotalCost calculations={calculations} />

        {/* Per-year and Per-mile metrics */}
        <Grid container spacing={3}>
          <MinorWidgetsDisplay calculations={calculations} />
        </Grid>
      </CardContent>
    </Card>
  );
};


export default CostSummary;