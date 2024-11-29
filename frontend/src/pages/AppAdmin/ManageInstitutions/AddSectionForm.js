import React, { useState, useEffect } from "react";
import "./AddSectionForm.css";
import FormInput from "../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../components/Shared/ActionButtons/ActionButtons";

const AddSectionForm = ({ year, onSave, onBack, initialData, yearData }) => {
  const sectionOptions = ["A", "B", "C", "D", "E", "F"];
  const [selectedSection, setSelectedSection] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Load saved section data for this year if available, otherwise reset
    if (initialData) {
      const savedSection = initialData.find(
        (data) => data.year === year
      )?.sections;
      if (savedSection) {
        setSelectedSection(savedSection[savedSection.length - 1]);
      } else {
        setSelectedSection("");
      }
    } else {
      setSelectedSection("");
    }
  }, [year, initialData]);

  const validateForm = () => {
    const formErrors = {};
    if (!selectedSection) {
      formErrors.section = "Please select a section.";
    }
    return formErrors;
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setErrors({}); // Clear errors on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      const selectedSections = sectionOptions.slice(
        0,
        sectionOptions.indexOf(selectedSection) + 1
      );
      console.log(`Section Data for Year ${year} Submitted:`, selectedSections);
      onSave(selectedSections);
    }
  };

  return (
    <div className="section-form-container">
      <div className="section-form-content">
        <div className="section-left-side">
          <h3>Year Details</h3>
          {yearData && yearData.yearCount ? (
            <ul className="year-details">
              <li>
                <strong>Year Count:</strong> {yearData.yearCount}
              </li>
              <li>
                <strong>Years:</strong> {yearData.years.join(", ")}
              </li>
            </ul>
          ) : (
            <p>No year details available.</p>
          )}
        </div>
        <div className="section-vertical-line"></div>
        <div className="section-right-side">
          <div className="section-form-header">
            <h2>Select Section for Year {year}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="section-form-grid">
              <div className="full-width">
                <FormInput
                  id="sectionSelect"
                  name="section"
                  type="select"
                  placeholder="Select Section"
                  value={selectedSection}
                  onChange={handleSectionChange}
                  error={errors.section}
                  options={sectionOptions.map((option) => ({
                    value: option,
                    label: option,
                  }))}
                />
              </div>
            </div>
            <ActionButtons
              onCancel={onBack}
              onSubmit={handleSubmit}
              submitText={`Save Section for Year ${year}`}
              cancelText="Previous"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSectionForm;
