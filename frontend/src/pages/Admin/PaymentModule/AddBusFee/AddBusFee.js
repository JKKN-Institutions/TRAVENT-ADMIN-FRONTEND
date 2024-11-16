import React, { useState, useEffect } from "react";
import { showToast } from "../../../../components/Shared/ToastNotification/ToastNotification";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import ActionButtons from "../../../../components/Shared/ActionButtons/ActionButtons";
import ToastNotification from "../../../../components/Shared/ToastNotification/ToastNotification";
import "./AddBusFee.css";

const AddBusFee = ({ busFeeData, onBack, onSave }) => {
  const initialFormState = {
    academicYearStart: new Date().getFullYear(),
    academicYearEnd: new Date().getFullYear() + 1,
    institute: "",
    totalBusFee: "",
    termSelection: { term1: false, term2: false, term3: false },
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
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (busFeeData) setFormData(busFeeData);
  }, [busFeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleNestedChange = (key, subKey, term, value) => {
    setFormData({
      ...formData,
      [key]: {
        ...formData[key],
        [term]: { ...formData[key][term], [subKey]: value },
      },
    });
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.institute) formErrors.institute = "Institute is required";
    if (!formData.totalBusFee)
      formErrors.totalBusFee = "Total bus fee is required";

    const selectedTerms = Object.entries(formData.termSelection)
      .filter(([_, isSelected]) => isSelected)
      .map(([term]) => term);
    if (selectedTerms.length === 0)
      formErrors.termSelection = "At least one term must be selected";

    selectedTerms.forEach((term) => {
      const { start, end } = formData.duration[term];
      const { amount, dueDate } = formData.termWisePayment[term];
      if (!start)
        formErrors[`${term}Start`] = `Start date for ${term} is required`;
      if (!end) formErrors[`${term}End`] = `End date for ${term} is required`;
      if (!amount)
        formErrors[`${term}Amount`] = `Amount for ${term} is required`;
      if (!dueDate)
        formErrors[`${term}DueDate`] = `Due date for ${term} is required`;
    });

    return formErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showToast("error", "Please fill in all required fields");
    } else {
      const loadingToastId = showToast(
        "loading",
        busFeeData ? "Updating bus fee..." : "Adding new bus fee..."
      );
      try {
        await onSave(formData);
        showToast(
          "success",
          `Successfully ${busFeeData ? "updated" : "added"} bus fee`,
          loadingToastId
        );
        onBack();
      } catch (error) {
        showToast(
          "error",
          `Failed to ${busFeeData ? "update" : "add"} bus fee`
        );
        console.error("Error saving bus fee:", error);
      }
    }
  };

  const renderFormFields = () => {
    const terms = ["term1", "term2", "term3"];
    return (
      <>
        <div className="add-bus-fee-column">
          <h3>Duration</h3>
          {terms.map((term) => (
            <div key={term} className="add-bus-fee-form-group">
              <label>{term.charAt(0).toUpperCase() + term.slice(1)}</label>
              <div className="date-inputs">
                <input
                  type="date"
                  value={formData.duration[term].start}
                  onChange={(e) =>
                    handleNestedChange(
                      "duration",
                      "start",
                      term,
                      e.target.value
                    )
                  }
                  className={errors[`${term}Start`] ? "input-error" : ""}
                />
                <input
                  type="date"
                  value={formData.duration[term].end}
                  onChange={(e) =>
                    handleNestedChange("duration", "end", term, e.target.value)
                  }
                  className={errors[`${term}End`] ? "input-error" : ""}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="add-bus-fee-column">
          <h3>Term wise payment and due date</h3>
          {terms.map((term) => (
            <div key={term} className="add-bus-fee-form-group">
              <label>{term.charAt(0).toUpperCase() + term.slice(1)}</label>
              <div className="payment-inputs">
                <input
                  type="number"
                  value={formData.termWisePayment[term].amount}
                  onChange={(e) =>
                    handleNestedChange(
                      "termWisePayment",
                      "amount",
                      term,
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
                    handleNestedChange(
                      "termWisePayment",
                      "dueDate",
                      term,
                      e.target.value
                    )
                  }
                  className={errors[`${term}DueDate`] ? "input-error" : ""}
                />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="add-bus-fee-container">
      <ToastNotification />
      <TopBar
        title={busFeeData ? "Edit Bus Fee" : "Add Bus Fee"}
        onBack={onBack}
        backButton
      />
      <main className="add-bus-fee-main-content">
        <form>
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
                  />
                  <span>-</span>
                  <input
                    type="number"
                    name="academicYearEnd"
                    value={formData.academicYearEnd}
                    onChange={handleChange}
                    min={formData.academicYearStart + 1}
                  />
                </div>
              </div>
              <div className="add-bus-fee-form-group">
                <label>Select Institute</label>
                <select
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
                <label>Total Bus Fee</label>
                <input
                  type="number"
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
                      onClick={() =>
                        handleNestedChange(
                          "termSelection",
                          term,
                          term,
                          !formData.termSelection[term]
                        )
                      }
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
            {renderFormFields()}
          </div>
          <ActionButtons
            onCancel={onBack}
            onSubmit={handleSubmit}
            submitText={busFeeData ? "Update" : "Add"}
          />
        </form>
      </main>
    </div>
  );
};

export default AddBusFee;
