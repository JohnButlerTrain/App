// src/components/CostSummary.jsx
import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  useTheme,
  Paper,
  Grid
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BuildIcon from '@mui/icons-material/Build';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SpeedIcon from '@mui/icons-material/Speed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

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
        
        <Grid container spacing={2}>
          {/* Purchase Cost */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AttachMoneyIcon sx={{ color: fuelTypeColor, mr: 1 }} />
                <Typography variant="subtitle1">Purchase Price</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 500, mt: 'auto' }}>
                ${calculations.purchaseCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </Typography>
            </Paper>
          </Grid>
          
          {/* Fuel Cost */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalGasStationIcon sx={{ color: fuelTypeColor, mr: 1 }} />
                <Typography variant="subtitle1">Fuel Cost ({vehicle.yearsOfOwnership} years)</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 500, mt: 'auto' }}>
                ${calculations.fuelCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ${calculations.fuelCostPerYear.toLocaleString(undefined, { maximumFractionDigits: 2 })} per year
              </Typography>
            </Paper>
          </Grid>
          
          {/* Insurance Cost */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <VerifiedUserIcon sx={{ color: fuelTypeColor, mr: 1 }} />
                <Typography variant="subtitle1">Insurance ({vehicle.yearsOfOwnership} years)</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 500, mt: 'auto' }}>
                ${calculations.insuranceCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ${vehicle.insuranceCost.toLocaleString(undefined, { maximumFractionDigits: 2 })} per year
              </Typography>
            </Paper>
          </Grid>
          
          {/* Maintenance Cost */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <BuildIcon sx={{ color: fuelTypeColor, mr: 1 }} />
                <Typography variant="subtitle1">Maintenance ({vehicle.yearsOfOwnership} years)</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 500, mt: 'auto' }}>
                ${calculations.maintenanceCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ${vehicle.maintenanceCost.toLocaleString(undefined, { maximumFractionDigits: 2 })} per year
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Total Cost Summary Box */}
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
        
        {/* Per-year and Per-mile metrics */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AccessTimeIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Cost per Year
                </Typography>
              </Box>
              <Typography variant="h6" color="text.primary">
                ${calculations.costPerYear.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SpeedIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="subtitle2" color="text.secondary">
                  Cost per Mile
                </Typography>
              </Box>
              <Typography variant="h6" color="text.primary">
                ${calculations.costPerMile.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};


export default CostSummary;