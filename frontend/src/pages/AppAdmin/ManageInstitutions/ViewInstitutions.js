import React, { useState, useEffect } from "react";
import "./ViewInstitutions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import AddInstitutionForm from "./AddInstitutionForm";
import AddInstituteForm from "./AddInstituteForm";
import AddDepartmentForm from "./AddDepartmentForm";
import AddYearForm from "./AddYearForm";
import AddSectionForm from "./AddSectionForm";
import AddAdminForm from "./AddAdminForm";
import ReviewForm from "./ReviewForm";
import Button from "../../../components/Shared/Button/Button";

const ViewInstitutions = ({ toggleSidebar, onAdd }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [institutionData, setInstitutionData] = useState(null);
  const [institutes, setInstitutes] = useState([]);
  const [currentInstitute, setCurrentInstitute] = useState(null);
  const [departments, setDepartments] = useState([]); // Array to store multiple departments
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [yearData, setYearData] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  // const [savedSections, setSavedSections] = useState([]);
  const [adminData, setAdminData] = useState(null); // Store admin details

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentStep("institution");
  };

  const handleEditClick = () => {
    if (selectedInstitution) {
      setIsEditing(true);
      setInstitutionData(selectedInstitution);
      setCurrentStep("institution");
    }
  };

  const handleDeleteClick = () => {
    if (selectedInstitution) {
      setShowDeleteConfirmation(true);
    }
  };

  const handleConfirmDelete = () => {
    setInstitutions(
      institutions.filter((inst) => inst.id !== selectedInstitution.id)
    );
    setSelectedInstitution(null);
    setShowDeleteConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleRowClick = (institution) => {
    setSelectedInstitution(
      selectedInstitution?.id === institution.id ? null : institution
    );
  };

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
    const updatedSectionData = [...sectionData];

    // Find the index for the current year, if it exists
    const existingYearIndex = updatedSectionData.findIndex(
      (section) => section.year === currentYear
    );

    // If the year exists, update it with the new sections
    if (existingYearIndex > -1) {
      updatedSectionData[existingYearIndex].sections = sectionList;
    } else {
      // If the year doesn't exist, add a new entry
      updatedSectionData.push({
        year: currentYear,
        sections: sectionList,
      });
    }

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
        "https://travent-admin-server.vercel.app/api/institutions/add",
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

  const handleBackToSection = () => {
    setCurrentStep("section");
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
            isEditing={isEditing}
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
            onBack={() => setCurrentStep("year")}
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
              {yearData && sectionData.length > 0 ? (
                <ul className="year-section-list">
                  {sectionData.map((yearSection, index) => (
                    <li key={index} className="year-section-item">
                      <strong>Year {yearSection.year}:</strong>{" "}
                      {yearSection.sections.join(", ")}
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
            onBackToSection={handleBackToList}
          />
        );
      default:
        return null;
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInstitutions = institutions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(institutions.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {isLoading ? (
        <div className="schedules-loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Manage Institutions...</p>
        </div>
      ) : (
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
                  <Button
                    label={
                      <>
                        <FontAwesomeIcon icon={faPlus} /> Add
                      </>
                    }
                    onClick={handleAddClick}
                    className="view-institutions-action-button view-institutions-add-button"
                  />
                  <Button
                    label={
                      <>
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </>
                    }
                    onClick={handleEditClick}
                    className={`view-institutions-action-button view-institutions-edit-button ${
                      !selectedInstitution ? "disabled" : ""
                    }`}
                    disabled={!selectedInstitution}
                  />
                  <Button
                    label={
                      <>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </>
                    }
                    onClick={handleDeleteClick}
                    className={`view-institutions-action-button view-institutions-delete-button ${
                      !selectedInstitution ? "disabled" : ""
                    }`}
                    disabled={!selectedInstitution}
                  />
                </div>

                <div className="view-institutions-table-container">
                  <div className="view-institutions-table-wrapper">
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
                        {currentInstitutions.map((institution, index) => (
                          <tr
                            key={institution.id}
                            onClick={() => handleRowClick(institution)}
                            className={
                              selectedInstitution?.id === institution.id
                                ? "selected"
                                : ""
                            }
                          >
                            <td>{indexOfFirstItem + index + 1}</td>
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
                </div>

                <div className="view-institutions-pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="view-institutions-pagination-button"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`view-institutions-pagination-button ${
                        currentPage === number ? "active" : ""
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                    className="view-institutions-pagination-button"
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </>
            ) : (
              renderForm()
            )}
          </main>

          {showDeleteConfirmation && (
            <div className="view-institutions-delete-confirmation-modal">
              <div className="view-institutions-delete-confirmation-content">
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete this institution?</p>
                <div className="view-institutions-delete-confirmation-buttons">
                  <button
                    onClick={handleCancelDelete}
                    className="view-institutions-cancel-delete"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="view-institutions-confirm-delete"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewInstitutions;
