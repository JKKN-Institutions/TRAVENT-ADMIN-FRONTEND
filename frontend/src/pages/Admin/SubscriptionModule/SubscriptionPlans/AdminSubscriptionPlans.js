import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import "./AdminSubscriptionPlans.css";
import AllSubscriptionPlans from "../AllSubscriptionPlans/AllSubscriptionPlans";
import SubscriptionPaymentHistory from "../SubscriptionPaymentHistory/SubscriptionPaymentHistory";
import PaymentSummary from "../PaymentSummary/PaymentSummary";
import Loading from "../../../../components/Shared/Loading/Loading";
import TopBar from "../../../../components/Shared/TopBar/TopBar";

// Reusable Card Component for Subscription Plans
const PlanCard = ({ plan, onSubscribe }) => (
  <div className="admin-plan-card">
    <div className="admin-plan-price-name">
      <h3>{plan.name}</h3>
      <h4>₹{plan.price}</h4>
    </div>
    <p>
      Validity: <span>{plan.validity}</span>
    </p>
    <p>
      User Range: <span>{plan.userRange}</span>
    </p>
    <div className="admin-plan-price-subscribe">
      <button
        className="admin-subscribe-button"
        onClick={() => onSubscribe(plan)}
      >
        Subscribe
      </button>
    </div>
  </div>
);

// Reusable Card Component for Payment History
const PaymentCard = ({ payment }) => (
  <div className="admin-payment-card">
    <div className="admin-payment-card-row">
      <h3>{payment.name}</h3>
      <h4>₹{payment.price}</h4>
    </div>
    <div className="admin-payment-card-row">
      <p>{payment.date}</p>
      <p>
        Payment Id: <span>{payment.paymentId}</span>
      </p>
      <div className="admin-payment-price-check">
        <FontAwesomeIcon icon={faCheck} className="admin-payment-check" />
      </div>
    </div>
  </div>
);

const AdminSubscriptionPlans = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const currentPlan = {
    name: "Medium Scale - Premium",
    price: "2,00,000",
    validity: "6 Months",
    userRange: "2000-5000",
  };

  const allPlans = [
    {
      name: "Small Scale - Premium",
      price: "10,000",
      validity: "6 Months",
      userRange: "1-2000",
    },
    {
      name: "Medium Scale - Premium",
      price: "2,00,000",
      validity: "6 Months",
      userRange: "2000-5000",
    },
    {
      name: "Large Scale - Premium",
      price: "5,00,000",
      validity: "6 Months",
      userRange: "5000-10000",
    },
  ];

  const paymentHistory = [
    {
      name: "Medium Scale - Premium",
      price: "2,00,000",
      date: "19/07/2024 - 16:24:56",
      paymentId: "254F5ECE2",
    },
    {
      name: "Medium Scale - Premium",
      price: "2,00,000",
      date: "19/07/2024 - 16:24:56",
      paymentId: "254F5ECE2",
    },
    {
      name: "Medium Scale - Premium",
      price: "2,00,000",
      date: "19/07/2024 - 16:24:56",
      paymentId: "254F5ECE2",
    },
  ];

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

  if (showAllPlans) {
    return <AllSubscriptionPlans onBack={() => setShowAllPlans(false)} />;
  }

  if (showPaymentHistory) {
    return (
      <SubscriptionPaymentHistory onBack={() => setShowPaymentHistory(false)} />
    );
  }

  if (showPaymentSummary) {
    return (
      <PaymentSummary
        onBack={() => setShowPaymentSummary(false)}
        planDetails={selectedPlan}
        setShowPaymentHistory={setShowPaymentHistory}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading message="Loading Subscription Plans..." />
      ) : (
        <div className="admin-subscription-plans-container">
          <TopBar title="Subscription Plans" toggleSidebar={toggleSidebar} />
          <main className="admin-subscription-plans-main-content">
            {/* Current Plan Section without Subscribe button */}
            <div className="admin-plans-section">
              <div className="admin-section-header">
                <h2>Your Current Subscription Plan</h2>
              </div>
              <div className="admin-plans-grid">
                <div className="admin-plan-card current-plan">
                  <div className="admin-plan-current-price-name">
                    <h3>{currentPlan.name}</h3>
                    <h4>₹{currentPlan.price}</h4>
                  </div>
                  <p>
                    Validity: <span>{currentPlan.validity}</span>
                  </p>
                  <p>
                    User Range: <span>{currentPlan.userRange}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* All Subscription Plans Section */}
            <div className="admin-plans-section">
              <div className="admin-section-header">
                <h2>All Subscription Plans</h2>
                <button
                  className="admin-view-all-button"
                  onClick={() => setShowAllPlans(true)}
                >
                  view all <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
              <div className="admin-plans-grid">
                {allPlans.map((plan, index) => (
                  <PlanCard
                    key={index}
                    plan={plan}
                    onSubscribe={handleSubscribe}
                  />
                ))}
              </div>
            </div>

            {/* Payment History Section */}
            <div className="admin-plans-section">
              <div className="admin-section-header">
                <h2>Payment History</h2>
                <button
                  className="admin-view-all-button"
                  onClick={() => setShowPaymentHistory(true)}
                >
                  view all <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
              <div className="admin-plans-grid">
                {paymentHistory.map((payment, index) => (
                  <PaymentCard key={index} payment={payment} />
                ))}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default AdminSubscriptionPlans;
