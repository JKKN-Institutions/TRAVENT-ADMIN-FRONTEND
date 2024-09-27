import React, { useState } from "react";
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
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
  };

  const handleCloseChat = () => {
    setSelectedNotification(null);
  };

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
          <span className="filter-button active">All</span>
          <span className="filter-button unread">
            Unread
            <span className="unread-count">
              {notifications.filter((n) => n.unread).length}
            </span>
          </span>
          <span className="filter-button read">Read</span>
        </div>

        <div className="notifications-list">
          {notifications.map((notification) => (
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
                {notification.count > 1 && (
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
