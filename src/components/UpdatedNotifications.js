"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

export default function SendNotification() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [staff, setStaff] = useState([]);
  const [clients, setClients] = useState([]);

  const [selectedStaff, setSelectedStaff] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // 🔹 Fetch staff & clients
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const [staffRes, clientRes] = await Promise.all([
        fetch(process.env.REACT_APP_EMPLOYEE_FETCH, {
          credentials: "include",
        }),
        fetch(process.env.REACT_APP_CLIENT_FETCH, {
          credentials: "include",
        }),
      ]);

      const staffData = await staffRes.json();
      const clientData = await clientRes.json();

      setStaff(staffData.data || []);
      setClients(clientData.data || []);

    } catch (err) {
      console.error(err);
    }
  };

  const allStaffSelected = staff.length > 0 && selectedStaff.length === staff.length;
  const allClientsSelected = clients.length > 0 && selectedClients.length === clients.length;

  const toggleSelectAllStaff = () => {
    setSelectedStaff(allStaffSelected ? [] : staff);
  };

  const toggleSelectAllClients = () => {
    setSelectedClients(allClientsSelected ? [] : clients);
  };


  // 🔹 Submit Notification
  const handleSubmit = async () => {
    if (!message.trim()) {
      setStatus({ type: "error", text: "Message is required" });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const payload = {
        title,
        message,
        staff_ids: selectedStaff.map((s) => s.id),
        client_ids: selectedClients.map((c) => c.id),
      };

      const res = await axios.post(process.env.REACT_APP_NOTIFICATION_ADMINPOST, payload, {
        withCredentials: true,
      });

      setStatus({
        type: "success",
        text: `Notification sent to ${res.data.receivers_count} users`,
      });

      // Reset form
      setTitle("");
      setMessage("");
      setSelectedStaff([]);
      setSelectedClients([]);
    } catch (err) {
      setStatus({
        type: "error",
        text: err.response?.data?.message || "Failed to send notification",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth={600} mx="auto" mt={1} p={0}>
      {/* <Typography variant="h6" mb={2}>
        Send Notification
      </Typography> */}

      {status && (
        <Alert severity={status.type} sx={{ mb: 2 }}>
          {status.text}
        </Alert>
      )}

      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Message *"
        fullWidth
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Box sx={{ mb: 3 }}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2">Staff</Typography>
          <Button size="small" onClick={toggleSelectAllStaff}>
            {allStaffSelected ? "Clear All" : "Select All"}
          </Button>
        </Box>

        <Autocomplete
          multiple
          options={staff}
          getOptionLabel={(option) => option?.name || ""}
          value={selectedStaff}
          onChange={(e, value) => setSelectedStaff(value)}
          renderInput={(params) => (
            <TextField {...params} label="Select Staff" />
          )}
        />
      </Box>


      <Box sx={{ mb: 3 }}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2">Clients</Typography>
          <Button size="small" onClick={toggleSelectAllClients}>
            {allClientsSelected ? "Clear All" : "Select All"}
          </Button>
        </Box>

        <Autocomplete
          multiple
          options={clients}
          getOptionLabel={(option) => option?.name || ""}
          value={selectedClients}
          onChange={(e, value) => setSelectedClients(value)}
          renderInput={(params) => (
            <TextField {...params} label="Select Clients" />
          )}
        />
      </Box>


      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        sx={{backgroundColor:"#3f6f7a"}}
      >
        {loading ? <CircularProgress size={22} /> : "Send Notification"}
      </Button>
    </Box>
  );
}
