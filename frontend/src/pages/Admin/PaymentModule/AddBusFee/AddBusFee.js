import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

  useEffect(() => {
    if (busFeeData) {
      setFormData(busFeeData);
    }
  }, [busFeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="add-bus-fee-container">
      <div className="add-bus-fee-header">
        <button className="add-bus-fee-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2>{busFeeData ? "Edit Bus Fee" : "Add Bus Fee"}</h2>
      </div>
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
              >
                <option value="">Select Institute</option>
                <option value="JKKN Arts and Science">
                  JKKN Arts and Science
                </option>
                {/* Add more institute options as needed */}
              </select>
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
              />
            </div>
            <div className="add-bus-fee-form-group">
              <label>Term Selection</label>
              <div className="term-selection-buttons">
                {["term1", "term2", "term3"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    className={formData.termSelection[term] ? "active" : ""}
                    onClick={() => handleTermSelection(term)}
                  >
                    {term.charAt(0).toUpperCase() + term.slice(1)}
                  </button>
                ))}
              </div>
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
                  />
                  <input
                    type="date"
                    value={formData.duration[term].end}
                    onChange={(e) =>
                      handleDurationChange(term, "end", e.target.value)
                    }
                  />
                </div>
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
                  />
                </div>
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
    </div>
  );
};

export default AddBusFee;
