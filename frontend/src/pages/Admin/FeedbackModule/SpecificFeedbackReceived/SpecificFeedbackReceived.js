import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../../../components/Shared/Pagination/Pagination"; // Assuming Pagination is in the same path
import "./SpecificFeedbackReceived.css";

const SpecificFeedbackReceived = ({ feedback, onClose, onDeleteFeedback }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [ratingsList, setRatingsList] = useState(feedback?.ratings || []); // Feedback data

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Close the overlay after animation
  };

  // Function to render stars for ratings
  const renderStars = (rating) =>
    [...Array(5)].map((_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={index < rating ? faStarSolid : faStarRegular}
        className={index < rating ? "star-filled" : "star-empty"}
      />
    ));

  // Function to format the createdAt timestamp into date and time
  const formatDateAndTime = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString(); // Format to YYYY-MM-DD
    const formattedTime = date.toLocaleTimeString(); // Format to HH:MM:SS AM/PM
    return { feedbackDate: formattedDate, feedbackTime: formattedTime };
  };

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

  // Delete specific feedback from the ratingsList
  const handleDelete = (feedbackIndex) => {
    const updatedRatingsList = ratingsList.filter(
      (_, index) => index !== feedbackIndex
    );
    setRatingsList(updatedRatingsList);
    onDeleteFeedback(feedbackIndex); // Trigger parent callback to remove feedback
  };

  // Function to handle page change in pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get the feedback items to show based on the current page
  const itemsPerPage = 1; // Show 1 feedback per page
  const totalPages = Math.ceil(ratingsList.length / itemsPerPage);
  const displayedFeedback = ratingsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="specific-feedback-overlay">
      <div
        className={`specific-feedback-container ${isClosing ? "closing" : ""}`}
      >
        <div className="specific-feedback-header">
          <button className="feedback-back-button" onClick={handleClose}>
            <FontAwesomeIcon icon={faArrowLeft} />{" "}
            {feedback?.studentName || "Unknown Student"}
          </button>
        </div>

        <div className="specific-feedback-content">
          {/* Display dynamic feedback */}
          {displayedFeedback.length > 0 ? (
            displayedFeedback.map((rating, index) => {
              // Format the createdAt timestamp for each feedback
              const { feedbackDate, feedbackTime } = formatDateAndTime(
                rating.createdAt
              );

              // Calculate the global index (total offset based on page number)
              const globalIndex = (currentPage - 1) * itemsPerPage + index;

              // Set the dynamic feedback header based on global index
              const feedbackHeader = `Feedback ${globalIndex + 1}`;

              return (
                <div key={globalIndex}>
                  {/* Display dynamic feedback header */}
                  <div className="rating-date-time">
                    <h3>{feedbackHeader}</h3>
                    <div className="rating-date-time-p">
                      <p>
                        <strong>Feedback Date:</strong> {feedbackDate}
                      </p>
                      <p>
                        <strong>Feedback Time:</strong> {feedbackTime}
                      </p>
                    </div>
                  </div>

                  <div className="ratings-items">
                    {/* Display dynamic ratings */}
                    {Object.entries(rating.ratings || {}).map(
                      ([key, value]) => {
                        const label =
                          key.charAt(0).toUpperCase() + key.slice(1);
                        return (
                          <div key={key} className="rating-item">
                            <div className="rating-label">{label}</div>
                            <div className="rating-stars">
                              {renderStars(value)}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  {/* Render Likes, Improvements, and Additional Comments */}
                  {renderFeedbackSection(
                    "What did you like about it?",
                    rating.likes || []
                  )}
                  {renderFeedbackSection(
                    "What could be improved?",
                    rating.improvements || []
                  )}
                  <div className="feedback-section">
                    <h3>Anything else?</h3>
                    <div className="comment-box">
                      <p>
                        {rating.additionalComments || "No additional comments."}
                      </p>
                    </div>
                  </div>

                  {/* Delete Button for Feedback */}
                  <button
                    className="delete-feedback-button"
                    onClick={
                      () => handleDelete(globalIndex) // Use globalIndex for deleting
                    }
                  >
                    <FontAwesomeIcon icon={faTrash} /> Delete Feedback
                  </button>
                </div>
              );
            })
          ) : (
            <p>No ratings available.</p>
          )}
        </div>

        {/* Pagination for Feedback */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SpecificFeedbackReceived;
