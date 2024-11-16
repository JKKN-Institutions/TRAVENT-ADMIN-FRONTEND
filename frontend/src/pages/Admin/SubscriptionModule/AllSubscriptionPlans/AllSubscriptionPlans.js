import React, { useState } from "react";
import "./AllSubscriptionPlans.css";
import PaymentSummary from "../PaymentSummary/PaymentSummary";
import TopBar from "../../../../components/Shared/TopBar/TopBar";

const AllSubscriptionPlans = ({ onBack }) => {
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = {
    "6 Months Plans - Premium": [
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
    ],
    "12 Months Plans - Ultra Premium": [
      { name: "Small Scale - Premium", price: "2,00,000", userRange: "1-2000" },
      {
        name: "Medium Scale - Premium",
        price: "4,00,000",
        userRange: "2000-5000",
      },
    ],
  };

  const handleSubscribe = (plan) => {
    const parsedPrice = parseFloat(plan.price.replace(/,/g, ""));
    setSelectedPlan({
      ...plan,
      price: parsedPrice,
      paymentDate: new Date().toLocaleString(),
      institutionName: "JKKN Group of Institutions",
    });
    setShowPaymentSummary(true);
  };

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
      <TopBar title="All Subscription Plans" onBack={onBack} backButton />
      <main className="all-subscription-plans-main-content">
        {Object.entries(plans).map(([sectionTitle, sectionPlans]) => (
          <div key={sectionTitle} className="all-subscription-plans-section">
            <h2>{sectionTitle}</h2>
            <div className="all-subscription-plans-grid">
              {sectionPlans.map(renderPlanCard)}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default AllSubscriptionPlans;
