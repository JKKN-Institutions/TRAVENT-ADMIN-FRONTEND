import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import "./BusFeeHome.css";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 200, color: "#fff", font: { size: 14 } },
      grid: { color: "rgba(255, 255, 255, 0.1)" },
    },
    x: {
      ticks: { color: "#fff", font: { size: 14 } },
      grid: { color: "rgba(255, 255, 255, 0.1)" },
    },
  },
  plugins: {
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      titleColor: "#fff",
      bodyColor: "#fff",
      bodyFont: { size: 14 },
      callbacks: {
        label: ({ parsed }) => `Transactions: ${parsed.y}`,
      },
    },
    legend: { display: false },
  },
};

const TransactionsChart = ({
  transactionData,
  selectedDate,
  handleDateChange,
}) => {
  const chartData = {
    labels: transactionData.map((data) => data.week),
    datasets: [
      {
        data: transactionData.map((data) => data.transactions),
        borderColor: "#11a8fd",
        backgroundColor: "rgba(17, 168, 253, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#11a8fd",
      },
    ],
  };

  return (
    <div className="bus-fee-chart-card transactions-chart">
      <div className="chart-header">
        <h2>No. of Transactions</h2>
        <input
          type="month"
          value={format(selectedDate, "yyyy-MM")}
          onChange={handleDateChange}
          className="bus-fee-month-picker"
        />
      </div>
      <div style={{ height: "275px", width: "100%" }}>
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

const ActionCard = ({ icon, title, description, onClick }) => (
  <div className="bus-fee-action-card" onClick={onClick}>
    <FontAwesomeIcon icon={icon} className="action-icon" />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const BusFeeHome = ({ setShowAddBusFee, setShowUpdateBusFee }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dueNotificationEnabled, setDueNotificationEnabled] = useState(false);

  const transactionData = [
    { week: "Week 1", transactions: 100 },
    { week: "Week 2", transactions: 300 },
    { week: "Week 3", transactions: 800 },
    { week: "Week 4", transactions: 500 },
  ];

  const handleDateChange = (event) => {
    const [year, month] = event.target.value.split("-");
    setSelectedDate(new Date(year, month - 1));
  };

  return (
    <div className="bus-fee-container">
      <div className="bus-fee-row">
        <div className="bus-fee-column">
          <TransactionsChart
            transactionData={transactionData}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </div>
        <div className="bus-fee-column">
          <ActionCard
            icon={faPlus}
            title="Add Bus Fee"
            description="Add Bus Fee for the next academic year"
            onClick={() => setShowAddBusFee(true)}
          />
          <ActionCard
            icon={faEdit}
            title="Update Bus Fee"
            description="Update modifications in the bus fee"
            onClick={() => setShowUpdateBusFee(true)}
          />
        </div>
      </div>
      <div className="bus-fee-row">
        <div className="bus-fee-settings">
          <h2>Settings</h2>
          <div className="setting-item">
            <label htmlFor="enable-notification">Enable Due Notification</label>
            <Switch
              onChange={setDueNotificationEnabled}
              checked={dueNotificationEnabled}
              onColor="#11a8fd"
              offColor="#ccc"
              uncheckedIcon={false}
              checkedIcon={false}
            />
          </div>
          <p className="setting-description">
            Enable or Disable payment due notification for each term.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusFeeHome;
