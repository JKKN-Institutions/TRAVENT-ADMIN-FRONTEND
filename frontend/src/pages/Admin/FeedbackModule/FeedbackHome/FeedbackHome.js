import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import "./FeedbackHome.css";
import ReceivedFeedback from "../ReceivedFeedback/ReceivedFeedback";
import Loading from "../../../../components/Shared/Loading/Loading";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import apiClient from "../../../../apiClient";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

const FeedbackHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showReceivedFeedback, setShowReceivedFeedback] = useState(false);
  const [studentsFeedback, setStudentsFeedback] = useState();
  const [staffFeedback, setStaffFeedback] = useState();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const institutionId = localStorage.getItem("institutionId");

  useEffect(() => {
    // Fetch the feedback data from the backend
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `/adminRatings/ratings/${institutionId}`
        );
        const data = response.data; // Axios automatically parses JSON
        if (data.success) {
          setStudentsFeedback(data.students);
          setStaffFeedback(data.staffs);
        } else {
          showToast("Error fetching data", "error");
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
        showToast("Error fetching data", "error");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [institutionId]);

  const dataSets = {
    satisfactionData: [
      { label: "1★", count: 1000 },
      { label: "2★", count: 1500 },
      { label: "3★", count: 2309 },
      { label: "4★", count: 600 },
      { label: "5★", count: 1200 },
    ],
    punctualityData: [
      { label: "1★", count: 1000 },
      { label: "2★", count: 1500 },
      { label: "3★", count: 2309 },
      { label: "4★", count: 600 },
      { label: "5★", count: 1200 },
    ],
    driverBehaviorData: [
      { label: "1★", count: 1000 },
      { label: "2★", count: 1500 },
      { label: "3★", count: 2309 },
      { label: "4★", count: 600 },
      { label: "5★", count: 1200 },
    ],
    safetyData: [
      { label: "1★", count: 1000 },
      { label: "2★", count: 1500 },
      { label: "3★", count: 2309 },
      { label: "4★", count: 600 },
      { label: "5★", count: 1200 },
    ],
    cleanlinessData: [
      { label: "1★", count: 1000 },
      { label: "2★", count: 1500 },
      { label: "3★", count: 2309 },
      { label: "4★", count: 600 },
      { label: "5★", count: 1200 },
    ],
    improvementData: [
      { category: "Smooth Ride", count: 2300, color: "#4CAF50" },
      { category: "Seating", count: 2000, color: "#2196F3" },
      { category: "Cleanliness", count: 1200, color: "#FFC107" },
      { category: "Overcrowding", count: 700, color: "#FF5722" },
      { category: "Good Music System", count: 300, color: "#F44336" },
    ],
    likeData: [
      { category: "Cleanliness", count: 2300, color: "#00FF00" },
      { category: "Fast Travel", count: 2000, color: "#0000FF" },
      { category: "Convenient", count: 1100, color: "#FFFF00" },
      {
        category: "No Service During Special Events",
        count: 300,
        color: "#FF0000",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false, color: "#ffffff" },
        ticks: { color: "#ffffff", font: { size: 14 } },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "#ffffff", font: { size: 14 } },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        padding: 10,
        displayColors: false,
      },
    },
  };

  const createChartData = (data, color) => ({
    labels: data.map((item) => item.label || item.category),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: color || data.map((item) => item.color || "#8884d8"),
        borderColor: "transparent",
        borderRadius: 4,
        barThickness: 40,
      },
    ],
  });

  const renderChartCard = (title, data, color, height = "200px") => (
    <div className="feedback-chart-card">
      <h2>{title}</h2>
      <div style={{ height }}>
        <Bar options={chartOptions} data={createChartData(data, color)} />
      </div>
    </div>
  );

  if (showReceivedFeedback) {
    return (
      <ReceivedFeedback
        studentsFeedback={studentsFeedback}
        staffFeedback={staffFeedback}
        onBack={() => setShowReceivedFeedback(false)}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading message="Loading Ratings & Feedbacks..." />
      ) : (
        <div className="feedback-home-container">
          <TopBar title="Ratings & Feedbacks" toggleSidebar={toggleSidebar} />

          <div className="feedback-controls">
            <button
              className="feedback-view-all"
              onClick={() => setShowReceivedFeedback(true)}
            >
              View Each Feedback{" "}
              <FontAwesomeIcon icon={faArrowRight} className="icon-right" />
            </button>
          </div>

          <main className="feedback-home-main-content">
            <div className="feedback-stats-row">
              {renderChartCard(
                "Overall satisfaction",
                dataSets.satisfactionData,
                "#FFD700"
              )}
              {renderChartCard(
                "Punctuality of Bus",
                dataSets.punctualityData,
                "#A3E635"
              )}
              <div className="feedback-total-card">
                <h2>Total Feedback Received Till Now</h2>
                <div className="feedback-total-number">78954</div>
              </div>
              {renderChartCard(
                "Behavior and Attitude of the Bus Driver",
                dataSets.driverBehaviorData,
                "#FF5E5B"
              )}
              <div className="feedback-rating-card">
                <h2>Average Rating</h2>
                <div className="average-rating">
                  <span className="rating-number">4.6</span>
                  <span className="rating-divider">/</span>
                  <span className="rating-total">5</span>
                </div>
                <div className="rating-stars">
                  {[1, 2, 3, 4].map((star) => (
                    <FontAwesomeIcon
                      key={star}
                      icon={faStar}
                      className="star-filled"
                    />
                  ))}
                  <FontAwesomeIcon icon={faStar} className="star-half" />
                </div>
              </div>
              {renderChartCard(
                "Safety and Security on the Bus",
                dataSets.safetyData,
                "#00E5FF"
              )}
            </div>

            <div className="feedback-charts-row">
              {renderChartCard(
                "Condition and Cleanliness of Bus",
                dataSets.cleanlinessData,
                "#B2F2BB",
                "280px"
              )}
              {renderChartCard(
                "What Could Be Improved",
                dataSets.improvementData,
                undefined,
                "280px"
              )}
              {renderChartCard(
                "What passengers mostly like",
                dataSets.likeData,
                undefined,
                "280px"
              )}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default FeedbackHome;
