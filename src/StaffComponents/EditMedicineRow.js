import React, { useState } from "react";

function EditMedicineRow({ medicine, onSave, onCancel }) {
  const [form, setForm] = useState({ ...medicine });
  const f = (key, val) => setForm((p) => ({ ...p, [key]: val }));

  return (
    <tr className="editing-row">
      <td>—</td>
      <td><input value={form.medicine_name} onChange={(e) => f("medicine_name", e.target.value)} /></td>
      <td>
        <select value={form.type} onChange={(e) => f("type", e.target.value)}>
          {["Tablet","Syrup","Injection","Capsule","Cream","Drops","Inhaler"].map(o=><option key={o}>{o}</option>)}
        </select>
      </td>
      <td>
        <div style={{display:"flex",gap:4}}>
          <input style={{width:60}} value={form.strength} onChange={(e) => f("strength", e.target.value)} placeholder="Str." />
          <select style={{width:55}} value={form.unit} onChange={(e) => f("unit", e.target.value)}>
            {["mg","ml","mcg","g","IU","%"].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
      </td>
      <td><input style={{width:50}} type="number" value={form.amount} onChange={(e) => f("amount", e.target.value)} /></td>
      <td>
        <select value={form.when_to_take} onChange={(e) => f("when_to_take", e.target.value)}>
          {["Before Food","After Food","With Food","Morning","Afternoon","Night","Morning & Night","3 Times a Day","SOS"].map(o=><option key={o}>{o}</option>)}
        </select>
      </td>
      <td><input style={{width:55}} type="number" value={form.duration} onChange={(e) => f("duration", e.target.value)} /></td>
      <td><input value={form.description || ""} onChange={(e) => f("description", e.target.value)} placeholder="Notes" /></td>
      <td className="actions">
        <button className="btn-save" onClick={() => onSave(form)}>Save</button>
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
      </td>
    </tr>
  );
}

export default EditMedicineRow;
