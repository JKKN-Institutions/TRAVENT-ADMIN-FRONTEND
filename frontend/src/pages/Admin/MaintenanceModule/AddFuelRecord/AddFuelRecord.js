import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddFuelRecord.css";

const AddFuelRecord = ({ onBack, onSave, editingRecord }) => {
  const [fuelData, setFuelData] = useState({
    billDateTime: "",
    billNumber: "",
    routeNumber: "",
    driverName: "",
    fuelType: "",
    filledVolume: "",
    pricePerLiter: "",
    totalAmount: "",
    fuelStationAddress: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingRecord) {
      setFuelData(editingRecord);
    }
  }, [editingRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFuelData({ ...fuelData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(fuelData).forEach((key) => {
      if (!fuelData[key]) {
        formErrors[key] = `${
          key.charAt(0).toUpperCase() +
          key
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .trim()
        } is required`;
      }
    });
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill in all required fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      const loadingToastId = toast.loading(
        editingRecord ? "Updating fuel record..." : "Adding new fuel record...",
        {
          position: "top-right",
        }
      );

      try {
        const savedRecord = await onSave(fuelData);

        // Dismiss the loading toast
        toast.dismiss(loadingToastId);

        // Show success toast with a delay to ensure it's visible
        setTimeout(() => {
          toast.success(
            <div>
              Successfully {editingRecord ? "updated" : "added"} fuel record.
              <br />
              <small>Fuel record details have been saved.</small>
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
        setTimeout(() => onBack(savedRecord), 3100);
      } catch (error) {
        toast.dismiss(loadingToastId);
        toast.error(
          `Failed to ${
            editingRecord ? "update" : "add"
          } fuel record. Please try again.`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        console.error("Error saving fuel record:", error);
      }
    }
  };

  return (
    <div className="add-fuel-record-container">
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
      <header className="add-fuel-record-top-bar">
        <button className="add-fuel-record-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="add-fuel-record-header">
          <h2>{editingRecord ? "Edit Fuel Record" : "Add Fuel Record"}</h2>
        </div>
      </header>
      <main className="add-fuel-record-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-fuel-record-form-grid">
            {Object.keys(fuelData).map((key) => (
              <div key={key} className="add-fuel-record-form-group">
                {key === "fuelType" ? (
                  <select
                    id={key}
                    name={key}
                    value={fuelData[key]}
                    onChange={handleChange}
                    className={errors[key] ? "input-error" : ""}
                  >
                    <option value="">Select Fuel Type</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Petrol">Petrol</option>
                  </select>
                ) : key === "fuelStationAddress" ? (
                  <textarea
                    id={key}
                    name={key}
                    value={fuelData[key]}
                    onChange={handleChange}
                    placeholder={
                      key.charAt(0).toUpperCase() +
                      key
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                    }
                    className={errors[key] ? "input-error" : ""}
                  />
                ) : (
                  <input
                    type={
                      key === "billDateTime"
                        ? "datetime-local"
                        : key.includes("Amount") ||
                          key.includes("Price") ||
                          key === "filledVolume"
                        ? "number"
                        : "text"
                    }
                    id={key}
                    name={key}
                    value={fuelData[key]}
                    onChange={handleChange}
                    placeholder={
                      key.charAt(0).toUpperCase() +
                      key
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                    }
                    className={errors[key] ? "input-error" : ""}
                  />
                )}
                {errors[key] && <p className="error">{errors[key]}</p>}
              </div>
            ))}
          </div>
          <div className="add-fuel-record-buttons-container">
            <button
              type="button"
              className="add-fuel-record-cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>
            <button type="submit" className="add-fuel-record-save-button">
              {editingRecord ? "Update Record" : "Add Record"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddFuelRecord;
