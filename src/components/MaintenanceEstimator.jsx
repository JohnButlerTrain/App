// src/components/MaintenanceEstimator.jsx
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Divider,
  Chip,
  useTheme
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { calculateMaintenanceCost } from '../utils/MaintenanceCalculator';

/**
 * Maintenance Estimator Component
 * 
 * This component provides a detailed breakdown of estimated maintenance
 * and repair costs for a vehicle over its ownership period.
 * 
 * @param {Object} props 
 * @param {Object} props.vehicleData - The vehicle data from VehicleForm
 * @param {Function} props.onEstimateCalculated - Optional callback when estimate is ready
 */
const MaintenanceEstimator = ({ vehicleData, onEstimateCalculated }) => {
  const theme = useTheme();
  const [yearlyEstimates, setYearlyEstimates] = useState([]);
  const [averageAnnualCost, setAverageAnnualCost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  
  useEffect(() => {
    if (!vehicleData || !vehicleData.purchasePrice) {
      return;
    }
    
    calculateEstimates();
  }, [vehicleData]);
  
  const calculateEstimates = () => {
    // If user provided their own maintenance cost, use that
    if (vehicleData.maintenanceCost && Number(vehicleData.maintenanceCost) > 0) {
      const userCost = Number(vehicleData.maintenanceCost);
      const years = Number(vehicleData.yearsOfOwnership);
      
      // Create yearly estimates with a 4% increase each year
      const yearEstimates = [];
      let total = 0;
      
      for (let year = 1; year <= years; year++) {
        const yearCost = Math.round(userCost * Math.pow(1.04, year - 1));
        yearEstimates.push({
          year,
          cost: yearCost
        });
        total += yearCost;
      }
      
      setYearlyEstimates(yearEstimates);
      setAverageAnnualCost(userCost);
      setTotalCost(total);
      
      if (onEstimateCalculated) {
        onEstimateCalculated(userCost);
      }
      
      return;
    }
    
    // Otherwise calculate maintenance costs
    const years = Number(vehicleData.yearsOfOwnership);
    const annualCost = calculateMaintenanceCost(vehicleData);
    
    // Get maintenance cost escalation rate based on powertrain type
    const getEscalationRate = () => {
      switch (vehicleData.powertrainType) {
        case 'bev': return 0.05;    // Electric
        case 'hev': return 0.08;    // Hybrid
        case 'phev': return 0.09;   // Plug-in Hybrid
        case 'ice_ci': return 0.14; // Diesel
        case 'fcev': return 0.10;   // Fuel Cell
        default: return 0.12;       // Gasoline and others
      }
    };
    
    const escalationRate = getEscalationRate();
    const baseFirstYearCost = annualCost / (1 + (years - 1) * escalationRate / 2);
    
    // Generate yearly estimates
    const yearEstimates = [];
    let total = 0;
    
    for (let year = 1; year <= years; year++) {
      const ageFactor = 1 + ((year - 1) * escalationRate);
      const yearCost = Math.round(baseFirstYearCost * ageFactor);
      
      yearEstimates.push({
        year,
        cost: yearCost
      });
      
      total += yearCost;
    }
    
    setYearlyEstimates(yearEstimates);
    setAverageAnnualCost(annualCost);
    setTotalCost(total);
    
    if (onEstimateCalculated) {
      onEstimateCalculated(annualCost);
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const getVehicleTypeLabel = () => {
    switch(vehicleData?.fuelType) {
      case 'electric': return 'Electric';
      case 'hybrid': return 'Hybrid';
      case 'plugin_hybrid': return 'Plug-in Hybrid';
      case 'diesel': return 'Diesel';
      case 'fuel_cell': return 'Hydrogen Fuel Cell';
      default: return 'Gasoline';
    }
  };
  
  const getSizeClassLabel = () => {
    if (!vehicleData?.sizeClass) return 'Unknown';
    
    return vehicleData.sizeClass
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  if (!vehicleData || !vehicleData.purchasePrice) {
    return (
      <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
            Please enter vehicle details to view maintenance cost estimates
          </Typography>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        borderRadius: 2,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        height: '100%'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BuildIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
          <Typography variant="h5" sx={{ ml: 1, fontWeight: 500 }}>
            Maintenance & Repair Cost Estimates
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              mb: 3 
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DirectionsCarIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="body1">
                  {getSizeClassLabel()} ({getVehicleTypeLabel()})
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ScheduleIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="body1">
                  {vehicleData.yearsOfOwnership} Year Ownership
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AttachMoneyIcon sx={{ color: 'text.secondary', mr: 1 }} />
                <Typography variant="body1">
                  {formatCurrency(vehicleData.purchasePrice)} Purchase Price
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                bgcolor: theme.palette.primary.light, 
                color: theme.palette.primary.contrastText,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
                Average Annual Cost
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                {formatCurrency(averageAnnualCost)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {formatCurrency(averageAnnualCost / 12)} per month
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                bgcolor: theme.palette.background.default,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
                border: `1px solid ${theme.palette.divider}`
              }}
            >
              <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                Total Over {vehicleData.yearsOfOwnership} Years
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                {formatCurrency(totalCost)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {(totalCost / Number(vehicleData.purchasePrice) * 100).toFixed(1)}% of purchase price
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }}>
              <Chip 
                label="Year-by-Year Breakdown" 
                size="small"
                sx={{ fontWeight: 500 }}
              />
            </Divider>
            
            <TableContainer component={Paper} elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: theme.palette.background.default }}>
                    <TableCell>Ownership Year</TableCell>
                    <TableCell align="right">Estimated Cost</TableCell>
                    <TableCell align="right">Cumulative Cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {yearlyEstimates.map((item, index) => {
                    // Calculate cumulative cost up to this year
                    const cumulativeCost = yearlyEstimates
                      .slice(0, index + 1)
                      .reduce((sum, year) => sum + year.cost, 0);
                    
                    return (
                      <TableRow key={item.year}>
                        <TableCell>Year {item.year}</TableCell>
                        <TableCell align="right">{formatCurrency(item.cost)}</TableCell>
                        <TableCell align="right">{formatCurrency(cumulativeCost)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
              Note: These estimates include routine maintenance (oil changes, filters, fluids), 
              repairs, and replacement of wear items (brakes, tires, battery) based on normal use.
              Actual costs may vary based on driving conditions, location, and service provider.
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MaintenanceEstimator;