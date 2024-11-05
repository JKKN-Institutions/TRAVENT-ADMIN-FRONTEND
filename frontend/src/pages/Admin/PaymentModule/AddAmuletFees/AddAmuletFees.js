import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./AddAmuletFees.css";

const AddAmuletFees = ({ student, onBack, onAdd }) => {
  const [feeAmount, setFeeAmount] = useState("");
  const [amuletsToRefill, setAmuletsToRefill] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ feeAmount, amuletsToRefill });
  };

  return (
    <div className="add-amulet-fee-container">
      <header className="add-amulet-fee-top-bar">
        <button className="add-amulet-fee-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="add-amulet-fee-header">
          <h2>Refill Amulets</h2>
        </div>
      </header>

      <main className="add-amulet-fee-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-amulet-fee-form-grid">
            <div className="add-amulet-fee-column">
              <div className="add-amulet-fee-form-group">
                <h3 className="text-primary-500 mb-4">Student Information</h3>
                <div className="student-info-grid">
                  <div className="info-item">
                    <label>Name :</label>
                    <span>{student.name}</span>
                  </div>
                  <div className="info-item">
                    <label>Register No :</label>
                    <span>{student.regNo}</span>
                  </div>
                  <div className="info-item">
                    <label>Roll No :</label>
                    <span>{student.rollNo}</span>
                  </div>
                  <div className="info-item">
                    <label>Year / Dept / Section :</label>
                    <span>
                      {student.year} / {student.department} / {student.section}
                    </span>
                  </div>
                  <div className="info-item">
                    <label>Institute Name :</label>
                    <span>{student.instituteName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="add-amulet-fee-column">
              <div className="add-amulet-fee-form-group">
                <h3>Fee Details</h3>
                <div className="fee-inputs">
                  <div>
                    <input
                      type="number"
                      value={feeAmount}
                      onChange={(e) => setFeeAmount(e.target.value)}
                      placeholder="Fee Amount"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={amuletsToRefill}
                      onChange={(e) => setAmuletsToRefill(e.target.value)}
                      placeholder="Amulets Count"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="add-amulet-fee-buttons-container">
            <button
              type="button"
              className="add-amulet-fee-cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>
            <button type="submit" className="add-amulet-fee-save-button">
              Add
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddAmuletFees;
