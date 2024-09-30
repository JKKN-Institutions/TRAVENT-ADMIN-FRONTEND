import React, { useState } from "react";
import "./ReviewForm.css";

const ReviewForm = ({
  data,
  onSubmit,
  goToViewInstitutions,
  onBackToSection,
}) => {
  const { institutionData, institutes = [], adminDetails } = data;
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = 2 + institutes.length; // Institution, Institutes, Admin

  // Function to handle the next step
  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  // Function to handle the previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const progressBarWidth = `${((currentStep + 1) / totalSteps) * 100}%`;

  return (
    <div className="review-form-container">
      <div className="form-header">
        <h2>Review Institution Data</h2>
      </div>
      <div className="progress-bar">
        <div
          className="progress-bar-filled"
          style={{ width: progressBarWidth }}
        ></div>
      </div>
      <div className="review-content">
        {currentStep === 0 && (
          <div className="review-section">
            <h3>Institution Details</h3>
            <div className="review-inline-grid">
              <div className="review-item">
                <span className="review-label">Institution Name:</span>{" "}
                {institutionData.institutionName}
              </div>
              <div className="review-item">
                <span className="review-label">State:</span>{" "}
                {institutionData.state}
              </div>
              <div className="review-item">
                <span className="review-label">Founder Name:</span>{" "}
                {institutionData.founderName}
              </div>
              <div className="review-item">
                <span className="review-label">Founder Email:</span>{" "}
                {institutionData.founderEmail}
              </div>
              <div className="review-item">
                <span className="review-label">Founder Contact:</span>{" "}
                {institutionData.founderContactNumber}
              </div>
              <div className="review-item">
                <span className="review-label">Address:</span>{" "}
                {institutionData.address}
              </div>
              <div className="review-item">
                <span className="review-label">Email Domain:</span>{" "}
                {institutionData.emailDomain}
              </div>
            </div>
          </div>
        )}

        {institutes.map(
          (institute, i) =>
            currentStep === i + 1 && (
              <div className="review-section" key={i}>
                <h4>
                  Institute {i + 1}: {institute.instituteName}
                </h4>
                <div className="review-inline-grid">
                  <div className="review-item">
                    <span className="review-label">State:</span>{" "}
                    {institute.state}
                  </div>
                  <div className="review-item">
                    <span className="review-label">Address:</span>{" "}
                    {institute.address}
                  </div>
                  <div className="review-item">
                    <span className="review-label">Principal Name:</span>{" "}
                    {institute.principalName}
                  </div>
                  <div className="review-item">
                    <span className="review-label">Principal Email:</span>{" "}
                    {institute.principalEmail}
                  </div>
                  <div className="review-item">
                    <span className="review-label">Principal Contact:</span>{" "}
                    {institute.principalContactNumber}
                  </div>
                </div>

                {institute.departments.map((department, depIndex) => (
                  <div key={depIndex} className="department-container">
                    <h5>
                      Department {depIndex + 1}: {department.departmentName}
                    </h5>
                    <div className="review-inline-grid">
                      <div className="review-item">
                        <span className="review-label">Department Code:</span>{" "}
                        {department.departmentCode}
                      </div>
                      <div className="years-container">
                        {department.years.map((year, yearIndex) => (
                          <div key={yearIndex} className="year-item">
                            <h6>Year {year.year}:</h6>
                            Sections: {year.sections.join(", ")}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
        )}

        {currentStep === totalSteps - 1 && (
          <div className="review-section">
            <h3>Admin Details</h3>
            <div className="review-inline-grid">
              <div className="review-item">
                <span className="review-label">Admin Name:</span>{" "}
                {adminDetails.adminName}
              </div>
              <div className="review-item">
                <span className="review-label">Admin Email:</span>{" "}
                {adminDetails.email}
              </div>
              <div className="review-item">
                <span className="review-label">Admin Contact:</span>{" "}
                {adminDetails.contactNumber}
              </div>
            </div>
          </div>
        )}

        <div className="review-buttons-container">
          {currentStep > 0 && (
            <button
              type="button"
              className="review-button"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              className="review-button"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <>
              <button
                type="button"
                className="review-button"
                onClick={onSubmit}
              >
                Submit Data
              </button>
              <button
                type="button"
                className="review-button back-button"
                onClick={() => onBackToSection()}
              >
                Back to Forms
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
