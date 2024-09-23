import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./NewUserRequest.css";

function NewUserRequest({ onBack }) {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAllStudents, setSelectAllStudents] = useState(false);
  const [selectAllStaff, setSelectAllStaff] = useState(false);

  useEffect(() => {
    // Fetch pending user requests
    axios
      .get("http://localhost:3000/api/admin/pending-users")
      .then((response) => setPendingUsers(response.data))
      .catch((error) => console.error("Error fetching pending users:", error));
  }, []);

  const handleAction = (action) => {
    if (selectedUsers.length === 0) {
      toast.warn("Please select at least one user.");
      return;
    }

    axios
      .post("http://localhost:3000/api/admin/approve-user", {
        userIds: selectedUsers,
        action,
      })
      .then((response) => {
        toast.success(response.data.message);
        // Remove the approved/rejected users from the pending list
        setPendingUsers(
          pendingUsers.filter((user) => !selectedUsers.includes(user._id))
        );
        setSelectedUsers([]);
        setSelectAllStudents(false);
        setSelectAllStaff(false);
      })
      .catch((error) => {
        console.error("Error handling action:", error);
        toast.error("An error occurred. Please try again.");
      });
  };

  const handleSelectAll = (type) => {
    if (type === "student") {
      if (selectAllStudents) {
        setSelectedUsers(
          selectedUsers.filter(
            (id) => !studentUsers.some((user) => user._id === id)
          )
        );
      } else {
        const studentIds = studentUsers.map((user) => user._id);
        setSelectedUsers([
          ...selectedUsers,
          ...studentIds.filter((id) => !selectedUsers.includes(id)),
        ]);
      }
      setSelectAllStudents(!selectAllStudents);
    } else if (type === "staff") {
      if (selectAllStaff) {
        setSelectedUsers(
          selectedUsers.filter(
            (id) => !staffUsers.some((user) => user._id === id)
          )
        );
      } else {
        const staffIds = staffUsers.map((user) => user._id);
        setSelectedUsers([
          ...selectedUsers,
          ...staffIds.filter((id) => !selectedUsers.includes(id)),
        ]);
      }
      setSelectAllStaff(!selectAllStaff);
    }
  };

  const handleSelectUser = (userId, type) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
      if (type === "student" && selectAllStudents) setSelectAllStudents(false);
      if (type === "staff" && selectAllStaff) setSelectAllStaff(false);
    } else {
      setSelectedUsers([...selectedUsers, userId]);
      if (
        type === "student" &&
        selectedUsers.length + 1 === studentUsers.length
      )
        setSelectAllStudents(true);
      if (type === "staff" && selectedUsers.length + 1 === staffUsers.length)
        setSelectAllStaff(true);
    }
  };

  const studentUsers = pendingUsers.filter((user) => user.type === "student");
  const staffUsers = pendingUsers.filter((user) => user.type === "staff");

  return (
    <div className="new-user-requests">
      <ToastContainer />
      <div className="new-user-requests-content">
        <div className="new-user-header">
          <span className="greater-than-icon" onClick={onBack}>
            &lt;
          </span>
          <h1>New User Requests</h1>
        </div>
        <div className="search-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search by Stop Name"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="action-buttons">
          <button
            className="approve-button"
            onClick={() => handleAction("approve")}
          >
            Approve
          </button>
          <button
            className="decline-button"
            onClick={() => handleAction("reject")}
          >
            Decline
          </button>
        </div>

        {studentUsers.length > 0 && (
          <div className="user-table">
            <h2>Student Table</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectAllStudents}
                        onChange={() => handleSelectAll("student")}
                      />
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
                  {studentUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => handleSelectUser(user._id, "student")}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{user.basicDetails.name}</td>
                      <td>{user.studentDetails.regNo || "N/A"}</td>
                      <td>{user.studentDetails.rollNo || "N/A"}</td>
                      <td>{user.studentDetails.year || "N/A"}</td>
                      <td>{user.studentDetails.department || "N/A"}</td>
                      <td>{user.studentDetails.section || "N/A"}</td>
                      <td>{user.studentDetails.instituteName || "N/A"}</td>
                      <td>{user.locationDetails.stopName || "N/A"}</td>
                      <td>Not Approved</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {staffUsers.length > 0 && (
          <div className="user-table">
            <h2>Staff Table</h2>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectAllStaff}
                        onChange={() => handleSelectAll("staff")}
                      />
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
                  {staffUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => handleSelectUser(user._id, "staff")}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{user.basicDetails.name}</td>
                      <td>{user.staffDetails.staffId || "N/A"}</td>
                      <td>{user.staffDetails.instituteName || "N/A"}</td>
                      <td>{user.staffDetails.department || "N/A"}</td>
                      <td>{user.staffDetails.designation || "N/A"}</td>
                      <td>{user.locationDetails.stopName || "N/A"}</td>
                      <td>Not Approved</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {studentUsers.length === 0 && staffUsers.length === 0 && (
          <p>No new user requests at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default NewUserRequest;
