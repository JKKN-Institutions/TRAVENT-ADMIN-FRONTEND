import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./AdminNotificationChatItem.css";

const AdminNotificationChatItem = ({ notification = {}, onClose }) => {
  const [message, setMessage] = useState("");
  const chatBodyRef = useRef(null);

  useEffect(() => {
    console.log(`Marking notification from ${notification.title} as read`);
    const handleGlobalClick = (e) => {
      if (chatBodyRef.current && !chatBodyRef.current.contains(e.target)) {
        console.log("Clicked outside chat body");
      }
    };
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [notification.title]);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="admin-notification-item-chat" ref={chatBodyRef}>
      <header className="admin-chat-header">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="admin-notification-item-back-icon"
          onClick={onClose}
        />
        <div className="admin-chat-avatar">
          {notification.title?.charAt(0) || ""}
        </div>
        <h2>{notification.title || "Untitled"}</h2>
      </header>
      <main className="admin-chat-body">
        <div className="admin-chat-messages">
          <div className="admin-message-timestamp">
            {new Date().toLocaleString()}
          </div>
          <div className="admin-message received">
            {notification.message || "No message"}
          </div>
        </div>
      </main>
      <footer className="admin-chat-footer">
        <input
          type="text"
          className="admin-message-input"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="admin-send-button" onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </footer>
    </div>
  );
};

export default AdminNotificationChatItem;
