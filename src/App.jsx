// src/App.jsx
import { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  useTheme, 
  useMediaQuery,
  AppBar,
  Toolbar,
  Divider
} from '@mui/material';
import VehicleForm from './components/VehicleForm';
import CostSummary from './components/CostSummary';
import ComparisonChart from './components/ComparisonChart';
import CalculateIcon from '@mui/icons-material/Calculate';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const theme = useTheme();
  
  const handleAddVehicle = (vehicleData) => {
    const vehicleCopy = { ...vehicleData };
    setVehicles(prevVehicles => [...prevVehicles, vehicleCopy]);
  };

  return (
    <>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <CalculateIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vehicle TCO Calculator
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box 
        sx={{ 
          background: 'linear-gradient(120deg, #f5f7fa 0%, #e9eef5 100%)',
          pt: 3,
          pb: 6,
          minHeight: 'calc(100vh - 64px)'
        }}
      >
        <Container maxWidth="xl">
          <Box 
            sx={{ 
              mb: 5,
              textAlign: 'center'
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              color="primary" 
              gutterBottom
            >
              Total Cost of Ownership Calculator
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Compare the real cost of owning different vehicles over time
            </Typography>
          </Box>
          
          {/* Vehicle Form Section */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} lg={4}>
              <VehicleForm onAddVehicle={handleAddVehicle} />
            </Grid>
            
            {/* Vehicle Cost Summaries Section */}
            <Grid item xs={12} md={6} lg={8}>
              {vehicles.length > 0 ? (
                <Grid container spacing={3}>
                  {vehicles.map((vehicle, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <CostSummary vehicle={vehicle} />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Paper 
                  sx={{ 
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 2
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <CalculateIcon 
                      sx={{ 
                        fontSize: 60,
                        color: 'primary.light',
                        opacity: 0.7,
                        mb: 2
                      }}
                    />
                    <Typography variant="body1" color="text.secondary">
                      No vehicles added yet. Fill out the form to see cost analysis.
                    </Typography>
                  </Box>
                </Paper>
              )}
            </Grid>
          </Grid>
          
          {/* Comparison Chart Section */}
          {vehicles.length > 0 && (
            <Box sx={{ width: '100%', mt: 4 }}>
              <Divider sx={{ mb: 4 }} />
              <ComparisonChart vehicles={vehicles} />
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
}

export default App;