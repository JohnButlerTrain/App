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
  InputAdornment
} from '@mui/material';

const VehicleForm = ({ onAddVehicle }) => {
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
      setVehicleData(prev => ({ ...prev, fuelPrice: '0.14' })); // Default electricity price: $0.14/kWh
    } else if (['gasoline', 'diesel', 'hybrid'].includes(vehicleData.fuelType) && !vehicleData.fuelPrice) {
      setVehicleData(prev => ({ ...prev, fuelPrice: '3.50' })); // Default gas price: $3.50/gal
    }
  }, [vehicleData.fuelType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddVehicle(vehicleData);
    // Optionally reset form or provide feedback
  };

  // Determine the fuel efficiency label and input adornment based on fuel type
  const getFuelEfficiencyDetails = () => {
    if (vehicleData.fuelType === 'electric') {
      return {
        label: 'Energy Efficiency',
        adornment: 'kWh/mile'
      };
    } else {
      return {
        label: 'Fuel Efficiency',
        adornment: 'mpg'
      };
    }
  };

  // Determine the fuel price label based on fuel type
  const getFuelPriceDetails = () => {
    if (vehicleData.fuelType === 'electric') {
      return {
        label: 'Electricity Price',
        adornment: '$/kWh'
      };
    } else {
      return {
        label: 'Fuel Price',
        adornment: '$/gal'
      };
    }
  };

  const fuelEfficiencyDetails = getFuelEfficiencyDetails();
  const fuelPriceDetails = getFuelPriceDetails();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Vehicle Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Vehicle Name"
                name="name"
                value={vehicleData.name}
                onChange={handleChange}
                placeholder="e.g. 2023 Toyota Camry"
                required
              />
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
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
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
                  endAdornment: <InputAdornment position="end">
                    {fuelEfficiencyDetails.adornment}
                  </InputAdornment>,
                }}
                required
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
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="end">
                    {fuelPriceDetails.adornment}
                  </InputAdornment>,
                }}
                required
              />
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
                  endAdornment: <InputAdornment position="end">miles</InputAdornment>,
                }}
                required
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
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
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
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                required
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
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                fullWidth
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