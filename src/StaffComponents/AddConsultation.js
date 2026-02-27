import React, { useEffect, useState } from "react";
import {
  Box, Card, CardContent, Grid, Select, MenuItem, Typography,
  IconButton, Table, TableBody, TableCell, TableHead, TableRow,
  Paper, TableContainer, Button, Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const selectStyle = {
  width: "100%", height: 44, borderRadius: "8px", backgroundColor: "#f9fafb", fontSize: "0.875rem",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d1d5db" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#3f6f7a" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3f6f7a" },
  "& .MuiSelect-select": { display: "flex", alignItems: "center", padding: "0 14px", height: "44px !important", minHeight: "unset" },
};

const thSx = { fontWeight: 600, color: "#3f6f7a", fontSize: "0.8125rem" };
const tdSx = { fontSize: "0.875rem" };

export default function AddConsultation({ onConsultationChange, initialConsultations = [] }) {
  const [options, setOptions] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [list, setList] = useState(initialConsultations);
  const [showSelect, setShowSelect] = useState(initialConsultations.length === 0);

  useEffect(() => {
    if (initialConsultations.length > 0) { setList(initialConsultations); setShowSelect(false); }
  }, [initialConsultations]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SITE_URL}/api/consultation-types`, { credentials: "include" })
      .then(r => r.json())
      .then(d => { if (d.success) setOptions(d.data || []); });
  }, []);

  const addConsultation = (id) => {
    const c = options.find(x => x.id === Number(id));
    if (!c) return;
    if (list.some(x => x.id === c.id)) return; // prevent duplicates
    const updated = [...list, { id: c.id, name: c.name, description: c.description, cost: Number(c.cost) }];
    setList(updated); onConsultationChange(updated);
    setSelectedId(""); setShowSelect(false);
  };

  const remove = (id) => {
    const updated = list.filter(x => x.id !== id);
    setList(updated); onConsultationChange(updated);
    if (updated.length === 0) setShowSelect(true);
  };

  return (
    <Box>
      {/* ── TABLE ── */}
      {list.length > 0 && (
        <Box mb={showSelect ? 3 : 0}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#3f6f7a" }}>
              Consultation Types
              <Chip label={list.length} size="small"
                sx={{ ml: 1, backgroundColor: "#3f6f7a", color: "#fff", fontSize: "0.72rem", height: 18 }} />
            </Typography>
            {!showSelect && (
              <Button startIcon={<AddIcon />} onClick={() => setShowSelect(true)}
                sx={{ height: 36, backgroundColor: "#3f6f7a", color: "#fff", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, textTransform: "none", "&:hover": { backgroundColor: "#2e5560" } }}>
                Add Consultation
              </Button>
            )}
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: "10px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f0f7f9" }}>
                  <TableCell sx={thSx}>#</TableCell>
                  <TableCell sx={thSx}>Consultation</TableCell>
                  <TableCell sx={thSx}>Description</TableCell>
                  <TableCell sx={thSx}>Cost</TableCell>
                  <TableCell align="center" sx={thSx}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((c, i) => (
                  <TableRow key={c.id} sx={{ "&:hover": { backgroundColor: "#f9fafb" }, transition: "background 0.15s" }}>
                    <TableCell sx={{ ...tdSx, color: "#9ca3af" }}>{i + 1}</TableCell>
                    <TableCell sx={{ ...tdSx, fontWeight: 600 }}>{c.name}</TableCell>
                    <TableCell sx={tdSx}>{c.description || "—"}</TableCell>
                    <TableCell sx={tdSx}>₹{c.cost}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => remove(c.id)} size="small" color="error" title="Remove">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* ── SELECT DROPDOWN ── */}
      {showSelect && (
        <Card sx={{ borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", border: "1px solid #e5e7eb" }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6" sx={{ color: "#3f6f7a", fontWeight: 600 }}>
                Add Consultation Type
              </Typography>
              {list.length > 0 && (
                <Button onClick={() => setShowSelect(false)}
                  sx={{ height: 34, px: 2, border: "1px solid #d1d5db", color: "#6b7280", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, textTransform: "none", "&:hover": { backgroundColor: "#f9fafb" } }}>
                  Cancel
                </Button>
              )}
            </Box>

            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12} md={6}>
                <Typography variant="caption" sx={{ color: "#6b7280", mb: 0.5, display: "block" }}>Consultation Type</Typography>
                <Select displayEmpty value={selectedId} onChange={(e) => addConsultation(e.target.value)} sx={selectStyle}>
                  <MenuItem value="" sx={{ color: "#9ca3af", fontSize: "0.875rem" }}>Select Consultation</MenuItem>
                  {options
                    .filter(c => !list.some(l => l.id === c.id)) // hide already-added
                    .map(c => (
                      <MenuItem key={c.id} value={c.id} sx={{ fontSize: "0.875rem" }}>
                        {c.name} — ₹{c.cost}
                      </MenuItem>
                    ))}
                </Select>
                {options.filter(c => !list.some(l => l.id === c.id)).length === 0 && (
                  <Typography variant="caption" sx={{ color: "#9ca3af", mt: 1, display: "block" }}>
                    All consultation types have been added.
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* ── Empty state ── */}
      {list.length === 0 && !showSelect && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Button startIcon={<AddIcon />} onClick={() => setShowSelect(true)}
            sx={{ height: 44, px: 3, backgroundColor: "#3f6f7a", color: "#fff", borderRadius: "8px", fontSize: "0.875rem", fontWeight: 600, textTransform: "none", "&:hover": { backgroundColor: "#2e5560" } }}>
            Add Consultation
          </Button>
        </Box>
      )}
    </Box>
  );
}