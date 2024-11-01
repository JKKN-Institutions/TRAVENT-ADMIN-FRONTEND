import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./AllSubscriptionPlans.css";
import PaymentSummary from "../PaymentSummary/PaymentSummary";

const AllSubscriptionPlans = ({ onBack }) => {
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const sixMonthsPlans = [
    { name: "Small Scale - Premium", price: "1,00,000", userRange: "1-2000" },
    {
      name: "Medium Scale - Premium",
      price: "2,00,000",
      userRange: "2000-5000",
    },
    {
      name: "Large Scale - Premium",
      price: "5,00,000",
      userRange: "5000-10000",
    },
    {
      name: "XL Scale - Premium",
      price: "10,00,000",
      userRange: "10000-20000",
    },
    {
      name: "XXL Scale - Premium",
      price: "20,00,000",
      userRange: "20000-40000",
    },
  ];

  const twelveMonthsPlans = [
    { name: "Small Scale - Premium", price: "2,00,000", userRange: "1-2000" },
    {
      name: "Medium Scale - Premium",
      price: "4,00,000",
      userRange: "2000-5000",
    },
  ];

  const renderPlanCard = (plan) => (
    <div key={plan.name} className="all-subscription-plan-card">
      <div className="all-subscription-plan-price-name">
        <h3>{plan.name}</h3>
        <h4>₹{plan.price}</h4>
      </div>
      <p>
        Validity: <span>6 Months</span>
      </p>
      <p>
        User Range: <span>{plan.userRange}</span>
      </p>
      <div
        className="all-subscription-plan-price-subscribe"
        onClick={() => handleSubscribe(plan)}
      >
        <button className="all-subscription-subscribe-button">Subscribe</button>
      </div>
    </div>
  );

  const handleSubscribe = (plan) => {
    // Remove commas and convert price to a number
    const parsedPrice = parseFloat(plan.price.replace(/,/g, ""));

    setSelectedPlan({
      ...plan,
      price: parsedPrice, // Store the numeric value
      paymentDate: new Date().toLocaleString(),
      institutionName: "JKKN Group of Institutions",
    });
    setShowPaymentSummary(true);
  };

  if (showPaymentSummary) {
    return (
      <PaymentSummary
        onBack={() => setShowPaymentSummary(false)}
        planDetails={selectedPlan}
      />
    );
  }

  return (
    <div className="all-subscription-plans-container">
      <header className="all-subscription-plans-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="all-subscription-back-icon"
          onClick={onBack}
        />
        <h2>All Subscription Plans</h2>
      </header>
      <main className="all-subscription-plans-main-content">
        <div className="all-subscription-plans-section">
          <h2>6 Months Plans - Premium</h2>
          <div className="all-subscription-plans-grid">
            {sixMonthsPlans.map(renderPlanCard)}
          </div>
        </div>
        <div className="all-subscription-plans-section">
          <h2>12 Months Plans - Ultra Premium</h2>
          <div className="all-subscription-plans-grid">
            {twelveMonthsPlans.map(renderPlanCard)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AllSubscriptionPlans;
