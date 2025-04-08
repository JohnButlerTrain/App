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
// For the calculator icon, you need to install @mui/icons-material
// npm install @mui/icons-material
import CalculateIcon from '@mui/icons-material/Calculate';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const theme = useTheme(); // Access the theme
  
  const handleAddVehicle = (vehicleData) => {
    const vehicleCopy = { ...vehicleData };
    setVehicles(prevVehicles => [...prevVehicles, vehicleCopy]);
  };

  return (
    <>
      {/* App Header/Navigation Bar */}
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <CalculateIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vehicle TCO Calculator
          </Typography>
        </Toolbar>
      </AppBar>
      
      {/* Main Content Area */}
      <Box 
        sx={{ 
          background: 'linear-gradient(120deg, #f5f7fa 0%, #e9eef5 100%)', // Subtle gradient background
          pt: 3,  // Padding top
          pb: 6,  // Padding bottom
          minHeight: 'calc(100vh - 64px)' // Full height minus the AppBar
        }}
      >
        <Container maxWidth="lg">
          {/* Page Title */}
          <Box 
            sx={{ 
              mb: 5, // Margin bottom
              textAlign: 'center' // Center the text
            }}
          >
            <Typography 
              variant="h4" 
              component="h1" 
              color="primary" 
              gutterBottom // Adds margin below
            >
              Total Cost of Ownership Calculator
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Compare the real cost of owning different vehicles over time
            </Typography>
          </Box>
          
          {/* Main Grid Layout */}
          <Grid container spacing={4}>
            {/* Vehicle Form */}
            <Grid item xs={12} md={6}>
              <VehicleForm onAddVehicle={handleAddVehicle} />
            </Grid>
            
            {/* Cost Summary or Placeholder */}
            <Grid item xs={12} md={6}>
              {vehicles.length > 0 ? (
                <CostSummary vehicle={vehicles[vehicles.length - 1]} />
              ) : (
                <Paper 
                  sx={{ 
                    p: 4, // Padding
                    height: '100%', // Match height
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: theme.shape.borderRadius // From theme
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <CalculateIcon 
                      sx={{ 
                        fontSize: 60, 
                        color: 'primary.light',
                        opacity: 0.7,
                        mb: 2 // Margin bottom
                      }} 
                    />
                    <Typography variant="body1" color="text.secondary">
                      No vehicles added yet. Fill out the form to see cost analysis.
                    </Typography>
                  </Box>
                </Paper>
              )}
            </Grid>
            
            {/* Comparison Chart (only shown when vehicles exist) */}
            <Grid item xs={12}>
              {vehicles.length > 0 && (
                <>
                  <Divider sx={{ my: 4 }} /> {/* Horizontal divider with margin */}
                  <ComparisonChart vehicles={vehicles} />
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
export default App;