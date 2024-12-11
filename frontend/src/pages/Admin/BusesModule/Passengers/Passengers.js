import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faUserTie } from "@fortawesome/free-solid-svg-icons";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import apiClient from "../../../../apiClient";
import "./Passengers.css";

const Passengers = ({ route, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPassengers, setSelectedPassengers] = useState([]);
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [studentsData, setStudentsData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(false); // Add a loading state

  const itemsPerPage = 5;
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchPassengers = async () => {
      setLoading(true);
      try {
        const institutionId = localStorage.getItem("institutionId"); // Retrieve institutionId from local storage

        if (!institutionId) {
          showToast("error", "Institution ID not found in local storage.");
          return;
        }

        const response = await apiClient.get(
          `/institutionsExtended/passengers/${route.routeNumber}`,
          {
            params: { institutionId }, // Pass institutionId as a query parameter
          }
        );

        console.log("Fetched passengers:", response.data); // Log data
        const { students, staff } = response.data;
        setStudentsData(students);
        setStaffData(staff);
      } catch (error) {
        showToast("error", "Failed to fetch passengers.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPassengers();
  }, [route.routeNumber]);

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedPassengers([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handlePassengerClick = (passenger) => {
    setSelectedPassengers((prev) =>
      prev.includes(passenger.id)
        ? prev.filter((id) => id !== passenger.id)
        : [...prev, passenger.id]
    );
  };

  const handleSelectAll = (type) => {
    const filteredPassengers = type === "student" ? studentsData : staffData;
    const allSelected = filteredPassengers.every((passenger) =>
      selectedPassengers.includes(passenger.id)
    );
    if (allSelected) {
      setSelectedPassengers([]); // Deselect all
    } else {
      setSelectedPassengers(
        filteredPassengers.map((passenger) => passenger.id) // Select all
      );
    }
  };

  const filteredStudents = studentsData.filter(
    (student) =>
      student.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.regNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.staffName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.staffID?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItemStudent = currentPageStudent * itemsPerPage;
  const indexOfFirstItemStudent = indexOfLastItemStudent - itemsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstItemStudent,
    indexOfLastItemStudent
  );

  const indexOfLastItemStaff = currentPageStaff * itemsPerPage;
  const indexOfFirstItemStaff = indexOfLastItemStaff - itemsPerPage;
  const currentStaff = filteredStaff.slice(
    indexOfFirstItemStaff,
    indexOfLastItemStaff
  );

  const paginateStudent = (pageNumber) => setCurrentPageStudent(pageNumber);
  const paginateStaff = (pageNumber) => setCurrentPageStaff(pageNumber);

  const studentColumns = [
    {
      key: "selectAll",
      label: (
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={filteredStudents.every((student) =>
              selectedPassengers.includes(student.id)
            )}
            onChange={() => handleSelectAll("student")}
          />
          <span className="checkbox-checkmark"></span>
        </label>
      ),
    },
    { key: "serialNumber", label: "S No" },
    { key: "studentName", label: "Student Name" },
    { key: "regNo", label: "Reg No" },
    { key: "rollNo", label: "Roll No" },
    { key: "year", label: "Year" },
    { key: "department", label: "Department" },
    { key: "section", label: "Section" },
    { key: "instituteName", label: "Institute Name" },
    { key: "stopping", label: "Stopping" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "remainingAmulets", label: "Remaining Amulets" },
    { key: "refilledAmulets", label: "Refilled Amulets" },
    { key: "status", label: "Status" },
  ];

  const staffColumns = [
    {
      key: "selectAll",
      label: (
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={filteredStaff.every((staff) =>
              selectedPassengers.includes(staff.id)
            )}
            onChange={() => handleSelectAll("staff")}
          />
          <span className="checkbox-checkmark"></span>
        </label>
      ),
    },
    { key: "serialNumber", label: "S No" },
    { key: "staffName", label: "Staff Name" },
    { key: "staffID", label: "Staff ID" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "instituteName", label: "Institute Name" },
    { key: "stopping", label: "Stopping" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "remainingAmulets", label: "Remaining Amulets" },
    { key: "refilledAmulets", label: "Refilled Amulets" },
    { key: "status", label: "Status" },
  ];

  const renderNoDataRow = (colSpan) => ({
    id: "no-data",
    data: { message: "No data available" },
    colSpan,
  });

  return (
    <div className="bus-passengers-container" ref={containerRef}>
      <ToastNotification />
      <TopBar
        title={`Passengers for Route ${route.routeNumber}`}
        onBack={onBack}
        backButton={true}
      />

      <main className="bus-passengers-main-content">
        {loading ? (
          <p>Loading passengers...</p>
        ) : (
          <>
            <div className="bus-passengers-actions">
              <SearchBar
                placeholder="Search passengers..."
                onSearch={setSearchTerm}
              />
            </div>

            <div className="bus-passengers-tables-container">
              <div className="bus-passengers-table-section">
                <h3>
                  <FontAwesomeIcon icon={faUserGraduate} /> Students
                </h3>
                <TableContainer
                  headers={studentColumns.map((col) => col.label)}
                  rows={
                    currentStudents.length > 0
                      ? currentStudents.map((student, index) => ({
                          id: student.id,
                          data: {
                            select: (
                              <label className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  checked={selectedPassengers.includes(
                                    student.id
                                  )}
                                  onChange={() => handlePassengerClick(student)}
                                />
                                <span className="checkbox-checkmark"></span>
                              </label>
                            ),
                            serialNumber:
                              index + 1 + (currentPageStaff - 1) * itemsPerPage,
                            studentName: student.studentName,
                            regNo: student.regNo,
                            rollNo: student.rollNo,
                            year: student.year,
                            department: student.department,
                            section: student.section,
                            instituteName: student.instituteName,
                            stopping: student.stopping,
                            pendingFee: student.pendingFee,
                            remainingAmulets: student.remainingAmulets,
                            refilledAmulets: student.refilledAmulets,
                            status: student.status,
                          },
                        }))
                      : [renderNoDataRow(studentColumns.length)]
                  }
                  onRowClick={(row) => handlePassengerClick(row)}
                  selectedRowId={selectedPassengers}
                />
                <Pagination
                  currentPage={currentPageStudent}
                  totalPages={Math.ceil(filteredStudents.length / itemsPerPage)}
                  onPageChange={paginateStudent}
                />
              </div>

              <div className="bus-passengers-table-section">
                <h3>
                  <FontAwesomeIcon icon={faUserTie} /> Staff
                </h3>
                <TableContainer
                  headers={staffColumns.map((col) => col.label)}
                  rows={
                    currentStaff.length > 0
                      ? currentStaff.map((staff, index) => ({
                          id: staff.id,
                          data: {
                            select: (
                              <label className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  checked={selectedPassengers.includes(
                                    staff.id
                                  )}
                                  onChange={() => handlePassengerClick(staff)}
                                />
                                <span className="checkbox-checkmark"></span>
                              </label>
                            ),
                            serialNumber:
                              index + 1 + (currentPageStaff - 1) * itemsPerPage, // Adding S No
                            staffName: staff.staffName,
                            staffID: staff.staffID,
                            department: staff.department,
                            designation: staff.designation,
                            instituteName: staff.instituteName,
                            stopping: staff.stopping, // Ensure "stopping" is populated in the data
                            pendingFee: staff.pendingFee,
                            remainingAmulets: staff.remainingAmulets,
                            refilledAmulets: staff.refilledAmulets,
                            status: staff.status,
                          },
                        }))
                      : [renderNoDataRow(staffColumns.length)]
                  }
                  onRowClick={(row) => handlePassengerClick(row)}
                  selectedRowId={selectedPassengers}
                />
                <Pagination
                  currentPage={currentPageStaff}
                  totalPages={Math.ceil(filteredStaff.length / itemsPerPage)}
                  onPageChange={paginateStaff}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Passengers;
