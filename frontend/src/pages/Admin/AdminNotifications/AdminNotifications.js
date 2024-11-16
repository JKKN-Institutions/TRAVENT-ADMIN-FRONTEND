import React, { useState, useRef, useEffect } from "react";
import "./AdminNotifications.css";
import AdminNotificationChatItem from "./AdminNotificationChatItem";
import Loading from "../../../components/Shared/Loading/Loading";
import TopBar from "../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../components/Shared/SearchBar/SearchBar";

const AdminNotifications = ({ toggleSidebar }) => {
  const [notifications, setNotifications] = useState({
    system: [
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
    ],
    user: [
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
    ],
  });

  const [activeTab, setActiveTab] = useState("system");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const notificationListRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUnreadFilterClick = () => setShowUnreadOnly((prev) => !prev);

  const filteredNotifications = (type) => {
    return notifications[type].filter(
      (n) =>
        (!showUnreadOnly || n.unread) &&
        n.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getUnreadCount = (type) =>
    notifications[type].filter((n) => n.unread).length;

  const markNotificationAsRead = (notificationId) => {
    setNotifications((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((n) =>
        n.id === notificationId ? { ...n, unread: false } : n
      ),
    }));
  };

  const handleNotificationClick = (event, notification) => {
    event.stopPropagation();
    setSelectedNotification(notification);
    markNotificationAsRead(notification.id);
  };

  const renderTabButton = (type, label) => (
    <button
      className={`tab ${activeTab === type ? "active" : ""}`}
      onClick={() => setActiveTab(type)}
    >
      {label}
      {getUnreadCount(type) > 0 && (
        <span className="admin-unread-count">{getUnreadCount(type)}</span>
      )}
    </button>
  );

  if (selectedNotification) {
    return (
      <AdminNotificationChatItem
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading message="Loading Notifications..." />
      ) : (
        <div className="admin-notifications-container">
          <TopBar title="Notifications" toggleSidebar={toggleSidebar} />
          <main className="admin-notifications-main-content">
            <div className="admin-notifications-search-bar-container">
              <SearchBar
                placeholder="Search notifications..."
                onSearch={setSearchTerm}
              />
            </div>
            <div className="admin-filter-container">
              <span
                className={`admin-filter-button ${
                  showUnreadOnly ? "active" : ""
                }`}
                onClick={handleUnreadFilterClick}
              >
                Unread
                {getUnreadCount("system") + getUnreadCount("user") > 0 && (
                  <span className="admin-unread-count">
                    {getUnreadCount("system") + getUnreadCount("user")}
                  </span>
                )}
              </span>
            </div>
            <div className="admin-notifications-tabs">
              {renderTabButton("system", "System Notifications")}
              {renderTabButton("user", "User Notifications")}
            </div>
            <div className="admin-notifications-list" ref={notificationListRef}>
              {filteredNotifications(activeTab).map((notification) => (
                <div
                  key={notification.id}
                  className={`admin-notification-item ${
                    notification.unread ? "unread" : ""
                  }`}
                  onClick={(event) =>
                    handleNotificationClick(event, notification)
                  }
                >
                  <div className="admin-notification-avatar">
                    {notification.title.charAt(0)}
                  </div>
                  <div className="admin-notification-content">
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                  </div>
                  {notification.unread && notification.count > 0 && (
                    <div className="admin-notification-count">
                      {notification.count}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default AdminNotifications;
