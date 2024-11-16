import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import "./SpecificFeedbackReceived.css";

const SpecificFeedbackReceived = ({ feedback, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={index < rating ? faStarSolid : faStarRegular}
        className={index < rating ? "star-filled" : "star-empty"}
      />
    ));

  const renderFeedbackSection = (title, items) => (
    <div className="feedback-section">
      <h3>{title}</h3>
      <div className="tags-container">
        {items.map((item, index) => (
          <span key={index} className="tag">
            {item}
          </span>
        ))}
      </div>
    </div>
  );

  const ratings = [
    { label: "Overall Satisfaction", value: 4 },
    { label: "Punctuality of the Bus", value: 4 },
    { label: "Condition and Cleanliness of the Bus", value: 4 },
    { label: "Behavior and Attitude of the Bus Driver", value: 4 },
    { label: "Safety and Security on the Bus", value: 4 },
  ];

  const likes = [
    "SMOOTH RIDE",
    "FAST TRAVEL",
    "CLEANLINESS",
    "CONVENIENT",
    "GOOD MUSIC SYSTEM",
  ];
  const improvements = [
    "CLEANLINESS",
    "SEATING",
    "OVERCROWDING",
    "NO SERVICE DURING SPECIAL EVENTS",
  ];

  return (
    <div className="specific-feedback-overlay">
      <div
        className={`specific-feedback-container ${isClosing ? "closing" : ""}`}
      >
        <div className="specific-feedback-header">
          <button className="feedback-back-button" onClick={handleClose}>
            <FontAwesomeIcon icon={faArrowLeft} />{" "}
            {feedback?.studentName || feedback?.staffName}
          </button>
        </div>

        <div className="specific-feedback-content">
          <div className="ratings-section">
            {ratings.map((rating, index) => (
              <div key={index} className="rating-item">
                <div className="rating-label">{rating.label}</div>
                <div className="rating-stars">{renderStars(rating.value)}</div>
              </div>
            ))}
          </div>

          {renderFeedbackSection("What did you like about it?", likes)}
          {renderFeedbackSection("What could be improved?", improvements)}

          <div className="feedback-section">
            <h3>Anything else?</h3>
            <div className="comment-box">
              <p>All good</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificFeedbackReceived;
