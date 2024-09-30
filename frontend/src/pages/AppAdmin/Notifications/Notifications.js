import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import NotificationItemChat from "./NotificationItemChat";
import "./Notifications.css";

const Notifications = ({ toggleSidebar }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      sender: "App Admin",
      message: "Your subscription ends next month. Kindly...",
      unread: true,
      time: "2h ago",
      count: 3,
    },
    {
      id: 2,
      sender: "System",
      message: "New feature update available. Check it out!",
      unread: false,
      time: "1d ago",
      count: 1,
    },
    {
      id: 3,
      sender: "Support Team",
      message: "Your ticket has been resolved. Please review...",
      unread: true,
      time: "3h ago",
      count: 1,
    },
    {
      id: 4,
      sender: "Marketing",
      message: "Don't miss out on our latest promotion!",
      unread: false,
      time: "2d ago",
      count: 1,
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    markAsRead(notification.id);
  };

  const handleCloseChat = () => {
    setSelectedNotification(null);
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, unread: false, count: 0 } : notif
      )
    );
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === "unread") return notification.unread;
    if (activeFilter === "read") return !notification.unread;
    return true; // "all" filter
  });

  // Simulate receiving a new message
  const simulateNewMessage = () => {
    const randomId = Math.floor(Math.random() * notifications.length) + 1;
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === randomId
          ? { ...notif, unread: true, count: notif.count + 1, time: "Just now" }
          : notif
      )
    );
  };

  useEffect(() => {
    // Simulate receiving a new message every 30 seconds
    const interval = setInterval(simulateNewMessage, 30000);
    return () => clearInterval(interval);
  }, []);

  if (selectedNotification) {
    return (
      <NotificationItemChat
        sender={selectedNotification.sender}
        onClose={handleCloseChat}
      />
    );
  }

  return (
    <div className="notifications-container">
      <header className="notifications-top-bar">
        <div className="notifications-menu-icon">
          <FontAwesomeIcon
            icon={faBars}
            className="menu-icon"
            onClick={toggleSidebar}
          />
        </div>
        <div className="notifications-header">
          <h2>Notifications</h2>
        </div>
      </header>

      <main className="notifications-main-content">
        <div className="notifications-search-bar-container">
          <div className="notifications-search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="notifications-search-bar"
              placeholder="Search notifications..."
            />
          </div>
        </div>

        <div className="filter-container">
          <span
            className={`filter-button ${
              activeFilter === "all" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("all")}
          >
            All
          </span>
          <span
            className={`filter-button ${
              activeFilter === "unread" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("unread")}
          >
            Unread
            <span className="unread-count">
              {notifications.filter((n) => n.unread).length}
            </span>
          </span>
          <span
            className={`filter-button ${
              activeFilter === "read" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("read")}
          >
            Read
          </span>
        </div>

        <div className="notifications-list">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                notification.unread ? "unread" : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="notification-avatar">
                {notification.sender.charAt(0)}
              </div>
              <div className="notification-content">
                <h3>{notification.sender}</h3>
                <p>{notification.message}</p>
              </div>
              <div className="notification-meta">
                <span className="notification-time">{notification.time}</span>
                {notification.count > 0 && (
                  <div className="notification-count">{notification.count}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
