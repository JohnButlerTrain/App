// src/App.jsx
import { useState } from 'react';
import { Button, Typography, Container, Box } from '@mui/material';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Vite + React + Material UI
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is: {count}
        </Button>
      </Box>
    </Container>
  );
}

export default App;