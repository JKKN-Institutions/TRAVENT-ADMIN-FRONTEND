import React, { useState } from "react";
import "./PaymentSummary.css";
import PaymentMethods from "../PaymentMethods/PaymentMethods";
import SubscriptionReceipt from "../SubscriptionReceipt/SubscriptionReceipt";
import TopBar from "../../../../components/Shared/TopBar/TopBar";

const PaymentSummary = ({ onBack, planDetails, setShowPaymentHistory }) => {
  const [activeTab, setActiveTab] = useState("summary");
  const [isChecked, setIsChecked] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);

  const handleProceedToPayment = () => setActiveTab("payment");

  if (showReceipt) {
    return (
      <SubscriptionReceipt
        onClose={onBack}
        receiptData={{
          transactionId: paymentResponse?.razorpay_payment_id || "TXN123456789",
          paymentTo: "Travent Solutions",
          paymentDate: new Date().toLocaleDateString(),
          paymentMethod: "Razorpay",
          institutionName: planDetails.institutionName,
          subscriptionPlan: planDetails.plan_name,
          validity: planDetails.validity,
          userRange: planDetails.user_range,
          amount: planDetails.price,
          tax: Math.round(planDetails.price * 0.18),
          feeBalance: 0,
          paymentStatus: "Paid",
          totalAmount: Math.round(planDetails.price * 1.18),
        }}
      />
    );
  }

  const summaryDetails = [
    { label: "Payment To", value: "Travent" },
    { label: "Payment date", value: planDetails.paymentDate },
    { label: "Institution Name", value: planDetails.institutionName },
    { label: "Subscription Plan", value: planDetails.plan_name },
    { label: "Validity", value: planDetails.validity },
    { label: "User Range", value: planDetails.user_range },
    { label: "Amount", value: `₹ ${planDetails.price}` },
  ];

  return (
    <div className="payment-summary-container">
      <TopBar title="Payment Menu" onBack={onBack} backButton={true} />

      <main className="payment-summary-main-content">
        <div className="payment-summary-tabs">
          <div className="payment-summary-progress">
            <div
              className={`progress-step ${
                activeTab === "summary" ? "active" : ""
              }`}
            >
              <div className="progress-number">1</div>
              <span>Summary</span>
            </div>
            <div
              className={`progress-line ${
                activeTab === "payment" ? "filled" : ""
              }`}
            ></div>
            <div
              className={`progress-step ${
                activeTab === "payment" ? "active" : ""
              }`}
            >
              <div className="progress-number">2</div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        {activeTab === "summary" ? (
          <div className="payment-summary-content">
            <h3>Summary of Payment</h3>
            <div className="payment-summary-details">
              {summaryDetails.map(({ label, value }) => (
                <div key={label} className="payment-summary-row">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>

            <div className="payment-summary-total">
              <span>Total Amount</span>
              <span>₹ {planDetails.price}</span>
            </div>

            <div className="payment-summary-agreement">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <span className="checkmark"></span>
                <span className="agreement-text">
                  By clicking this I am accepting to pay the amount mentioned in
                  the above summary and I know that it cannot be refunded.
                </span>
              </label>
            </div>

            <div className="payment-summary-actions">
              <button className="payment-summary-cancel" onClick={onBack}>
                Cancel
              </button>
              <button
                className="payment-summary-proceed"
                disabled={!isChecked}
                onClick={handleProceedToPayment}
              >
                Proceed to Pay ₹ {planDetails.price}
              </button>
            </div>
          </div>
        ) : (
          <PaymentMethods
            onBack={() => setActiveTab("summary")}
            planDetails={planDetails}
            setPaymentResponse={setPaymentResponse}
            setShowReceipt={setShowReceipt}
            setShowPaymentHistory={setShowPaymentHistory}
          />
        )}
      </main>
    </div>
  );
};

export default PaymentSummary;
