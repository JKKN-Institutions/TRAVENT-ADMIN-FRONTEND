import React, { useEffect, useState } from "react";
import "./PaymentMethods.css";
import { CheckCircle2 } from "lucide-react";

const PaymentMethods = ({
  planDetails,
  onBack,
  setPaymentResponse,
  setShowReceipt,
  setShowPaymentHistory,
}) => {
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  useEffect(() => {
    handlePayment();
  }, []);

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load. Please check your connection.");
      return;
    }

    const options = {
      key: "rzp_test_Z9Ag0AoPT2joJY",
      amount: planDetails.price * 100,
      currency: "INR",
      name: "Travent",
      description: `Payment for ${planDetails.name}`,
      handler: function (response) {
        if (response?.razorpay_payment_id) {
          setPaymentResponse(response);
          setShowSuccessOverlay(true);
        } else {
          alert("Payment failed. Please try again.");
        }
      },
      modal: {
        ondismiss: function () {
          alert("Payment cancelled. You can try again.");
          onBack();
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
      alert("Payment failed. Reason: " + response.error.description);
    });

    rzp.open();
  };

  return (
    <div className="payment-methods-container">
      {showSuccessOverlay && (
        <div className="payment-success-overlay">
          <div className="payment-success-content">
            <CheckCircle2
              className="success-icon"
              size={50}
              strokeWidth={1.5}
            />
            <h2>Congratulations!</h2>
            <p>You have successfully made your payment.</p>
            <div className="payment-success-actions">
              <button
                className="go-to-history-button"
                onClick={() => setShowPaymentHistory(true)}
              >
                Go to Payment History
              </button>
              <button
                className="view-receipt-button"
                onClick={() => setShowReceipt(true)}
              >
                View E-Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
