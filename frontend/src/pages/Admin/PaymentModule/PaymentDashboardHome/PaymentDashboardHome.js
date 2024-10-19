import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
import "./PaymentDashboardHome.css";
import ViewTransactions from "../ViewTransactions/ViewTransactions";
import PaymentRecords from "../PaymentRecords/PaymentRecords";
import BusFeeHome from "../BusFeeHome/BusFeeHome";
import AmuletsFeeHome from "../AmuletsFeeHome/AmuletsFeeHome";
import AddBusFee from "../AddBusFee/AddBusFee";
import UpdateBusFee from "../UpdateBusFee/UpdateBusFee";

const PaymentsDashboardHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showViewTransactions, setShowViewTransactions] = useState(false);
  const [showPaymentRecords, setShowPaymentRecords] = useState(false);
  const [showAddBusFee, setShowAddBusFee] = useState(false);
  const [showUpdateBusFee, setShowUpdateBusFee] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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

  const handleDateChange = (event) => {
    const [year, month] = event.target.value.split("-");
    setSelectedDate(new Date(year, month - 1));
  };

  const handleAddBusFee = (busFeeData) => {
    // Handle the bus fee data
    console.log("Bus Fee Data:", busFeeData);
    setShowAddBusFee(false);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (showViewTransactions) {
    return <ViewTransactions onBack={() => setShowViewTransactions(false)} />;
  }

  if (showPaymentRecords) {
    return <PaymentRecords onBack={() => setShowPaymentRecords(false)} />;
  }

  // AddBusFee rendering: If true, only render AddBusFee without the other components
  if (showAddBusFee) {
    return (
      <AddBusFee
        onBack={() => setShowAddBusFee(false)}
        onSave={() => setShowAddBusFee(false)}
      />
    );
  }

  if (showUpdateBusFee) {
    return (
      <UpdateBusFee
        onBack={() => setShowUpdateBusFee(false)}
        onSave={() => setShowUpdateBusFee(false)}
      />
    );
  }

  return (
    <div className="payments-dashboard-container">
      <header className="payments-dashboard-top-bar">
        <div className="payments-dashboard-menu-icon" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <h1>Payments</h1>
      </header>

      <main className="payments-dashboard-main-content">
        <div className="payments-dashboard-tabs">
          <button
            className={`tab-button ${
              activeTab === "Dashboard" ? "active" : ""
            }`}
            onClick={() => setActiveTab("Dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`tab-button ${activeTab === "Bus fee" ? "active" : ""}`}
            onClick={() => setActiveTab("Bus fee")}
          >
            Bus fee
          </button>
          <button
            className={`tab-button ${
              activeTab === "Amulets Fee" ? "active" : ""
            }`}
            onClick={() => setActiveTab("Amulets Fee")}
          >
            Amulets Fee
          </button>
        </div>

        {activeTab === "Dashboard" && (
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
                  <p className="transactions-count">1458</p>
                  <p className="transactions-count-label">Total Transactions</p>
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
                  <div className="previous-month-link">
                    <span>Previous Months</span>
                    <div className="transaction-arrow-icon-container">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="transaction-arrow-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "Bus fee" && (
          <BusFeeHome
            setShowAddBusFee={setShowAddBusFee}
            setShowUpdateBusFee={setShowUpdateBusFee}
          />
        )}

        {activeTab === "Amulets Fee" && <AmuletsFeeHome />}
      </main>
    </div>
  );
};

export default PaymentsDashboardHome;
