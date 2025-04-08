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
  Divider
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
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
    yearsOfOwnership: '5'
  });

  // Set default fuel price based on fuel type
  useEffect(() => {
    if (vehicleData.fuelType === 'electric' && !vehicleData.fuelPrice) {
      setVehicleData(prev => ({ ...prev, fuelPrice: '0.14' }));
    } else if (['gasoline', 'diesel', 'hybrid'].includes(vehicleData.fuelType) && !vehicleData.fuelPrice) {
      setVehicleData(prev => ({ ...prev, fuelPrice: '3.50' }));
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
    onAddVehicle(vehicleData);
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
        borderRadius: theme.shape.borderRadius
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
                    borderRadius: 2
                  }
                }}
              />
            </Grid>
            
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
                    borderRadius: 2
                  }
                }}
              />
            </Grid>
            
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
                    borderRadius: 2
                  }
                }}
              >
                <MenuItem value="gasoline">Gasoline</MenuItem>
                <MenuItem value="diesel">Diesel</MenuItem>
                <MenuItem value="electric">Electric</MenuItem>
                <MenuItem value="hybrid">Hybrid</MenuItem>
              </TextField>
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
                    borderRadius: 2
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
                    borderRadius: 2
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
                    borderRadius: 2
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
                    borderRadius: 2
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Annual Maintenance Cost"
                name="maintenanceCost"
                type="number"
                value={vehicleData.maintenanceCost}
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
                    borderRadius: 2
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
                    borderRadius: 2
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
                  borderRadius: 50,
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