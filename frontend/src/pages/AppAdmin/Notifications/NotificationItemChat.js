import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./NotificationItemChat.css";

const NotificationItemChat = ({ sender, onClose }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="notification-item-chat">
      <header className="chat-header">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="notification-item-back-icon"
          onClick={onClose}
        />
        <div className="chat-avatar">{sender.charAt(0)}</div>
        <h2>{sender}</h2>
      </header>
      <main className="chat-body">
        <div className="chat-messages">
          <div className="message-timestamp">
            Thursday, 20 June 2024, 05:00 PM
          </div>
          <div className="message received">
            Your subscription ends next month. Kindly subscribe to any of the
            plan to continue using Travent
          </div>
          <div className="message sent">
            Thank you for the reminder. I'll renew my subscription soon.
          </div>
          <div className="message received">
            Great! Let me know if you need any assistance with the renewal
            process.
          </div>
        </div>
      </main>
      <footer className="chat-footer">
        <input
          type="text"
          className="message-input"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="send-button" onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </footer>
    </div>
  );
};

export default NotificationItemChat;
