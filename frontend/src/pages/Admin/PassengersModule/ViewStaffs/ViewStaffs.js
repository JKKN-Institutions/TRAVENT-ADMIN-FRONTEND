import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faEye } from "@fortawesome/free-solid-svg-icons";
import "./ViewStaffs.css";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar"; // Import TopBar
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar"; // Import SearchBar
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer"; // Import TableContainer
import Pagination from "../../../../components/Shared/Pagination/Pagination"; // Import Pagination
import Loading from "../../../../components/Shared/Loading/Loading";
import apiClient from "../../../../apiClient";
import SpecificStudentDetails from "../SpecificStudentDetails/SpecificStudentDetails";

const ViewStaffs = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    routeNo: "",
    department: "",
    designation: "",
    instituteName: "",
    status: "",
  });
  const [staffsData, setStaffsData] = useState([]); // Store staff data from the backend
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [viewStaffDetails, setViewStaffDetails] = useState(null);

  // Fetch the approved staffs when the component mounts
  useEffect(() => {
    const fetchApprovedStaffs = async () => {
      try {
        const response = await apiClient.get("/passengers/approved-staffs");
        setStaffsData(response.data);
      } catch (error) {
        console.error("Error fetching approved staffs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovedStaffs();
  }, []);

  // Helper function to get unique filter values
  const getUniqueValues = (key) => {
    return [...new Set(staffsData.map((staff) => staff[key]))];
  };

  // Filter staff based on search term
  const filteredBySearchTerm = staffsData.filter((staff) =>
    Object.values(staff.basicDetails).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Filter staff based on selected filters
  const filteredStaffs = filteredBySearchTerm.filter((staff) =>
    Object.entries(filters).every(([key, value]) =>
      value
        ? staff[key].toString().toLowerCase().includes(value.toLowerCase())
        : true
    )
  );

  const handleSearchChange = (term) => setSearchTerm(term);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const staffColumns = [
    { key: "sNo", label: "S.No" },
    { key: "staffName", label: "Staff Name" },
    { key: "empId", label: "Emp ID" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "instituteName", label: "Institute Name" },
    { key: "routeNo", label: "Route No" },
    { key: "stopName", label: "Stop Name" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "remainingAmulets", label: "Remaining Amulets" },
    { key: "refilledAmulets", label: "Refilled Amulets" },
    { key: "status", label: "Status" },
    { key: "viewDetails", label: "View Details" },
  ];

  const currentItems = filteredStaffs.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const handleViewDetails = (staff) => {
    setViewStaffDetails(staff); // Set selected student details to view
  };

  const handleNoData = (value) => {
    return value === null || value === undefined ? "No data" : value;
  };

  return (
    <div className="view-staffs-container">
      <TopBar title="View Staffs" onBack={onBack} backButton={true} />
      <main className="view-staffs-main-content">
        <div className="view-staffs-search-filter">
          <SearchBar
            placeholder="Search by Route No or Name"
            onSearch={handleSearchChange}
          />
          <div className="view-staffs-action-button-container">
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
          <div className="view-staffs-filters">
            {[
              "routeNo",
              "department",
              "designation",
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
          <Loading message="Loading Staffs" />
        ) : (
          <TableContainer
            headers={staffColumns.map((col) => col.label)}
            rows={
              currentItems.length > 0
                ? currentItems.map((staff, index) => ({
                    id: staff.empId, // Use unique identifier for the row
                    data: staffColumns.map((col) => {
                      if (col.key === "sNo") {
                        return index + 1; // This is the S.No, based on row index
                      }
                      if (col.key === "staffName") {
                        return staff.basicDetails.name || "No data";
                      }
                      if (col.key === "empId") {
                        return staff.staffDetails.staffId || "No data";
                      }
                      if (col.key === "department") {
                        return staff.staffDetails.department || "No data";
                      }
                      if (col.key === "designation") {
                        return staff.staffDetails.designation || "No data";
                      }
                      if (col.key === "instituteName") {
                        return staff.staffDetails.instituteName || "No data";
                      }
                      if (col.key === "routeNo") {
                        return staff.locationDetails.routeNo || "No data";
                      }
                      if (col.key === "stopName") {
                        return staff.locationDetails.stopName || "No data";
                      }
                      if (col.key === "pendingFee") {
                        return handleNoData(staff.pendingFee);
                      }
                      if (col.key === "remainingAmulets") {
                        return handleNoData(staff.remainingAmulets);
                      }
                      if (col.key === "refilledAmulets") {
                        return handleNoData(staff.refilledAmulets);
                      }
                      if (col.key === "status") {
                        return staff.accountStatus || "No data";
                      }
                      if (col.key === "viewDetails") {
                        return (
                          <FontAwesomeIcon
                            icon={faEye}
                            className="view-icon"
                            onClick={() => handleViewDetails(staff)}
                          />
                        );
                      }
                      return staff[col.key] || "No data";
                    }),
                  }))
                : [{ id: "no-data", data: ["No data available"] }] // Display message when no data
            }
            selectedRowId={selectedRowId} // Pass the selectedRowId to TableContainer
            setSelectedRowId={setSelectedRowId} // Pass the setSelectedRowId function
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredStaffs.length / 10)}
          onPageChange={setCurrentPage}
        />
      </main>
      {viewStaffDetails && (
        <SpecificStudentDetails
          user={viewStaffDetails} // Pass the selected student details
          onClose={() => setViewStaffDetails(null)} // Close the modal or component
        />
      )}
    </div>
  );
};

export default ViewStaffs;
