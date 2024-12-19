import React, { useState } from "react";
import "./AllSubscriptionPlans.css";
import PaymentSummary from "../PaymentSummary/PaymentSummary";
import TopBar from "../../../../components/Shared/TopBar/TopBar";

const AllSubscriptionPlans = ({ onBack, allPlans, institutionName }) => {
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = (plan) => {
    const parsedPrice = parseFloat(plan.price.replace(/,/g, ""));
    setSelectedPlan({
      ...plan,
      price: parsedPrice,
      paymentDate: new Date().toLocaleString(),
      institutionName: institutionName,
    });
    setShowPaymentSummary(true);
  };

  const renderPlanCard = (plan) => (
    <div key={plan.name} className="all-subscription-plan-card">
      <div className="all-subscription-plan-price-name">
        <h3>{plan.plan_name}</h3>
        <h4>₹{plan.price}</h4>
      </div>
      <p>
        Validity: <span>{plan.validity}</span>
      </p>
      <p>
        User Range: <span>{plan.user_range}</span>
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

  // Categorizing plans by their validity (you can modify this based on your needs)
  const categorizedPlans = allPlans.reduce((categories, plan) => {
    const category = plan.category; // Or any other property for categorization
    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(plan);
    return categories;
  }, {});

  return (
    <div className="all-subscription-plans-container">
      <TopBar title="All Subscription Plans" onBack={onBack} backButton />
      <main className="all-subscription-plans-main-content">
        {Object.entries(categorizedPlans).map(
          ([sectionTitle, sectionPlans]) => (
            <div key={sectionTitle} className="all-subscription-plans-section">
              <h2>{sectionTitle}</h2>
              <div className="all-subscription-plans-grid">
                {sectionPlans.map(renderPlanCard)}
              </div>
            </div>
          )
        )}
      </main>
    </div>
  );
};

export default AllSubscriptionPlans;
