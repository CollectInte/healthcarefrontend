import React from "react";
import './medicine.css';
function AddMedicine({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Add Medicine</h3>
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          <input placeholder="Medicine Name" />
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
            Save Medicine
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMedicine;
