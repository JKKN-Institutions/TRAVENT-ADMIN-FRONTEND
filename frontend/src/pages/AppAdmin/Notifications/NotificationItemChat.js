import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./NotificationItemChat.css";

const NotificationItemChat = ({ sender, onClose }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(`Marking messages from ${sender} as read`);
  }, [sender]);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="admin-notification-item-chat">
      <header className="admin-chat-header">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="admin-notification-item-back-icon"
          onClick={onClose}
        />
        <div className="admin-chat-avatar">{sender.charAt(0)}</div>
        <h2>{sender}</h2>
      </header>
      <main className="admin-chat-body">
        <div className="admin-chat-messages">
          <div className="admin-message-timestamp">
            Thursday, 20 June 2024, 05:00 PM
          </div>
          <div className="admin-message received">
            Your subscription ends next month. Kindly subscribe to any of the
            plan to continue using Travent
          </div>
          <div className="admin-message sent">
            Thank you for the reminder. I'll renew my subscription soon.
          </div>
          <div className="admin-message received">
            Great! Let me know if you need any assistance with the renewal
            process.
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

export default NotificationItemChat;
