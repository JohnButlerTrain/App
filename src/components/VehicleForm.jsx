// src/components/VehicleForm.jsx
import { useState, useEffect } from 'react';
import { 
  Card,
  CardContent,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Button,
  InputAdornment,
  Box,
  useTheme,
  Divider,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import AttachMoneyIcon from '@mui/icons-material/Add';
import BuildIcon from '@mui/icons-material/Build';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import AddIcon from '@mui/icons-material/Add';

const VehicleForm = ({ onAddVehicle }) => {
  const theme = useTheme();
  
  const [vehicleData, setVehicleData] = useState({
    name: '',
    purchasePrice: '',
    fuelType: 'gasoline',
    fuelEfficiency: '',
    fuelPrice: '',
    annualMileage: '12000',
    insuranceCost: '',
    maintenanceCost: '',
    yearsOfOwnership: '5',
    // New fields for vehicle type information
    sizeClass: '',
    powertrainType: '',
    electricRange: ''
  });


  // const [vehicleData, setVehicleData] = useState({
  //   name: '2025 Hyunda Kona',
  //   purchasePrice: '34000',
  //   fuelType: 'gasoline',
  //   fuelEfficiency: '20',
  //   fuelPrice: '3.50',
  //   annualMileage: '12000',
  //   insuranceCost: '100',
  //   maintenanceCost: '100',
  //   yearsOfOwnership: '15',
  //   // New fields for vehicle type information
  //   sizeClass: 'Medium SUV',
  //   powertrainType: 'ice_ci',
  //   electricRange: '230'
  // });
  // Set default fuel price based on fuel type
  useEffect(() => {
    // Always update the fuel price when fuel type changes
    if (vehicleData.fuelType === 'electric') {
      setVehicleData(prev => ({ ...prev, fuelPrice: '0.11', powertrainType: 'bev' }));
    } else if (vehicleData.fuelType === 'hybrid') {
      setVehicleData(prev => ({ ...prev, fuelPrice: '3.50', powertrainType: 'hev' }));
    } else if (vehicleData.fuelType === 'diesel') {
      setVehicleData(prev => ({ ...prev, fuelPrice: '3.80', powertrainType: 'ice_ci' }));
    } else if (vehicleData.fuelType === 'gasoline') {
      setVehicleData(prev => ({ ...prev, fuelPrice: '3.50', powertrainType: 'ice_si' }));
    } else if (vehicleData.fuelType === 'plugin_hybrid') {
      setVehicleData(prev => ({ ...prev, fuelPrice: '3.50', powertrainType: 'phev' }));
    } else if (vehicleData.fuelType === 'fuel_cell') {
      setVehicleData(prev => ({ ...prev, fuelPrice: '10.00', powertrainType: 'fcev' }));
    }
  }, [vehicleData.fuelType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate maintenance and repair costs if they weren't manually entered
    let finalVehicleData = {...vehicleData};
    
    if (!vehicleData.maintenanceCost) {
      // We would call our maintenance calculation function here
      // For now, we'll use a placeholder
      finalVehicleData.maintenanceCost = '1000'; // This will be replaced with actual calculation
    }
    
    onAddVehicle(finalVehicleData);
  };

  const getFuelEfficiencyDetails = () => {
    if (vehicleData.fuelType === 'electric') {
      return {
        label: 'Energy Efficiency',
        adornment: 'miles/kWh'
      };
    } 
    return {
      label: 'Fuel Efficiency',
      adornment: 'mpg'
    };
  };

  const getFuelPriceDetails = () => {
    if (vehicleData.fuelType === 'electric') {
      return {
        label: 'Electricity Price',
        adornment: '$/kWh'
      };
    }
    return {
      label: 'Fuel Price',
      adornment: '$/gal'
    };
  };

  const getVehicleTypeIcon = () => {
    switch(vehicleData.fuelType) {
      case 'electric':
        return <DirectionsCarIcon sx={{ color: '#64b5f6' }} />; // Light blue for electric
      case 'hybrid':
        return <DirectionsCarIcon sx={{ color: '#81c784' }} />; // Light green for hybrid
      case 'diesel':
        return <DirectionsCarIcon sx={{ color: '#ffb74d' }} />; // Orange for diesel
      default:
        return <DirectionsCarIcon sx={{ color: theme.palette.primary.main }} />; // Primary color for gas
    }
  };

  const fuelEfficiencyDetails = getFuelEfficiencyDetails();
  const fuelPriceDetails = getFuelPriceDetails();

  // Determine if we should show the vehicle class dropdown for commercial vehicles
  const isCommercialVehicle = vehicleData.sizeClass && 
    ['class4_delivery', 'class6_delivery', 'class8_vocational', 
     'class8_day_cab', 'class8_sleeper', 'transit_bus', 'class8_refuse'].includes(vehicleData.sizeClass);

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
          {getVehicleTypeIcon()}
          <Typography 
            variant="h5" 
            sx={{ 
              ml: 2,
              color: theme.palette.primary.main,
              fontWeight: 500
            }}
          >
            Vehicle Details
          </Typography>
        </Box>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vehicle Name"
                name="name"
                value={vehicleData.name}
                onChange={handleChange}
                placeholder="e.g. 2023 Toyota Camry"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DirectionsCarIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider>
                <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                  VEHICLE TYPE
                </Typography>
              </Divider>
            </Grid>
            
            {/* New Vehicle Size Class Field */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}>
                <InputLabel>Vehicle Size Class</InputLabel>
                <Select
                  name="sizeClass"
                  value={vehicleData.sizeClass}
                  onChange={handleChange}
                  label="Vehicle Size Class"
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <TimeToLeaveIcon color="action" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="">Select a size class</MenuItem>
                  {/* Light-Duty Vehicles */}
                  <MenuItem value="compact_sedan">Compact Sedan</MenuItem>
                  <MenuItem value="midsize_sedan">Midsize Sedan</MenuItem>
                  <MenuItem value="small_suv">Small SUV</MenuItem>
                  <MenuItem value="medium_suv">Medium SUV</MenuItem>
                  <MenuItem value="pickup">Pickup Truck</MenuItem>
                  {/* Commercial Vehicles */}
                  <MenuItem value="class4_delivery">Class 4 Delivery</MenuItem>
                  <MenuItem value="class6_delivery">Class 6 Delivery</MenuItem>
                  <MenuItem value="class8_vocational">Class 8 Vocational</MenuItem>
                  <MenuItem value="class8_day_cab">Class 8 Day Cab Tractor</MenuItem>
                  <MenuItem value="class8_sleeper">Class 8 Sleeper Cab Tractor</MenuItem>
                  <MenuItem value="transit_bus">Transit Bus</MenuItem>
                  <MenuItem value="class8_refuse">Class 8 Refuse</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* New Powertrain Type Field - aligned with fuel type selection */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Fuel Type"
                name="fuelType"
                value={vehicleData.fuelType}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalGasStationIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
                required
              >
                <MenuItem value="gasoline">Gasoline</MenuItem>
                <MenuItem value="diesel">Diesel</MenuItem>
                <MenuItem value="electric">Electric</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
                <MenuItem value="plugin_hybrid">Plug-in Hybrid</MenuItem>
                <MenuItem value="fuel_cell">Fuel Cell</MenuItem>
              </TextField>
            </Grid>
            
            {/* Conditional field for electric range */}
            {(vehicleData.fuelType === 'electric' || vehicleData.fuelType === 'plugin_hybrid') && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={vehicleData.fuelType === 'electric' ? "Battery Range" : "Electric Range"}
                  name="electricRange"
                  type="number"
                  value={vehicleData.electricRange}
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">miles</InputAdornment>
                    ),
                  }}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 1
                    }
                  }}
                />
              </Grid>
            )}
            
            <Grid item xs={12}>
              <Divider>
                <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                  BASIC INFORMATION
                </Typography>
              </Divider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Purchase Price"
                name="purchasePrice"
                type="number"
                value={vehicleData.purchasePrice}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Grid>
                        
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={fuelEfficiencyDetails.label}
                name="fuelEfficiency"
                type="number"
                value={vehicleData.fuelEfficiency}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SpeedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {fuelEfficiencyDetails.adornment}
                    </InputAdornment>
                  ),
                }}
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label={fuelPriceDetails.label}
                name="fuelPrice"
                type="number"
                value={vehicleData.fuelPrice}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {fuelPriceDetails.adornment}
                    </InputAdornment>
                  ),
                }}
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider>
                <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                  OWNERSHIP COSTS
                </Typography>
              </Divider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Annual Mileage"
                name="annualMileage"
                type="number"
                value={vehicleData.annualMileage}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SpeedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">miles</InputAdornment>
                  ),
                }}
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Annual Insurance Cost"
                name="insuranceCost"
                type="number"
                value={vehicleData.insuranceCost}
                onChange={handleChange}
                helperText="Leave blank to use our estimate"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Annual Maintenance + Repair Cost"
                name="maintenanceCost"
                type="number"
                value={vehicleData.maintenanceCost}
                onChange={handleChange}
                helperText="Leave blank to use our estimate based on vehicle type"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BuildIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Years of Ownership"
                name="yearsOfOwnership"
                type="number"
                value={vehicleData.yearsOfOwnership}
                onChange={handleChange}
                required
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                fullWidth
                sx={{ 
                  mt: 2,
                  py: 1.5,
                  borderRadius: 25,
                  textTransform: 'none',
                  fontWeight: 500,
                  boxShadow: '0 4px 12px rgba(63, 81, 181, 0.2)',
                  '&:hover': {
                    boxShadow: '0 6px 14px rgba(63, 81, 181, 0.4)',
                  }
                }}
                startIcon={<AddIcon />}
              >
                Add Vehicle to Comparison
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default VehicleForm;