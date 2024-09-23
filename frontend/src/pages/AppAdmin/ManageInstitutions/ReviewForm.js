import React from "react";
import "./ReviewForm.css";

const ReviewForm = ({ data, onSubmit }) => {
  const { institutionData, institutes, adminDetails } = data;

  return (
    <div className="review-form-container">
      <h2>Review Institution Data</h2>
      <h3>Institution Details:</h3>
      <p>
        <strong>Name:</strong> {institutionData.institutionName}
      </p>
      <p>
        <strong>State:</strong> {institutionData.state}
      </p>

      {institutes.map((institute, i) => (
        <div key={i}>
          <h3>Institute {i + 1}:</h3>
          <p>
            <strong>Name:</strong> {institute.instituteName}
          </p>
          {institute.departments.map((department, j) => (
            <div key={j}>
              <h4>Department {j + 1}:</h4>
              <p>
                <strong>Name:</strong> {department.departmentName}
              </p>
              {department.years.map((year, k) => (
                <div key={k}>
                  <h5>Year {year.year}:</h5>
                  <p>
                    <strong>Sections:</strong>{" "}
                    {year.sections.split(",").join(", ")}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      <h3>Admin Details:</h3>
      <p>
        <strong>Name:</strong> {adminDetails.adminName}
      </p>
      <p>
        <strong>Email:</strong> {adminDetails.email}
      </p>
      <p>
        <strong>Contact Number:</strong> {adminDetails.contactNumber}
      </p>

      <button onClick={onSubmit} className="form-button">
        Submit Data
      </button>
    </div>
  );
};

export default ReviewForm;
