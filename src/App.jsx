import React, { useState } from 'react';
import DonationForm from './DonationForm';
import { Button } from '@mui/material';

const App = () => {
  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  return (
    <div style={{width:"100vw",textAlign:"center"}}>
      <Button onClick={handleFormOpen} variant="contained" color="primary" >
        Open Donation Form
      </Button>
      <DonationForm open={formOpen} onClose={handleFormClose} />
    </div>
  );
};

export default App;