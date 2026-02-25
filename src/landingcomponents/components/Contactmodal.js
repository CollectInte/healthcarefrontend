import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BusinessIcon from "@mui/icons-material/Business";
import axios from "axios";
import "./contactmodal.css";

export default function Contactmodal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    full_name: "",
    hospital_name: "",
    mobile: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Basic Validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.full_name.trim())
      newErrors.full_name = "Full name is required";

    if (!formData.hospital_name.trim())
      newErrors.hospital_name = "Hospital name is required";

    if (!formData.mobile.trim())
      newErrors.mobile = "Mobile number is required";
    else if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter valid 10 digit mobile number";

    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter valid email address";

    if (!formData.address.trim())
      newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      await axios.post("https://api.caredesk360.com/contact/post", formData);

      setSnackbar({
        open: true,
        message: "Registration Successful ✅",
        severity: "success",
      });

      setFormData({
        full_name: "",
        hospital_name: "",
        mobile: "",
        email: "",
        address: "",
      });

      handleClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Something went wrong ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
  setFormData({
    full_name: "",
    hospital_name: "",
    mobile: "",
    email: "",
    address: "",
  });

  setErrors({});
  setLoading(false);
};

const handleModalClose = () => {
  resetForm();
  handleClose();
};
  return (
    <>
      <Dialog open={open} onClose={handleModalClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ p: 0 }}>
          <Box className="modal-wrapper">

            {/* LEFT SIDE */}
            <Box className="modal-left">
              <BusinessIcon sx={{ fontSize: 80, mb: 2 }} />
              <Typography variant="h5" fontWeight={600}>
                CareDesk360
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Practice Management Platform
              </Typography>
            </Box>

            {/* RIGHT SIDE */}
            <Box className="modal-right">
              <IconButton
                onClick={handleModalClose}
                sx={{ position: "absolute", right: 16, top: 16 }}
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h5" fontWeight={600} mb={3}>
                Contact Form
              </Typography>

              <Box className="form-fields">

                <div className="row">
                  <TextField
                    label="Your Full Name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.full_name}
                    helperText={errors.full_name}
                  />

                  <TextField
                    label="Hospital Name"
                    name="hospital_name"
                    value={formData.hospital_name}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.hospital_name}
                    helperText={errors.hospital_name}
                  />
                </div>

                <div className="row">
                  <TextField
                    label="Mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                  />

                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </div>

                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.address}
                  helperText={errors.address}
                />

                <div className="button-wrapper">
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </div>

              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}