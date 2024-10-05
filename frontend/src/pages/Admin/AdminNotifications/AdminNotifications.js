import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import "./AdminNotifications.css";
import AdminNotificationChatItem from "./AdminNotificationChatItem";

const AdminNotifications = ({ toggleSidebar }) => {
  const [systemNotifications, setSystemNotifications] = useState([
    {
      id: 1,
      title: "Schedule Bot",
      message: "Here's the Schedule for 29-07-2024",
      count: 9,
      unread: true,
    },
    {
      id: 2,
      title: "Inventory Keeper",
      message: "Inventory alert! Engine oil is running low.",
      count: 2,
      unread: true,
    },
    {
      id: 3,
      title: "Service Schedule Reminder",
      message: "Reminder! Bus 5 is scheduled for mainten...",
      count: 2,
      unread: false,
    },
    {
      id: 4,
      title: "Fuel Monitor",
      message: "Alert! Bus 4 fuel level is below 25%. Please...",
      count: 2,
      unread: true,
    },
    {
      id: 5,
      title: "Payment Reminder",
      message: "Term 1 ends on September 1. Ensure all St...",
      count: 2,
      unread: false,
    },
    {
      id: 6,
      title: "Live Tracking Monitor",
      message: "Alert! Bus 7 has deviated from its designate...",
      count: 2,
      unread: true,
    },
  ]);

  const [userNotifications, setUserNotifications] = useState([
    {
      id: 1,
      title: "Student - Nisha S",
      message: "Admin, I am requesting to change my route...",
      count: 9,
      unread: true,
    },
    {
      id: 2,
      title: "Staff - Usha K",
      message: "Admin, I am requesting to remove my acco...",
      count: 2,
      unread: false,
    },
  ]);

  const [activeTab, setActiveTab] = useState("system");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const notificationListRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationListRef.current &&
        !notificationListRef.current.contains(event.target)
      ) {
        setSelectedNotification(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUnreadFilterClick = () => {
    setShowUnreadOnly(!showUnreadOnly);
  };

  const filterNotifications = (notifications) => {
    return showUnreadOnly
      ? notifications.filter((notification) => notification.unread)
      : notifications;
  };

  const filteredSystemNotifications = filterNotifications(systemNotifications);
  const filteredUserNotifications = filterNotifications(userNotifications);

  const getUnreadCount = (notifications) => {
    return notifications.filter((n) => n.unread).length;
  };

  const systemUnreadCount = getUnreadCount(systemNotifications);
  const userUnreadCount = getUnreadCount(userNotifications);
  const totalUnreadCount = systemUnreadCount + userUnreadCount;

  const handleNotificationClick = (event, notification) => {
    event.stopPropagation();
    setSelectedNotification(notification);
    markNotificationAsRead(notification);
  };

  const markNotificationAsRead = (notification) => {
    const updateNotifications = (notifications) =>
      notifications.map((n) =>
        n.id === notification.id ? { ...n, unread: false } : n
      );

    if (activeTab === "system") {
      setSystemNotifications(updateNotifications(systemNotifications));
    } else {
      setUserNotifications(updateNotifications(userNotifications));
    }
  };

  const handleCloseChat = () => {
    setSelectedNotification(null);
  };

  const renderUnreadCount = (count) => {
    return count > 0 ? (
      <span className="admin-unread-count">{count}</span>
    ) : null;
  };

  if (selectedNotification) {
    return (
      <AdminNotificationChatItem
        notification={selectedNotification}
        onClose={handleCloseChat}
      />
    );
  }

  return (
    <div className="admin-notifications-container">
      <header className="admin-notifications-top-bar">
        <div className="admin-notifications-menu-icon" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} className="admin-menu-icon" />
        </div>
        <div className="admin-notifications-header">
          <h2>Notifications</h2>
        </div>
      </header>

      <main className="admin-notifications-main-content">
        <div className="admin-notifications-search-bar-container">
          <div className="admin-notifications-search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="admin-search-icon" />
            <input
              type="text"
              className="admin-notifications-search-bar"
              placeholder="Search notifications..."
            />
          </div>
        </div>

        <div className="admin-filter-container">
          <span
            className={`admin-filter-button ${showUnreadOnly ? "active" : ""}`}
            onClick={handleUnreadFilterClick}
          >
            Unread
            {renderUnreadCount(totalUnreadCount)}
          </span>
        </div>

        <div className="admin-notifications-tabs">
          <button
            className={`tab ${activeTab === "system" ? "active" : ""}`}
            onClick={() => setActiveTab("system")}
          >
            System Notifications
            {renderUnreadCount(systemUnreadCount)}
          </button>
          <button
            className={`tab ${activeTab === "user" ? "active" : ""}`}
            onClick={() => setActiveTab("user")}
          >
            User Notifications
            {renderUnreadCount(userUnreadCount)}
          </button>
        </div>

        <div className="admin-notifications-list" ref={notificationListRef}>
          {(activeTab === "system"
            ? filteredSystemNotifications
            : filteredUserNotifications
          ).map((notification) => (
            <div
              key={notification.id}
              className={`admin-notification-item ${
                notification.unread ? "unread" : ""
              }`}
              onClick={(event) => handleNotificationClick(event, notification)}
            >
              <div className="admin-notification-avatar">
                {notification.title.charAt(0)}
              </div>
              <div className="admin-notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
              </div>
              <div className="admin-notification-meta">
                {notification.unread && notification.count > 0 && (
                  <div className="admin-notification-count">
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

export default AdminNotifications;
