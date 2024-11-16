import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./ScheduleHome.css";
import ScheduledPassengers from "../ScheduledPassengers/ScheduledPassengers";
import GeneratedPlan from "../GeneratedPlan/GeneratedPlan";
import Loading from "../../../../components/Shared/Loading/Loading";
import TopBar from "../../../../components/Shared/TopBar/TopBar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

const ScheduleHome = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [autoPlanning, setAutoPlanning] = useState(true);
  const [schedulingClosingTime, setSchedulingClosingTime] = useState("19:30");
  const [reminderNotification, setReminderNotification] = useState(true);
  const [notificationSendingTime, setNotificationSendingTime] =
    useState("19:40");
  const [dontAllowTomorrow, setDontAllowTomorrow] = useState(false);
  const [showScheduledPassengers, setShowScheduledPassengers] = useState(false);
  const [showGeneratedPlan, setShowGeneratedPlan] = useState(false);

  const totalPassengers = 8958;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Pie chart data and options
  const usageCategoriesData = {
    labels: ["Morning", "Evening", "Both", "Absent", "Not Selected"],
    datasets: [
      {
        data: [1800, 2356, 3800, 1003, 900],
        backgroundColor: [
          "rgba(52, 152, 219, 1)",
          "rgba(46, 204, 113, 1)",
          "rgba(241, 196, 15, 1)",
          "rgba(231, 76, 60, 1)",
          "rgba(232, 67, 147, 1)",
        ],
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: true },
      legend: {
        position: "bottom",
        labels: { color: "#ccc" },
      },
    },
  };

  // Bar chart data and options
  const institutionWiseSchedulingsData = {
    labels: [
      "JKKN Engineering",
      "JKKN Dental College",
      "JKKN College of Pharmacy",
      "JKKN College of Arts",
      "JKKN Arts & Science",
    ],
    datasets: [
      {
        label: "Institution Wise Schedulings",
        data: [1805, 2065, 2309, 637, 1235],
        backgroundColor: [
          "rgba(52, 152, 219, 1)",
          "rgba(46, 204, 113, 1)",
          "rgba(231, 76, 60, 1)",
          "rgba(241, 196, 15, 1)",
          "rgba(155, 89, 182, 1)",
        ],
        borderColor: ["rgba(255, 255, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: { ticks: { color: "#ccc" } },
      y: { ticks: { color: "#ccc" } },
    },
  };

  const handleShowScheduledPassengers = () => setShowScheduledPassengers(true);
  const handleBackFromScheduledPassengers = () =>
    setShowScheduledPassengers(false);
  const handleShowGeneratedPlan = () => setShowGeneratedPlan(true);
  const handleBackFromGeneratedPlan = () => setShowGeneratedPlan(false);

  if (showScheduledPassengers) {
    return <ScheduledPassengers onBack={handleBackFromScheduledPassengers} />;
  }

  if (showGeneratedPlan) {
    return <GeneratedPlan onBack={handleBackFromGeneratedPlan} />;
  }

  return (
    <>
      {isLoading ? (
        <Loading message="Loading Schedules..." />
      ) : (
        <div className="schedules-container">
          <TopBar title="Schedules" toggleSidebar={toggleSidebar} />
          <main className="schedules-main-content">
            <div className="schedules-stats-row">
              <div className="schedules-column">
                <div className="schedules-stat-card total-passengers">
                  <h2>Total Schedules</h2>
                  <div className="total-schedules-info">
                    <p className="total-schedules">{totalPassengers}</p>
                    <p className="total-schedules-text">
                      Passengers Scheduled Totally
                    </p>
                  </div>
                </div>
                <div className="schedule-home-action-card">
                  <h3>Scheduled Passengers</h3>
                  <p>Shows the list of passengers scheduled for their travel</p>
                  <div className="schedule-home-action-footer">
                    <div
                      className="schedule-home-action-icon-container"
                      onClick={handleShowScheduledPassengers}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="schedule-home-action-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="schedules-column">
                <div className="schedules-stat-card categories-usage">
                  <h3 className="usage-categories-title">
                    Categories of Usage
                  </h3>
                  <div className="usage-categories-chart">
                    <Pie data={usageCategoriesData} options={pieChartOptions} />
                  </div>
                </div>
                <div className="schedule-home-action-card">
                  <h3>Generated Plan</h3>
                  <p>Displays the plan generated for the scheduled students</p>
                  <div className="schedule-home-action-footer">
                    <div
                      className="schedule-home-action-icon-container"
                      onClick={handleShowGeneratedPlan}
                    >
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="schedule-home-action-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="schedules-column">
                <div className="schedules-stat-card institution-wise">
                  <h2>Institution Wise Schedulings</h2>
                  <div className="institution-chart">
                    <Bar
                      data={institutionWiseSchedulingsData}
                      options={barChartOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="schedules-settings">
              <h2>Settings</h2>
              <div className="schedules-settings-grid">
                <div className="schedules-settings-column">
                  <div className="schedules-setting-item">
                    <label htmlFor="auto-planning">
                      Enable Auto Planning and Scheduling
                    </label>
                    <Switch
                      onChange={setAutoPlanning}
                      checked={autoPlanning}
                      onColor="#11a8fd"
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </div>
                  <p className="schedules-setting-description">
                    Generates the plan automatically on the specified time and
                    updates everyone with their schedule
                  </p>
                  <div className="schedules-setting-item">
                    <label htmlFor="closing-time">
                      Scheduling Closing Time
                    </label>
                    <input
                      type="time"
                      id="closing-time"
                      value={schedulingClosingTime}
                      onChange={(e) => setSchedulingClosingTime(e.target.value)}
                    />
                  </div>
                  <div className="change-time-btn-container">
                    <button className="change-time-btn">
                      Change Schedule Closing Time
                    </button>
                  </div>
                </div>
                <div className="schedules-settings-divider"></div>
                <div className="schedules-settings-column">
                  <div className="schedules-setting-item">
                    <label htmlFor="reminder-notification">
                      Reminder Notification
                    </label>
                    <Switch
                      onChange={setReminderNotification}
                      checked={reminderNotification}
                      onColor="#11a8fd"
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </div>
                  <div className="schedules-setting-item">
                    <label htmlFor="notification-time">
                      Notification Sending Time
                    </label>
                    <input
                      type="time"
                      id="notification-time"
                      value={notificationSendingTime}
                      onChange={(e) =>
                        setNotificationSendingTime(e.target.value)
                      }
                    />
                  </div>
                  <div className="change-time-btn-container">
                    <button className="change-time-btn">
                      Change Notification Sending Time
                    </button>
                  </div>
                  <div className="schedules-setting-item">
                    <label htmlFor="dont-allow-tomorrow">
                      Don't Allow Scheduling On Tomorrow
                    </label>
                    <Switch
                      onChange={setDontAllowTomorrow}
                      checked={dontAllowTomorrow}
                      onColor="#11a8fd"
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </div>
                  <p className="schedules-setting-description">
                    Not allowing the users to schedule for tomorrow due to any
                    reason like holiday, etc.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default ScheduleHome;
