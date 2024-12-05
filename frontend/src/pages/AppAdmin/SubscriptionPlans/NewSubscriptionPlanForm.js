import React, { useState, useEffect } from "react";
import TopBar from "../../../components/Shared/TopBar/TopBar";
import FormInput from "../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../components/Shared/ActionButtons/ActionButtons";
import ToastNotification, {
  showToast,
} from "../../../components/Shared/ToastNotification/ToastNotification";
import apiClient from "../../../apiClient"; // Import the apiClient
import "./NewSubscriptionPlanForm.css";

const NewSubscriptionPlanForm = ({
  onBack,
  editingPlan,
  setShowNewPlanForm,
  setEditingPlan,
  setSelectedPlans,
  setPlans, // Pass the setPlans function to update plans
  setGroupedPlans, // Pass the setGroupedPlans function to update grouped plans
  fetchPlans,
}) => {
  const [planData, setPlanData] = useState({
    name: "",
    validity: "",
    userRange: "",
    price: "",
    category: "Short-term", // Default category
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingPlan) {
      setPlanData({
        name: editingPlan.plan_name || "",
        validity: editingPlan.validity || "",
        userRange: editingPlan.user_range || "",
        price: editingPlan.price || "",
        category: editingPlan.category || "Short-term", // Default to "Short-term"
      });
    }
  }, [editingPlan]);

  // Category to validity mapping
  const categoryToValidityMap = {
    "Short-term": ["1 Month", "3 Months"],
    "Medium-term": ["6 Months"],
    "Long-term": ["12 Months", "24 Months", "36 Months"],
  };

  const validitiesForCategory = categoryToValidityMap[planData.category] || [];

  // Validation function for form fields
  const validateForm = () => {
    const formErrors = {};

    if (!planData.name) formErrors.name = "Subscription Name is required";
    if (!planData.validity) formErrors.validity = "Validity is required";
    if (!/^\d{1,6}-\d{1,6}$/.test(planData.userRange)) {
      formErrors.userRange = "User Range should be in format '5000-10000'";
    } else {
      const [min, max] = planData.userRange.split("-").map(Number);
      if (min >= max)
        formErrors.userRange = "User Range minimum should be less than maximum";
    }
    if (!/^\d{1,3}(,\d{2,3})*(\.\d{0,2})?$/.test(planData.price)) {
      formErrors.price = "Amount should be in format '5,00,000' or numeric";
    }
    return formErrors;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanData({ ...planData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showToast("error", "Please fill in all required fields correctly");
    } else {
      try {
        console.log("Category before submitting:", planData.category);

        if (!planData.category) {
          showToast("error", "Please select a valid plan category.");
          return;
        }

        let response;

        if (editingPlan) {
          response = await apiClient.put(
            `/appAdmin/subscription-plans/${editingPlan.plan_id}`,
            {
              plan_name: planData.name,
              validity: planData.validity,
              category: planData.category,
              user_range: planData.userRange,
              price: planData.price.replace(/,/g, ""),
            }
          );
        } else {
          response = await apiClient.post("/appAdmin/subscription-plans", {
            plan_name: planData.name,
            validity: planData.validity,
            category: planData.category,
            user_range: planData.userRange,
            price: planData.price.replace(/,/g, ""),
          });
        }

        // Log the API response to confirm the plan details
        console.log("API Response:", response.data);

        const newPlan = response.data.newPlan || response.data.updatedPlan; // Handle both scenarios

        if (newPlan && newPlan.category) {
          // Update plans state
          if (editingPlan) {
            setPlans((prevPlans) =>
              prevPlans.map((plan) =>
                plan.plan_id === editingPlan.plan_id
                  ? { ...newPlan, plan_id: plan.plan_id }
                  : plan
              )
            );
          } else {
            setPlans((prevPlans) => [newPlan, ...prevPlans]);
          }

          // Group plans by category
          const grouped = {
            "Short-term": [],
            "Medium-term": [],
            "Long-term": [],
          };

          grouped[newPlan.category].push(newPlan);
          setGroupedPlans(grouped);

          // Show success toast
          showToast(
            "success",
            `Successfully ${
              editingPlan ? "updated" : "added"
            } subscription plan.`
          );

          fetchPlans();

          // Reset the form and close it after a delay
          setTimeout(() => {
            setShowNewPlanForm(false);
            setEditingPlan(null);
            setSelectedPlans([]);
          }, 3100);
        } else {
          throw new Error("Invalid plan category.");
        }
      } catch (error) {
        console.error("Error saving subscription plan:", error);
        showToast(
          "error",
          error.message || "Failed to save subscription plan."
        );
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
            {/* Subscription Name */}
            <FormInput
              id="name"
              name="name"
              value={planData.name}
              placeholder="Subscription Name"
              error={errors.name}
              onChange={handleInputChange}
            />

            {/* Plan Category */}
            <FormInput
              id="category"
              name="category"
              type="select"
              value={planData.category}
              placeholder="Select Plan Category"
              onChange={handleInputChange}
              options={[
                { value: "Short-term", label: "Short-term" },
                { value: "Medium-term", label: "Medium-term" },
                { value: "Long-term", label: "Long-term" },
              ]}
            />

            {/* Validity */}
            <FormInput
              id="validity"
              name="validity"
              type="select"
              value={planData.validity}
              placeholder="Select months"
              error={errors.validity}
              onChange={handleInputChange}
              options={validitiesForCategory.map((validity) => ({
                value: validity,
                label: validity,
              }))}
            />

            {/* User Range */}
            <FormInput
              id="userRange"
              name="userRange"
              value={planData.userRange}
              placeholder="User Range"
              error={errors.userRange}
              onChange={handleInputChange}
            />

            {/* Price */}
            <FormInput
              id="price"
              name="price"
              value={planData.price}
              placeholder="Amount"
              error={errors.price}
              onChange={handleInputChange}
            />
          </div>

          {/* Action buttons */}
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
