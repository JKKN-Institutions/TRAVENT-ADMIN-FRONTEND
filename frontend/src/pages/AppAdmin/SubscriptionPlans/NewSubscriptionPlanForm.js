import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./NewSubscriptionPlanForm.css";

const NewSubscriptionPlanForm = ({ onSave, onBack, editingPlan }) => {
  const [planData, setPlanData] = useState({
    name: "",
    validity: "",
    userRange: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingPlan) {
      setPlanData({
        name: editingPlan.name,
        validity: editingPlan.validity,
        userRange: editingPlan.userRange,
        price: editingPlan.price,
      });
    }
  }, [editingPlan]);

  const validateForm = () => {
    let formErrors = {};
    if (!planData.name) formErrors.name = "Subscription Name is required";
    if (!planData.validity) formErrors.validity = "Validity is required";
    if (!planData.userRange) formErrors.userRange = "User Range is required";
    if (!planData.price) formErrors.price = "Amount is required";
    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanData({ ...planData, [name]: value });
    // Clear the error for this field when the user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
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
          editingPlan
            ? "Updating subscription plan..."
            : "Adding new subscription plan...",
          {
            position: "top-right",
          }
        );

        // Simulate API call or actual save operation
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Subscription plan data to save:", planData);
        onSave(planData);

        // Dismiss the loading toast
        toast.dismiss(loadingToastId);

        // Show success toast with a delay to ensure it's visible
        setTimeout(() => {
          toast.success(
            <div>
              Successfully {editingPlan ? "updated" : "added"} subscription
              plan.
              <br />
              <small>Subscription plan details have been saved.</small>
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
            editingPlan ? "update" : "add"
          } subscription plan. Please try again.`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        console.error("Error saving subscription plan:", error);
      }
    }
  };

  return (
    <div className="new-subscription-plan-form-container">
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
      <header className="new-subscription-plan-top-bar">
        <button className="new-subscription-plan-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="new-subscription-plan-header">
          <h2>
            {editingPlan ? "Edit Subscription Plan" : "New Subscription Plan"}
          </h2>
        </div>
      </header>
      <main className="new-subscription-plan-main-content">
        <form onSubmit={handleSubmit}>
          <div className="new-subscription-plan-form-grid">
            <div className="new-subscription-plan-form-group">
              <input
                id="name"
                name="name"
                value={planData.name}
                onChange={handleInputChange}
                placeholder="Subscription Name"
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="new-subscription-plan-form-group">
              <div className="new-subscription-plan-select-wrapper">
                <select
                  id="validity"
                  name="validity"
                  value={planData.validity}
                  onChange={handleInputChange}
                  className={errors.validity ? "input-error" : ""}
                >
                  <option value="">Select months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="12 Months">12 Months</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="new-subscription-plan-select-icon"
                />
              </div>
              {errors.validity && <p className="error">{errors.validity}</p>}
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
                id="price"
                name="price"
                value={planData.price}
                onChange={handleInputChange}
                placeholder="Amount"
                className={errors.price ? "input-error" : ""}
              />
              {errors.price && <p className="error">{errors.price}</p>}
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
              {editingPlan ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewSubscriptionPlanForm;
