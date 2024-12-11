import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faUserTie } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../../../apiClient";
import "./StoppingPassengers.css";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";

const StoppingPassengers = ({ stop, onBack, institutionId, route }) => {
  const [loading, setLoading] = useState(false);
  const [stopName, setStopName] = useState(stop.stopName || ""); // Default stop name
  const [studentsData, setStudentsData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const itemsPerPage = 10;

  // Fetch passengers from the backend
  useEffect(() => {
    const fetchPassengers = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(
          "/institutionsExtended/stopping-passengers",
          {
            params: {
              institutionId,
              routeNumber: route.routeNumber,
              stopId: stop.stopID,
            },
          }
        );
        const { stopName: fetchedStopName, students, staff } = response.data;
        setStopName(fetchedStopName);
        setStudentsData(students);
        setStaffData(staff);
      } catch (error) {
        console.error("Error fetching stopping passengers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPassengers();
  }, [institutionId, route.routeNumber, stop.stopID]);

  // Filter data based on search term
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

  // Define columns for students and staff tables
  const studentColumns = [
    { key: "serialNumber", label: "S.No" },
    { key: "studentName", label: "Student Name" },
    { key: "regNo", label: "Reg No" },
    { key: "rollNo", label: "Roll No" },
    { key: "year", label: "Year" },
    { key: "department", label: "Department" },
    { key: "section", label: "Section" },
    { key: "instituteName", label: "Institute Name" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "remainingAmulets", label: "Remaining Amulets" },
    { key: "refilledAmulets", label: "Refilled Amulets" },
    { key: "status", label: "Status" },
  ];

  const staffColumns = [
    { key: "serialNumber", label: "S.No" },
    { key: "staffName", label: "Staff Name" },
    { key: "staffID", label: "Staff ID" },
    { key: "department", label: "Department" },
    { key: "designation", label: "Designation" },
    { key: "instituteName", label: "Institute Name" },
    { key: "pendingFee", label: "Pending Fee" },
    { key: "remainingAmulets", label: "Remaining Amulets" },
    { key: "refilledAmulets", label: "Refilled Amulets" },
    { key: "status", label: "Status" },
  ];

  // Pagination logic for students and staff
  const indexOfLastStudent = currentPageStudent * itemsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - itemsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const indexOfLastStaff = currentPageStaff * itemsPerPage;
  const indexOfFirstStaff = indexOfLastStaff - itemsPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff);

  const renderNoDataRow = (colSpan) => ({
    id: "no-data",
    data: { message: "No data available" },
    colSpan,
  });

  return (
    <div className="stopping-passengers-container">
      <TopBar
        title={`Passengers for Stop: ${stopName}`}
        onBack={onBack}
        backButton={true}
      />

      {loading ? (
        <p>Loading passengers...</p>
      ) : (
        <main className="stopping-passengers-main-content">
          <div className="stopping-passengers-controls">
            <SearchBar
              placeholder="Search passengers..."
              onSearch={setSearchTerm}
            />
          </div>
          <div className="stopping-passengers-tables-container">
            <div className="stopping-passengers-table-section">
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
                          serialNumber:
                            index + 1 + (currentPageStudent - 1) * itemsPerPage,
                          studentName: student.studentName,
                          regNo: student.regNo,
                          rollNo: student.rollNo,
                          year: student.year,
                          department: student.department,
                          section: student.section,
                          instituteName: student.instituteName,

                          pendingFee: student.pendingFee,
                          remainingAmulets: student.remainingAmulets,
                          refilledAmulets: student.refilledAmulets,
                          status: student.status,
                        },
                      }))
                    : [renderNoDataRow(studentColumns.length)]
                }
              />
              <Pagination
                currentPage={currentPageStudent}
                totalPages={Math.ceil(filteredStudents.length / itemsPerPage)}
                onPageChange={setCurrentPageStudent}
              />
            </div>

            <div className="stopping-passengers-table-section">
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
                          serialNumber:
                            index + 1 + (currentPageStaff - 1) * itemsPerPage,
                          staffName: staff.staffName,
                          staffID: staff.staffID,
                          department: staff.department,
                          designation: staff.designation,
                          instituteName: staff.instituteName,

                          pendingFee: staff.pendingFee,
                          remainingAmulets: staff.remainingAmulets,
                          refilledAmulets: staff.refilledAmulets,
                          status: staff.status,
                        },
                      }))
                    : [renderNoDataRow(staffColumns.length)]
                }
              />
              <Pagination
                currentPage={currentPageStaff}
                totalPages={Math.ceil(filteredStaff.length / itemsPerPage)}
                onPageChange={setCurrentPageStaff}
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default StoppingPassengers;
