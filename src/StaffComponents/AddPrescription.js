import React, { useState, useEffect, useCallback } from "react";
import AddMedicine from "./AddMedicine";
import AddTests from "./AddTests";
import EditMedicineRow from "./EditMedicineRow";
import EditTestRow from "./EditTestRow";
import PrescriptionPreview from "./PrescriptionPreview";
import { usePrescriptionAPI } from "./UsePrescriptionApi";
import "./prescription.css";

/* ── Small Toast notification ─────────────────────────── */
function Toast({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);
  return <div className="toast">{message}</div>;
}

export default function AddPrescription() {

  const {
    availableMedicines,
    availableTests,
    patients,
    doctors,
    currentUser,
    loading,
    savePrescription,
  } = usePrescriptionAPI();

  /* Header Fields */
  const [patientQuery, setPatientQuery]     = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientSug, setPatientSug]         = useState([]);
  const [showPatientSug, setShowPatientSug] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [diagnosis, setDiagnosis]           = useState("");
  const [notes, setNotes]                   = useState("");
  const [description, setDescription]       = useState("");

  /* Line items */
  const [medicines, setMedicines] = useState([]);
  const [tests, setTests]         = useState([]);

  /* UI */
  const [saving, setSaving]   = useState(false);
  const [savedId, setSavedId] = useState(null);
  const [toast, setToast]     = useState(null);

  /* Auto select doctor if logged-in user is a doctor */
  useEffect(() => {
    if (currentUser?.role === "doctor" && !selectedDoctor) {
      setSelectedDoctor({
        id: currentUser.id,
        name: currentUser.name || currentUser.full_name,
      });
    }
  }, [currentUser]);

  /* Patient Search */
  const onPatientInput = (val) => {
    setPatientQuery(val);
    setSelectedPatient(null);

    const s = patients.filter((p) =>
      (p.name || p.full_name || "")
        .toLowerCase()
        .includes(val.toLowerCase()) ||
      String(p.id).includes(val)
    );

    setPatientSug(s);
    setShowPatientSug(val.length > 0 && s.length > 0);
  };

  const pickPatient = (p) => {
    setSelectedPatient(p);
    setPatientQuery(`${p.name || p.full_name} (ID: ${p.id})`);
    setShowPatientSug(false);
  };

  /* Build payload */
  const buildPrescription = () => ({
    patient_id:  selectedPatient?.id || null,
    doctor_id:   selectedDoctor?.id  || null,
    diagnosis,
    notes,
    description,
    medicines,
    tests,
  });

  /* Save Prescription → mail is sent automatically inside usePrescriptionAPI */
  const handleSave = async () => {
    if (!selectedPatient || !selectedDoctor) {
      return showToast("⚠ Please select patient and doctor");
    }

    try {
      setSaving(true);

      const result = await savePrescription(buildPrescription());
      console.log("SAVE RESPONSE:", result);

      if (result && result.success) {
        const prescriptionId =
          result?.data?.prescription_id || result?.prescription_id || null;

        if (!prescriptionId) {
          showToast("✅ Saved — but prescription ID not returned");
          return;
        }

        setSavedId(prescriptionId);
        showToast("✅ Prescription saved & email sent to patient");

      } else {
        showToast("❌ Save failed: " + (result?.message || "Unknown error"));
      }

    } catch (err) {
      console.error("Save error:", err);
      showToast("❌ Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const showToast = useCallback((msg) => setToast(msg), []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <h3>⏳ Loading prescription data…</h3>
      </div>
    );
  }

  /* Preview Data */
  const previewData = {
    id: savedId,
    patient: selectedPatient,
    doctor: selectedDoctor,
    diagnosis,
    notes,
    description,
    medicines,
    tests,
  };

  return (
    <div className="prescription-layout">

      {/* LEFT PANEL */}
      <div className="left-panel">

        <div className="info-card">
          <h3>📋 Prescription Details</h3>

          <input
            placeholder="Search patient name or ID…"
            value={patientQuery}
            onChange={(e) => onPatientInput(e.target.value)}
          />

          {showPatientSug && (
            <ul className="sug-list">
              {patientSug.map((p) => (
                <li key={p.id} onClick={() => pickPatient(p)}>
                  {p.name || p.full_name} (ID: {p.id})
                </li>
              ))}
            </ul>
          )}

          <select
            value={selectedDoctor?.id || ""}
            onChange={(e) => {
              const doc = doctors.find((d) => String(d.id) === e.target.value);
              setSelectedDoctor(doc || null);
            }}
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name || d.full_name}
              </option>
            ))}
          </select>

          <input
            placeholder="Diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />

          <input
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* TESTS */}
        <div className="section-card">
          <h3>🔬 Add Tests</h3>
          <AddTests
            onAdd={(d) => setTests([...tests, d])}
            availableTests={availableTests}
          />
        </div>

        {/* MEDICINES */}
        <div className="section-card">
          <h3>💊 Add Medicines</h3>
          <AddMedicine
            onAdd={(d) => setMedicines([...medicines, d])}
            availableMedicines={availableMedicines}
          />
        </div>

        <button
          className="btn-submit-rx"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving…" : "💾 Save Prescription"}
        </button>
      </div>

      {/* RIGHT PANEL — Always Visible Preview (no send mail button) */}
      <div className="right-panel">
        <h2>📄 Prescription Preview</h2>
        <PrescriptionPreview data={previewData} />
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}