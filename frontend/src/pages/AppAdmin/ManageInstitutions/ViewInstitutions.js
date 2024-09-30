import React, { useState } from "react";
import "./ViewInstitutions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPlus,
  faEdit,
  faTrash,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import AddInstitutionForm from "./AddInstitutionForm";
import AddInstituteForm from "./AddInstituteForm";
import AddDepartmentForm from "./AddDepartmentForm";
import AddYearForm from "./AddYearForm";
import AddSectionForm from "./AddSectionForm";
import AddAdminForm from "./AddAdminForm";
import ReviewForm from "./ReviewForm";

const ViewInstitutions = ({ toggleSidebar, onAdd }) => {
  const [institutions, setInstitutions] = useState([
    {
      id: 1,
      code: "1234",
      name: "JKKN College of Arts & Science",
      state: "Tamil Nadu",
      departments: 10,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 2,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 3,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 4,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 5,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 6,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 7,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 8,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 9,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 10,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
  ]);

  // const [isAddingInstitution, setIsAddingInstitution] = useState(false);
  // const [isAddingInstitute, setIsAddingInstitute] = useState(false);
  // const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  // const [isAddingYear, setIsAddingYear] = useState(false);

  const [currentStep, setCurrentStep] = useState("list");
  const [currentYear, setCurrentYear] = useState(1);

  const [institutionData, setInstitutionData] = useState(null);
  const [institutes, setInstitutes] = useState([]);
  const [currentInstitute, setCurrentInstitute] = useState(null);
  const [departments, setDepartments] = useState([]); // Array to store multiple departments
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [yearData, setYearData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  // const [savedSections, setSavedSections] = useState([]);
  const [adminData, setAdminData] = useState(null); // Store admin details

  const handleAddClick = () => setCurrentStep("institution");

  const handleFormSave = (data) => {
    setInstitutionData(data);
    setCurrentStep("institute");
  };

  // Save institute data, reset form, and move to department step
  const handleInstituteSave = (data) => {
    setCurrentInstitute(data);
    setInstitutes([...institutes, { ...data, departments: [] }]); // Add institute to list
    setCurrentStep("department");
  };

  // Save department data, reset form, and move to year step
  const handleDepartmentSave = (data) => {
    setCurrentDepartment(data);
    const updatedInstitutes = [...institutes];
    const lastInstituteIndex = updatedInstitutes.length - 1;
    updatedInstitutes[lastInstituteIndex].departments.push({
      ...data,
      years: [],
    });
    setInstitutes(updatedInstitutes);
    setCurrentStep("year");
  };

  // Save year data and move to section step
  const handleYearSave = (data) => {
    setYearData(data);
    setCurrentStep("section");
    setCurrentYear(1);
    setSectionData([]);
  };

  // Save section data
  const handleSectionSave = (sectionList) => {
    const updatedSectionData = [
      ...sectionData,
      { year: currentYear, sections: sectionList },
    ];

    setSectionData(updatedSectionData);

    // Move to the next year if current year < total years, else move to departmentOrFinish
    if (currentYear < yearData.yearCount) {
      setCurrentYear(currentYear + 1); // Move to the next year
    } else {
      // Update the last department with year and section data
      const updatedInstitutes = [...institutes];
      const lastInstituteIndex = updatedInstitutes.length - 1;
      const lastDepartmentIndex =
        updatedInstitutes[lastInstituteIndex].departments.length - 1;

      updatedInstitutes[lastInstituteIndex].departments[
        lastDepartmentIndex
      ].years = updatedSectionData;

      setInstitutes(updatedInstitutes);

      setCurrentStep("departmentOrFinish"); // Proceed to the next step
    }
  };

  const handleDepartmentOrFinish = (choice) => {
    if (choice === "department") {
      setCurrentStep("department");
      setCurrentDepartment(null);
      setYearData([]);
      setSectionData([]);
    } else if (choice === "institute") {
      setCurrentStep("institute");
      setCurrentInstitute(null);
      setCurrentDepartment(null);
      setYearData([]);
      setSectionData([]);
    } else if (choice === "finish") {
      setCurrentStep("admin");
    }
  };

  const handleSaveAdminDetails = (data) => {
    setAdminData(data);
    setCurrentStep("review");
  };

  const handleReviewSubmit = async () => {
    const finalData = {
      institutionData,
      institutes,
      adminDetails: adminData,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/institutions/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      );

      if (response.ok) {
        alert("Institution data saved successfully!");
        resetForNewInstitute();
        setCurrentStep("list");
      } else {
        const result = await response.json();
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert("An error occurred while saving the data.");
      console.error(error);
    }
  };

  const resetForNewInstitute = () => {
    setInstitutionData(null);
    setInstitutes([]);
    setDepartments([]);
    setCurrentInstitute(null);
    setCurrentDepartment(null);
    setYearData([]);
    setSectionData([]);
    setAdminData(null);
    setCurrentStep("list");
  };

  const handleBackToList = () => {
    resetForNewInstitute();
    setCurrentStep("list");
  };

  const handleBackToInstitution = () => {
    setCurrentStep("institution");
  };

  const handleBackToDepartmentOrFinish = () => {
    setCurrentStep("departmentOrFinish");
  };

  // Function to switch back to the list view
  const goToViewInstitutions = () => {
    resetForNewInstitute();
    setCurrentStep("list"); // This sets the step to the main list view
  };

  const renderForm = () => {
    switch (currentStep) {
      case "institution":
        return (
          <AddInstitutionForm
            onSave={handleFormSave}
            onBack={resetForNewInstitute}
            initialData={institutionData}
          />
        );
      case "institute":
        return (
          <AddInstituteForm
            onSave={handleInstituteSave}
            onBack={() => setCurrentStep("institution")}
            institutionData={institutionData}
            initialData={currentInstitute}
          />
        );
      case "department":
        return (
          <AddDepartmentForm
            onSave={handleDepartmentSave}
            onBack={() => setCurrentStep("institute")}
            instituteData={currentInstitute}
            initialData={currentDepartment}
          />
        );
      case "year":
        return (
          <AddYearForm
            onSave={handleYearSave}
            onBack={() => setCurrentStep("department")}
            departmentData={currentDepartment}
            initialData={yearData}
          />
        );
      case "section":
        return (
          <AddSectionForm
            year={currentYear}
            onSave={handleSectionSave}
            onBack={() =>
              currentYear > 1
                ? setCurrentYear(currentYear - 1)
                : setCurrentStep("year")
            }
            initialData={sectionData}
            yearData={yearData}
          />
        );
      case "departmentOrFinish":
        return (
          <div className="department-or-finish-container">
            <h3>
              Would you like to add another department or finish with this
              institute?
            </h3>

            {/* Display the section data for each year */}
            <div className="year-section-details">
              <h4>Sections Added by Year</h4>
              {yearData.years && yearData.years.length > 0 ? (
                <ul className="year-section-list">
                  {yearData.years.map((year, index) => (
                    <li key={index} className="year-section-item">
                      <strong>Year {year}:</strong>{" "}
                      {sectionData[index]?.sections.join(", ") ||
                        "No sections added"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No sections added yet.</p>
              )}
            </div>

            <div className="button-group">
              <button
                className="form-button secondary"
                onClick={() => handleDepartmentOrFinish("department")}
              >
                Add Another Department
              </button>
              <button
                className="form-button secondary"
                onClick={() => handleDepartmentOrFinish("institute")}
              >
                Add Another Institute
              </button>
              <button
                className="form-button primary"
                onClick={() => handleDepartmentOrFinish("finish")}
              >
                Finish and Next
              </button>
            </div>
          </div>
        );

      case "admin":
        return (
          <AddAdminForm
            onSave={handleSaveAdminDetails}
            onBack={handleBackToDepartmentOrFinish}
          />
        );
      case "review":
        return (
          <ReviewForm
            data={{
              institutionData,
              institutes,
              adminDetails: adminData,
            }}
            onSubmit={handleReviewSubmit}
            goToViewInstitutions={resetForNewInstitute}
            onBackToSection={handleBackToInstitution}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="view-institutions-container">
        {currentStep === "list" && (
          <header className="view-institutions-top-bar">
            <div className="view-institutions-menu-icon">
              <FontAwesomeIcon
                icon={faBars}
                className="menu-icon"
                onClick={toggleSidebar}
              />
            </div>
            <div className="view-institutions-header">
              <h2>Manage Institutions</h2>
            </div>
          </header>
        )}

        <main className="view-institutions-main-content">
          {currentStep === "list" ? (
            <>
              <div className="view-institutions-search-bar-container">
                <div className="search-input-wrapper">
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                  <input
                    type="text"
                    className="view-institutions-search-bar"
                    placeholder="Search institutions..."
                  />
                </div>
              </div>

              <div className="action-buttons-container">
                <button
                  className="view-institutions-action-button view-institutions-add-button"
                  onClick={handleAddClick}
                >
                  <FontAwesomeIcon icon={faPlus} /> Add
                </button>
                <button className="view-institutions-action-button view-institutions-edit-button">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button className="view-institutions-action-button view-institutions-delete-button">
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </div>

              <div className="appadmin-table-container">
                <table className="view-institutions-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Institution Code</th>
                      <th>Institute Name</th>
                      <th>Institute State</th>
                      <th>Departments Count</th>
                      <th>Total Routes</th>
                      <th>Total Buses</th>
                      <th>Admin Name</th>
                      <th>Admin Contact</th>
                      <th>Created at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {institutions.map((institution, index) => (
                      <tr key={institution.id}>
                        <td>{index + 1}</td>
                        <td>{institution.code}</td>
                        <td>{institution.name}</td>
                        <td>{institution.state}</td>
                        <td>{institution.departments}</td>
                        <td>{institution.routes}</td>
                        <td>{institution.buses}</td>
                        <td>{institution.adminName}</td>
                        <td>{institution.adminContact}</td>
                        <td>{institution.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            renderForm()
          )}
        </main>
      </div>
    </>
  );
};

export default ViewInstitutions;
