import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
import apiClient from "../../../../apiClient";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";

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
  const [scheduleOpeningTime, setScheduleOpeningTime] = useState("");
  const [scheduleClosingTime, setScheduleClosingTime] = useState("");
  const [notificationSendingTime, setNotificationSendingTime] = useState("");
  const [routePlanGenerationTime, setRoutePlanGenerationTime] = useState("");
  const [showScheduledPassengers, setShowScheduledPassengers] = useState(false);
  const [showGeneratedPlan, setShowGeneratedPlan] = useState(false);

  const [selectedWorkingDays, setSelectedWorkingDays] = useState([]);
  const [showWorkingDaysCalendar, setShowWorkingDaysCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const totalPassengers = 8958;

  const institutionId = localStorage.getItem("institutionId");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Fetch saved settings when component mounts
  useEffect(() => {
    const fetchScheduleSettings = async () => {
      try {
        const response = await apiClient.get(
          `/adminSchedules/get-schedule-settings/${institutionId}`
        );
        const data = response.data;

        // If settings exist, update state
        if (data) {
          setScheduleOpeningTime(data.scheduleOpeningTime);
          setScheduleClosingTime(data.scheduleClosingTime);
          setNotificationSendingTime(data.notificationSendingTime);
          setRoutePlanGenerationTime(data.routePlanGenerationTime);
          // Convert selectedWorkingDays from strings to Date objects if necessary
          if (data.selectedWorkingDays) {
            const formattedSelectedDays = data.selectedWorkingDays.map(
              (day) => {
                const [dayOfMonth, month, year] = day.split("-");
                return new Date(`${year}-${month}-${dayOfMonth}`); // Correct format: yyyy-mm-dd
              }
            );
            setSelectedWorkingDays(formattedSelectedDays);
            console.log("Formatted selected days:", formattedSelectedDays);
            console.log("Selected working days:", data.selectedWorkingDays);
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching schedule settings:", error);
        setIsLoading(false);
      }
    };

    fetchScheduleSettings();
  }, [institutionId]);

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
    return (
      <ScheduledPassengers
        onBack={handleBackFromScheduledPassengers}
        institutionId={institutionId}
      />
    );
  }

  if (showGeneratedPlan) {
    return <GeneratedPlan onBack={handleBackFromGeneratedPlan} />;
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateSelected = (date) => {
    if (!date) return false; // Ensure the date is valid
    return selectedWorkingDays.some((selectedDay) => {
      return selectedDay && selectedDay.toDateString() === date.toDateString();
    });
  };

  const handleDayClick = (date) => {
    if (!date || isNaN(date)) return; // Avoid invalid dates
    const newSelectedDays = isDateSelected(date)
      ? selectedWorkingDays.filter(
          (selectedDay) => selectedDay.toDateString() !== date.toDateString()
        )
      : [...selectedWorkingDays, date];

    setSelectedWorkingDays(newSelectedDays);
  };

  const toggleWorkingDaysCalendar = () => {
    setShowWorkingDaysCalendar(!showWorkingDaysCalendar);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const renderCalendar = () => {
    const days = getDaysInMonth(currentMonth);
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <div className="working-days-calendar">
        <div className="calendar-navigation">
          <button className="calendar-nav-btn" onClick={handlePreviousMonth}>
            &lt;
          </button>
          <div className="calendar-month-year">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>
          <button className="calendar-nav-btn" onClick={handleNextMonth}>
            &gt;
          </button>
        </div>
        <div className="calendar-header">
          {weekDays.map((day) => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-grid">
          {days.map((date, index) => (
            <div
              key={index}
              className={`calendar-day ${date ? "calendar-day-active" : ""} ${
                isDateSelected(date) ? "calendar-day-selected" : ""
              }`}
              onClick={() => date && handleDayClick(date)}
            >
              {date ? date.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Function to handle saving schedule settings
  const handleSaveScheduleSettings = async () => {
    // Validation check
    if (
      !scheduleOpeningTime ||
      !scheduleClosingTime ||
      !notificationSendingTime ||
      !routePlanGenerationTime ||
      selectedWorkingDays.length === 0
    ) {
      alert("Please fill all the required fields!");
      return;
    }

    const payload = {
      institutionId: institutionId,
      scheduleOpeningTime,
      scheduleClosingTime,
      notificationSendingTime,
      selectedWorkingDays,
      routePlanGenerationTime,
    };

    try {
      const response = await apiClient.post(
        "/adminSchedules/add-schedule-settings",
        payload
      );
      console.log(response.data.message); // Handle success message
      // Show toast for success
      showToast("success", response.data.message);
    } catch (error) {
      console.error("Error saving schedule settings:", error);
      showToast(
        "error",
        "Error saving schedule settings. Please try again later."
      );
    }
  };

  return (
    <>
      <ToastNotification />
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
                  <div className="settings-section">
                    <h3 className="settings-section-title">
                      Select Working Days
                    </h3>
                    <div className="schedules-setting-item">
                      <label htmlFor="notification-time">
                        Monthly Calendar
                      </label>

                      <button
                        className="change-time-btn working-days-btn"
                        onClick={toggleWorkingDaysCalendar}
                      >
                        Select Working Days
                      </button>
                    </div>
                    {showWorkingDaysCalendar && (
                      <div className="working-days-overlay">
                        <div className="working-days-modal">
                          <h4>Select Working Days</h4>
                          {renderCalendar()}
                          <div className="working-days-actions">
                            <button
                              className="change-time-btn"
                              onClick={toggleWorkingDaysCalendar}
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <p className="schedules-setting-description">
                      Choose the working days from the calendar to manage
                      scheduling accordingly.
                    </p>
                  </div>
                  <div className="settings-section">
                    <h3 className="settings-section-title">
                      Schedule Remainder Settings
                    </h3>

                    <div className="schedules-setting-item">
                      <label htmlFor="notification-time">
                        Notification Time
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

                    <p className="schedules-setting-description">
                      Set the time for schedule reminder notifications to be
                      sent.
                    </p>
                  </div>
                </div>

                <div className="schedules-settings-divider"></div>

                <div className="schedules-settings-column">
                  <div className="settings-section">
                    <h3 className="settings-section-title">
                      Scheduling Time Configuration
                    </h3>
                    <div className="schedules-setting-item">
                      <label htmlFor="start-time">Start Time</label>
                      <input
                        type="time"
                        id="start-time"
                        value={scheduleOpeningTime}
                        onChange={(e) => setScheduleOpeningTime(e.target.value)}
                      />
                    </div>
                    <div className="schedules-setting-item">
                      <label htmlFor="closing-time">Closing Time</label>
                      <input
                        type="time"
                        id="closing-time"
                        value={scheduleClosingTime}
                        onChange={(e) => setScheduleClosingTime(e.target.value)}
                      />
                    </div>

                    <p className="schedules-setting-description">
                      Define the start and closing time for scheduling
                      activities.
                    </p>
                  </div>

                  <div className="settings-section">
                    <h3 className="settings-section-title">
                      Route Plan Generation
                    </h3>
                    <div className="schedules-setting-item">
                      <label htmlFor="route-plan-time">Generation Time</label>
                      <input
                        type="time"
                        id="route-plan-time"
                        value={routePlanGenerationTime}
                        onChange={(e) =>
                          setRoutePlanGenerationTime(e.target.value)
                        }
                      />
                    </div>

                    <p className="schedules-setting-description">
                      Set the time when the route plan will be generated
                      automatically.
                    </p>
                  </div>
                  <div className="schedules-setting-item">
                    <button
                      className="change-time-btn"
                      onClick={handleSaveScheduleSettings}
                    >
                      Submit
                    </button>
                  </div>
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
