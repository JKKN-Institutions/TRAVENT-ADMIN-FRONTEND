import React, { useState, useEffect } from "react";
import "./ViewInstitutions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Shared/Button/Button";
import SearchBar from "../../../components/Shared/SearchBar/SearchBar";
import Loading from "../../../components/Shared/Loading/Loading";
import TopBar from "../../../components/Shared/TopBar/TopBar";
import TableContainer from "../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../components/Shared/Pagination/Pagination";
import ConfirmationModal from "../../../components/Shared/ConfirmationModal/ConfirmationModal";
import ToastNotification, {
  showToast,
} from "../../../components/Shared/ToastNotification/ToastNotification";

import AddInstitutionForm from "./AddInstitutionForm";
import AddInstituteForm from "./AddInstituteForm";
import AddDepartmentForm from "./AddDepartmentForm";
import AddYearForm from "./AddYearForm";
import AddSectionForm from "./AddSectionForm";
import AddAdminForm from "./AddAdminForm";
import ReviewForm from "./ReviewForm";
import SpecificInstitutionDetails from "./SpecificInstitutionDetails";

const ViewInstitutions = ({ toggleSidebar }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Handle search functionality here, filtering institutions based on query
  };

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

  const [currentStep, setCurrentStep] = useState("list");
  const [currentYear, setCurrentYear] = useState(1);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);
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
  const [viewingInstitution, setViewingInstitution] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch institutions data
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/institutions/list"
        );
        if (response.ok) {
          const data = await response.json();
          console.log("jjjj", data);
          setInstitutions(data);
        } else {
          showToast("error", "Failed to fetch institutions.");
        }
      } catch (error) {
        showToast("error", "An error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInstitutions();
  }, []);

  const handleViewInstitution = async (institutionId) => {
    try {
      console.log("Fetching details for institution ID:", institutionId);
      const response = await fetch(
        `http://localhost:3000/api/institutions/${institutionId}`
      );
      if (response.ok) {
        const institutionDetails = await response.json();
        console.log("Institution Details:", institutionDetails);
        setViewingInstitution(institutionDetails);
      } else {
        showToast("error", "Failed to fetch institution details.");
      }
    } catch (error) {
      console.error("Error fetching institution details:", error);
      showToast("error", "An error occurred.");
    }
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentStep("institution");
  };

  // Edit Institution
  const handleEditClick = async () => {
    if (selectedInstitutions.length === 1) {
      const institutionId = selectedInstitutions[0];
      const institutionToEdit = institutions.find(
        (inst) => inst._id === institutionId
      );
      setInstitutionData(institutionToEdit);
      setCurrentStep("institution");
    } else {
      alert("Please select one institution to edit.");
    }
  };

  const handleDeleteClick = () => {
    if (selectedInstitutions.length > 0) {
      setShowDeleteConfirmation(true);
    } else {
      showToast("warn", "Please select at least one institution to delete.");
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedInstitutions.length > 0) {
      try {
        for (const institutionId of selectedInstitutions) {
          const response = await fetch(
            `http://localhost:3000/api/institutions/delete/${institutionId}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            console.error(
              `Failed to delete institution with ID: ${institutionId}`
            );
            showToast(
              "error",
              `Failed to delete institution with ID: ${institutionId}`
            );
          }
        }

        // Update the institutions list after deletion
        setInstitutions((prev) =>
          prev.filter((inst) => !selectedInstitutions.includes(inst._id))
        );

        setSelectedInstitutions([]);
        setShowDeleteConfirmation(false);
        showToast("success", "Institution(s) deleted successfully!");
      } catch (error) {
        console.error("An error occurred while deleting institutions:", error);
        showToast("error", "An error occurred while deleting institutions.");
      }
    } else {
      alert("Please select at least one institution to delete.");
    }
  };

  const handleCancelDelete = () => setShowDeleteConfirmation(false);

  const handleRowSelect = (institutionId) => {
    setSelectedInstitutions((prevSelected) =>
      prevSelected.includes(institutionId)
        ? prevSelected.filter((id) => id !== institutionId)
        : [...prevSelected, institutionId]
    );
  };

  const handleSelectAll = () => {
    if (selectedInstitutions.length === institutions.length) {
      setSelectedInstitutions([]); // Deselect all if everything is already selected
    } else {
      setSelectedInstitutions(institutions.map((inst) => inst.id)); // Select all
    }
  };

  const isSelectAllChecked =
    selectedInstitutions.length === institutions.length;
  const isSelectAllIndeterminate =
    selectedInstitutions.length > 0 &&
    selectedInstitutions.length < institutions.length;

  const handleFormSave = (data) => {
    setInstitutionData(data);
    setCurrentStep("institute");
  };

  // Save institute data, reset form, and move to department step
  const handleInstituteSave = (data) => {
    // Avoid duplicate entries in institutes array
    const isDuplicate = institutes.some(
      (institute) => institute.instituteCode === data.instituteCode
    );

    if (isDuplicate) {
      showToast("warn", "This institute is already added.");
      return;
    }

    setCurrentInstitute(data);
    setInstitutes([...institutes, { ...data, departments: [] }]); // Add new institute
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
      ...institutionData,
      institutes,
      adminDetails: { ...adminData },
    };

    console.log("Data sent to backend:", JSON.stringify(finalData, null, 2));

    try {
      const response = await fetch(
        "http://localhost:3000/api/institutions/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        }
      );

      console.log("Response Status:", response.status);
      console.log("Response OK:", response.ok);

      if (response.ok) {
        showToast("success", "Institution added successfully!");
        setTimeout(() => {
          resetForNewInstitute();
        }, 3000);
      } else {
        const { error } = await response.json();
        showToast("error", `Error: ${error}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      showToast("error", "An error occurred.");
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
      <ToastNotification />
      {isLoading ? (
        <Loading message="Loading Manage Institutions..." />
      ) : (
        <div className="view-institutions-container">
          {currentStep === "list" && (
            <TopBar title="Manage Institutions" toggleSidebar={toggleSidebar} />
          )}

          <main className="view-institutions-main-content">
            {currentStep === "list" ? (
              <>
                <div className="view-institutions-controls">
                  <SearchBar
                    placeholder="Search institutions..."
                    onSearch={handleSearch}
                  />

                  <div className="view-institutions-action-buttons-container">
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
                        selectedInstitutions.length !== 1 ? "disabled" : ""
                      }`}
                      disabled={selectedInstitutions.length !== 1}
                    />
                    <Button
                      label={
                        <>
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </>
                      }
                      onClick={handleDeleteClick}
                      className={`view-institutions-action-button view-institutions-delete-button ${
                        selectedInstitutions.length === 0 ? "disabled" : ""
                      }`}
                      disabled={selectedInstitutions.length === 0}
                    />
                  </div>
                </div>

                <TableContainer
                  headers={[
                    <label className="new-user-requests-custom-checkbox">
                      <input
                        type="checkbox"
                        checked={isSelectAllChecked}
                        ref={(el) =>
                          el && (el.indeterminate = isSelectAllIndeterminate)
                        }
                        onChange={handleSelectAll}
                      />
                      <span className="new-user-requests-checkmark"></span>
                    </label>,
                    "S.No",
                    "Travent Id",
                    "Institute Name",
                    "Institute State",
                    "Departments Count",
                    "Admin Name",
                    "Admin Contact",
                    "Created at",
                    "View",
                  ]}
                  rows={currentInstitutions.map((institution, index) => ({
                    id: institution._id,
                    data: {
                      select: (
                        <label className="new-user-requests-custom-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedInstitutions.includes(
                              institution._id
                            )}
                            onChange={() => handleRowSelect(institution._id)}
                          />
                          <span className="new-user-requests-checkmark"></span>
                        </label>
                      ),
                      sNo: indexOfFirstItem + index + 1,
                      code: institution.institutionId || "N/A",
                      name: institution.institutionName || "N/A",
                      state: institution.state || "N/A",
                      departments: institution.institutes?.length || 0,
                      adminName: institution.adminDetails?.adminName || "N/A", // Safe access
                      adminContact:
                        institution.adminDetails?.contactNumber || "N/A", // Safe access
                      createdAt: institution.createdAt
                        ? new Date(institution.createdAt).toLocaleString()
                        : "N/A",
                      View: (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="view-icon"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row selection if needed
                            handleViewInstitution(institution._id); // Pass the current institution
                          }}
                        />
                      ),
                    },
                  }))}
                  onRowClick={(institution) => handleRowSelect(institution.id)}
                  selectedRowId={selectedInstitutions?.id}
                />

                <Pagination
                  currentPage={currentPage}
                  totalPages={pageNumbers.length}
                  onPageChange={paginate}
                />
              </>
            ) : (
              renderForm()
            )}
          </main>

          {showDeleteConfirmation && (
            <ConfirmationModal
              title="Confirm Deletion"
              message="Are you sure you want to delete this institution?"
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}

          {viewingInstitution && (
            <SpecificInstitutionDetails
              institution={viewingInstitution}
              onClose={() => setViewingInstitution(null)} // Close modal
            />
          )}
        </div>
      )}
    </>
  );
};

export default ViewInstitutions;
