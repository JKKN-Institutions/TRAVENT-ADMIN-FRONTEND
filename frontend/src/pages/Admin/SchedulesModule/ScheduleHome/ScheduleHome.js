import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./ScheduleHome.css";
import ScheduledPassengers from "../ScheduledPassengers/ScheduledPassengers";
import GeneratedPlan from "../GeneratedPlan/GeneratedPlan";

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

  const usageCategories = [
    { name: "Morning", value: 18, color: "#3498db" },
    { name: "Evening", value: 65, color: "#2ecc71" },
    { name: "Both", value: 6800, color: "#f1c40f" },
    { name: "Absent", value: 3, color: "#e74c3c" },
    { name: "Not Selected", value: 1, color: "#e84393" },
  ];

  const institutionWiseSchedulings = [
    { name: "JKKN Engineering", count: 1805, color: "#3498db" },
    { name: "JKKN Dental College", count: 2065, color: "#2ecc71" },
    { name: "JKKN College of Pharmacy", count: 2309, color: "#e74c3c" },
    { name: "JKKN College of Arts", count: 637, color: "#f1c40f" },
    { name: "JKKN Arts & Science", count: 1235, color: "#9b59b6" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const ToggleSwitch = ({ id, checked, onChange, label }) => {
    return (
      <div className="setting-item">
        <label htmlFor={id}>{label}</label>
        <div className="toggle-switch">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
          />
          <span className="slider"></span>
        </div>
      </div>
    );
  };

  const handleToggle = (setter) => {
    return () => {
      setter((prevState) => {
        const newState = !prevState;
        console.log("Toggling state:", newState);
        return newState;
      });
    };
  };

  const handleShowScheduledPassengers = () => {
    setShowScheduledPassengers(true);
  };

  const handleBackFromScheduledPassengers = () => {
    setShowScheduledPassengers(false);
  };

  const handleShowGeneratedPlan = () => {
    setShowGeneratedPlan(true);
  };

  const handleBackFromGeneratedPlan = () => {
    setShowGeneratedPlan(false);
  };

  if (showScheduledPassengers) {
    return <ScheduledPassengers onBack={handleBackFromScheduledPassengers} />;
  }

  if (showGeneratedPlan) {
    return <GeneratedPlan onBack={handleBackFromGeneratedPlan} />;
  }

  // if (isLoading) {
  //   return (
  //     <div className="loading-container">
  //       <div className="loading-spinner"></div>
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  return (
    <>
      {isLoading ? (
        <div className="schedules-loading-container">
          <div className="loading-spinner"></div>
          <p>Loading schedules...</p>
        </div>
      ) : (
        <div className="schedules-container">
          <header className="schedules-top-bar">
            <div className="schedules-menu-icon" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <h1>Schedules</h1>
          </header>
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
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={usageCategories}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                        >
                          {usageCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="usage-categories-legend">
                    {usageCategories.map((category) => (
                      <div key={category.name} className="legend-item">
                        <span
                          className="legend-color"
                          style={{ backgroundColor: category.color }}
                        ></span>
                        <span className="legend-label">{category.name}</span>
                        <span className="legend-value">{category.value}</span>
                      </div>
                    ))}
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
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={institutionWiseSchedulings}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <XAxis dataKey="name" tick={false} />
                        <YAxis width={40} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="count" fill="#8884d8" barSize={40}>
                          {institutionWiseSchedulings.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="institution-legend">
                    {institutionWiseSchedulings.map((institution) => (
                      <div key={institution.name} className="legend-item">
                        <span
                          className="legend-color"
                          style={{ backgroundColor: institution.color }}
                        ></span>
                        <span className="legend-label">{institution.name}</span>
                        <span className="legend-value">
                          {institution.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="schedules-settings">
              <h2>Settings</h2>
              <div className="settings-grid">
                <div className="settings-column">
                  <ToggleSwitch
                    id="auto-planning"
                    checked={autoPlanning}
                    onChange={handleToggle(setAutoPlanning)}
                    label="Enable Auto Planning and Scheduling"
                  />
                  <p className="setting-description">
                    Generates the plan automatically on the specified time and
                    updates everyone with their schedule
                  </p>
                  <div className="setting-item">
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
                <div className="settings-divider"></div>
                <div className="settings-column">
                  <ToggleSwitch
                    id="reminder-notification"
                    checked={reminderNotification}
                    onChange={handleToggle(setReminderNotification)}
                    label="Reminder Notification"
                  />
                  <div className="setting-item">
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
                  <ToggleSwitch
                    id="dont-allow-tomorrow"
                    checked={dontAllowTomorrow}
                    onChange={handleToggle(setDontAllowTomorrow)}
                    label="Don't Allow Scheduling On Tomorrow"
                  />
                  <p className="setting-description">
                    Not Allowing the users to schedule for tomorrow due to any
                    reason like holiday etc.,
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
