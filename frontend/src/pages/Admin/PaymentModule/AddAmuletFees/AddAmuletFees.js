import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddAmuletFees.css";

const AddAmuletFees = ({ student, onBack, onAdd }) => {
  const [feeAmount, setFeeAmount] = useState("");
  const [amuletsToRefill, setAmuletsToRefill] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feeAmount || !amuletsToRefill) {
      toast.error("Please fill in all required fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const loadingToastId = toast.loading("Adding amulet fees...", {
        position: "top-right",
      });

      await onAdd({ feeAmount, amuletsToRefill });

      // Dismiss the loading toast
      toast.dismiss(loadingToastId);

      // Show success toast with a delay to ensure it's visible
      setTimeout(() => {
        toast.success(
          <div>
            Successfully added amulet fees.
            <br />
            <small>Amulet fees have been saved.</small>
          </div>,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }, 100);

      // Delay the onBack call to ensure toast is visible
      setTimeout(() => onBack(), 3100);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to add amulet fees. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error saving amulet fees:", error);
    }
  };

  return (
    <div className="add-amulet-fee-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
      />
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
