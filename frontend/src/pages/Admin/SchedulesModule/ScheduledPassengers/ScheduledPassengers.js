import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import "./ScheduledPassengers.css";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import apiClient from "../../../../apiClient";

const ScheduledPassengers = ({ onBack, institutionId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState({ student: 1, staff: 1 });
  const [filteredData, setFilteredData] = useState({ students: [], staff: [] });
  const [filters, setFilters] = useState({
    scheduledFor: "",
    year: "",
    department: "",
    section: "",
    instituteName: "",
    routeNo: "",
    status: "",
    designation: "",
  });
  const [loading, setLoading] = useState(true);
  const [scheduleDate, setScheduleDate] = useState("");

  const itemsPerPage = 5;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        `/adminSchedules/get-schedule-for-date/${institutionId}`
      );
      console.log("Response", response.data);
      const { schedules, nextDate } = response.data;
      setFilteredData({ students: schedules.students, staff: schedules.staff });
      setScheduleDate(nextDate); // Set the date
    } catch (error) {
      console.error("Failed to fetch schedule data", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data from backend
  useEffect(() => {
    const socket = io("http://localhost:3000");

    fetchData();

    socket.on("scheduleUpdate", (data) => {
      const { schedules, nextDate } = data;
      setFilteredData({ students: schedules.students, staff: schedules.staff });
      setScheduleDate(nextDate); // Update the date
      console.log("Schedule update received:", data);
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);

  // Filter and search combined function
  const applyFiltersAndSearch = () => {
    const filterData = (data) =>
      data.filter((entry) =>
        Object.entries({ ...filters, searchTerm }).every(([key, value]) => {
          if (!value) return true;
          return entry[key]
            ?.toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        })
      );

    setFilteredData((prev) => ({
      students: filterData(prev.students),
      staff: filterData(prev.staff),
    }));
    setCurrentPage({ student: 1, staff: 1 });
  };

  useEffect(applyFiltersAndSearch, [filters, searchTerm]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const tableData = [
    {
      label: "Students Scheduled",
      icon: faUserGraduate,
      data: filteredData.students,
      columns: [
        { label: "S.No", key: "S.No" },
        { label: "Student Name", key: "name" },
        { label: "Registration Number", key: "regNo" },
        { label: "Scheduled Status", key: "scheduledFor" },
        { label: "Roll Number", key: "rollNo" },
        { label: "Year", key: "year" },
        { label: "Department", key: "department" },
        { label: "Section", key: "section" },
        { label: "Institute Name", key: "instituteName" },
        { label: "Route Number", key: "routeNo" },
        { label: "Stop Name", key: "stopName" },
        { label: "Pending Fee", key: "pendingFee" },
        { label: "Remaining Amulets", key: "remainingAmulets" },
        { label: "Refilled Amulets", key: "refilledAmulets" },
        { label: "Status", key: "status" },
      ],
      pageKey: "student",
    },
    {
      label: "Staff Scheduled",
      icon: faUserTie,
      data: filteredData.staff,
      columns: [
        { label: "S.No", key: "S.No" },
        { label: "Staff Name", key: "name" },
        { label: "Staff ID", key: "staffId" }, // Corrected to access staffId
        {
          label: "Scheduled Status",
          key: "scheduledFor",
        },
        { label: "Designation", key: "designation" }, // Accessing designation from staffDetails
        { label: "Institute Name", key: "instituteName" }, // Accessing instituteName from staffDetails
        { label: "Stop Name", key: "stopName" },
        { label: "Status", key: "status" },
      ],
      pageKey: "staff",
    },
  ];

  return (
    <div className="scheduled-passengers-container">
      <TopBar title="Scheduled Passengers" backButton onBack={onBack} />

      <main className="scheduled-passengers-main-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="scheduled-passengers-actions">
              <SearchBar
                placeholder="Search by Route No or Passenger Name"
                onSearch={setSearchTerm}
              />
              <div className="scheduled-passengers-action-button-container">
                <p>
                  <span className="bold-text">Schedule Date:</span>{" "}
                  <span>{scheduleDate}</span>
                </p>

                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faFilter} /> Filter by
                    </>
                  }
                  onClick={() => setShowFilters((prev) => !prev)}
                />
              </div>
            </div>

            {showFilters && (
              <div className="scheduled-passengers-filters">
                {Object.keys(filters).map((filterKey) => (
                  <select
                    key={filterKey}
                    name={filterKey}
                    value={filters[filterKey]}
                    onChange={handleFilterChange}
                  >
                    <option value="">
                      {filterKey.replace(/([A-Z])/g, " $1")}
                    </option>
                    {Array.from(
                      new Set(
                        [...filteredData.students, ...filteredData.staff]
                          .map((item) => {
                            const value = item[filterKey];
                            // Handle cases where value is an object or array
                            if (typeof value === "object") {
                              if (Array.isArray(value)) {
                                // If it's an array, extract meaningful values
                                return value.map((v) => v.period).join(", "); // Adjust as needed for your data
                              }
                              return JSON.stringify(value); // Convert object to string for display
                            }
                            return value; // Return the value directly if it's a string/number
                          })
                          .filter(Boolean) // Remove undefined or null values
                      )
                    ).map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            )}

            <div className="scheduled-passengers-tables-container">
              {tableData.map(({ label, icon, data, columns, pageKey }) => (
                <div key={label} className="scheduled-passengers-table-section">
                  <div className="scheduled-passengers-table-sub-section">
                    <h3>
                      <FontAwesomeIcon
                        icon={icon}
                        className={`${pageKey}-schedule-icon`}
                      />{" "}
                      {label}
                    </h3>
                    <p className="total-count">Total of {data.length}</p>
                  </div>
                  <TableContainer
                    headers={columns.map((col) => col.label)}
                    rows={
                      data.length > 0
                        ? data
                            .slice(
                              (currentPage[pageKey] - 1) * itemsPerPage,
                              currentPage[pageKey] * itemsPerPage
                            )
                            .map((item, index) => ({
                              id: item._id || index,
                              data: columns.reduce((acc, col) => {
                                const value = col.key
                                  .split(".")
                                  .reduce(
                                    (obj, key) => (obj ? obj[key] : "N/A"),
                                    item
                                  );

                                // Special handling for the "scheduledFor" field
                                if (col.key === "scheduledFor") {
                                  acc[col.label] = Array.isArray(value)
                                    ? value.map((v) => v.period).join(", ")
                                    : value;
                                } else {
                                  acc[col.label] = value;
                                }
                                return acc;
                              }, {}),
                            }))
                            .map((row, idx) => ({
                              ...row,
                              data: {
                                ...row.data,
                                "S.No":
                                  (currentPage[pageKey] - 1) * itemsPerPage +
                                  idx +
                                  1,
                              },
                            }))
                        : [
                            {
                              id: "no-data",
                              data: { message: "No data available" },
                            },
                          ]
                    }
                  />

                  <Pagination
                    currentPage={currentPage[pageKey]}
                    totalPages={Math.ceil(data.length / itemsPerPage)}
                    onPageChange={(page) =>
                      setCurrentPage((prev) => ({ ...prev, [pageKey]: page }))
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ScheduledPassengers;
