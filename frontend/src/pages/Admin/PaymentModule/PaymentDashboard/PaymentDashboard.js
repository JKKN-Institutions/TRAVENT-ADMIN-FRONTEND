import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format } from "date-fns";
import "./PaymentDashboard.css";

const PaymentDashboard = ({
  selectedDate,
  handleDateChange,
  setShowPaymentRecords,
  setShowViewTransactions,
}) => {
  const transactionData = [
    { week: "Week 1", transactions: 200 },
    { week: "Week 2", transactions: 600 },
    { week: "Week 3", transactions: 800 },
    { week: "Week 4", transactions: 400 },
  ];

  const feePaidData = [
    { name: "Term 1", value: 759, color: "#4CAF50" },
    { name: "Term 2", value: 1022, color: "#FFC107" },
    { name: "Term 3", value: 1022, color: "#2196F3" },
    { name: "Not Paid", value: 4564, color: "#F44336" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="payments-dashboard-row">
        <div className="payments-dashboard-column">
          <div className="payments-dashboard-chart-card transactions-chart">
            <div className="chart-header">
              <h2>No. of Transactions</h2>
              <div className="chart-controls">
                <input
                  type="month"
                  value={format(selectedDate, "yyyy-MM")}
                  onChange={handleDateChange}
                  className="month-picker"
                />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={275}>
              <LineChart data={transactionData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="transactions"
                  stroke="#11a8fd"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="payments-dashboard-column">
          <div className="payments-dashboard-chart-card fee-paid">
            <h3>Fee Paid</h3>
            <div className="fee-paid-chart">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={feePaidData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {feePaidData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="fee-paid-legend">
              {feePaidData.map((item) => (
                <div key={item.name} className="legend-item">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="payments-dashboard-row">
        <div className="payments-dashboard-column">
          <div
            className="view-all-records"
            onClick={() => setShowPaymentRecords(true)}
          >
            <span>View All Records & Statuses</span>
            <div className="arrow-icon-container">
              <FontAwesomeIcon
                icon={faArrowRight}
                className="payments-dashboard-arrow-icon"
              />
            </div>
          </div>
        </div>
        <div className="payments-dashboard-column">
          <div className="total-transactions">
            <p className="transactions-count-label">Total Transactions</p>
            <p className="transactions-count">1458</p>

            <div
              className="view-transactions-link"
              onClick={() => setShowViewTransactions(true)}
            >
              <span>View Transactions</span>
              <div className="transaction-arrow-icon-container">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="transaction-arrow-icon"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="payments-dashboard-column">
          <div className="amount-received">
            <p className="amount">75,0050 ₹</p>
            <p className="amount-label">
              Amount Received {format(selectedDate, "MMM yyyy")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDashboard;
