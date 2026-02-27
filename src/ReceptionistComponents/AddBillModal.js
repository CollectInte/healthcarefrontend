import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, IconButton, TextField,
  Button, Autocomplete, Snackbar, Alert, Typography, Box, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, Tooltip,
} from "@mui/material";
import CloseIcon        from "@mui/icons-material/Close";
import DeleteIcon       from "@mui/icons-material/Delete";
import EditIcon         from "@mui/icons-material/Edit";
import CheckIcon        from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import axios from "axios";
import { COLORS } from "./Themes";

const fieldSx = {
  "& .MuiInputBase-root": { height: 35, border: `2px solid ${COLORS.primary}` },
  "& fieldset": { border: "none" },
};

const costInputSx = {
  width: 100,
  "& .MuiInputBase-root": { height: 30, fontSize: 13 },
  "& fieldset": { border: "1px solid #ccc" },
};

const editInputSx = {
  width: 80,
  "& .MuiInputBase-root": { height: 28, fontSize: 12 },
  "& fieldset": { border: "1px solid #aaa" },
};

/* ─────────────────────────────────────────────────────────────────
   EDITABLE COST TABLE
   Supports per-row: delete, inline-edit (qty + amount + cost)
───────────────────────────────────────────────────────────────── */
function EditableCostTable({ rows, nameKey, onCostChange, onDelete, onEditSave, extraColumns, isMedicine }) {
  // editingIndex = which row is currently in edit mode
  const [editingIndex, setEditingIndex] = useState(null);
  const [editDraft,    setEditDraft]    = useState({});

  const startEdit = (i, row) => {
    setEditingIndex(i);
    setEditDraft({
      cost:     row.cost,
      quantity: row.quantity,
      amount:   row.amount,
    });
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditDraft({});
  };

  const saveEdit = (i) => {
    onEditSave(i, editDraft);
    setEditingIndex(null);
    setEditDraft({});
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow sx={{ bgcolor: "#f0f4f8" }}>
          <TableCell><strong>Item</strong></TableCell>
          {extraColumns?.map((col, i) => (
            <TableCell key={i} align="center"><strong>{col.label}</strong></TableCell>
          ))}
          <TableCell align="right"><strong>Cost (₹)</strong></TableCell>
          <TableCell align="center" sx={{ width: 80 }}><strong>Actions</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          const isEditing = editingIndex === i;
          return (
            <TableRow key={i} hover sx={{ bgcolor: isEditing ? "#fffde7" : "inherit" }}>
              {/* Item name */}
              <TableCell>
                <Typography fontSize={13}>{row[nameKey]}</Typography>
                {row.duration && (
                  <Typography variant="caption" color="text.secondary">{row.duration}</Typography>
                )}
              </TableCell>

              {/* Extra columns (qty / unit price) — editable when in edit mode */}
              {extraColumns?.map((col, j) => (
                <TableCell key={j} align="center">
                  {isEditing && isMedicine && col.label === "Qty" ? (
                    <TextField
                      type="number"
                      value={editDraft.quantity ?? ""}
                      onChange={(e) => {
                        const qty = Number(e.target.value);
                        const amt = Number(editDraft.amount || 0);
                        setEditDraft(d => ({ ...d, quantity: qty, cost: qty * amt }));
                      }}
                      sx={editInputSx}
                      inputProps={{ min: 1 }}
                    />
                  ) : isEditing && isMedicine && col.label === "Unit Price" ? (
                    <TextField
                      type="number"
                      value={editDraft.amount ?? ""}
                      onChange={(e) => {
                        const amt = Number(e.target.value);
                        const qty = Number(editDraft.quantity || 1);
                        setEditDraft(d => ({ ...d, amount: amt, cost: qty * amt }));
                      }}
                      sx={editInputSx}
                      inputProps={{ min: 0, step: 0.01 }}
                    />
                  ) : (
                    <Typography fontSize={13}>{col.render(row)}</Typography>
                  )}
                </TableCell>
              ))}

              {/* Cost field */}
              <TableCell align="right">
                {isEditing ? (
                  <TextField
                    type="number"
                    value={editDraft.cost ?? ""}
                    onChange={(e) => setEditDraft(d => ({ ...d, cost: Number(e.target.value) }))}
                    sx={costInputSx}
                    inputProps={{ min: 0, step: 0.01 }}
                  />
                ) : (
                  <TextField
                    type="number"
                    value={row.cost}
                    onChange={(e) => onCostChange(i, e.target.value)}
                    sx={costInputSx}
                    inputProps={{ min: 0, step: 0.01 }}
                  />
                )}
              </TableCell>

              {/* Actions */}
              <TableCell align="center">
                {isEditing ? (
                  <Stack direction="row" spacing={0.5} justifyContent="center">
                    <Tooltip title="Save">
                      <IconButton size="small" onClick={() => saveEdit(i)} sx={{ color: "green" }}>
                        <CheckIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                      <IconButton size="small" onClick={cancelEdit} sx={{ color: "#888" }}>
                        <CloseOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={0.5} justifyContent="center">
                    <Tooltip title="Edit row">
                      <IconButton size="small" onClick={() => startEdit(i, row)} sx={{ color: COLORS.primary }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete row">
                      <IconButton size="small" onClick={() => onDelete(i)} sx={{ color: "#e53935" }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION HEADER  (title + delete-section button)
───────────────────────────────────────────────────────────────── */
function SectionHeader({ title, onDeleteSection }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
      <Typography fontWeight={500}>{title}</Typography>
      <Tooltip title={`Remove all ${title.toLowerCase()}`}>
        <IconButton size="small" onClick={onDeleteSection} sx={{ color: "#e53935" }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
export default function AddBillModal({ open, onClose, bills = [], onBillAdded }) {
  const [patients,     setPatients]     = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patient,      setPatient]      = useState(null);
  const [appointment,  setAppointment]  = useState(null);
  const [prescription, setPrescription] = useState(null);
  const [notes,        setNotes]        = useState("");
  const [loadingRx,    setLoadingRx]    = useState(false);
  const [alert,        setAlert]        = useState({ open: false, type: "success", message: "" });
  const [tax,          setTax]          = useState(0);

  const [consultations, setConsultations] = useState([]);
  const [medicines,     setMedicines]     = useState([]);
  const [tests,         setTests]         = useState([]);

  /* ── helpers ── */
  const deleteRow = (setter, index) =>
    setter(prev => prev.filter((_, i) => i !== index));

  const deleteSection = (setter) => setter([]);

  const editSaveRow = (setter, index, draft, isMed) =>
    setter(prev =>
      prev.map((item, i) => {
        if (i !== index) return item;
        if (isMed) {
          const qty = Number(draft.quantity ?? item.quantity ?? 1);
          const amt = Number(draft.amount   ?? item.amount   ?? 0);
          return { ...item, quantity: qty, amount: amt, cost: qty * amt };
        }
        return { ...item, cost: Number(draft.cost ?? item.cost) };
      })
    );

  /* ── 1. Fetch patients ── */
  useEffect(() => {
    if (!open) return;
    axios
      .get(`${process.env.REACT_APP_URL}/appointment/billing-patients`, { withCredentials: true })
      .then((res) => { if (res.data.success) setPatients(res.data.data); })
      .catch((err) => console.error("Billing patients fetch error:", err));
  }, [open]);

  /* ── 2. Fetch appointments ── */
  useEffect(() => {
    if (!patient) { setAppointments([]); setAppointment(null); return; }
    axios
      .get(`${process.env.REACT_APP_URL}/appointment/billing-appointments`, {
        params: { patient_id: patient.id },
        withCredentials: true,
      })
      .then((res) => { if (res.data.success) setAppointments(res.data.data); })
      .catch((err) => console.error("Billing appointments fetch error:", err));
  }, [patient]);

  /* ── 3. Fetch prescription ── */
  useEffect(() => {
    if (!patient || !appointment) {
      setPrescription(null);
      setConsultations([]); setMedicines([]); setTests([]);
      return;
    }
    setLoadingRx(true);
    axios
      .get(`${process.env.REACT_APP_URL}/api/prescriptions/by-appointment`, {
        params: { patient_id: patient.id, appointment_id: appointment.id },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success && res.data.data) {
          const rx = res.data.data;
          setPrescription(rx);
          setConsultations((rx.consultations || []).map(c => ({ ...c, cost: Number(c.cost || 0) })));
          setMedicines((rx.medicines || []).map(m => {
            const quantity = Number(m.quantity || 1);
            const amount   = Number(m.amount   || 0);
            return { ...m, quantity, amount, cost: quantity * amount };
          }));
          setTests((rx.tests || []).map(t => ({ ...t, cost: Number(t.cost || 0) })));
        } else {
          setPrescription(null);
          setConsultations([]); setMedicines([]); setTests([]);
        }
      })
      .catch(() => {
        setPrescription(null);
        setConsultations([]); setMedicines([]); setTests([]);
      })
      .finally(() => setLoadingRx(false));
  }, [patient, appointment]);

  /* ── Update cost inline (non-edit-mode) ── */
  const updateCost = (setter, index, value) =>
    setter(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, cost: value === "" ? "" : Number(value) } : item
      )
    );

  /* ── Totals ── */
  const consultationTotal = consultations.reduce((s, c) => s + Number(c.cost || 0), 0);
  const medicineTotal     = medicines.reduce((s, m)     => s + Number(m.cost || 0), 0);
  const testTotal         = tests.reduce((s, t)         => s + Number(t.cost || 0), 0);
  const subtotal          = consultationTotal + medicineTotal + testTotal;
  const totalAmount       = subtotal + Number(tax || 0);

  /* ── Submit ── */
  const handleSubmit = async () => {
    if (!patient)     { setAlert({ open: true, type: "warning", message: "Please select a patient" });     return; }
    if (!appointment) { setAlert({ open: true, type: "warning", message: "Please select an appointment" }); return; }
    try {
      await axios.post(
        `${process.env.REACT_APP_URL}/bill/bills`,
        {
          appointment_id:  appointment.id,
          prescription_id: prescription?.id || null,
          subtotal:        subtotal.toFixed(2),
          tax:             Number(tax || 0).toFixed(2),
          total_amount:    totalAmount.toFixed(2),
          notes,
          bill_breakdown_json: {
            consultations: consultations.map(c => ({ name: c.name, cost: Number(c.cost || 0) })),
            medicines: medicines.map(m => ({
              name:       m.medicine_name,
              unit_price: m.amount,
              quantity:   m.quantity,
              cost:       Number(m.cost || 0),
              duration:   m.duration,
            })),
            tests: tests.map(t => ({ name: t.test_name, cost: Number(t.cost || 0) })),
          },
        },
        { withCredentials: true }
      );
      onBillAdded?.();
      setAlert({ open: true, type: "success", message: "Bill created successfully" });
      setTimeout(() => { onClose(); resetForm(); }, 1200);
    } catch (err) {
      setAlert({ open: true, type: "error", message: err.response?.data?.message || "Server error" });
    }
  };

  const resetForm = () => {
    setPatient(null); setAppointment(null); setPrescription(null);
    setPatients([]); setAppointments([]);
    setConsultations([]); setMedicines([]); setTests([]);
    setNotes(""); setTax(0);
  };

  const labelSx = { color: COLORS.primary, mb: 0.5, fontWeight: 500 };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", px: 3, py: 2 }}>
          <Typography fontWeight={600} fontSize={18} color={COLORS.primary}>Add Bill</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </DialogTitle>

        <DialogContent sx={{ px: 4, py: 1 }}>
          <Stack spacing={2}>

            {/* PATIENT */}
            <Box>
              <Typography sx={labelSx}>Patient</Typography>
              <Autocomplete
                fullWidth
                options={patients}
                getOptionLabel={(o) => `${o.name} (ID: ${o.id})`}
                value={patient}
                onChange={(_, v) => {
                  setPatient(v);
                  setAppointment(null); setPrescription(null);
                  setConsultations([]); setMedicines([]); setTests([]);
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select patient" sx={fieldSx} />
                )}
              />
            </Box>

            {/* APPOINTMENT */}
            {patient && (
              <Box>
                <Typography sx={labelSx}>Appointment</Typography>
                <Autocomplete
                  fullWidth
                  options={appointments}
                  getOptionLabel={(o) =>
                    `#${o.id} — ${o.appointment_date} | ${o.from_time}–${o.to_time} | ${o.purpose || "—"}`
                  }
                  value={appointment}
                  onChange={(_, v) => setAppointment(v)}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select appointment" sx={fieldSx} />
                  )}
                />
              </Box>
            )}

            {/* DOCTOR */}
            {appointment && (
              <Box>
                <Typography sx={labelSx}>Doctor</Typography>
                <TextField fullWidth disabled value={appointment?.doctor_name || ""} sx={fieldSx} />
              </Box>
            )}

            {loadingRx && (
              <Typography color="text.secondary" fontSize={13}>Fetching prescription...</Typography>
            )}

            {appointment && !loadingRx && !prescription && (
              <Typography color="text.secondary" fontSize={13}>
                No prescription linked to this appointment.
              </Typography>
            )}

            {/* ── PRESCRIPTION BREAKDOWN — EDITABLE ── */}
            {prescription && !loadingRx && (
              <Box sx={{ border: `1px solid ${COLORS.primary}`, borderRadius: 2, p: 2 }}>
                <Typography fontWeight={600} color={COLORS.primary} mb={1.5}>
                  Prescription #{prescription.id} — Edit Costs
                </Typography>

                {/* CONSULTATIONS */}
                {consultations.length > 0 && (
                  <Box mb={2}>
                    <SectionHeader
                      title="Consultation Fees"
                      onDeleteSection={() => deleteSection(setConsultations)}
                    />
                    <EditableCostTable
                      rows={consultations}
                      nameKey="name"
                      onCostChange={(i, v) => updateCost(setConsultations, i, v)}
                      onDelete={(i) => deleteRow(setConsultations, i)}
                      onEditSave={(i, draft) => editSaveRow(setConsultations, i, draft, false)}
                    />
                    <Typography align="right" fontSize={12} mt={0.5} color="text.secondary">
                      Subtotal: ₹{consultationTotal.toFixed(2)}
                    </Typography>
                  </Box>
                )}

                {/* MEDICINES */}
                {medicines.length > 0 && (
                  <Box mb={2}>
                    <SectionHeader
                      title="Medicines"
                      onDeleteSection={() => deleteSection(setMedicines)}
                    />
                    <EditableCostTable
                      rows={medicines}
                      nameKey="medicine_name"
                      onCostChange={(i, v) => updateCost(setMedicines, i, v)}
                      onDelete={(i) => deleteRow(setMedicines, i)}
                      onEditSave={(i, draft) => editSaveRow(setMedicines, i, draft, true)}
                      isMedicine
                      extraColumns={[
                        { label: "Qty",        render: (row) => row.quantity },
                        { label: "Unit Price", render: (row) => `₹${Number(row.amount || 0).toFixed(2)}` },
                      ]}
                    />
                    <Typography align="right" fontSize={12} mt={0.5} color="text.secondary">
                      Subtotal: ₹{medicineTotal.toFixed(2)}
                    </Typography>
                  </Box>
                )}

                {/* TESTS */}
                {tests.length > 0 && (
                  <Box>
                    <SectionHeader
                      title="Tests"
                      onDeleteSection={() => deleteSection(setTests)}
                    />
                    <EditableCostTable
                      rows={tests}
                      nameKey="test_name"
                      onCostChange={(i, v) => updateCost(setTests, i, v)}
                      onDelete={(i) => deleteRow(setTests, i)}
                      onEditSave={(i, draft) => editSaveRow(setTests, i, draft, false)}
                    />
                    <Typography align="right" fontSize={12} mt={0.5} color="text.secondary">
                      Subtotal: ₹{testTotal.toFixed(2)}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* TOTALS */}
            <Box sx={{ bgcolor: "#f5f5f5", borderRadius: 2, p: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">Consultation Total</Typography>
                <Typography fontWeight={600}>₹{consultationTotal.toFixed(2)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" mt={0.5}>
                <Typography color="text.secondary">Medicine Total</Typography>
                <Typography fontWeight={600}>₹{medicineTotal.toFixed(2)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" mt={0.5}>
                <Typography color="text.secondary">Test Total</Typography>
                <Typography fontWeight={600}>₹{testTotal.toFixed(2)}</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" mt={0.5} alignItems="center">
                <Typography color="text.secondary">Tax</Typography>
                <TextField
                  type="number"
                  value={tax}
                  onChange={(e) => setTax(e.target.value === "" ? "" : Number(e.target.value))}
                  sx={{ width: 120 }}
                  inputProps={{ min: 0, step: 0.01 }}
                />
              </Stack>
              <Stack
                direction="row" justifyContent="space-between" mt={1}
                sx={{ borderTop: "1px solid #ccc", pt: 1 }}
              >
                <Typography fontWeight={700} fontSize={16}>Total</Typography>
                <Typography fontWeight={700} fontSize={16} color={COLORS.primary}>
                  ₹{totalAmount.toFixed(2)}
                </Typography>
              </Stack>
            </Box>

            {/* NOTES */}
            <Box>
              <Typography sx={labelSx}>Notes</Typography>
              <TextField
                fullWidth multiline rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes"
                sx={{
                  ...fieldSx,
                  "& .MuiInputBase-root": { height: "auto", border: `2px solid ${COLORS.primary}` },
                }}
              />
            </Box>

            {/* SUBMIT */}
            <Box display="flex" justifyContent="center" pb={1}>
              <Button
                onClick={handleSubmit}
                sx={{
                  bgcolor: COLORS.primary, color: "#fff",
                  px: 6, py: 1.2, borderRadius: "24px",
                  fontWeight: 600, textTransform: "capitalize",
                }}
              >
                Create Bill
              </Button>
            </Box>

          </Stack>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alert.type} onClose={() => setAlert({ ...alert, open: false })}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
}