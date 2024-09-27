import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./NewSubscriptionPlanForm.css";

const NewSubscriptionPlanForm = ({ onSave, onBack }) => {
  const [planData, setPlanData] = useState({
    subscriptionName: "",
    validity: "12 Months",
    userRange: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!planData.subscriptionName)
      formErrors.subscriptionName = "Subscription Name is required";
    if (!planData.userRange) formErrors.userRange = "User Range is required";
    if (!planData.amount) formErrors.amount = "Amount is required";
    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanData({ ...planData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log("Subscription plan data to save:", planData);
      onSave(planData);
    }
  };

  return (
    <div className="new-subscription-plan-form-container">
      <div className="new-subscription-plan-form-header">
        <button className="new-subscription-plan-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h2>New Subscription Plan</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="new-subscription-plan-form-grid">
          <div className="new-subscription-plan-form-group">
            <input
              id="subscriptionName"
              name="subscriptionName"
              value={planData.subscriptionName}
              onChange={handleInputChange}
              placeholder="Subscription Name"
              className={errors.subscriptionName ? "input-error" : ""}
            />
            {errors.subscriptionName && (
              <p className="error">{errors.subscriptionName}</p>
            )}
          </div>
          <div className="new-subscription-plan-form-group">
            <div className="new-subscription-plan-select-wrapper">
              <select
                id="validity"
                name="validity"
                value={planData.validity}
                onChange={handleInputChange}
              >
                <option value="6 Months">6 Months</option>
                <option value="12 Months">12 Months</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="new-subscription-plan-select-icon"
              />
            </div>
          </div>
          <div className="new-subscription-plan-form-group">
            <input
              id="userRange"
              name="userRange"
              value={planData.userRange}
              onChange={handleInputChange}
              placeholder="User Range"
              className={errors.userRange ? "input-error" : ""}
            />
            {errors.userRange && <p className="error">{errors.userRange}</p>}
          </div>
          <div className="new-subscription-plan-form-group">
            <input
              id="amount"
              name="amount"
              value={planData.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              className={errors.amount ? "input-error" : ""}
            />
            {errors.amount && <p className="error">{errors.amount}</p>}
          </div>
        </div>
        <div className="new-subscription-plan-buttons-container">
          <button
            type="button"
            className="new-subscription-plan-cancel-button"
            onClick={onBack}
          >
            Cancel
          </button>
          <button type="submit" className="new-subscription-plan-save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewSubscriptionPlanForm;
