import React, { useState } from "react";
import "./ReviewForm.css";
import ToastNotification, {
  showToast,
} from "../../../components/Shared/ToastNotification/ToastNotification";
import ConfirmationModal from "../../../components/Shared/ConfirmationModal/ConfirmationModal";

const ReviewForm = ({
  data,
  onSubmit,
  goToViewInstitutions,
  onBackToSection,
}) => {
  const { institutionData, institutes = [], adminDetails } = data;
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State to show the confirmation modal
  const [loading, setLoading] = useState(false);

  const totalSteps = 2 + institutes.length; // Institution, Institutes, Admin

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleFinalSubmit = () => {
    // Show confirmation modal before submitting the form
    setShowConfirmationModal(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      setLoading(true);
      console.log("Final Data to Submit:", data);

      // Await the onSubmit function to ensure toast is shown at the correct time
      await onSubmit();
      setTimeout(() => {
        console.log("Navigating to View Institutions...");
        goToViewInstitutions(); // Or any other logic you want to execute after the delay
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      showToast("error", "Submission failed. Please try again.");
    } finally {
      setLoading(false);
      setShowConfirmationModal(false); // Close modal after submission
    }
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  const progressBarWidth = `${((currentStep + 1) / totalSteps) * 100}%`;

  const renderReviewItem = (label, value) => (
    <div className="review-item">
      <span className="review-label">{label}:</span>
      <span className="review-value">{value}</span>
    </div>
  );

  return (
    <div className="review-form-container">
      <ToastNotification /> {/* Toast container for notifications */}
      <div className="review-form-header">
        <h2>Review Institution Data</h2>
        <div className="review-form-progress-indicator">
          <div className="review-form-progress-text">
            Step {currentStep + 1} of {totalSteps}
          </div>
          <div className="review-form-progress-bar">
            <div
              className="review-form-progress-bar-filled"
              style={{ width: progressBarWidth }}
            ></div>
          </div>
        </div>
      </div>
      <div className="review-content">
        {currentStep === 0 && (
          <div className="review-section">
            <h3>Institution Details</h3>
            <div className="review-grid">
              {renderReviewItem(
                "Institution Name",
                institutionData.institutionName
              )}
              {renderReviewItem("State", institutionData.state)}
              {renderReviewItem("Founder Name", institutionData.founderName)}
              {renderReviewItem("Founder Email", institutionData.founderEmail)}
              {renderReviewItem(
                "Founder Contact",
                institutionData.founderContactNumber
              )}
              {renderReviewItem("Address", institutionData.address)}
              {renderReviewItem("Contact 1", institutionData.contact1)}
              {renderReviewItem("Contact 2", institutionData.contact2)}
              {renderReviewItem("Email Domain", institutionData.emailDomain)}
            </div>
          </div>
        )}

        {institutes.map(
          (institute, i) =>
            currentStep === i + 1 && (
              <div className="review-section" key={i}>
                <h3>Institute {i + 1}</h3>
                <div className="review-grid">
                  {renderReviewItem("Institute Code", institute.instituteCode)}
                  {renderReviewItem("Institute Name", institute.instituteName)}
                  {renderReviewItem("State", institute.state)}
                  {renderReviewItem("Address", institute.address)}
                  {renderReviewItem("Principal Name", institute.principalName)}
                  {renderReviewItem(
                    "Principal Email",
                    institute.principalEmail
                  )}
                  {renderReviewItem(
                    "Principal Contact",
                    institute.principalContactNumber
                  )}
                </div>

                {institute.departments.map((department, depIndex) => (
                  <div
                    key={depIndex}
                    className="review-form-department-container"
                  >
                    <h4>Department {depIndex + 1}</h4>
                    <div className="review-grid">
                      {renderReviewItem(
                        "Department Code",
                        department.departmentCode
                      )}
                      {renderReviewItem(
                        "Department Name",
                        department.departmentName
                      )}
                      {renderReviewItem("HOD Name", department.hodName)}
                      {renderReviewItem("HOD Email", department.hodEmail)}
                      {renderReviewItem(
                        "HOD Contact",
                        department.hodContactNumber
                      )}
                    </div>
                    <div className="review-form-years-container">
                      <h5>Years and Sections</h5>
                      {department.years.map((year, yearIndex) => (
                        <div key={yearIndex} className="review-form-year-item">
                          <span className="review-form-year-label">
                            Year {year.year}:
                          </span>
                          <span className="review-form-year-sections">
                            Sections: {year.sections.join(", ")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
        )}

        {currentStep === totalSteps - 1 && (
          <div className="review-section">
            <h3>Admin Details</h3>
            <div className="review-grid">
              {renderReviewItem("Admin Name", adminDetails.adminName)}
              {renderReviewItem("Admin Email", adminDetails.email)}
              {renderReviewItem("Admin Contact", adminDetails.contactNumber)}
              {renderReviewItem("Admin Password", adminDetails.password)}
            </div>
          </div>
        )}

        <div className="review-buttons-container">
          <button
            onClick={handlePrevious}
            className="review-button secondary"
            disabled={currentStep === 0}
          >
            Previous
          </button>
          {currentStep === totalSteps - 1 ? (
            <button
              onClick={handleFinalSubmit}
              className="review-button primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button onClick={handleNext} className="review-button primary">
              Next
            </button>
          )}
        </div>
        {showConfirmationModal && (
          <ConfirmationModal
            onConfirm={handleConfirmSubmit}
            onCancel={handleCancel}
            title="Confirm Submission"
            message="Are you sure you want to proceed with submitting this data and assigning the trial subscription?"
            confirmText="Yes"
            cancelText="No"
          />
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
