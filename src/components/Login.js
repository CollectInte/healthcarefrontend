import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../Pages/ForgotPassword";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import logo from '../images/caredesk360.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [openForgot, setOpenForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // success | error | warning | info
  });


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const submitdetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response data:", data);

      if (!response.ok) {
        setSnackbar({
          open: true,
          message: data.message || "Login failed",
          severity: "error",
        });
        return;
      }

      // if (data.user.role === "admin") {
      //   navigate("/AdminDashboard");
      //   localStorage.setItem("adminId", data.user.id);
      //   localStorage.setItem("adminName", data.user.name);
      //   localStorage.setItem("role", data.user.role);

      // } else if (data.user.role === "doctor") {
      //   localStorage.setItem("userId", data.user.id);
      //   localStorage.setItem("userName", data.user.name);
      //   localStorage.setItem("role", data.user.role);
      //   localStorage.setItem("adminId", data.user.adminId);
      //   navigate("/doctor/dashboard");
      // } else if (data.user.role === "receptionist") {
      //   localStorage.setItem("userId", data.user.id);
      //   localStorage.setItem("userName", data.user.name);
      //   localStorage.setItem("role", data.user.role);
      //   localStorage.setItem("adminId", data.user.adminId);
      //   navigate("/receptionist/dashboard");
      // } else if (data.user.role === "client") {
      //   localStorage.setItem("id", data.user.id);
      //   localStorage.setItem("userName", data.user.name);
      //   localStorage.setItem("adminId", data.user.adminId);
      //   localStorage.setItem("role", data.user.role);

      //   navigate("/client");
      // } else {
      //   navigate("/");
      // }
      // navigate("/otp-verify");
      setSnackbar({
        open: true,
        message: "Login successful",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/otp-verify");
      }, 3000);
    } catch (error) {
      console.error("Network error:", error);
      setSnackbar({
        open: true,
        message: "Server not reachable",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          p: 2,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            maxWidth: 900,
            width: "100%",
            borderRadius: 4,
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left Image Section */}
          <Box
            onClick={() => window.open("https://caredesk360.com", "_blank")}
            sx={{
              flex: 1,
              position: "relative",
              backgroundImage: `url(${logo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: 300,
              borderRadius: 0,
              overflow: "hidden",
            }}
          >
            {/* Overlay (optional for better text visibility) */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
              }}
            />

            {/* Text at bottom */}
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                left: 16,
                zIndex: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#fff", fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontFamily: "Inter, sans-serif" }}
              >
                caredesk360
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#e0e0e0", fontFamily: "Inter, sans-serif" }}
              >
                Practice Management Platform
              </Typography>
            </Box>
          </Box>


          {/* Right Login Section */}
          <Box
            sx={{
              flex: 1,
              p: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome
            </Typography>

            <Typography variant="body2" color="text.secondary" mb={3}>
              Please login to your account
            </Typography>

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Typography
              sx={{
                cursor: "pointer",
                color: "primary.main",
                textAlign: "right",
                mt: 1,
                fontSize: 14,
              }}
              onClick={() => setOpenForgot(true)}
            >
              Forgot Password?
            </Typography>

            <Button
              onClick={submitdetails}
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.2,
                fontSize: 16,
                borderRadius: 2,
                background: "linear-gradient(90deg, #667eea, #764ba2)",
                "&:hover": {
                  background: "linear-gradient(90deg, #764ba2, #667eea)",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
        </Paper>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            py: 2,
          }}
        >
          <Typography
            sx={{ fontSize: 12, color: "#fff" }}
          >
            powered by {" "}
            <a
              href="https://ridgeveda.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Ridgeveda
            </a>
          </Typography>
        </Box>
      </Box >


      <ForgotPassword open={openForgot} onClose={() => setOpenForgot(false)} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
