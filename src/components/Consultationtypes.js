import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Stack,
  InputAdornment,
} from "@mui/material";

import AddIcon    from "@mui/icons-material/Add";
import EditIcon   from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon  from "@mui/icons-material/Close";
import TablePagination from "@mui/material/TablePagination";

const API = `${process.env.REACT_APP_SITE_URL}/api/consultation-types`;

const emptyForm = { name: "", description: "", cost: "" };

export default function ConsultationTypes() {
  const [rows, setRows]         = useState([]);
  const [loading, setLoading]   = useState(false);
  const [open, setOpen]         = useState(false);
  const [form, setForm]         = useState(emptyForm);
  const [editId, setEditId]     = useState(null);
  const [saving, setSaving]     = useState(false);
  const [errors, setErrors]     = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // ── Fetch all ─────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    setLoading(true);
    try {
      const res  = await fetch(API, { credentials: "include" });
      const data = await res.json();
      if (data.success) setRows(data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // ── Open popup ────────────────────────────────────────────────────────────
  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setErrors({});
    setOpen(true);
  };
  
  const handleChangePage = (event, newPage) => {
  setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };  

  const openEdit = (row) => {
    setForm({ name: row.name, description: row.description || "", cost: row.cost });
    setEditId(row.id);
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(emptyForm);
    setEditId(null);
    setErrors({});
  };

  // ── Validate ──────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim())          e.name = "Name is required";
    if (form.cost === "" || isNaN(form.cost)) e.cost = "Valid cost is required";
    if (Number(form.cost) < 0)      e.cost = "Cost cannot be negative";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Save (create or update) ───────────────────────────────────────────────
  const handleSave = async () => {
    if (!validate()) return;

    try {
      setSaving(true);

      const url    = editId ? `${API}/${editId}` : API;
      const method = editId ? "PUT" : "POST";

      const res  = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:        form.name.trim(),
          description: form.description.trim() || null,
          cost:        parseFloat(form.cost),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Save failed");
        return;
      }

      handleClose();
      fetchAll();

    } catch (err) {
      console.error("Save error:", err);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this consultation type?")) return;

    try {
      const res  = await fetch(`${API}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) fetchAll();
      else alert(data.message || "Delete failed");

    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>

      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} sx={{mt:5}}>
        <Typography variant="h5" fontWeight={600}>
          Consultation Types
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAdd}
          sx={{backgroundColor:"#3f6f7a"}}
        >
          Add Consultation Type
        </Button>
      </Stack>

      {/* Table */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "#3f6f7a" }}>
                <TableCell sx={{color:"#ffffff"}}><b>#</b></TableCell>
                <TableCell sx={{color:"#ffffff"}}><b>Name</b></TableCell>
                <TableCell sx={{color:"#ffffff"}}><b>Description</b></TableCell>
                <TableCell sx={{color:"#ffffff"}}><b>Cost (₹)</b></TableCell>
                <TableCell sx={{color:"#ffffff"}}><b>Created At</b></TableCell>
                <TableCell sx={{color:"#ffffff"}} align="right"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (                
              <TableRow key={row.id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>                 
                  <TableCell>{row.name}</TableCell>
                  <TableCell sx={{ color: "text.secondary", maxWidth: 200 }}>
                    {row.description || "—"}
                  </TableCell>
                  <TableCell>₹ {parseFloat(row.cost).toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(row.created_at).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <IconButton
                        size="small"
                        color="primary"
                        title="Edit"
                        onClick={() => openEdit(row)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        title="Delete"
                        onClick={() => handleDelete(row.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {!rows.length && !loading && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4, color: "text.secondary" }}>
                    No consultation types found. Click "Add" to create one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5]}
          />
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {editId ? "Edit Consultation Type" : "Add Consultation Type"}
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2.5} mt={0.5}>

            <TextField
              label="Name"
              fullWidth
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
              placeholder="e.g. General Consultation"
            />

            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Brief description of this consultation type"
            />

            <TextField
              label="Cost"
              fullWidth
              required
              type="number"
              value={form.cost}
              onChange={e => setForm({ ...form, cost: e.target.value })}
              error={!!errors.cost}
              helperText={errors.cost}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
              inputProps={{ min: 0, step: "0.01" }}
              placeholder="0.00"
            />

          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="outlined" onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : editId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}