import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { format } from "date-fns";
import "./PaymentDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

  const pieChartData = {
    labels: feePaidData.map((item) => item.name),
    datasets: [
      {
        data: feePaidData.map((item) => item.value),
        backgroundColor: feePaidData.map((item) => item.color),
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

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
      legend: {
        display: false,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#fff",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const Card = ({ title, children }) => (
    <div className="payments-dashboard-chart-card">
      <h3>{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="payments-dashboard">
      <div className="payments-dashboard-row">
        <div className="payments-dashboard-column">
          <Card>
            <div className="chart-header">
              <h2>No. of Transactions</h2>
              <input
                type="month"
                value={format(selectedDate, "yyyy-MM")}
                onChange={handleDateChange}
                className="payments-dashboard-month-picker"
              />
            </div>
            <div style={{ height: "275px", width: "100%" }}>
              <Line options={chartOptions} data={chartData} />
            </div>
          </Card>
        </div>
        <div className="payments-dashboard-column">
          <Card>
            <h3>Fee Paid</h3>
            <div className="fee-paid-chart-container">
              <div style={{ height: "200px", width: "100%" }}>
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </div>
          </Card>
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

        <div className="total-transactions payments-dashboard-column">
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
        <div className="payments-dashboard-column">
          <div className="amount-received">
            <p className="amount">75,0050 ₹</p>
            <p className="amount-label">
              Amount Received {format(selectedDate, "MMM yyyy")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;
