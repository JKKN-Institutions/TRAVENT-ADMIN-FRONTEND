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
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

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

  const handleUnreadFilterClick = () => {
    setShowUnreadOnly(!showUnreadOnly);
  };

  const filteredNotifications = showUnreadOnly
    ? notifications.filter((notification) => notification.unread)
    : notifications;

  const getUnreadCount = () => {
    return notifications.filter((n) => n.unread).length;
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
    <div className="app-admin-notifications-container">
      <header className="app-admin-notifications-top-bar">
        <div className="app-admin-notifications-menu-icon">
          <FontAwesomeIcon
            icon={faBars}
            className="app-admin-menu-icon"
            onClick={toggleSidebar}
          />
        </div>
        <div className="app-admin-notifications-header">
          <h2>Notifications</h2>
        </div>
      </header>

      <main className="app-admin-notifications-main-content">
        <div className="app-admin-notifications-search-bar-container">
          <div className="app-admin-notifications-search-input-wrapper">
            <FontAwesomeIcon
              icon={faSearch}
              className="app-admin-search-icon"
            />
            <input
              type="text"
              className="app-admin-notifications-search-bar"
              placeholder="Search notifications..."
            />
          </div>
        </div>

        <div className="app-admin-filter-container">
          <span
            className={`app-admin-filter-button ${
              showUnreadOnly ? "active" : ""
            }`}
            onClick={handleUnreadFilterClick}
          >
            Unread
            {getUnreadCount() > 0 && (
              <span className="app-admin-unread-count">{getUnreadCount()}</span>
            )}
          </span>
        </div>

        <div className="app-admin-notifications-list">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`app-admin-notification-item ${
                notification.unread ? "unread" : ""
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="app-admin-notification-avatar">
                {notification.sender.charAt(0)}
              </div>
              <div className="app-admin-notification-content">
                <h3>{notification.sender}</h3>
                <p>{notification.message}</p>
              </div>
              <div className="app-admin-notification-meta">
                <span className="app-admin-notification-time">
                  {notification.time}
                </span>
                {notification.count > 0 && (
                  <div className="app-admin-notification-count">
                    {notification.count}
                  </div>
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
