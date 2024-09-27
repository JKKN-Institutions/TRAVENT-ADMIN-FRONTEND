import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPlus,
  faTrash,
  faBars,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import NewSubscriptionPlanForm from "./NewSubscriptionPlanForm";
import "./SubscriptionPlans.css";

const SubscriptionPlans = ({ toggleSidebar }) => {
  const [showNewPlanForm, setShowNewPlanForm] = useState(false);
  const [plans, setPlans] = useState([
    {
      name: "Small Scale - Premium",
      validity: "6 Months",
      userRange: "1-2000",
      price: "1,00,000",
    },
    {
      name: "Medium Scale - Premium",
      validity: "6 Months",
      userRange: "2000-5000",
      price: "2,00,000",
    },
    {
      name: "Large Scale - Premium",
      validity: "6 Months",
      userRange: "5000-10000",
      price: "5,00,000",
    },
    {
      name: "XL Scale - Premium",
      validity: "6 Months",
      userRange: "10000-20000",
      price: "10,00,000",
    },
    {
      name: "XXL Scale - Premium",
      validity: "6 Months",
      userRange: "20000-40000",
      price: "20,00,000",
    },
    {
      name: "Small Scale - Ultra Premium",
      validity: "12 Months",
      userRange: "1-2000",
      price: "2,00,000",
    },
    {
      name: "Medium Scale - Ultra Premium",
      validity: "12 Months",
      userRange: "2000-5000",
      price: "4,00,000",
    },
  ]);

  const ultraPremiumPlans = [
    {
      name: "Small Scale - Premium",
      validity: "12 Months",
      userRange: "1-2000",
      price: "2,00,000",
    },
    {
      name: "Medium Scale - Premium",
      validity: "12 Months",
      userRange: "2000-5000",
      price: "4,00,000",
    },
  ];

  const handleAddPlan = () => {
    setShowNewPlanForm(true);
  };

  const handleSavePlan = (newPlan) => {
    setPlans([...plans, newPlan]);
    setShowNewPlanForm(false);
  };

  const handleBackFromForm = () => {
    setShowNewPlanForm(false);
  };

  if (showNewPlanForm) {
    return (
      <NewSubscriptionPlanForm
        onSave={handleSavePlan}
        onBack={handleBackFromForm}
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
          <button className="subscription-plans-action-button subscription-plans-edit-button">
            <FontAwesomeIcon icon={faEdit} /> Edit
          </button>
          <button className="subscription-plans-action-button subscription-plans-delete-button">
            <FontAwesomeIcon icon={faTrash} /> Delete
          </button>
        </div>

        <div className="plans-section">
          <h2>6 Months Plans - Premium</h2>
          <div className="plans-grid">
            {plans
              .filter((plan) => plan.validity === "6 Months")
              .map((plan, index) => (
                <div key={index} className="plan-card">
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
              .map((plan, index) => (
                <div key={index} className="plan-card">
                  <h3>{plan.name}</h3>
                  <p>Validity: {plan.validity}</p>
                  <p>User Range: {plan.userRange}</p>
                  <h4>₹{plan.price}</h4>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionPlans;