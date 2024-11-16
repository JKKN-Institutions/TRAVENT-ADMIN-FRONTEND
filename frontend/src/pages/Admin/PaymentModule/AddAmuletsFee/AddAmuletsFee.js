import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./AddAmuletsFee.css";
import Button from "../../../../components/Shared/Button/Button";
import AddAmuletFees from "../AddAmuletFees/AddAmuletFees";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";

const AddAmuletsFee = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Aishu J",
      regNo: "611220104123",
      rollNo: "2k24AHS157",
      year: "I",
      department: "AHS",
      section: "A",
      instituteName: "JKKN College of Allied Health Sciences",
      routeNo: "15",
      stopName: "Seelanayakkampatti Bypass",
      academicYear: "2024-25",
      pending: "0",
    },
    {
      id: 2,
      name: "Arun S",
      regNo: "611220104145",
      rollNo: "2k22BP135",
      year: "III",
      department: "B.PHARM",
      section: "A",
      instituteName: "JKKN College of Pharmacy",
      routeNo: "15",
      stopName: "Kakapalayam",
      academicYear: "2024-25",
      pending: "0",
    },
    // Add more student data here...
  ]);

  useEffect(() => {
    setSelectedStudent(null); // Reset selection on component load
  }, []);

  // Utility: Filter students based on search term
  const getFilteredStudents = () => {
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.regNo.includes(searchTerm) ||
        student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Utility: Paginate filtered results
  const getPaginatedStudents = (filteredStudents) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Paginate search results
  const filteredStudents = getFilteredStudents();
  const paginatedStudents = getPaginatedStudents(filteredStudents);

  // Handle row click
  const handleRowClick = (student) => {
    setSelectedStudent(selectedStudent?.id === student.id ? null : student);
  };

  // Handle adding amulet fee
  const handleAddAmuletFee = async (feeData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock API call
      console.log("Amulet fee added:", { student: selectedStudent, feeData });
    } catch (error) {
      console.error("Error adding amulet fee:", error);
    }
  };

  // Table headers
  const headers = [
    "S.No",
    "Student Name",
    "Reg No",
    "Roll No",
    "Year",
    "Department",
    "Section",
    "Institute Name",
    "Route No",
    "Stop Name",
    "Academic Year",
    "Pending Amulets",
  ];

  // Map paginated data to table rows
  const rows = paginatedStudents.map((student, index) => ({
    id: student.id,
    data: {
      "S.No": (currentPage - 1) * itemsPerPage + index + 1,
      "Student Name": student.name,
      "Reg No": student.regNo,
      "Roll No": student.rollNo,
      Year: student.year,
      Department: student.department,
      Section: student.section,
      "Institute Name": student.instituteName,
      "Route No": student.routeNo,
      "Stop Name": student.stopName,
      "Academic Year": student.academicYear,
      "Pending Amulets": student.pending,
    },
  }));

  // Handle editing the selected student
  if (selectedStudent?.isBeingEdited) {
    return (
      <AddAmuletFees
        student={selectedStudent}
        onBack={() => setSelectedStudent(null)}
        onAdd={handleAddAmuletFee}
      />
    );
  }

  return (
    <div className="add-amulets-fee-container">
      <TopBar title="Add Fee & Refill Amulets" onBack={onBack} backButton />
      <main className="add-amulets-fee-main-content">
        <div className="add-amulets-fee-controls">
          <SearchBar
            placeholder="Search by Name, Reg No, or Roll No"
            onSearch={setSearchTerm}
          />
          <div className="add-amulets-fee-action-buttons">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faPlus} /> Add
                </>
              }
              onClick={() => {
                if (selectedStudent) {
                  setSelectedStudent({
                    ...selectedStudent,
                    isBeingEdited: true,
                  });
                }
              }}
              disabled={!selectedStudent}
            />
          </div>
        </div>

        <TableContainer
          headers={headers}
          rows={rows}
          onRowClick={(row) =>
            handleRowClick(students.find((s) => s.id === row.id))
          }
          selectedRowId={selectedStudent?.id}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredStudents.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default AddAmuletsFee;
