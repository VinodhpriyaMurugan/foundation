import React, { useState } from "react";
import DonationForm from "./DonationForm";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import forms from "./assets/80G.jpg";
import thirufoundation from "./assets/Thirufoundation.png";

const schoolSupportData = [
  {
    category: "Mid Day Meals",
    students: 160,
    amount: { INR: 3047, USD: 41, EURO: 35 },
    total: { INR: "4,87,520", USD: 6529, EURO: 5667 },
  },
  {
    category: "Teaching Support",
    students: 160,
    amount: { INR: 2706, USD: 31, EURO: 32 },
    total: { INR: "4,32,960", USD: 5790, EURO: 5033 },
  },
];

const scholarshipData = [
  {
    category: "College",
    students: 200,
    amount: { INR: 3000, USD: 40, EURO: 35 },
    total: { INR: "6,00,000", USD: 8047, EURO: 6990 },
  },
  {
    category: "School",
    students: 200,
    amount: { INR: 1500, USD: 20, EURO: 17 },
    total: { INR: "3,00,000", USD: 4023, EURO: 3495 },
  },
  {
    category: "Vocational",
    students: 100,
    amount: { INR: 5000, USD: 67, EURO: 58 },
    total: { INR: "5,00,000", USD: 6706, EURO: 5825 },
  },
];

const categoryList = [
  ...new Set(schoolSupportData.map((item) => item.category)),
  ...new Set(scholarshipData.map((item) => item.category)),
]; // unique categories

// Shared table header style
const headerCellSx = {
  whiteSpace: "nowrap",
  padding: "8px",
  border: "1px solid #fff",
  backgroundColor: "#e3e8ff",
  fontWeight: "bold",
};

const DonationTables = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [donationData, setDonationData] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreviewOpen = () => setPreviewOpen(true);
  const handlePreviewClose = () => setPreviewOpen(false);

  const handleDonate = (category, currency, amount) => {
    setDonationData({ category, currency, amount });
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const renderTable = (data, title) => (
    <Box>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        {title}
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4, boxShadow: 3 }}>
        <Table stickyHeader aria-label={`${title} table`}>
          <TableHead>
            <TableRow>
              {[
                "Category",
                "No. of Students",
                "INR/Student",
                "USD",
                "EURO",
                "Total INR",
                "Total USD",
                "Total EURO",
                "Donate in",
                "Action",
              ].map((label) => (
                <TableCell key={label} align="center" sx={headerCellSx}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell align="center" sx={{ backgroundColor: "#f9f9f9" }}>
                  {row.category}
                </TableCell>
                <TableCell align="center">{row.students}</TableCell>
                <TableCell align="center">{row.amount.INR}</TableCell>
                <TableCell align="center">{row.amount.USD}</TableCell>
                <TableCell align="center">{row.amount.EURO}</TableCell>
                <TableCell align="center">{row.total.INR}</TableCell>
                <TableCell align="center">{row.total.USD}</TableCell>
                <TableCell align="center">{row.total.EURO}</TableCell>
                <TableCell align="center">
                  <Select
                    size="small"
                    value={selectedCurrency[row.category] || "INR"}
                    onChange={(e) =>
                      setSelectedCurrency({
                        ...selectedCurrency,
                        [row.category]: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="INR">INR</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EURO">EURO</MenuItem>
                  </Select>
                </TableCell>

                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleDonate(
                        row.category,
                        selectedCurrency[row.category] || "INR",
                        row.amount[selectedCurrency[row.category] || "INR"]
                      )
                    }
                    sx={{ textTransform: "none", px: 2 }}
                  >
                    Donate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
  const handleImageDownload = (imageSrc) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "80G.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Box
        sx={{
          px: { xs: 2, sm: 4 },
          py: 2,
        }}
      >
        <Box sx={{ position: "absolute", left: 16 }}>
          <img
            src={thirufoundation}
            alt="Icon"
            style={{ height: 'auto', width:'200px' }}
          />
        </Box>

       
        {renderTable(schoolSupportData, "School Support Statistics")}
        {renderTable(scholarshipData, "Scholarship Program Statistics")}

        <Button variant="outlined" onClick={handlePreviewOpen}>
          Preview 80G
        </Button>
        <Button
          sx={{ ml: "10px" }}
          variant="contained"
          color="primary"
          onClick={() => handleImageDownload(forms)}
        >
          Download 80G
        </Button>
      </Box>
      <DonationForm
        open={formOpen}
        onClose={handleFormClose}
        data={donationData}
        list={categoryList}
      />
      <Dialog
        open={previewOpen}
        onClose={handlePreviewClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Preview Donation Image</DialogTitle>
        <DialogContent>
          <img
            src={forms}
            alt="Donation Preview"
            style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageDownload}>Download</Button>
          <Button onClick={handlePreviewClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        <Typography>
          <b>Notes:</b>
          1. All donations made to Thirupuvanam foundation are 50% tax exemption
          under section 80G of Income Tax Act.
        </Typography>
        <Typography>
          2. Your donations will be used to help a needy girl child get a
          scholarship for her education.
        </Typography>
      </Box>
    </>
  );
};

export default DonationTables;
