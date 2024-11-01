import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./NewUserRequest.css";
import ActionButton from "../../../../components/Shared/Button/Button";
import Loading from "../../../../components/Shared/Loading/Loading";

// Dummy data
const dummyData = [
  {
    _id: "1",
    type: "student",
    basicDetails: { name: "John Doe" },
    studentDetails: {
      regNo: "S001",
      rollNo: "R001",
      year: "2",
      department: "CS",
      section: "A",
      instituteName: "ABC College",
    },
    locationDetails: { stopName: "Stop 1" },
  },
  {
    _id: "2",
    type: "student",
    basicDetails: { name: "Jane Smith" },
    studentDetails: {
      regNo: "S002",
      rollNo: "R002",
      year: "3",
      department: "EE",
      section: "B",
      instituteName: "ABC College",
    },
    locationDetails: { stopName: "Stop 2" },
  },
  {
    _id: "3",
    type: "student",
    basicDetails: { name: "Alice Johnson" },
    studentDetails: {
      regNo: "S003",
      rollNo: "R003",
      year: "1",
      department: "ME",
      section: "C",
      instituteName: "XYZ Institute",
    },
    locationDetails: { stopName: "Stop 3" },
  },
  {
    _id: "4",
    type: "student",
    basicDetails: { name: "Bob Williams" },
    studentDetails: {
      regNo: "S004",
      rollNo: "R004",
      year: "4",
      department: "CE",
      section: "A",
      instituteName: "XYZ Institute",
    },
    locationDetails: { stopName: "Stop 1" },
  },
  {
    _id: "5",
    type: "student",
    basicDetails: { name: "Charlie Brown" },
    studentDetails: {
      regNo: "S005",
      rollNo: "R005",
      year: "2",
      department: "CS",
      section: "B",
      instituteName: "ABC College",
    },
    locationDetails: { stopName: "Stop 2" },
  },
  {
    _id: "6",
    type: "staff",
    basicDetails: { name: "David Miller" },
    staffDetails: {
      staffId: "ST001",
      instituteName: "ABC College",
      department: "CS",
      designation: "Professor",
    },
    locationDetails: { stopName: "Stop 1" },
  },
  {
    _id: "7",
    type: "staff",
    basicDetails: { name: "Eva Garcia" },
    staffDetails: {
      staffId: "ST002",
      instituteName: "XYZ Institute",
      department: "EE",
      designation: "Assistant Professor",
    },
    locationDetails: { stopName: "Stop 3" },
  },
  {
    _id: "8",
    type: "staff",
    basicDetails: { name: "Frank Wilson" },
    staffDetails: {
      staffId: "ST003",
      instituteName: "ABC College",
      department: "ME",
      designation: "Lecturer",
    },
    locationDetails: { stopName: "Stop 2" },
  },
  {
    _id: "9",
    type: "staff",
    basicDetails: { name: "Grace Lee" },
    staffDetails: {
      staffId: "ST004",
      instituteName: "XYZ Institute",
      department: "CE",
      designation: "Professor",
    },
    locationDetails: { stopName: "Stop 1" },
  },
  {
    _id: "10",
    type: "staff",
    basicDetails: { name: "Henry Taylor" },
    staffDetails: {
      staffId: "ST005",
      instituteName: "ABC College",
      department: "CS",
      designation: "Assistant Professor",
    },
    locationDetails: { stopName: "Stop 3" },
  },
];

function NewUserRequest({ onBack }) {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAllStudents, setSelectAllStudents] = useState(false);
  const [selectAllStaff, setSelectAllStaff] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setPendingUsers(dummyData);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleAction = async (action) => {
    if (selectedUsers.length === 0) {
      toast.warn("Please select at least one user.");
      return;
    }

    // Show loading toast
    const loadingToastId = toast.loading(
      `${action === "approve" ? "Approving" : "Declining"} selected users...`
    );

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Get selected user details for email notification
      const selectedUserDetails = pendingUsers.filter((user) =>
        selectedUsers.includes(user._id)
      );

      // Simulate sending emails
      selectedUserDetails.forEach((user) => {
        const emailSubject = `Transport Request ${
          action === "approve" ? "Approved" : "Declined"
        }`;
        const emailBody = `Dear ${
          user.basicDetails.name
        }, your transport request has been ${
          action === "approve" ? "approved" : "declined"
        }.`;
        console.log(`Sending email to ${user.basicDetails.name}:`, {
          subject: emailSubject,
          body: emailBody,
        });
      });

      // Update UI
      setPendingUsers((prevUsers) =>
        prevUsers.map((user) =>
          selectedUsers.includes(user._id)
            ? {
                ...user,
                status: action === "approve" ? "Approved" : "Declined",
              }
            : user
        )
      );

      // Clear selections
      setSelectedUsers([]);
      setSelectAllStudents(false);
      setSelectAllStaff(false);

      // Show success toast
      toast.dismiss(loadingToastId);
      toast.success(
        <div>
          Successfully {action}d {selectedUsers.length} user
          {selectedUsers.length > 1 ? "s" : ""}.
          <br />
          <small>Email notifications have been sent.</small>
        </div>
      );
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error(`Failed to ${action} users. Please try again.`);
    }
  };

  const handleSelectAll = (type) => {
    const filteredUsers = pendingUsers.filter((user) => user.type === type);
    if (type === "student") {
      const allSelected = filteredUsers.every((user) =>
        selectedUsers.includes(user._id)
      );
      setSelectAllStudents(!allSelected);
      if (allSelected) {
        setSelectedUsers((prev) =>
          prev.filter((id) => !filteredUsers.some((user) => user._id === id))
        );
      } else {
        setSelectedUsers((prev) => [
          ...new Set([...prev, ...filteredUsers.map((user) => user._id)]),
        ]);
      }
    } else {
      const allSelected = filteredUsers.every((user) =>
        selectedUsers.includes(user._id)
      );
      setSelectAllStaff(!allSelected);
      if (allSelected) {
        setSelectedUsers((prev) =>
          prev.filter((id) => !filteredUsers.some((user) => user._id === id))
        );
      } else {
        setSelectedUsers((prev) => [
          ...new Set([...prev, ...filteredUsers.map((user) => user._id)]),
        ]);
      }
    }
  };

  const handleSelectUser = (userId, type) => {
    setSelectedUsers((prev) => {
      const newSelection = prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId];

      // Update select all checkbox state
      const usersOfType = pendingUsers.filter((user) => user.type === type);
      const allOfTypeSelected = usersOfType.every((user) =>
        newSelection.includes(user._id)
      );

      if (type === "student") {
        setSelectAllStudents(allOfTypeSelected);
      } else {
        setSelectAllStaff(allOfTypeSelected);
      }

      return newSelection;
    });
  };

  const studentUsers = pendingUsers.filter((user) => user.type === "student");
  const staffUsers = pendingUsers.filter((user) => user.type === "staff");

  const indexOfLastItemStudent = currentPageStudent * itemsPerPage;
  const indexOfFirstItemStudent = indexOfLastItemStudent - itemsPerPage;
  const currentStudents = studentUsers.slice(
    indexOfFirstItemStudent,
    indexOfLastItemStudent
  );

  const indexOfLastItemStaff = currentPageStaff * itemsPerPage;
  const indexOfFirstItemStaff = indexOfLastItemStaff - itemsPerPage;
  const currentStaff = staffUsers.slice(
    indexOfFirstItemStaff,
    indexOfLastItemStaff
  );

  const paginateStudent = (pageNumber) => setCurrentPageStudent(pageNumber);
  const paginateStaff = (pageNumber) => setCurrentPageStaff(pageNumber);

  const renderPagination = (currentPage, totalItems, paginate) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="new-user-requests-pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="new-user-requests-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`new-user-requests-pagination-button ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
          className="new-user-requests-pagination-button"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    );
  };

  // Update the status cell in both tables
  const renderStatus = (userId) => {
    const user = pendingUsers.find((u) => u._id === userId);
    return (
      <span
        className={`status-badge ${user.status?.toLowerCase() || "pending"}`}
      >
        {user.status || "Not Approved"}
      </span>
    );
  };

  return (
    <>
      {isLoading ? (
        <Loading message="Loading New User Requests..." />
      ) : (
        <div className="new-user-requests">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <header className="new-user-requests-top-bar">
            <button className="new-user-requests-back-button" onClick={onBack}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="new-user-requests-header">
              <h2>New User Requests</h2>
            </div>
          </header>

          <main className="new-user-requests-main-content">
            <div className="new-user-requests-controls">
              <div className="new-user-requests-search-bar-container">
                <div className="new-user-requests-search-input-wrapper">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="new-user-requests-search-icon"
                  />
                  <input
                    type="text"
                    className="new-user-requests-search-bar"
                    placeholder="Search by Stop Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="new-user-action-buttons-container">
                <ActionButton
                  label="Approve"
                  onClick={() => handleAction("approve")}
                  type="approve"
                />
                <ActionButton
                  label="Decline"
                  onClick={() => handleAction("reject")}
                  type="decline"
                />
              </div>
            </div>

            {currentStudents.length > 0 && (
              <div className="new-user-requests-table-container">
                <h3>Student Table</h3>
                <div className="new-user-requests-table-wrapper">
                  <table className="new-user-requests-table">
                    <thead>
                      <tr>
                        <th>
                          <label className="new-user-requests-custom-checkbox">
                            <input
                              type="checkbox"
                              checked={selectAllStudents}
                              onChange={() => handleSelectAll("student")}
                            />
                            <span className="new-user-requests-checkmark"></span>
                          </label>
                        </th>
                        <th>S.No</th>
                        <th>Student Name</th>
                        <th>Reg No</th>
                        <th>Roll No</th>
                        <th>Year</th>
                        <th>Department</th>
                        <th>Section</th>
                        <th>Institute Name</th>
                        <th>Stop Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStudents.map((user, index) => (
                        <tr key={user._id}>
                          <td>
                            <label className="new-user-requests-custom-checkbox">
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user._id)}
                                onChange={() =>
                                  handleSelectUser(user._id, "student")
                                }
                              />
                              <span className="new-user-requests-checkmark"></span>
                            </label>
                          </td>
                          <td>{indexOfFirstItemStudent + index + 1}</td>
                          <td>{user.basicDetails.name}</td>
                          <td>{user.studentDetails.regNo || "N/A"}</td>
                          <td>{user.studentDetails.rollNo || "N/A"}</td>
                          <td>{user.studentDetails.year || "N/A"}</td>
                          <td>{user.studentDetails.department || "N/A"}</td>
                          <td>{user.studentDetails.section || "N/A"}</td>
                          <td>{user.studentDetails.instituteName || "N/A"}</td>
                          <td>{user.locationDetails.stopName || "N/A"}</td>
                          <td>{renderStatus(user._id)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {renderPagination(
                  currentPageStudent,
                  studentUsers.length,
                  paginateStudent
                )}
              </div>
            )}

            {currentStaff.length > 0 && (
              <div className="new-user-requests-table-container">
                <h3>Staff Table</h3>
                <div className="new-user-requests-table-wrapper">
                  <table className="new-user-requests-table">
                    <thead>
                      <tr>
                        <th>
                          <label className="new-user-requests-custom-checkbox">
                            <input
                              type="checkbox"
                              checked={selectAllStaff}
                              onChange={() => handleSelectAll("staff")}
                            />
                            <span className="new-user-requests-checkmark"></span>
                          </label>
                        </th>
                        <th>S.No</th>
                        <th>Staff Name</th>
                        <th>Staff ID</th>
                        <th>Institute Name</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Stop Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStaff.map((user, index) => (
                        <tr key={user._id}>
                          <td>
                            <label className="new-user-requests-custom-checkbox">
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user._id)}
                                onChange={() =>
                                  handleSelectUser(user._id, "staff")
                                }
                              />
                              <span className="new-user-requests-checkmark"></span>
                            </label>
                          </td>
                          <td>{indexOfFirstItemStaff + index + 1}</td>
                          <td>{user.basicDetails.name}</td>
                          <td>{user.staffDetails.staffId || "N/A"}</td>
                          <td>{user.staffDetails.instituteName || "N/A"}</td>
                          <td>{user.staffDetails.department || "N/A"}</td>
                          <td>{user.staffDetails.designation || "N/A"}</td>
                          <td>{user.locationDetails.stopName || "N/A"}</td>
                          <td>{renderStatus(user._id)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {renderPagination(
                  currentPageStaff,
                  staffUsers.length,
                  paginateStaff
                )}
              </div>
            )}

            {studentUsers.length === 0 && staffUsers.length === 0 && (
              <p className="no-requests">No new user requests at the moment.</p>
            )}
          </main>
        </div>
      )}
    </>
  );
}

export default NewUserRequest;
