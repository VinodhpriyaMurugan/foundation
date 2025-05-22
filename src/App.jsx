import React, { useState } from 'react';
import DonationForm from './DonationForm';
import { Button } from '@mui/material';
import DonationTables from './DonationTables';

const App = () => {
  const [formOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen(true);
  };

 

  return (
    <div style={{width:"100vw",textAlign:"center"}}>
      <DonationTables/>
      {/* <Button onClick={handleFormOpen} variant="contained" color="primary" >
        Open Donation Form
      </Button>
      <DonationForm open={formOpen} onClose={handleFormClose} /> */}
    </div>
  );
};

export default App;