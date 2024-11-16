import React, { useState, useEffect } from "react";
import NotificationItemChat from "./NotificationItemChat";
import TopBar from "../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../components/Shared/SearchBar/SearchBar";
import Loading from "../../../components/Shared/Loading/Loading";
import "./Notifications.css";

const Notifications = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      sender: "App Admin",
      message: "Your subscription ends next month. Kindly...",
      unread: true,
      time: "2h ago",
      count: 1, // Specific badge count for new messages in chat
    },
    {
      id: 2,
      sender: "System",
      message: "New feature update available. Check it out!",
      unread: true,
      time: "1d ago",
      count: 1, // Count for received messages to show in badge
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const totalUnread = notifications.reduce(
      (acc, notif) => acc + (notif.unread ? 1 : 0),
      0
    );
    setUnreadCount(totalUnread);
  }, [notifications]);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    markAsRead(notification.id);
  };

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id
          ? { ...notif, unread: false, count: 0 } // Reset count for clicked notifications
          : notif
      )
    );
  };

  const handleUnreadFilterClick = () => setShowUnreadOnly(!showUnreadOnly);

  const filteredNotifications = notifications
    .filter((notif) => (showUnreadOnly ? notif.unread : true))
    .filter((notif) =>
      notif.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return selectedNotification ? (
    <NotificationItemChat
      sender={selectedNotification.sender}
      onClose={() => setSelectedNotification(null)}
    />
  ) : isLoading ? (
    <Loading message="Loading Notifications..." />
  ) : (
    <div className="app-admin-notifications-container">
      <TopBar title="Notifications" toggleSidebar={toggleSidebar} />
      <main className="app-admin-notifications-main-content">
        <div className="app-admin-notifications-search-bar-container">
          <SearchBar
            placeholder="Search notifications..."
            onSearch={setSearchQuery}
          />
        </div>

        <div className="app-admin-filter-container">
          <span
            className={`app-admin-filter-button ${
              showUnreadOnly ? "active" : ""
            }`}
            onClick={handleUnreadFilterClick}
          >
            Unread
            {unreadCount > 0 && (
              <span className="app-admin-unread-count">{unreadCount}</span>
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
