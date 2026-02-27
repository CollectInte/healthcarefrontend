import React, { useState } from "react";
import AddMedicine from "./AddMedicine";
import AddTests from "./AddTests";
import './medicine.css';

function AddPrescription() {
  const [activeModal, setActiveModal] = useState(null); // "medicine" | "test" | null

  const closeModal = () => setActiveModal(null);

  return (
    <div className="page-container">
      <h2>Prescription Entry</h2>

      <div className="header-actions">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => setActiveModal("medicine")}
        >
          + Add Medicine
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setActiveModal("test")}
        >
          + Add Test
        </button>
      </div>

      {/* 🔥 MODALS */}
      {activeModal === "medicine" && (
        <AddMedicine onClose={closeModal} />
      )}

      {activeModal === "test" && (
        <AddTests onClose={closeModal} />
      )}
    </div>
  );
}

export default AddPrescription;
