import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faUserTie } from "@fortawesome/free-solid-svg-icons";
import "./StoppingPassengers.css";
import TopBar from "../../../../components/Shared/TopBar/TopBar"; // Import TopBar
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar"; // Import SearchBar
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer"; // Import TableContainer
import Pagination from "../../../../components/Shared/Pagination/Pagination"; // Import Pagination

const StoppingPassengers = ({ stop, onBack, institutionId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data for students and staff
  const studentsData = [
    {
      id: 1,
      studentName: "Senthil S",
      regNo: "611220104123",
      rollNo: "2K24AHS157",
      year: "I",
      department: "AHS",
      section: "A",
      instituteName: "JKKN AHS",
      pendingFee: 4500,
      amulets: { remaining: 60, refilled: 0 },
      status: "Active",
    },
    {
      id: 2,
      studentName: "Balagi G",
      regNo: "611220103233",
      rollNo: "2K22BP135",
      year: "III",
      department: "B.PHARM",
      section: "A",
      instituteName: "JKKN Pharmacy",
      pendingFee: 4500,
      amulets: { remaining: 50, refilled: 0 },
      status: "Active",
    },
  ];

  const staffData = [
    {
      id: 1,
      staffName: "Balagi G",
      staffID: "2K20PD159",
      department: "PHARM D",
      designation: "Professor",
      instituteName: "JKKN College of Pharmacy",
      pendingFee: "Nil",
      amulets: { remaining: 50, refilled: 0 },
      status: "Active",
    },
    {
      id: 2,
      staffName: "Senthil S",
      staffID: "2K24AHS174",
      department: "AHS",
      designation: "Professor",
      instituteName: "JKKN College of Allied Health Sciences",
      pendingFee: 1000,
      amulets: { remaining: 60, refilled: 100 },
      status: "Active",
    },
  ];

  const filteredStudents = studentsData.filter(
    (student) =>
      student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaff = staffData.filter(
    (staff) =>
      staff.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.staffID.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    { key: "amulets", label: "Amulets (Remaining / Refilled)" },
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
    { key: "amulets", label: "Amulets (Remaining / Refilled)" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="stopping-passengers-container">
      <TopBar
        title={`Passengers for Stop: ${stop.stopName}`}
        onBack={onBack}
        backButton={true}
      />

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
              rows={filteredStudents.map((student, index) => ({
                id: student.id,
                data: {
                  ...student,
                  serialNumber:
                    index + 1 + (currentPageStudent - 1) * itemsPerPage,
                  amulets: `${student.amulets.remaining} / ${student.amulets.refilled}`,
                },
              }))}
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
              rows={filteredStaff.map((staff, index) => ({
                id: staff.id,
                data: {
                  ...staff,
                  serialNumber:
                    index + 1 + (currentPageStaff - 1) * itemsPerPage,
                  amulets: `${staff.amulets.remaining} / ${staff.amulets.refilled}`,
                },
              }))}
            />
            <Pagination
              currentPage={currentPageStaff}
              totalPages={Math.ceil(filteredStaff.length / itemsPerPage)}
              onPageChange={setCurrentPageStaff}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StoppingPassengers;
