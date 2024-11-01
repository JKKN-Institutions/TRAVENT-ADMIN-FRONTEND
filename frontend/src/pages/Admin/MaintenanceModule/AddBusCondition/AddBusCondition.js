import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./AddBusCondition.css";

const AddBusCondition = ({ bus, onBack, onSave }) => {
  const [busData, setBusData] = useState({
    route: "",
    number: "",
    status: "",
    problem: "",
    problemStartDate: "",
    solvingStartDate: "",
    completedDate: "",
    mechanicShop: "",
    sparesUsedFromInventory: "",
    sparesPurchased: "",
    externalSpareAmount: "",
    externalSparesBillNo: "",
    mechanicCharge: "",
    totalBillAmount: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bus) {
      const completeBusData = {
        route: bus.route || "",
        number: bus.number || "",
        status: bus.status || "",
        problem: bus.problem || "",
        problemStartDate: bus.problemStartDate || "",
        solvingStartDate: bus.solvingStartDate || "",
        completedDate: bus.completedDate || "",
        mechanicShop: bus.mechanicShop || "",
        sparesUsedFromInventory: bus.sparesUsedFromInventory || "",
        sparesPurchased: bus.sparesPurchased || "",
        externalSpareAmount: bus.externalSpareAmount || "",
        externalSparesBillNo: bus.externalSparesBillNo || "",
        mechanicCharge: bus.mechanicCharge || "",
        totalBillAmount: bus.totalBillAmount || "",
      };
      setBusData(completeBusData);
    }
  }, [bus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusData({ ...busData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(busData).forEach((key) => {
      if (!busData[key]) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      onSave(busData);
    }
  };

  return (
    <div className="add-bus-condition-container">
      <header className="add-bus-condition-top-bar">
        <button className="add-bus-condition-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="add-bus-condition-header">
          <h2>{bus ? "Edit Bus Condition" : "Add Bus Condition"}</h2>
        </div>
      </header>

      <main className="add-bus-condition-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-bus-condition-form-grid">
            {Object.keys(busData).map((key) => (
              <div key={key} className="add-bus-condition-form-group">
                <input
                  type={
                    key.includes("Date")
                      ? "date"
                      : key.includes("Amount") || key.includes("Charge")
                      ? "number"
                      : "text"
                  }
                  id={key}
                  name={key}
                  value={busData[key]}
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
                {errors[key] && <p className="error">{errors[key]}</p>}
              </div>
            ))}
          </div>
          <div className="add-bus-condition-buttons-container">
            <button
              type="button"
              className="add-bus-condition-cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>
            <button type="submit" className="add-bus-condition-save-button">
              {bus ? "Update Bus" : "Add Bus"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddBusCondition;