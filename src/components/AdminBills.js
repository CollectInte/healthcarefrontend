import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

const AdminBills = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  /* ---------------- FETCH ALL BILLS ---------------- */
const fetchBills = async () => {
  try {
    setLoading(true);

    const res = await axios.get(
      `${process.env.REACT_APP_URL}/bill/bills`,
      { withCredentials: true }
    );

    console.log("API Response:", res.data); // keep this once

    const billsData = res.data?.data || []; // ✅ FIXED

    const formatted = billsData.map((b) => ({
      ...b,
      id: b.bill_id,
      created_at: new Date(b.created_at).toISOString().split("T")[0],

      // map fields properly
      selected_branch: b.branch,
      doctor_name: b.doctor_name,
    }));

    setRows(formatted);
  } catch (err) {
    console.error("Fetch bills error", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBills();
  }, []);

  /* ---------------- VIEW BILL ---------------- */
  const handleView = async (billId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/bill/bills/${billId}`,
        { withCredentials: true }
      );
      setSelectedBill(res.data.bill);
      setOpen(true);
    } catch (err) {
      console.error("Fetch bill error", err);
    }
  };

  /* ---------------- UPDATE BILL ---------------- */
  const handleUpdate = async () => {
    try {
      const payload = {
        subtotal: selectedBill.subtotal,
        tax: selectedBill.tax,
        total_amount: selectedBill.total_amount,
        bill_status: selectedBill.bill_status,
        notes: selectedBill.notes,
      };

      await axios.put(
        `${process.env.REACT_APP_URL}/bill/bills/${selectedBill.bill_id}`,
        payload,
        { withCredentials: true }
      );

      setOpen(false);
      fetchBills();
    } catch (err) {
      console.error("Update bill error", err);
    }
  };

  /* ---------------- COLUMNS ---------------- */
  const columns = [
    { field: "bill_id", headerName: "Bill ID", flex: 0.6 },
    { field: "appointment_id", headerName: "Appt ID", flex: 0.8 },
    { field: "client_name", headerName: "Client", flex: 1.2 },
    { field: "doctor_name", headerName: "Doctor", flex: 1.2 }, // ✅ NEW
    // { field: "staff_name", headerName: "Staff", flex: 1.1 },
    // { field: "staff_role", headerName: "Role", flex: 0.9 },
    { field: "selected_branch", headerName: "Branch", flex: 0.8 }, // ✅ FIXED
    { field: "total_amount", headerName: "Total", flex: 0.8 },
    { field: "bill_status", headerName: "Status", flex: 0.8 },
    { field: "created_at", headerName: "Created", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          variant="contained"
          sx={{ backgroundColor: "#3f6f7a", textTransform: "none" }}
          onClick={() => handleView(params.row.bill_id)}
        >
          View / Edit
        </Button>
      ),
    },
  ];


  return (
    <Box p={2} mt={1}>
      {/* <Typography variant="h6" mb={2}>
        Bills
      </Typography> */}

      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          getRowId={(row) => row.bill_id}
          initialState={{
            pagination: { paginationModel: { pageSize: 6, page: 0 } },
          }}
          pageSizeOptions={[10, 20, 50]}
          disableRowSelectionOnClick
          columnBuffer={2}
          disableColumnResize
          sx={{
            "& .MuiDataGrid-columnHeaderTitle": {
              color: "#3f6f7a",
              fontWeight: 600,
            },
          }}
        />
      </Box>

      {/* ---------------- VIEW / EDIT DIALOG ---------------- */}
      <Dialog open={open} onClose={() => setOpen(false)} sx={{ borderRadius: "20px" }} maxWidth="md" fullWidth>
        <DialogTitle>Bill Details</DialogTitle>

        {selectedBill && (
          <DialogContent>
            <Grid container spacing={2} mt={1}>
              <Grid item size={4}>
                <TextField
                  label="Subtotal"
                  fullWidth
                  value={selectedBill.subtotal || ""}
                  onChange={(e) =>
                    setSelectedBill({
                      ...selectedBill,
                      subtotal: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item size={4}>
                <TextField
                  label="Tax"
                  fullWidth
                  value={selectedBill.tax || ""}
                  onChange={(e) =>
                    setSelectedBill({
                      ...selectedBill,
                      tax: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item size={4}>
                <TextField
                  label="Generated By"
                  fullWidth
                  value={selectedBill.staff_name || ""}
                  onChange={(e) =>
                    setSelectedBill({
                      ...selectedBill,
                      staff_name: e.target.value,
                    })
                  }
                />
              </Grid>

              

              <Grid item size={4}>
                <TextField
                  label="Total Amount"
                  fullWidth
                  value={selectedBill.total_amount || ""}
                  onChange={(e) =>
                    setSelectedBill({
                      ...selectedBill,
                      total_amount: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item size={4}>
                <TextField
                  select
                  label="Bill Status"
                  fullWidth
                  value={selectedBill.bill_status}
                  onChange={(e) =>
                    setSelectedBill({
                      ...selectedBill,
                      bill_status: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </TextField>
              </Grid>

              <Grid item size={4}>
                {/* <TextField
                  type="date"
                  label="Due Date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={
                    selectedBill.due_date
                      ? dayjs(selectedBill.due_date).format("YYYY-MM-DD")
                      : ""
                  }
                  onChange={(e) =>
                    setSelectedBill({
                      ...selectedBill,
                      due_date: e.target.value,
                    })
                  }
                /> */}
              </Grid>

              <Grid item size={8}>
                <TextField
                  label="Notes"
                  fullWidth
                  multiline
                  rows={3}
                  value={selectedBill.notes || ""}
                  onChange={(e) =>
                    setSelectedBill({
                      ...selectedBill,
                      notes: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item size={12}>
                <Typography variant="subtitle1" fontWeight={600} mt={2}>
                  Bill Breakdown
                </Typography>
              </Grid>

              {/* CONSULTATIONS */}
              <Grid item size={12}>
                <Typography variant="body2" fontWeight={600}>
                  Consultations:
                </Typography>
                {selectedBill.consultations?.map((c, i) => (
                  <Typography key={i} variant="body2">
                    • {c.name} - ₹{c.cost}
                  </Typography>
                ))}
              </Grid>

              {/* MEDICINES */}
              <Grid item size={12}>
                <Typography variant="body2" fontWeight={600}>
                  Medicines:
                </Typography>
                {selectedBill.medicines?.map((m, i) => (
                  <Typography key={i} variant="body2">
                    • {m.medicine_name} ({m.strength}{m.unit}) {"- "}
                    {m.amount}₹ × {m.quantity} → ₹{m.total_amount}
                  </Typography>
                ))}
              </Grid>

              {/* TESTS */}
              <Grid item size={12}>
                <Typography variant="body2" fontWeight={600}>
                  Tests:
                </Typography>
                {selectedBill.tests?.length === 0 ? (
                  <Typography variant="body2">No tests</Typography>
                ) : (
                  selectedBill.tests.map((t, i) => (
                    <Typography key={i} variant="body2">
                      • {t.name}
                    </Typography>
                  ))
                )}
              </Grid>
            </Grid>
          </DialogContent>
        )}

        <DialogActions>
          <Button sx={{ color: "#3f6f7a" }} onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" sx={{ backgroundColor: "#3f6f7a" }} onClick={handleUpdate}>
            Update Bill
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminBills;
