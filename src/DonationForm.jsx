import React, { useState } from "react";
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
  RadioGroup,
  Radio,
} from "@mui/material";
import { useForm } from "react-hook-form";
import scanner from "./assets/scanner-image.png";

const DonationForm = ({ open, onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const [scannerOpen, setScannerOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const handlePaymentClick = () => {
    setScannerOpen(true);
  };

  const handleScannerClose = () => {
    setScannerOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setSelectedPaymentMethod("");
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ textAlign: "center" }}>FOUNDATION</DialogTitle>
        <DialogContent style={{ paddingTop: "5px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ width: "100%" }}>
                <TextField
                  label="Name"
                  fullWidth
                  {...register("name")}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ width: "49%" }}>
                <TextField
                  label="Mobile Number"
                  fullWidth
                  {...register("phoneno")}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ width: "49%" }}>
                <TextField
                  label="Email"
                  fullWidth
                  {...register("email")}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ width: "100%" }}>
                <TextField
                  label="Address Line 1"
                  fullWidth
                  {...register("address1")}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ width: "100%" }}>
                <TextField
                  label="Address Line 2"
                  fullWidth
                  {...register("address2")}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ width: "49%" }}>
                <TextField
                  label="State"
                  fullWidth
                  {...register("state")}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ width: "49%" }}>
                <TextField
                  label="Pincode"
                  fullWidth
                  {...register("pincode")}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ width: "49%" }}>
                <TextField
                  label="Purpose of Donation"
                  fullWidth
                  {...register("purpose")}
                  required
                />
              </Grid>
              <Grid item xs={12} sx={{ width: "49%" }}>
                <TextField
                  label="Date"
                  fullWidth
                  type="date"
                  {...register("date")}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: "100%" }}>
                <TextField
                  label="I would like to donate an amount of (₹)"
                  fullWidth
                  type="number"
                  {...register("amount")}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <RadioGroup
                  row
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="Cash"
                  />
                  <FormControlLabel
                    value="upi"
                    control={<Radio />}
                    label="UPI"
                  />
                  <FormControlLabel
                    value="scanner"
                    control={<Radio />}
                    label="Scanner"
                  />
                  <FormControlLabel
                    value="netbanking"
                    control={<Radio />}
                    label="NetBanking"
                  />
                  <FormControlLabel
                    value="cheque"
                    control={<Radio />}
                    label="Cheque"
                  />
                  <FormControlLabel value="dd" control={<Radio />} label="DD" />
                </RadioGroup>

                <input
                  type="hidden"
                  value={selectedPaymentMethod}
                  {...register("paymentMethod")}
                />
              </Grid>
              {selectedPaymentMethod === "upi" && (
                <Grid item xs={12} sx={{ width: "100%" }}>
                  <TextField
                    label="Kindly enter the UPI ID or Transaction ID"
                    fullWidth
                    {...register("upiId")}
                    required
                  />
                </Grid>
              )}

              {selectedPaymentMethod === "netbanking" && (
                <Grid item xs={12} sx={{ width: "100%" }}>
                  <TextField
                    label="Kindly enter the Reference Number"
                    fullWidth
                    {...register("netbankingRef")}
                    required
                  />
                </Grid>
              )}

              {selectedPaymentMethod === "cheque" && (
                <Grid item xs={12} sx={{ width: "100%" }}>
                  <TextField
                    label="Kindly enter the Cheque Number"
                    fullWidth
                    {...register("chequeNo")}
                    required
                  />
                </Grid>
              )}

              {selectedPaymentMethod === "dd" && (
                <Grid item xs={12} sx={{ width: "100%" }}>
                  <TextField
                    label="Kindly enter the Draft Number"
                    fullWidth
                    {...register("draftNo")}
                    required
                  />
                </Grid>
              )}
              {/* {selectedPaymentMethod === "cash" && (
                <Grid item xs={12} sx={{ width: "100%" }}>
                  <TextField
                    label="I would like to donate an amount of"
                    fullWidth
                    {...register("amount")}
                    required
                  />
                </Grid>
              )} */}

              {/* <Grid item xs={12} sx={{ width: "100%" }}>
                <TextField
                  label="Transaction No."
                  fullWidth
                  {...register("accountNo")}
                />
              </Grid> */}
              {/* <Grid item xs={12}>
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
              </Grid> */}
            </Grid>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
              {selectedPaymentMethod === "scanner" && (
                <Button onClick={handlePaymentClick} color="secondary">
                  Scanner
                </Button>
              )}
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={scannerOpen}
        onClose={handleScannerClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Scan Your Payment</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundImage: `url(${scanner})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              height: "300px",
              // width: '100%',
              ml: "28%",
              overflowX: "hidden",
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
