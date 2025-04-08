// src/components/CostSummary.jsx
import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box
} from '@mui/material';

const CostSummary = ({ vehicle }) => {
  // Calculate total costs over ownership period
  const calculations = useMemo(() => {
    if (!vehicle) return null;
    
    const {
      purchasePrice,
      fuelType,
      fuelEfficiency,
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
    
    // Calculate fuel costs
    let fuelCostPerYear = 0;
    if (fuelType === 'electric') {
      // Electricity cost (average $0.14 per kWh)
      const kwhPer100Miles = Number(fuelEfficiency);
      const costPer100Miles = kwhPer100Miles * 0.14;
      fuelCostPerYear = (annualMiles / 100) * costPer100Miles;
    } else {
      // Gas/Diesel cost (average $3.50 per gallon)
      const mpg = Number(fuelEfficiency);
      const gallonsPerYear = annualMiles / mpg;
      fuelCostPerYear = gallonsPerYear * 3.50;
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
      costPerYear: totalCost / years
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
  
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {vehicle.name} - Cost Summary
        </Typography>
        
        <List>
          <ListItem>
            <ListItemText 
              primary="Purchase Price" 
              secondary={`$${calculations.purchaseCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} 
            />
          </ListItem>
          
          <ListItem>
            <ListItemText 
              primary={`Fuel Cost (${vehicle.yearsOfOwnership} years)`} 
              secondary={`$${calculations.fuelCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} 
            />
          </ListItem>
          
          <ListItem>
            <ListItemText 
              primary={`Insurance Cost (${vehicle.yearsOfOwnership} years)`} 
              secondary={`$${calculations.insuranceCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} 
            />
          </ListItem>
          
          <ListItem>
            <ListItemText 
              primary={`Maintenance Cost (${vehicle.yearsOfOwnership} years)`} 
              secondary={`$${calculations.maintenanceCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}`} 
            />
          </ListItem>
          
          <Divider />
          
          <ListItem>
            <ListItemText 
              primary={<Typography variant="h6">Total Cost of Ownership</Typography>} 
              secondary={<Typography variant="h5" color="primary">
                ${calculations.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </Typography>} 
            />
          </ListItem>
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Cost per year: ${calculations.costPerYear.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Cost per mile: ${calculations.costPerMile.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </Typography>
          </Box>
        </List>
      </CardContent>
    </Card>
  );
};

export default CostSummary;
