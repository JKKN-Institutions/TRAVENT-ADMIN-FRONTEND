import React, { useState } from "react";
import "./PaymentMethods.css";

const PaymentMethods = ({ planDetails, onBack }) => {
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Please check your connection.");
      return;
    }

    const options = {
      key: "rzp_test_eB7p3df8eXoOVY", // Replace with your Razorpay test/live key
      amount: planDetails.price * 100, // Amount in paise
      currency: "INR",
      name: "Travent",
      description: `Payment for ${planDetails.name}`,
      handler: function (response) {
        if (response.razorpay_payment_id) {
          setShowSuccessOverlay(true);
        } else {
          console.log("Payment failed:", response);
          alert("Payment failed. Please try again.");
        }
      },
      modal: {
        ondismiss: function () {
          console.log("Payment modal closed by user.");
          alert("Payment cancelled. You can try again.");
        },
      },
      prefill: {
        name: planDetails.institutionName,
        email: "customer@example.com",
      },
      theme: {
        color: "#11a8fd",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      console.log("Payment failed:", response.error);
      alert("Payment failed. Reason: " + response.error.description);
    });

    rzp.open();
  };

  return (
    <>
      {showSuccessOverlay && (
        <div className="payment-success-overlay">
          <div className="payment-success-content">
            <div className="confetti-animation"></div>
            <h2>Congratulations!</h2>
            <p>You have successfully made your payment.</p>
            <div className="payment-success-actions">
              <button className="go-to-history-button">
                Go to Payment History
              </button>
              <button className="view-receipt-button">View E-Receipt</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentMethods;
