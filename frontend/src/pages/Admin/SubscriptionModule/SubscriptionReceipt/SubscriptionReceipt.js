import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Barcode from "react-barcode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SubscriptionReceipt.css";

const SubscriptionReceipt = ({ onClose, receiptData }) => {
  const handleDownload = () => {
    toast.success("Receipt downloaded successfully!");
  };

  return (
    <div className="subscription-receipt-container">
      <ToastContainer />
      <header className="subscription-receipt-top-bar">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="subscription-receipt-back-icon"
          onClick={onClose}
        />
        <h2>E-Receipt</h2>
      </header>
      <main className="subscription-receipt-main-content">
        <div className="subscription-receipt-content">
          <div className="subscription-receipt-barcode">
            <Barcode
              value={receiptData.transactionId}
              width={2.5}
              height={40}
              fontSize={12}
            />
          </div>
          <div className="subscription-receipt-details">
            <h3>Payment Details</h3>
            <div className="receipt-row">
              <span>Transaction ID</span>
              <span>{receiptData.transactionId}</span>
            </div>
            <div className="receipt-row">
              <span>Payment To</span>
              <span>{receiptData.paymentTo}</span>
            </div>
            <div className="receipt-row">
              <span>Payment Date</span>
              <span>{receiptData.paymentDate}</span>
            </div>
            <div className="receipt-row">
              <span>Payment Method</span>
              <span>{receiptData.paymentMethod}</span>
            </div>
            <div className="receipt-row">
              <span>Institution Name</span>
              <span>{receiptData.institutionName}</span>
            </div>
            <div className="receipt-row">
              <span>Subscription Plan</span>
              <span>{receiptData.subscriptionPlan}</span>
            </div>
            <div className="receipt-row">
              <span>Validity</span>
              <span>{receiptData.validity}</span>
            </div>
            <div className="receipt-row">
              <span>User Range</span>
              <span>{receiptData.userRange}</span>
            </div>
            <div className="receipt-row">
              <span>Amount</span>
              <span>₹ {receiptData.amount}</span>
            </div>
            <div className="receipt-row">
              <span>Tax</span>
              <span>₹ {receiptData.tax}</span>
            </div>
            <div className="receipt-row">
              <span>Fee Balance</span>
              <span>₹ {receiptData.feeBalance}</span>
            </div>
            <div className="receipt-row">
              <span>Payment Status</span>
              <span className="payment-status">
                {receiptData.paymentStatus}
              </span>
            </div>
          </div>
          <div className="subscription-receipt-total">
            <span>Total Amount</span>
            <span>₹ {receiptData.totalAmount}</span>
          </div>
          <div className="subscription-receipt-button-container">
            <button
              className="subscription-receipt-download"
              onClick={handleDownload}
            >
              Download E-Receipt
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionReceipt;
