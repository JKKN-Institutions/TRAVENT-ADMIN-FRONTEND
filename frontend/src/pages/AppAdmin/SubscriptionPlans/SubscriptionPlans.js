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
} from "../../../components/Shared/ToastNotification/ToastNotification"; // Import ToastNotification and showToast
import "./SubscriptionPlans.css";

const SubscriptionPlans = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showNewPlanForm, setShowNewPlanForm] = useState(false);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Small Scale - Premium",
      validity: "6 Months",
      userRange: "1-2000",
      price: "1,00,000",
    },
    {
      id: 2,
      name: "Medium Scale - Premium",
      validity: "6 Months",
      userRange: "2000-5000",
      price: "2,00,000",
    },
    {
      id: 3,
      name: "Large Scale - Premium",
      validity: "6 Months",
      userRange: "5000-10000",
      price: "5,00,000",
    },
    {
      id: 4,
      name: "XL Scale - Premium",
      validity: "6 Months",
      userRange: "10000-20000",
      price: "10,00,000",
    },
    {
      id: 5,
      name: "XXL Scale - Premium",
      validity: "6 Months",
      userRange: "20000-40000",
      price: "20,00,000",
    },
    {
      id: 6,
      name: "Small Scale - Ultra Premium",
      validity: "12 Months",
      userRange: "1-2000",
      price: "2,00,000",
    },
    {
      id: 7,
      name: "Medium Scale - Ultra Premium",
      validity: "12 Months",
      userRange: "2000-5000",
      price: "4,00,000",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddPlan = () => {
    setEditingPlan(null);
    setShowNewPlanForm(true);
  };

  const handleSavePlan = async (newPlan) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (editingPlan) {
        setPlans(
          plans.map((plan) =>
            plan.id === editingPlan.id ? { ...newPlan, id: plan.id } : plan
          )
        );
      } else {
        setPlans([...plans, { ...newPlan, id: Date.now() }]);
      }

      setTimeout(() => {
        setShowNewPlanForm(false);
        setEditingPlan(null);
        setSelectedPlans([]);
      }, 3100);
    } catch (error) {
      console.error("Error saving subscription plan:", error);
    }
  };

  const handleBackFromForm = () => {
    setShowNewPlanForm(false);
    setEditingPlan(null);
  };

  const handleSelectPlan = (plan) => {
    const alreadySelected = selectedPlans.find((p) => p.id === plan.id);
    const updatedSelection = alreadySelected
      ? selectedPlans.filter((p) => p.id !== plan.id)
      : [...selectedPlans, plan];
    setSelectedPlans(updatedSelection);
  };

  const handleEditPlan = () => {
    if (selectedPlans.length === 1) {
      setEditingPlan(selectedPlans[0]);
      setShowNewPlanForm(true);
    }
  };

  const handleDeletePlan = () => {
    if (selectedPlans.length > 0) {
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDelete = () => {
    try {
      setPlans(
        plans.filter((plan) => !selectedPlans.some((p) => p.id === plan.id))
      );
      setSelectedPlans([]);
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

  const filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showNewPlanForm) {
    return (
      <NewSubscriptionPlanForm
        onSave={handleSavePlan}
        onBack={handleBackFromForm}
        editingPlan={editingPlan}
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
          <ToastNotification position="top-right" theme="dark" />{" "}
          {/* Toast notification container */}
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
            <div className="plans-section">
              <h2>6 Months Plans - Premium</h2>
              <div className="plans-grid">
                {filteredPlans
                  .filter((plan) => plan.validity === "6 Months")
                  .map((plan) => (
                    <div
                      key={plan.id}
                      className={`plan-card ${
                        selectedPlans.some((p) => p.id === plan.id)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      {selectedPlans.some((p) => p.id === plan.id) && (
                        <div className="plan-card-check">
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      )}
                      <h3>{plan.name}</h3>
                      <p>Validity: {plan.validity}</p>
                      <p>User Range: {plan.userRange}</p>
                      <h4>₹{plan.price}</h4>
                    </div>
                  ))}
              </div>
            </div>

            <div className="plans-section">
              <h2>12 Months Plans - Ultra Premium</h2>
              <div className="plans-grid">
                {filteredPlans
                  .filter((plan) => plan.validity === "12 Months")
                  .map((plan) => (
                    <div
                      key={plan.id}
                      className={`plan-card ${
                        selectedPlans.some((p) => p.id === plan.id)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      {selectedPlans.some((p) => p.id === plan.id) && (
                        <div className="plan-card-check">
                          <FontAwesomeIcon icon={faCheck} />
                        </div>
                      )}
                      <h3>{plan.name}</h3>
                      <p>Validity: {plan.validity}</p>
                      <p>User Range: {plan.userRange}</p>
                      <h4>₹{plan.price}</h4>
                    </div>
                  ))}
              </div>
            </div>
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
