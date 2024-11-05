import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddBusFee.css";

const AddBusFee = ({ busFeeData, onBack, onSave }) => {
  const [formData, setFormData] = useState({
    academicYearStart: new Date().getFullYear(),
    academicYearEnd: new Date().getFullYear() + 1,
    institute: "",
    totalBusFee: "",
    termSelection: {
      term1: false,
      term2: false,
      term3: false,
    },
    duration: {
      term1: { start: "", end: "" },
      term2: { start: "", end: "" },
      term3: { start: "", end: "" },
    },
    termWisePayment: {
      term1: { amount: "", dueDate: "" },
      term2: { amount: "", dueDate: "" },
      term3: { amount: "", dueDate: "" },
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (busFeeData) {
      setFormData(busFeeData);
    }
  }, [busFeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleTermSelection = (term) => {
    setFormData({
      ...formData,
      termSelection: {
        ...formData.termSelection,
        [term]: !formData.termSelection[term],
      },
    });
  };

  const handleDurationChange = (term, field, value) => {
    setFormData({
      ...formData,
      duration: {
        ...formData.duration,
        [term]: { ...formData.duration[term], [field]: value },
      },
    });
  };

  const handleTermWisePaymentChange = (term, field, value) => {
    setFormData({
      ...formData,
      termWisePayment: {
        ...formData.termWisePayment,
        [term]: { ...formData.termWisePayment[term], [field]: value },
      },
    });
  };

  const validateForm = () => {
    let formErrors = {};

    // Validate basic fields
    if (!formData.institute) formErrors.institute = "Institute is required";
    if (!formData.totalBusFee)
      formErrors.totalBusFee = "Total bus fee is required";

    // Validate selected terms
    const selectedTerms = Object.entries(formData.termSelection)
      .filter(([_, isSelected]) => isSelected)
      .map(([term]) => term);

    if (selectedTerms.length === 0) {
      formErrors.termSelection = "At least one term must be selected";
    }

    // Validate duration and payment for selected terms
    selectedTerms.forEach((term) => {
      if (!formData.duration[term].start) {
        formErrors[`${term}Start`] = `Start date for ${term} is required`;
      }
      if (!formData.duration[term].end) {
        formErrors[`${term}End`] = `End date for ${term} is required`;
      }
      if (!formData.termWisePayment[term].amount) {
        formErrors[`${term}Amount`] = `Amount for ${term} is required`;
      }
      if (!formData.termWisePayment[term].dueDate) {
        formErrors[`${term}DueDate`] = `Due date for ${term} is required`;
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
      try {
        const loadingToastId = toast.loading(
          busFeeData ? "Updating bus fee..." : "Adding new bus fee...",
          {
            position: "top-right",
          }
        );

        await onSave(formData);

        // Dismiss the loading toast
        toast.dismiss(loadingToastId);

        // Show success toast with a delay to ensure it's visible
        setTimeout(() => {
          toast.success(
            <div>
              Successfully {busFeeData ? "updated" : "added"} bus fee.
              <br />
              <small>Bus fee details have been saved.</small>
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
        toast.error(
          `Failed to ${
            busFeeData ? "update" : "add"
          } bus fee. Please try again.`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        console.error("Error saving bus fee:", error);
      }
    }
  };

  return (
    <div className="add-bus-fee-container">
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
      <header className="add-bus-fee-top-bar">
        <button className="add-bus-fee-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="add-bus-fee-header">
          <h2>{busFeeData ? "Edit Bus Fee" : "Add Bus Fee"}</h2>
        </div>
      </header>

      <main className="add-bus-fee-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-bus-fee-form-grid">
            <div className="add-bus-fee-column">
              <div className="add-bus-fee-form-group">
                <label>Academic Year</label>
                <div className="academic-year-inputs">
                  <input
                    type="number"
                    name="academicYearStart"
                    value={formData.academicYearStart}
                    onChange={handleChange}
                    min={new Date().getFullYear()}
                    max={9999}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    name="academicYearEnd"
                    value={formData.academicYearEnd}
                    onChange={handleChange}
                    min={formData.academicYearStart + 1}
                    max={9999}
                  />
                </div>
              </div>
              <div className="add-bus-fee-form-group">
                <label htmlFor="institute">Select Institute</label>
                <select
                  id="institute"
                  name="institute"
                  value={formData.institute}
                  onChange={handleChange}
                  className={errors.institute ? "input-error" : ""}
                >
                  <option value="">Select Institute</option>
                  <option value="JKKN Arts and Science">
                    JKKN Arts and Science
                  </option>
                </select>
                {errors.institute && (
                  <p className="error">{errors.institute}</p>
                )}
              </div>
              <div className="add-bus-fee-form-group">
                <label htmlFor="totalBusFee">Total Bus Fee</label>
                <input
                  type="number"
                  id="totalBusFee"
                  name="totalBusFee"
                  value={formData.totalBusFee}
                  onChange={handleChange}
                  placeholder="Enter total bus fee"
                  className={errors.totalBusFee ? "input-error" : ""}
                />
                {errors.totalBusFee && (
                  <p className="error">{errors.totalBusFee}</p>
                )}
              </div>
              <div className="add-bus-fee-form-group">
                <label>Term Selection</label>
                <div className="term-selection-buttons">
                  {["term1", "term2", "term3"].map((term) => (
                    <button
                      key={term}
                      type="button"
                      className={`${
                        formData.termSelection[term] ? "active" : ""
                      } ${errors.termSelection ? "input-error" : ""}`}
                      onClick={() => handleTermSelection(term)}
                    >
                      {term.charAt(0).toUpperCase() + term.slice(1)}
                    </button>
                  ))}
                </div>
                {errors.termSelection && (
                  <p className="error">{errors.termSelection}</p>
                )}
              </div>
            </div>
            <div className="add-bus-fee-column">
              <h3>Duration</h3>
              {["term1", "term2", "term3"].map((term) => (
                <div key={term} className="add-bus-fee-form-group">
                  <label>{term.charAt(0).toUpperCase() + term.slice(1)}</label>
                  <div className="date-inputs">
                    <input
                      type="date"
                      value={formData.duration[term].start}
                      onChange={(e) =>
                        handleDurationChange(term, "start", e.target.value)
                      }
                      className={errors[`${term}Start`] ? "input-error" : ""}
                    />
                    <input
                      type="date"
                      value={formData.duration[term].end}
                      onChange={(e) =>
                        handleDurationChange(term, "end", e.target.value)
                      }
                      className={errors[`${term}End`] ? "input-error" : ""}
                    />
                  </div>
                  {errors[`${term}Start`] && (
                    <p className="error">{errors[`${term}Start`]}</p>
                  )}
                  {errors[`${term}End`] && (
                    <p className="error">{errors[`${term}End`]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="add-bus-fee-column">
              <h3>Term wise payment and due date</h3>
              {["term1", "term2", "term3"].map((term) => (
                <div key={term} className="add-bus-fee-form-group">
                  <label>{term.charAt(0).toUpperCase() + term.slice(1)}</label>
                  <div className="payment-inputs">
                    <input
                      type="number"
                      value={formData.termWisePayment[term].amount}
                      onChange={(e) =>
                        handleTermWisePaymentChange(
                          term,
                          "amount",
                          e.target.value
                        )
                      }
                      placeholder="Amount"
                      className={errors[`${term}Amount`] ? "input-error" : ""}
                    />
                    <input
                      type="date"
                      value={formData.termWisePayment[term].dueDate}
                      onChange={(e) =>
                        handleTermWisePaymentChange(
                          term,
                          "dueDate",
                          e.target.value
                        )
                      }
                      className={errors[`${term}DueDate`] ? "input-error" : ""}
                    />
                  </div>
                  {errors[`${term}Amount`] && (
                    <p className="error">{errors[`${term}Amount`]}</p>
                  )}
                  {errors[`${term}DueDate`] && (
                    <p className="error">{errors[`${term}DueDate`]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="add-bus-fee-buttons-container">
            <button
              type="button"
              className="add-bus-fee-cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>
            <button type="submit" className="add-bus-fee-save-button">
              {busFeeData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddBusFee;
