import React from "react";
import './medicine.css';

function AddTests({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Add Medical Test</h3>
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <input placeholder="Test Name" />

          <select>
            <option>Blood Test</option>
            <option>Urine Test</option>
            <option>X-Ray</option>
            <option>MRI</option>
          </select>

          <textarea placeholder="Instructions" />
          <input type="date" />
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary">
            Save Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTests;
