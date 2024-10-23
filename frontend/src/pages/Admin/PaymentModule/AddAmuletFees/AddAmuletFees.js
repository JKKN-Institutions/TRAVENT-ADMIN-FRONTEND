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
      <header className="add-amulet-fee-header">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="add-amulet-fee-back-icon"
          onClick={onBack}
        />
        <h2>Refill Amulets</h2>
      </header>

      <div className="add-amulet-fee-content">
        <div className="add-amulet-fee-card">
          <h3 className="add-amulet-fee-card-title">Add Fee</h3>

          <div className="add-amulet-fee-student-info">
            <p>
              Name: <span>{student.name}</span>
            </p>
            <p>
              Register No: <span>{student.regNo}</span>
            </p>
            <p>
              Roll No: <span>{student.rollNo}</span>
            </p>
            <p>
              Year / Dept / Section:{" "}
              <span>
                {student.year} / {student.department} / {student.section}{" "}
              </span>
            </p>
            <p>
              Institute Name: <span>{student.instituteName}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="add-amulet-fee-form">
            <div className="form-grid">
              <div className="add-amulet-fee-form-group">
                <input
                  type="number"
                  value={feeAmount}
                  onChange={(e) => setFeeAmount(e.target.value)}
                  placeholder="Enter Fee to be added"
                  required
                />
              </div>
              <div className="add-amulet-fee-form-group">
                <input
                  type="number"
                  value={amuletsToRefill}
                  onChange={(e) => setAmuletsToRefill(e.target.value)}
                  placeholder="Enter Amulets to be refilled"
                  required
                />
              </div>
              {/* Add an empty div to maintain the 3-column layout */}
              <div></div>
            </div>
            <div className="add-amulet-fee-buttons">
              <button
                type="button"
                className="add-amulet-fee-cancel-button"
                onClick={onBack}
              >
                Cancel
              </button>
              <button type="submit" className="add-amulet-fee-add-button">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAmuletFees;
