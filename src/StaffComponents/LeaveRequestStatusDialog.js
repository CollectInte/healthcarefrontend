import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import api from "./services/api";

export default function LeaveRequestStatusDialog({ open, onClose }) {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leave requests
  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/leave/getownall");
      setLeaveRequests(res.data.data.slice(0, 10)); // get up to 10 recent requests
    } catch (err) {
      console.error("Error fetching leave requests:", err);
      alert(err.response?.data?.message || "Failed to fetch leave requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchLeaveRequests();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Recent Leave Requests</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : leaveRequests.length === 0 ? (
          <Typography>No leave requests found</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Date From</TableCell>
                  <TableCell>Date To</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{new Date(request.start_date).toLocaleDateString("en-IN")}</TableCell>
                    <TableCell>{new Date(request.end_date).toLocaleDateString("en-IN")}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>
                      {request.status === "approved" ? (
                        <Typography color="success.main">Approved</Typography>
                      ) : request.status === "rejected" ? (
                        <Typography color="error.main">Rejected</Typography>
                      ) : (
                        <Typography color="text.secondary">Pending</Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
