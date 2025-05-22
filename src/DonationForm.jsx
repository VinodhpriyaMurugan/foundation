import React, { useState, useEffect } from "react";
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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import scanner from "./assets/scanner-image.png";
import thirufoundation from "./assets/Thirufoundation.png";



const DonationForm = ({ open, onClose, data, list }) => {
  console.log("Data", data);
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      ...data,
      childrenCount: data?.childrenCount || 0,
      amount: data?.amount || 0,
    },
  });

  const [scannerOpen, setScannerOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
 const [isAmountManuallyEdited, setIsAmountManuallyEdited] = useState(false);

 const childrenCount = watch("childrenCount");
 const amount = watch("amount");

 useEffect(() => {
   if (!isAmountManuallyEdited) {
     const count = Number(childrenCount) || 0;
     const calculatedAmount = count * (data?.amount || 0);
     setValue("amount", calculatedAmount);
   }
 }, [childrenCount, isAmountManuallyEdited, setValue]);

 const handleAmountChange = (e) => {
   setIsAmountManuallyEdited(true);
   setValue("amount", e.target.value);
 };


  const handlePaymentClick = () => {
    setScannerOpen(true);
  };

  const handleScannerClose = () => {
    setScannerOpen(false);
  };

  const onSubmit = (formData) => {
    console.log(formData);
    reset();
    setSelectedPaymentMethod("");
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" >
        <Box sx={{ position: "absolute", left: 16 ,mt:'10px'}}>
          <img
            src={thirufoundation}
            alt="Icon"
            style={{ height: "auto", width: "200px" }}
          />
        </Box>
        <DialogTitle sx={{ textAlign: "center" }}>Donate Us</DialogTitle>
        <DialogContent style={{ paddingTop: "10px" }}>
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

              <FormControl fullWidth required>
                <InputLabel id="purpose-label">Purpose of Donation</InputLabel>
                <Select
                  labelId="purpose-label"
                  label="Purpose of Donation"
                  defaultValue={data?.category || ""}
                  {...register("purpose")}
                >
                  {list.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid item xs={12} sx={{ width: "49%" }}>
                <TextField
                  label="No. of Children to be Donated"
                  fullWidth
                  type="number"
                  {...register("childrenCount", { valueAsNumber: true })}
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
                  // InputProps={{
                  //   readOnly: true,
                  // }}
                  onChange={handleAmountChange}
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
            </Grid>

            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
              {selectedPaymentMethod === "scanner" && (
                <Button onClick={handlePaymentClick} color="secondary">
                  Scan to pay
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
