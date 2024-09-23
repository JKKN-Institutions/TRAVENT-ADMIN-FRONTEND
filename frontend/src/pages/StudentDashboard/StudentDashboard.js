import React, { useState, useEffect } from "react";
import "./StudentDashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Pay from "../../components/Student/Pay/Pay";
import Scan from "../../components/Student/Scan/Scan";
import Report from "../../components/Student/Report/Report";
import Profile from "../../components/Student/Profile/Profile";
import YourProfile from "../../components/Student/Profile/YourProfile/YourProfile";
import BottomNav from "../../components/Shared/BottomNav/BottomNav";  // Import the new BottomNav component

const StudentDashboard = () => {
  const [currentWeekDates, setCurrentWeekDates] = useState([]);
  const [activeComponent, setActiveComponent] = useState("Home");
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMonthStart, setCurrentMonthStart] = useState(new Date());
  const [showYourProfile, setShowYourProfile] = useState(false);

  useEffect(() => {
    getCurrentWeek(currentWeekStart);
  }, [currentWeekStart]);

  const getCurrentWeek = (startDate) => {
    const current = new Date(startDate);
    const first = current.getDate() - current.getDay() + 1;
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(current.setDate(first + i));
      weekDates.push(day);
    }
    setCurrentWeekDates(weekDates);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const daysArray = [];

    // Previous month's dates
    for (let i = firstDay; i > 0; i--) {
      daysArray.push({
        day: daysInPrevMonth - i + 1,
        currentMonth: false,
        prevMonth: true,
        nextMonth: false,
      });
    }

    // Current month's dates
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({
        day: i,
        currentMonth: true,
        prevMonth: false,
        nextMonth: false,
      });
    }

    // Next month's dates to fill the remaining days of the week
    const remainingDays = (7 - (daysArray.length % 7)) % 7;
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push({
        day: i,
        currentMonth: false,
        prevMonth: false,
        nextMonth: true,
      });
    }

    return daysArray;
  };

  const today = new Date();

  const renderComponent = () => {
    if (showYourProfile) {
      return <YourProfile goBack={() => setShowYourProfile(false)} />;
    }

    switch (activeComponent) {
      case "Pay":
        return <Pay />;
      case "Scan":
        return <Scan />;
      case "Report":
        return <Report />;
      case "Profile":
        return <Profile setShowYourProfile={setShowYourProfile} goDashboard={() => setActiveComponent("Home")} />;
      default:
        return (
          <>
            <header className="dashboard-header">
              <h1>HOME</h1>
              <FontAwesomeIcon icon={faBell} className="bell-icon" />
            </header>

            <div className="dashboard-info">
              <div className="route-info">
                <h2>17</h2>
                <p>ROUTE</p>
              </div>
              <div className="time-info">
                <h2>
                  08:30<span>AM</span>
                </h2>
                <p>TIME</p>
              </div>
              <div className="date-info">
                <h2>25/06</h2>
                <p>DATE</p>
              </div>
            </div>
            <div className="location-container">
              <p className="location">
                From<span>Seelanayakkan Patti Bye Pass</span>
              </p>
              <p className="location">
                To<span>JKKN Group of Institutions</span>
              </p>
            </div>
            <div className="schedules-container">
              <div className={`schedules ${isExpanded ? "hide" : ""}`}>
                <h3>SCHEDULES</h3>
                <p
                  className="all-records"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Shrink" : "Expand"}
                </p>
                <div className="week-calendar">
                  <div className="month-year">
                    <span>
                      {new Date(currentWeekStart).toLocaleString("default", {
                        month: "long",
                      })}{" "}
                      {new Date(currentWeekStart).getFullYear()}
                    </span>
                  </div>
                  <div className="weekday-dates">
                    <div className="weekdays">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                        <span key={index}>{day}</span>
                      ))}
                    </div>
                    <div className="dates-arrow">
                      <img
                        src="./uploads/previous-arrow.png"
                        className="arrow-icon"
                        onClick={() =>
                          setCurrentWeekStart(
                            new Date(
                              currentWeekStart.setDate(
                                currentWeekStart.getDate() - 7
                              )
                            )
                          )
                        }
                      />
                      <div className="dates">
                        {currentWeekDates.map((date, index) => (
                          <span
                            key={index}
                            className={`date ${
                              date.getDate() === today.getDate() &&
                              date.getMonth() === today.getMonth()
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            {date.getDate()}
                          </span>
                        ))}
                      </div>
                      <img
                        src="./uploads/next-arrow.png"
                        className="arrow-icon"
                        onClick={() =>
                          setCurrentWeekStart(
                            new Date(
                              currentWeekStart.setDate(
                                currentWeekStart.getDate() + 7
                              )
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`expanded-schedules ${isExpanded ? "" : "hide"}`}>
                <h3>SCHEDULES</h3>
                <p
                  className="all-records"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? "Shrink" : "Expand"}
                </p>
                <div className="monthly-calendar">
                  <div className="month-year-expanded">
                    <img
                      src="./uploads/previous-arrow.png"
                      className="arrow-icon"
                      onClick={() =>
                        setCurrentMonthStart(
                          new Date(
                            currentMonthStart.setMonth(
                              currentMonthStart.getMonth() - 1
                            )
                          )
                        )
                      }
                    />
                    <span>
                      {new Date(currentMonthStart).toLocaleString("default", {
                        month: "long",
                      })}{" "}
                      {new Date(currentMonthStart).getFullYear()}
                    </span>
                    <img
                      src="./uploads/next-arrow.png"
                      className="arrow-icon"
                      onClick={() =>
                        setCurrentMonthStart(
                          new Date(
                            currentMonthStart.setMonth(
                              currentMonthStart.getMonth() + 1
                            )
                          )
                        )
                      }
                    />
                  </div>
                  <div className="weekday-dates">
                    <div className="expanded-weekdays">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                        <span key={index}>{day}</span>
                      ))}
                    </div>
                  </div>
                  <div className="expanded-calendar-grid">
                    {getDaysInMonth(currentMonthStart).map((dateObj, index) => (
                      <span
                        key={index}
                        className={`date ${
                          dateObj.currentMonth
                            ? dateObj.day === today.getDate() &&
                              currentMonthStart.getMonth() === today.getMonth()
                              ? "active"
                              : "inactive"
                            : dateObj.prevMonth
                            ? "prev-month"
                            : "next-month"
                        }`}
                      >
                        {dateObj.day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="features">
              <h3>ACCESS FEATURES</h3>
              <div className="feature-cards">
                <div className="feature-card">
                  <div className="feature-card-container">
                    <div className="feature-text">
                      <h4>TRACK YOUR BUS IN REAL TIME</h4>
                      <p>PORTIGO</p>
                      <h1>MAPS</h1>
                    </div>
                    <div className="map-icon"></div>
                  </div>
                  <div className="feature-button">
                    <button>START</button>
                  </div>
                </div>
                <div className="report-feature-card">
                  <div className="feature-card-container">
                    <div className="feature-text">
                      <h4>VIEW YOUR TRAVEL LOG</h4>
                      <p>PORTIGO</p>
                      <h1>REPORT</h1>
                    </div>
                    <div className="report-icon"></div>
                  </div>
                  <div className="feature-button">
                    <button>START</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">{renderComponent()}</div>
      {!showYourProfile && (
        <BottomNav activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      )}
    </div>
  );
};

export default StudentDashboard;
