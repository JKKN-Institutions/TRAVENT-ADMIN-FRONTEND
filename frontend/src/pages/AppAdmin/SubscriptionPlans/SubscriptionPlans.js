import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faEdit,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import NewSubscriptionPlanForm from "./NewSubscriptionPlanForm";
import TopBar from "../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../components/Shared/SearchBar/SearchBar";
import ConfirmationModal from "../../../components/Shared/ConfirmationModal/ConfirmationModal";
import Button from "../../../components/Shared/Button/Button";
import Loading from "../../../components/Shared/Loading/Loading";
import ToastNotification, {
  showToast,
} from "../../../components/Shared/ToastNotification/ToastNotification";
import apiClient from "../../../apiClient";
import "./SubscriptionPlans.css";

const SubscriptionPlans = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showNewPlanForm, setShowNewPlanForm] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [plans, setPlans] = useState([]);
  const [groupedPlans, setGroupedPlans] = useState({
    "Short-term": [],
    "Medium-term": [],
    "Long-term": [],
  });

  const fetchPlans = async () => {
    try {
      console.log("Fetching subscription plans...");
      const response = await apiClient.get("/appAdmin/get-subscription-plans");

      console.log("Fetched plans:", response.data);
      setPlans(response.data);

      // Group plans by category (Short-term, Medium-term, Long-term)
      const grouped = {
        "Short-term": [],
        "Medium-term": [],
        "Long-term": [],
      };

      response.data.forEach((plan) => {
        if (plan.category === "Short-term") {
          grouped["Short-term"].push(plan);
        } else if (plan.category === "Medium-term") {
          grouped["Medium-term"].push(plan);
        } else if (plan.category === "Long-term") {
          grouped["Long-term"].push(plan);
        }
      });

      setGroupedPlans(grouped); // Set grouped plans in state
      setIsLoading(false); // Stop loading once data is fetched
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
      showToast("error", "Failed to fetch subscription plans.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans(); // Initial fetch of plans
  }, []);

  const handleAddPlan = () => {
    setEditingPlan(null);
    setShowNewPlanForm(true);
  };

  const handleSelectPlan = (plan) => {
    const alreadySelected = selectedPlans.find(
      (p) => p.plan_id === plan.plan_id
    );
    const updatedSelection = alreadySelected
      ? selectedPlans.filter((p) => p.plan_id !== plan.plan_id)
      : [...selectedPlans, plan];
    setSelectedPlans(updatedSelection);
  };

  const handleBackFromForm = () => {
    setShowNewPlanForm(false);
    setEditingPlan(null);
  };

  const handleEditPlan = () => {
    if (selectedPlans.length === 1) {
      const planToEdit = selectedPlans[0];
      setEditingPlan(planToEdit);
      setShowNewPlanForm(true); // Open the form for editing
    }
  };

  const handleDeletePlan = () => {
    if (selectedPlans.length > 0) {
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDelete = async () => {
    try {
      const planIdsToDelete = selectedPlans.map((plan) => plan.plan_id); // Collect plan IDs of the selected plans
      await apiClient.delete("/appAdmin/subscription-plans", {
        data: { plan_ids: planIdsToDelete }, // Send the plan_ids in the body
      });

      fetchPlans();
      setSelectedPlans([]); // Clear the selected plans
      setShowDeleteConfirmation(false);

      showToast(
        "success",
        `${selectedPlans.length} plan(s) deleted successfully.`
      );
    } catch (error) {
      console.error("Error deleting subscription plans:", error);
      showToast(
        "error",
        "An error occurred while deleting the selected plans."
      );
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredPlans = plans.filter(
    (plan) =>
      plan.name && plan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showNewPlanForm) {
    return (
      <NewSubscriptionPlanForm
        onBack={handleBackFromForm}
        editingPlan={editingPlan}
        setShowNewPlanForm={setShowNewPlanForm}
        setEditingPlan={setEditingPlan}
        setSelectedPlans={setSelectedPlans}
        setPlans={setPlans} // Pass setPlans to update the plans state
        setGroupedPlans={setGroupedPlans}
        fetchPlans={fetchPlans}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading message="Loading Subscriptions..." />
      ) : (
        <div className="subscription-plans-container">
          <TopBar title="Subscription Plans" toggleSidebar={toggleSidebar} />
          <ToastNotification position="top-right" theme="dark" />
          <main className="subscription-plans-main-content">
            <div className="subscription-plans-controls">
              <SearchBar
                placeholder="Search subscription plans..."
                onSearch={handleSearch}
              />
              <div className="subscription-plans-action-buttons-container">
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faPlus} /> Add
                    </>
                  }
                  onClick={handleAddPlan}
                  className="subscription-plans-action-button subscription-plans-add-button"
                />
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faEdit} /> Edit
                    </>
                  }
                  onClick={handleEditPlan}
                  className="subscription-plans-action-button subscription-plans-edit-button"
                  disabled={selectedPlans.length !== 1}
                />
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </>
                  }
                  onClick={handleDeletePlan}
                  className="subscription-plans-action-button subscription-plans-delete-button"
                  disabled={selectedPlans.length === 0}
                />
              </div>
            </div>

            {/* Display grouped plans by category */}
            {Object.keys(groupedPlans).map((category) => {
              const plansInCategory = groupedPlans[category];
              if (plansInCategory.length > 0) {
                return (
                  <div key={category} className="plans-section">
                    <h2>{category} Plans</h2>
                    <div className="plans-grid">
                      {plansInCategory.map((plan) => (
                        <div
                          key={plan.plan_id}
                          className={`plan-card ${
                            selectedPlans.some(
                              (p) => p.plan_id === plan.plan_id
                            )
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => handleSelectPlan(plan)} // Select plan when clicked
                        >
                          {selectedPlans.some(
                            (p) => p.plan_id === plan.plan_id
                          ) && (
                            <div className="plan-card-check">
                              <FontAwesomeIcon icon={faCheck} />
                            </div>
                          )}
                          <h3>{plan.plan_name}</h3>
                          <p>Validity: {plan.validity}</p>
                          <p>User Range: {plan.user_range}</p>
                          <h4>₹{plan.price}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </main>

          {showDeleteConfirmation && (
            <ConfirmationModal
              title="Confirm Deletion"
              message={`Are you sure you want to delete ${selectedPlans.length} plan(s)?`}
              confirmText="Delete"
              cancelText="Cancel"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </div>
      )}
    </>
  );
};

export default SubscriptionPlans;
