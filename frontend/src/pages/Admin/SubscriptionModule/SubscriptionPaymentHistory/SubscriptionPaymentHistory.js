import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faArrowRight,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import "./SubscriptionPaymentHistory.css";
import SubscriptionReceipt from "../SubscriptionReceipt/SubscriptionReceipt";

const SubscriptionPaymentHistory = ({ onBack }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  const paymentHistory = [
    {
      name: "Medium Scale - Premium",
      price: "2,00,000",
      date: "29/06/2024 - 10:00:16",
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

  const handleViewReceipt = (payment) => {
    setSelectedPayment(payment);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setSelectedPayment(null);
  };

  if (showReceipt && selectedPayment) {
    return (
      <SubscriptionReceipt
        onClose={handleCloseReceipt}
        receiptData={{
          transactionId: selectedPayment.paymentId,
          paymentTo: "Travent",
          paymentDate: selectedPayment.date,
          paymentMethod: "Google Pay",
          institutionName: "JKKN Group of Institutions",
          subscriptionPlan: selectedPayment.name,
          validity: "6 Months",
          userRange: "2000 - 5000",
          amount: selectedPayment.price,
          tax: "0.00",
          feeBalance: "0.00",
          paymentStatus: "Success",
          totalAmount: selectedPayment.price,
        }}
      />
    );
  }

  return (
    <div className="subscription-payment-history-container">
      <header className="subscription-payment-history-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="subscription-payment-history-back-icon"
          onClick={onBack}
        />
        <h2>Payment History</h2>
      </header>
      <main className="subscription-payment-history-main-content">
        <div className="subscription-payment-history-year-filter">
          <FontAwesomeIcon
            icon={faCalendar}
            className="subscription-calendar-icon"
          />
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="year-select"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="subscription-payment-history-grid">
          {paymentHistory.map((payment, index) => (
            <div key={index} className="subscription-payment-history-card">
              <div className="card-row first-row">
                <h3>{payment.name}</h3>
                <h4 className="payment-price">₹{payment.price}</h4>
                <div className="price-check">
                  <FontAwesomeIcon icon={faCheck} className="payment-check" />
                </div>
              </div>
              <div className="card-row second-row">
                <p className="payment-date">{payment.date}</p>
                <p className="payment-id">Payment Id: {payment.paymentId}</p>
              </div>
              <div className="card-row third-row">
                <button
                  className="subscription-payment-history-view-receipt"
                  onClick={() => handleViewReceipt(payment)}
                >
                  view receipt
                  <div className="subscription-action-icon-container">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="subscription-action-icon"
                    />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SubscriptionPaymentHistory;
