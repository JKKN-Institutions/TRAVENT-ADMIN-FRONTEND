import React, { useState, useEffect } from "react";
import TopBar from "../../../components/Shared/TopBar/TopBar";
import FormInput from "../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../components/Shared/ActionButtons/ActionButtons";
import ToastNotification, {
  showToast,
} from "../../../components/Shared/ToastNotification/ToastNotification";
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
    const formErrors = {};

    // Check if the subscription name is filled
    if (!planData.name) formErrors.name = "Subscription Name is required";

    // Check if validity is selected
    if (!planData.validity) formErrors.validity = "Validity is required";

    // Validate User Range format as "min-max" (e.g., "5000-10000")
    if (!/^\d{1,6}-\d{1,6}$/.test(planData.userRange)) {
      formErrors.userRange = "User Range should be in format '5000-10000'";
    } else {
      const [min, max] = planData.userRange.split("-").map(Number);
      if (min >= max) {
        formErrors.userRange = "User Range minimum should be less than maximum";
      }
    }

    // Validate Amount to accept comma-separated numbers (e.g., "5,00,000")
    if (!/^\d{1,3}(,\d{2,3})*(\.\d{0,2})?$/.test(planData.price)) {
      formErrors.price = "Amount should be in format '5,00,000' or numeric";
    }

    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanData({ ...planData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showToast("error", "Please fill in all required fields correctly");
    } else {
      try {
        const loadingToastId = showToast(
          "loading",
          editingPlan
            ? "Updating subscription plan..."
            : "Adding new subscription plan..."
        );

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        onSave(planData);

        // Dismiss loading toast and show success message
        showToast(
          "success",
          `Successfully ${
            editingPlan ? "updated" : "added"
          } subscription plan.`,
          loadingToastId
        );

        // Delay going back to allow the user to see the success toast
        setTimeout(() => onBack(), 3100);
      } catch (error) {
        showToast(
          "error",
          "Failed to save subscription plan. Please try again."
        );
        console.error("Error saving subscription plan:", error);
      }
    }
  };

  return (
    <div className="new-subscription-plan-form-container">
      <ToastNotification />

      <TopBar
        title={editingPlan ? "Edit Subscription Plan" : "New Subscription Plan"}
        onBack={onBack}
        backButton
      />

      <main className="new-subscription-plan-main-content">
        <form onSubmit={handleSubmit}>
          <div className="new-subscription-plan-form-grid">
            <FormInput
              id="name"
              name="name"
              value={planData.name}
              placeholder="Subscription Name"
              error={errors.name}
              onChange={handleInputChange}
            />

            <FormInput
              id="validity"
              name="validity"
              type="select"
              value={planData.validity}
              placeholder="Select months"
              error={errors.validity}
              onChange={handleInputChange}
              options={[
                { value: "6 Months", label: "6 Months" },
                { value: "12 Months", label: "12 Months" },
              ]}
            />

            <FormInput
              id="userRange"
              name="userRange"
              value={planData.userRange}
              placeholder="User Range"
              error={errors.userRange}
              onChange={handleInputChange}
            />

            <FormInput
              id="price"
              name="price"
              value={planData.price}
              placeholder="Amount"
              error={errors.price}
              onChange={handleInputChange}
            />
          </div>

          <ActionButtons
            onCancel={onBack}
            onSubmit={handleSubmit}
            submitText={editingPlan ? "Update" : "Save"}
            cancelText="Cancel"
          />
        </form>
      </main>
    </div>
  );
};

export default NewSubscriptionPlanForm;
