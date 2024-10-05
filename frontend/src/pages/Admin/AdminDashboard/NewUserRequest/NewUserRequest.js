import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./NewUserRequest.css";

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

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setPendingUsers(dummyData);
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAction = (action) => {
    if (selectedUsers.length === 0) {
      toast.warn("Please select at least one user.");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success(`Users ${action}ed successfully`);
      setPendingUsers(
        pendingUsers.filter((user) => !selectedUsers.includes(user._id))
      );
      setSelectedUsers([]);
      setSelectAllStudents(false);
      setSelectAllStaff(false);
    }, 1000);
  };

  const handleSelectAll = (type) => {
    const usersOfType = pendingUsers.filter((user) => user.type === type);
    const allSelected = usersOfType.every((user) =>
      selectedUsers.includes(user._id)
    );

    if (allSelected) {
      setSelectedUsers(
        selectedUsers.filter(
          (id) => !usersOfType.some((user) => user._id === id)
        )
      );
    } else {
      const newSelectedUsers = [
        ...selectedUsers,
        ...usersOfType.map((user) => user._id),
      ];
      setSelectedUsers([...new Set(newSelectedUsers)]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // ... keep existing code (handleSelectAll, handleSelectUser functions)

  const studentUsers = pendingUsers.filter((user) => user.type === "student");
  const staffUsers = pendingUsers.filter((user) => user.type === "staff");

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="new-user-requests">
      <ToastContainer />
      <header className="new-user-requests-top-bar">
        <button className="new-user-requests-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="new-user-requests-header">
          <h2>New User Requests</h2>
        </div>
      </header>

      <main className="new-user-requests-main-content">
        <div className="new-user-requests-search-bar-container">
          <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="new-user-requests-search-bar"
              placeholder="Search by Stop Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="action-buttons-container">
          <button
            className="new-user-requests-action-button new-user-requests-approve-button"
            onClick={() => handleAction("approve")}
          >
            Approve
          </button>
          <button
            className="new-user-requests-action-button new-user-requests-decline-button"
            onClick={() => handleAction("reject")}
          >
            Decline
          </button>
        </div>

        {studentUsers.length > 0 && (
          <div className="new-user-requests-table-container">
            <h3>Student Table</h3>
            <table className="new-user-requests-table">
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
        )}

        {staffUsers.length > 0 && (
          <div className="new-user-requests-table-container">
            <h3>Staff Table</h3>
            <table className="new-user-requests-table">
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
        )}

        {studentUsers.length === 0 && staffUsers.length === 0 && (
          <p className="no-requests">No new user requests at the moment.</p>
        )}
      </main>
    </div>
  );
}

export default NewUserRequest;
