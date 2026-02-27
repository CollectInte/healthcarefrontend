import React, { useState } from "react";

function EditTestRow({ test, onSave, onCancel }) {
  const [form, setForm] = useState({ ...test });
  const f = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  const TEST_TYPES = [
    "Blood Test","Urine Test","Liver Function Test","Kidney Function Test",
    "Thyroid Function Test","Lipid Profile","CBC","Scan","X-Ray","MRI",
    "CT Scan","ECG","Ultrasound","Culture & Sensitivity","Stool Test",
  ];

  return (
    <tr className="editing-row">
      <td>—</td>
      <td><input value={form.test_name} onChange={(e) => f("test_name", e.target.value)} /></td>
      <td>
        <select value={form.test_type} onChange={(e) => f("test_type", e.target.value)}>
          {TEST_TYPES.map(o => <option key={o}>{o}</option>)}
        </select>
      </td>
      <td><input value={form.description || ""} onChange={(e) => f("description", e.target.value)} placeholder="Description" /></td>
      <td className="actions">
        <button className="btn-save" onClick={() => onSave(form)}>Save</button>
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
      </td>
    </tr>
  );
}

export default EditTestRow;
