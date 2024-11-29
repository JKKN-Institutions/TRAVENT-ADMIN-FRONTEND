import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faEye } from "@fortawesome/free-solid-svg-icons";
import "./ViewStudents.css";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar"; // Import TopBar
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar"; // Import SearchBar
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer"; // Import TableContainer
import Pagination from "../../../../components/Shared/Pagination/Pagination"; // Import Pagination
import Loading from "../../../../components/Shared/Loading/Loading";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import apiClient from "../../../../apiClient";
import SpecificStudentDetails from "../SpecificStudentDetails/SpecificStudentDetails";

const ViewStudents = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    routeNo: "",
    year: "",
    department: "",
    section: "",
    instituteName: "",
    accountStatus: "",
  });
  const [pendingUsers, setPendingUsers] = useState([]); // State for storing pending users
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [viewStudentDetails, setViewStudentDetails] = useState(null);

  // Fetch the pending users when the component mounts
  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await apiClient.get("/passengers/approved-students");
        // Filter out users with status "approved"
        const approvedUsers = response.data.filter(
          (user) => user.status === "approved" && user.type === "student"
        );
        setPendingUsers(approvedUsers);
      } catch (error) {
        console.error("Error fetching pending users:", error);
        showToast("error", "Failed to fetch pending users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingUsers();
  }, []);

  // Helper function to get unique filter values
  const getUniqueValues = (key) => {
    return [...new Set(pendingUsers.map((student) => student[key]))];
  };

  // Filter students based on search term
  const filteredBySearchTerm = pendingUsers.filter((student) =>
    Object.values(student.basicDetails).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Filter students based on selected filters
  const filteredStudents = filteredBySearchTerm.filter((student) =>
    Object.entries(filters).every(([key, value]) =>
      value
        ? student[key].toString().toLowerCase().includes(value.toLowerCase())
        : true
    )
  );

  const handleSearchChange = (term) => setSearchTerm(term);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const studentColumns = [
    { key: "sNo", label: "S.No" },
    { key: "studentName", label: "Student Name" },
    { key: "regNo", label: "Reg No" },
    { key: "rollNo", label: "Roll No" },
    { key: "year", label: "Year" },
    { key: "department", label: "Department" },
    { key: "section", label: "Section" },
    { key: "instituteName", label: "Institute Name" },
    { key: "routeNo", label: "Route No" },
    { key: "stopName", label: "Stop Name" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "remainingAmulets", label: "Remaining Amulets" },
    { key: "refilledAmulets", label: "Refilled Amulets" },
    { key: "status", label: "Status" },
    { key: "viewDetails", label: "View Details" },
  ];

  const currentItems = filteredStudents.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const handleNoData = (value) => {
    return value === null || value === undefined ? "No data" : value;
  };

  const handleViewDetails = (student) => {
    setViewStudentDetails(student); // Set selected student details to view
  };

  return (
    <div className="view-students-container">
      <TopBar title="View Students" onBack={onBack} backButton={true} />

      <main className="view-students-main-content">
        <div className="view-students-search-filter">
          <SearchBar
            placeholder="Search by Route No or Name"
            onSearch={handleSearchChange}
          />
          <div className="view-students-action-button-container">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faFilter} /> Filter by
                </>
              }
              onClick={() => setShowFilters(!showFilters)}
            />
          </div>
        </div>

        {showFilters && (
          <div className="view-students-filters">
            {[
              "routeNo",
              "year",
              "department",
              "section",
              "instituteName",
              "status",
            ].map((filter) => (
              <select
                key={filter}
                name={filter}
                value={filters[filter]}
                onChange={handleFilterChange}
              >
                <option value="">
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </option>
                {getUniqueValues(filter).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            ))}
          </div>
        )}
        {isLoading ? (
          <Loading message="Loading Students" />
        ) : (
          <TableContainer
            headers={studentColumns.map((col) => col.label)}
            rows={
              currentItems.length > 0
                ? currentItems.map((student, index) => ({
                    id: student.regNo, // Use unique identifier for the row
                    data: studentColumns.map((col) => {
                      // Display S.No based on the index + 1
                      if (col.key === "sNo") {
                        return index + 1; // This is the S.No, based on row index
                      }
                      if (col.key === "studentName") {
                        return student.basicDetails.name || "No data";
                      }
                      if (col.key === "regNo") {
                        return student.studentDetails.regNo || "No data";
                      }
                      if (col.key === "rollNo") {
                        return student.studentDetails.rollNo || "No data";
                      }
                      if (col.key === "year") {
                        return student.studentDetails.year || "No data";
                      }
                      if (col.key === "department") {
                        return student.studentDetails.department || "No data";
                      }
                      if (col.key === "section") {
                        return student.studentDetails.section || "No data";
                      }
                      if (col.key === "instituteName") {
                        return (
                          student.studentDetails.instituteName || "No data"
                        );
                      }
                      if (col.key === "routeNo") {
                        return student.locationDetails.routeNo || "No data";
                      }
                      if (col.key === "stopName") {
                        return student.locationDetails.stopName || "No data";
                      }
                      if (col.key === "pendingFee") {
                        return handleNoData(student.pendingFee); // Handle Pending Fee
                      }
                      if (col.key === "remainingAmulets") {
                        return handleNoData(student.remainingAmulets); // Handle Remaining Amulets
                      }
                      if (col.key === "refilledAmulets") {
                        return handleNoData(student.refilledAmulets); // Handle Refilled Amulets
                      }
                      if (col.key === "status") {
                        return student.accountStatus || "No data";
                      }
                      if (col.key === "viewDetails") {
                        return (
                          <FontAwesomeIcon
                            icon={faEye}
                            className="view-icon"
                            onClick={() => handleViewDetails(student)}
                          />
                        );
                      }
                      return student[col.key] || "No data";
                    }),
                  }))
                : [
                    {
                      id: "no-data",
                      data: { message: "No data available" },
                      colSpan: studentColumns.length,
                    },
                  ]
            }
            selectedRowId={selectedRowId} // Pass the selectedRowId to TableContainer
            setSelectedRowId={setSelectedRowId} // Pass the setSelectedRowId function
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredStudents.length / 10)}
          onPageChange={setCurrentPage}
        />
      </main>
      {viewStudentDetails && (
        <SpecificStudentDetails
          user={viewStudentDetails} // Pass the selected student details
          onClose={() => setViewStudentDetails(null)} // Close the modal or component
        />
      )}
    </div>
  );
};

export default ViewStudents;
