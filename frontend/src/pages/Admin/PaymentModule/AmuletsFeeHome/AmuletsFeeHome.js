import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import "./AmuletsFeeHome.css";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 300, color: "#fff", font: { size: 14 } },
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
    <div className="amulets-fee-chart-card transactions-chart">
      <div className="chart-header">
        <h2>No. of Transactions</h2>
        <input
          type="month"
          value={format(selectedDate, "yyyy-MM")}
          onChange={handleDateChange}
          className="amulets-fee-month-picker"
        />
      </div>
      <div style={{ height: "275px", width: "100%" }}>
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

const ActionCard = ({ icon, title, description, onClick }) => (
  <div className="amulets-fee-action-card" onClick={onClick}>
    <FontAwesomeIcon icon={icon} className="action-icon" />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const SettingItem = ({ label, value, linkText, linkHref, linkClass }) => (
  <div className="setting-item">
    <label>{label}</label>
    <div className="setting-value">
      <span>{value}</span>
      {linkText && (
        <a href={linkHref} className={linkClass}>
          {linkText}
        </a>
      )}
    </div>
  </div>
);

const AmuletsFeeHome = ({
  setShowAddAmuletsFee,
  setShowAmuletsRefilledList,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const transactionData = [
    { week: "Week 1", transactions: 100 },
    { week: "Week 2", transactions: 800 },
    { week: "Week 3", transactions: 1200 },
    { week: "Week 4", transactions: 600 },
  ];

  const handleDateChange = (event) => {
    const [year, month] = event.target.value.split("-");
    setSelectedDate(new Date(year, month - 1));
  };

  return (
    <div className="amulets-fee-container">
      <div className="amulets-fee-row">
        <div className="amulets-fee-column">
          <TransactionsChart
            transactionData={transactionData}
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </div>
        <div className="amulets-fee-column">
          <ActionCard
            icon={faPlus}
            title="Add Amulets Fee"
            description="Add Amulets fee and refill amulets"
            onClick={() => setShowAddAmuletsFee(true)}
          />
          <ActionCard
            icon={faEye}
            title="Amulets Refilled List"
            description="View the list of students who has refilled"
            onClick={() => setShowAmuletsRefilledList(true)}
          />
        </div>
      </div>
      <div className="amulets-fee-row">
        <div className="amulets-fee-settings">
          <h2>Settings</h2>
          <SettingItem
            label="Minimum Amulets"
            value="30"
            linkText="Change Minimum Amulets"
            linkHref="#"
            linkClass="change-link"
          />
          <SettingItem
            label="Amulets Fee Added"
            value="10rs/1 amulet"
            linkText="Change Amulets Fee"
            linkHref="#"
            linkClass="change-link"
          />
          <SettingItem
            label="Refill amulets for all"
            linkText="Refill"
            linkHref="#"
            linkClass="refill-link"
          />
        </div>
      </div>
    </div>
  );
};

export default AmuletsFeeHome;
