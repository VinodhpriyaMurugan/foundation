import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import scanner from './assets/scanner-image.png'

const DonationForm = ({ open, onClose }) => {
  const { register, handleSubmit } = useForm();
  const [scannerOpen, setScannerOpen] = useState(false);

  const handlePaymentClick = () => {
    setScannerOpen(true);
  };

  const handleScannerClose = () => {
    setScannerOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle sx={{textAlign:'center'}}>FOUNDATION</DialogTitle>
        <DialogContent style={{paddingTop:'5px'}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} >
              <Grid item xs={12} sx={{width:'100%'}}>
                <TextField
                  label="Name"
                  fullWidth
                  {...register('name')}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{width:'100%'}}>
                <TextField
                  label="Purpose of Donation"
                  fullWidth
                  {...register('purpose')}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{width:'100%'}}>
                <TextField
                  label="Amount (₹)"
                  fullWidth
                  type="number"
                  {...register('amount')}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{width:'100%'}}>
                <FormControlLabel
                  control={<Checkbox {...register('paymentMethod.cash')} />}
                  label="Cash"
                />
                <FormControlLabel
                  control={<Checkbox {...register('paymentMethod.card')} />}
                  label="Card"
                />
                <FormControlLabel
                  control={<Checkbox {...register('paymentMethod.draft')} />}
                  label="Draft"
                />
              </Grid>
              <Grid item xs={12} sx={{width:'100%'}}>
                <TextField
                  label="Draft No."
                  fullWidth
                  {...register('draftNo')}
                />
              </Grid>
              <Grid item xs={12} sx={{width:'100%'}}>
                <TextField
                  label="Date"
                  fullWidth
                  type="date"
                  {...register('date')}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sx={{width:'100%'}}>
                <TextField
                  label="Transaction No."
                  fullWidth
                  {...register('accountNo')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox {...register('paymentType.full')} />}
                  label="Full Payment"
                />
                <FormControlLabel
                  control={<Checkbox {...register('paymentType.part')} />}
                  label="Part Payment"
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  {...register('receiverSignature')}
                  accept="image/*"
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
              <Button onClick={handlePaymentClick} color="secondary">
                Payment
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={scannerOpen} onClose={handleScannerClose} fullWidth maxWidth="sm">
        <DialogTitle>Scan Your Payment</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundImage: `url(${scanner})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              height: '300px',
              // width: '100%',
              ml:'28%',
              overflowX:'hidden'
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleScannerClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DonationForm;
