import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faTrash,
  faBars,
  faEdit,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import NewSubscriptionPlanForm from "./NewSubscriptionPlanForm";
import "./SubscriptionPlans.css";

const SubscriptionPlans = ({ toggleSidebar }) => {
  const [showNewPlanForm, setShowNewPlanForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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

  const handleAddPlan = () => {
    setEditingPlan(null);
    setShowNewPlanForm(true);
  };

  const handleSavePlan = (newPlan) => {
    if (editingPlan) {
      setPlans(
        plans.map((plan) =>
          plan.id === editingPlan.id ? { ...newPlan, id: plan.id } : plan
        )
      );
      setSelectedPlan(null); // Deselect the plan after editing
    } else {
      setPlans([...plans, { ...newPlan, id: Date.now() }]);
    }
    setShowNewPlanForm(false);
    setEditingPlan(null);
  };

  const handleBackFromForm = () => {
    setShowNewPlanForm(false);
    setEditingPlan(null);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(selectedPlan && selectedPlan.id === plan.id ? null : plan);
  };

  const handleEditPlan = () => {
    if (selectedPlan) {
      setEditingPlan(selectedPlan);
      setShowNewPlanForm(true);
    }
  };

  const handleDeletePlan = () => {
    if (selectedPlan) {
      setShowDeleteConfirmation(true);
    }
  };

  const confirmDelete = () => {
    setPlans(plans.filter((plan) => plan.id !== selectedPlan.id));
    setSelectedPlan(null);
    setShowDeleteConfirmation(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

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
    <div className="subscription-plans-container">
      <header className="subscription-plans-top-bar">
        <div className="subscription-plans-menu-icon">
          <FontAwesomeIcon
            icon={faBars}
            className="menu-icon"
            onClick={toggleSidebar}
          />
        </div>
        <div className="subscription-plans-header">
          <h2>Subscription Plans</h2>
        </div>
      </header>
      <main className="subscription-plans-main-content">
        <div className="subscription-plans-search-bar-container">
          <div className="subscription-plans-search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="subscription-plans-search-bar"
              placeholder="Search institutions..."
            />
          </div>
        </div>

        <div className="action-buttons-container">
          <button
            className="subscription-plans-action-button subscription-plans-add-button"
            onClick={handleAddPlan}
          >
            <FontAwesomeIcon icon={faPlus} /> Add
          </button>
          <button
            className="subscription-plans-action-button subscription-plans-edit-button"
            onClick={handleEditPlan}
            disabled={!selectedPlan}
          >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
          <button
            className="subscription-plans-action-button subscription-plans-delete-button"
            onClick={handleDeletePlan}
            disabled={!selectedPlan}
          >
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
        </div>

        <div className="plans-section">
          <h2>6 Months Plans - Premium</h2>
          <div className="plans-grid">
            {plans
              .filter((plan) => plan.validity === "6 Months")
              .map((plan) => (
                <div
                  key={plan.id}
                  className={`plan-card ${
                    selectedPlan && selectedPlan.id === plan.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {selectedPlan && selectedPlan.id === plan.id && (
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
            {plans
              .filter((plan) => plan.validity === "12 Months")
              .map((plan) => (
                <div
                  key={plan.id}
                  className={`plan-card ${
                    selectedPlan && selectedPlan.id === plan.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {selectedPlan && selectedPlan.id === plan.id && (
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
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this plan?</p>
            <div className="delete-confirmation-buttons">
              <button onClick={cancelDelete} className="cancel-delete-button">
                Cancel
              </button>
              <button onClick={confirmDelete} className="confirm-delete-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
