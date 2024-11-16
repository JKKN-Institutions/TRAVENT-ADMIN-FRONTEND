import React from "react";
import Barcode from "react-barcode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SubscriptionReceipt.css";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";

// Reusable component for rendering individual receipt rows
const ReceiptRow = ({ label, value }) => (
  <div className="receipt-row">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const SubscriptionReceipt = ({ onClose, receiptData }) => {
  const handleDownload = () => {
    showToast("success", "Receipt downloaded successfully!");
  };

  return (
    <div className="subscription-receipt-container">
      <ToastContainer />

      <TopBar title="E-Receipt" onBack={onClose} backButton={true} />
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
            <ReceiptRow
              label="Transaction ID"
              value={receiptData.transactionId}
            />
            <ReceiptRow label="Payment To" value={receiptData.paymentTo} />
            <ReceiptRow label="Payment Date" value={receiptData.paymentDate} />
            <ReceiptRow
              label="Payment Method"
              value={receiptData.paymentMethod}
            />
            <ReceiptRow
              label="Institution Name"
              value={receiptData.institutionName}
            />
            <ReceiptRow
              label="Subscription Plan"
              value={receiptData.subscriptionPlan}
            />
            <ReceiptRow label="Validity" value={receiptData.validity} />
            <ReceiptRow label="User Range" value={receiptData.userRange} />
            <ReceiptRow label="Amount" value={`₹ ${receiptData.amount}`} />
            <ReceiptRow label="Tax" value={`₹ ${receiptData.tax}`} />
            <ReceiptRow
              label="Fee Balance"
              value={`₹ ${receiptData.feeBalance}`}
            />
            <ReceiptRow
              label="Payment Status"
              value={receiptData.paymentStatus}
            />
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
