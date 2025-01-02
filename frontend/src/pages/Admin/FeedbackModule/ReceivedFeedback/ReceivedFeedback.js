import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faEye,
  faUserGraduate,
  faUserTie,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./ReceivedFeedback.css";
import Button from "../../../../components/Shared/Button/Button";
import SpecificFeedbackReceived from "../SpecificFeedbackReceived/SpecificFeedbackReceived";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import ConfirmationModal from "../../../../components/Shared/ConfirmationModal/ConfirmationModal";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import apiClient from "../../../../apiClient";

const ReceivedFeedback = ({ onBack, studentsFeedback, staffFeedback }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [filteredStudents, setFilteredStudents] = useState(studentsFeedback);
  const [filteredStaffs, setFilteredStaffs] = useState(staffFeedback);
  const [selectedStudentFeedback, setSelectedStudentFeedback] = useState([]);
  const [selectedStaffFeedback, setSelectedStaffFeedback] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [viewingFeedback, setViewingFeedback] = useState(null);
  const [filters, setFilters] = useState({
    year: "",
    department: "",
    section: "",
    routeNo: "",
  });

  const containerRef = useRef(null);

  // Filter and search combined function
  const applyFiltersAndSearch = () => {
    const filterData = (data) =>
      data.filter((entry) =>
        Object.entries({ ...filters, searchTerm }).every(([key, value]) => {
          if (!value) return true;
          return entry[key]
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        })
      );

    setFilteredStudents(filterData(filteredStudents));
    setFilteredStaffs(filterData(filteredStaffs));
    setCurrentPageStudent(1);
    setCurrentPageStaff(1);
  };

  useEffect(applyFiltersAndSearch, [filters, searchTerm]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Handle row selection and deletion
  const handleRowClick = (id, selected, setSelected) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  // Select all students/staff
  const handleSelectAll = (data, selected, setSelected) => {
    if (selected.length === data.length) {
      setSelected([]); // Deselect all
    } else {
      setSelected(data.map((item) => item.sNo)); // Select all
    }
  };

  // Handle Delete Feedback
  const handleDeleteFeedback = async () => {
    try {
      const updatedStudents = filteredStudents.filter(
        (student) => !selectedStudentFeedback.includes(student.sNo)
      );
      const updatedStaffs = filteredStaffs.filter(
        (staff) => !selectedStaffFeedback.includes(staff.sNo)
      );

      setFilteredStudents(updatedStudents);
      setFilteredStaffs(updatedStaffs);

      showToast("success", "Feedback deleted successfully!");

      setSelectedStudentFeedback([]);
      setSelectedStaffFeedback([]);
      setShowDeleteConfirmation(false);
    } catch (error) {
      showToast("error", "Failed to delete feedback.");
    }
  };

  return (
    <div className="received-feedback-container" ref={containerRef}>
      <TopBar title="Feedbacks Received" onBack={onBack} backButton={true} />
      <main className="received-feedback-main-content">
        <div className="received-feedback-actions">
          <SearchBar
            placeholder="Search feedback..."
            onSearch={(value) => setSearchTerm(value)}
          />
          <div className="received-feedback-action-buttons-container">
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faFilter} /> Filter by
                </>
              }
              onClick={() => setShowFilters(!showFilters)}
            />
            <Button
              label={
                <>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </>
              }
              onClick={() => setShowDeleteConfirmation(true)}
              disabled={
                selectedStudentFeedback.length === 0 &&
                selectedStaffFeedback.length === 0
              }
            />
          </div>
        </div>

        {showFilters && (
          <div className="received-feedback-filters">
            {Object.keys(filters).map((filterKey) => (
              <select
                key={filterKey}
                name={filterKey}
                value={filters[filterKey]}
                onChange={handleFilterChange}
              >
                <option value="">{filterKey.replace(/([A-Z])/g, " $1")}</option>
                {Array.from(
                  new Set(
                    [...filteredStudents, ...filteredStaffs]
                      .map((item) => item[filterKey])
                      .filter(Boolean)
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

        {/* Student Table */}
        <div className="received-feedback-table-section">
          <h3>
            <FontAwesomeIcon icon={faUserGraduate} /> Students Feedback
          </h3>
          <TableContainer
            headers={[
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={
                    selectedStudentFeedback.length === filteredStudents.length
                  }
                  onChange={() =>
                    handleSelectAll(
                      filteredStudents,
                      selectedStudentFeedback,
                      setSelectedStudentFeedback
                    )
                  }
                />
                <span className="checkbox-checkmark"></span>
              </label>,
              "S.No",
              "Student Name",
              "Reg No",
              "Roll No",
              "Year",
              "Department",
              "Section",
              "Institute Name",
              "Route No",
              "Feedback Count",
              "View",
            ]}
            rows={filteredStudents
              .slice((currentPageStudent - 1) * 5, currentPageStudent * 5)
              .map((student, index) => ({
                id: student.sNo,
                data: {
                  select: (
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedStudentFeedback.includes(student.sNo)}
                        onChange={() =>
                          handleRowClick(
                            student.sNo,
                            selectedStudentFeedback,
                            setSelectedStudentFeedback
                          )
                        }
                      />
                      <span className="checkbox-checkmark"></span>
                    </label>
                  ),
                  sNo: index + 1,
                  studentName: student.studentName,
                  regNo: student.regNo,
                  rollNo: student.rollNo,
                  year: student.year,
                  department: student.department,
                  section: student.section,
                  instituteName: student.instituteName,
                  routeNo: student.routeNo,
                  feedbackCount: student.ratings?.length || 0,
                  view: (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="feedback-view-icon"
                      onClick={() => setViewingFeedback(student)}
                    />
                  ),
                },
              }))}
            onRowClick={(row) =>
              handleRowClick(
                row.id,
                selectedStudentFeedback,
                setSelectedStudentFeedback
              )
            }
            selectedRowId={selectedStudentFeedback}
          />
          <Pagination
            currentPage={currentPageStudent}
            totalPages={Math.ceil(filteredStudents.length / 5)}
            onPageChange={(pageNumber) => setCurrentPageStudent(pageNumber)}
          />
        </div>

        {/* Staff Table */}
        <div className="received-feedback-table-section">
          <h3>
            <FontAwesomeIcon icon={faUserTie} /> Staff Feedback
          </h3>
          <TableContainer
            headers={[
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  checked={
                    selectedStaffFeedback.length === filteredStaffs.length
                  }
                  onChange={() =>
                    handleSelectAll(
                      filteredStaffs,
                      selectedStaffFeedback,
                      setSelectedStaffFeedback
                    )
                  }
                />
                <span className="checkbox-checkmark"></span>
              </label>,
              "S.No",
              "Staff Name",
              "Staff ID",
              "Department",
              "Designation",
              "Institute Name",
              "Route No",
              "Feedback Count",
              "View",
            ]}
            rows={filteredStaffs
              .slice((currentPageStaff - 1) * 5, currentPageStaff * 5)
              .map((staff, index) => ({
                id: staff.sNo,
                data: {
                  select: (
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedStaffFeedback.includes(staff.sNo)}
                        onChange={() =>
                          handleRowClick(
                            staff.sNo,
                            selectedStaffFeedback,
                            setSelectedStaffFeedback
                          )
                        }
                      />
                      <span className="checkbox-checkmark"></span>
                    </label>
                  ),
                  sNo: index + 1,
                  staffName: staff.staffName,
                  staffId: staff.staffId,
                  department: staff.department,
                  designation: staff.designation,
                  instituteName: staff.instituteName,
                  routeNo: staff.routeNo,
                  feedbackCount: staff.ratings?.length || 0,
                  view: (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="feedback-view-icon"
                      onClick={() => setViewingFeedback(staff)}
                    />
                  ),
                },
              }))}
            onRowClick={(row) =>
              handleRowClick(
                row.id,
                selectedStaffFeedback,
                setSelectedStaffFeedback
              )
            }
            selectedRowId={selectedStaffFeedback}
          />
          <Pagination
            currentPage={currentPageStaff}
            totalPages={Math.ceil(filteredStaffs.length / 5)}
            onPageChange={(pageNumber) => setCurrentPageStaff(pageNumber)}
          />
        </div>

        {viewingFeedback && (
          <SpecificFeedbackReceived
            feedback={viewingFeedback}
            ratings={viewingFeedback.ratings}
            onClose={() => setViewingFeedback(null)}
          />
        )}
      </main>

      {showDeleteConfirmation && (
        <ConfirmationModal
          title="Confirm Deletion"
          message="Are you sure you want to delete the selected feedback?"
          confirmText="Yes, Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteFeedback}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}

      <ToastNotification />
    </div>
  );
};

export default ReceivedFeedback;
