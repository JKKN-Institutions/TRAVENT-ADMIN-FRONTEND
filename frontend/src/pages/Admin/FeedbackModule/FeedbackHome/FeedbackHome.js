import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import "./FeedbackHome.css";
import ReceivedFeedback from "../ReceivedFeedback/ReceivedFeedback";
import Loading from "../../../../components/Shared/Loading/Loading";

const FeedbackHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showReceivedFeedback, setShowReceivedFeedback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const satisfactionData = [
    { rating: <FontAwesomeIcon icon={faStar} />, label: "1★", count: 1000 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "2★", count: 1500 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "3★", count: 2309 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "4★", count: 600 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "5★", count: 1200 },
  ];

  const punctualityData = [
    { rating: <FontAwesomeIcon icon={faStar} />, label: "1★", count: 1000 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "2★", count: 1500 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "3★", count: 2309 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "4★", count: 600 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "5★", count: 1200 },
  ];

  const driverBehaviorData = [
    { rating: <FontAwesomeIcon icon={faStar} />, label: "1★", count: 1000 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "2★", count: 1500 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "3★", count: 2309 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "4★", count: 600 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "5★", count: 1200 },
  ];

  const safetyData = [
    { rating: <FontAwesomeIcon icon={faStar} />, label: "1★", count: 1000 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "2★", count: 1500 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "3★", count: 2309 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "4★", count: 600 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "5★", count: 1200 },
  ];

  const cleanlinessData = [
    { rating: <FontAwesomeIcon icon={faStar} />, label: "1★", count: 1000 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "2★", count: 1500 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "3★", count: 2309 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "4★", count: 600 },
    { rating: <FontAwesomeIcon icon={faStar} />, label: "5★", count: 1200 },
  ];

  const improvementData = [
    { category: "Smooth Ride", count: 2300, color: "#4CAF50" },
    { category: "Seating", count: 2000, color: "#2196F3" },
    { category: "Cleanliness", count: 1200, color: "#FFC107" },
    { category: "Overcrowding", count: 700, color: "#FF5722" },
    { category: "Good Music System", count: 300, color: "#F44336" },
  ];

  const likeData = [
    { category: "Cleanliness", count: 2300, color: "#00FF00" },
    { category: "Fast Travel", count: 2000, color: "#0000FF" },
    { category: "Convenient", count: 1100, color: "#FFFF00" },
    {
      category: "No Service During Special Events",
      count: 300,
      color: "#FF0000",
    },
  ];
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="feedback-custom-tooltip">
          <p>{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomXAxisTick = ({ x, y, payload }) => {
    const data = satisfactionData[payload.index];
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#ffffff"
          style={{ fontSize: "14px" }}
        >
          {data.label}
        </text>
      </g>
    );
  };

  if (showReceivedFeedback) {
    return <ReceivedFeedback onBack={() => setShowReceivedFeedback(false)} />;
  }

  return (
    <>
      {isLoading ? (
        <Loading message="Loading Ratings & Feedbacks..." />
      ) : (
        <div className="feedback-home-container">
          <header className="feedback-home-top-bar">
            <div className="feedback-home-menu-icon" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h1>Ratings & Feedbacks</h1>
          </header>
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
              <div className="feedback-chart-card">
                <h2>Overall satisfaction</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={satisfactionData} barSize={45}>
                    <XAxis
                      dataKey="label"
                      tick={<CustomXAxisTick />}
                      axisLine={{ stroke: "#ffffff" }}
                    />
                    <YAxis
                      tick={{ fill: "#ffffff" }}
                      axisLine={{ stroke: "#ffffff" }}
                      ticks={[0, 400, 800, 1200, 1600, 2000, 2400, 2800]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#FFD700" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="feedback-chart-card">
                <h2>Punctuality of Bus</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={punctualityData} barSize={45}>
                    <XAxis
                      dataKey="label"
                      tick={<CustomXAxisTick />}
                      axisLine={{ stroke: "#ffffff" }}
                    />
                    <YAxis
                      tick={{ fill: "#ffffff" }}
                      axisLine={{ stroke: "#ffffff" }}
                      ticks={[0, 400, 800, 1200, 1600, 2000, 2400, 2800]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#A3E635" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="feedback-total-card">
                <h2>Total Feedback Received Till Now</h2>
                <div className="feedback-total-number">78954</div>
              </div>

              <div className="feedback-chart-card">
                <h2>Behavior and Attitude of the Bus Driver</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={driverBehaviorData} barSize={45}>
                    <XAxis
                      dataKey="label"
                      tick={<CustomXAxisTick />}
                      axisLine={{ stroke: "#ffffff" }}
                    />
                    <YAxis
                      tick={{ fill: "#ffffff" }}
                      axisLine={{ stroke: "#ffffff" }}
                      ticks={[0, 400, 800, 1200, 1600, 2000, 2400, 2800]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#FF5E5B" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

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

              <div className="feedback-chart-card">
                <h2>Safety and Security on the Bus</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={safetyData} barSize={45}>
                    <XAxis
                      dataKey="label"
                      tick={<CustomXAxisTick />}
                      axisLine={{ stroke: "#ffffff" }}
                    />
                    <YAxis
                      tick={{ fill: "#ffffff" }}
                      axisLine={{ stroke: "#ffffff" }}
                      ticks={[0, 400, 800, 1200, 1600, 2000, 2400, 2800]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#00E5FF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="feedback-charts-row">
              <div className="feedback-chart-wide">
                <h2>Condition and Cleanliness of Bus</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cleanlinessData} barSize={45}>
                    <XAxis
                      dataKey="label"
                      tick={<CustomXAxisTick />}
                      axisLine={{ stroke: "#ffffff" }}
                    />
                    <YAxis
                      tick={{ fill: "#ffffff" }}
                      axisLine={{ stroke: "#ffffff" }}
                      ticks={[0, 400, 800, 1200, 1600, 2000, 2400, 2800]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#B2F2BB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="feedback-chart-wide">
                <h2>What Could Be Improved</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={improvementData} barSize={45}>
                    <XAxis
                      dataKey="category"
                      tick={false}
                      axisLine={{ stroke: "#ffffff" }}
                    />
                    <YAxis
                      tick={{ fill: "#ffffff" }}
                      axisLine={{ stroke: "#ffffff" }}
                      domain={[0, 2500]}
                      ticks={[0, 500, 1000, 1500, 2000, 2500]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#8884d8">
                      {improvementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="improvement-legend">
                  {improvementData.map((item) => (
                    <div key={item.category} className="legend-item">
                      <div
                        className="legend-dot"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="legend-text">{item.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="feedback-chart-wide">
                <h2>What passengers mostly like</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={likeData} barSize={45}>
                    <XAxis
                      dataKey="category"
                      tick={false}
                      axisLine={{ stroke: "#ffffff" }}
                    />
                    <YAxis
                      tick={{ fill: "#ffffff" }}
                      axisLine={{ stroke: "#ffffff" }}
                      domain={[0, 2500]}
                      ticks={[0, 500, 1000, 1500, 2000, 2500]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" fill="#8884d8">
                      {likeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="improvement-legend">
                  {likeData.map((item) => (
                    <div key={item.category} className="legend-item">
                      <div
                        className="legend-dot"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="legend-text">{item.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default FeedbackHome;
