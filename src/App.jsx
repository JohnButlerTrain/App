// src/App.jsx
import { useState } from 'react';
import { Container, Box, Typography, Grid, Paper } from '@mui/material';
import VehicleForm from './components/VehicleForm';
import CostSummary from './components/CostSummary';
import ComparisonChart from './components/ComparisonChart';

function App() {
  const [vehicles, setVehicles] = useState([]);
  
  const handleAddVehicle = (vehicleData) => {
    setVehicles([...vehicles, vehicleData]);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Vehicle Total Cost of Ownership Calculator
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <VehicleForm onAddVehicle={handleAddVehicle} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            {vehicles.length > 0 ? (
              <CostSummary vehicle={vehicles[vehicles.length - 1]} />
            ) : (
              <Paper sx={{ p: 3 }}>
                <Typography variant="body1">
                  No vehicles added yet. Fill out the form to see cost analysis.
                </Typography>
              </Paper>
            )}
          </Grid>
          
          <Grid item xs={12}>
            <ComparisonChart vehicles={vehicles} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;