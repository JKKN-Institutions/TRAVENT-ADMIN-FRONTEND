import React, { useEffect, useState } from "react";
import "./NewUserRequest.css";
import ActionButton from "../../../../components/Shared/Button/Button";
import Loading from "../../../../components/Shared/Loading/Loading";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";

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
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setTimeout(() => {
      setPendingUsers(dummyData);
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleRowClick = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = (type) => {
    const filteredUsers = pendingUsers.filter((user) => user.type === type);
    const allSelected = filteredUsers.every((user) =>
      selectedUsers.includes(user._id)
    );
    setSelectedUsers((prev) =>
      allSelected
        ? prev.filter(
            (id) => !filteredUsers.map((user) => user._id).includes(id)
          )
        : [...new Set([...prev, ...filteredUsers.map((user) => user._id)])]
    );
  };

  const handleAction = async (action) => {
    if (!selectedUsers.length)
      return showToast("warn", "Please select at least one user.");
    const loadingToastId = showToast(
      "loading",
      `${action}ing selected users...`
    );

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPendingUsers((users) =>
        users.map((user) =>
          selectedUsers.includes(user._id)
            ? {
                ...user,
                status: action === "approve" ? "Approved" : "Declined",
              }
            : user
        )
      );
      setSelectedUsers([]);
      showToast(
        "success",
        `${action.charAt(0).toUpperCase() + action.slice(1)}d ${
          selectedUsers.length
        } user(s).`,
        loadingToastId
      );
    } catch {
      showToast("error", `Failed to ${action} users.`, loadingToastId);
    }
  };

  const headers = (type) => [
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={pendingUsers
          .filter((user) => user.type === type)
          .every((user) => selectedUsers.includes(user._id))}
        onChange={() => handleSelectAll(type)}
      />
      <span className="checkbox-checkmark"></span>
    </label>,
    "S.No",
    ...(type === "student"
      ? [
          "Student Name",
          "Reg No",
          "Roll No",
          "Year",
          "Department",
          "Section",
          "Institute Name",
          "Stop Name",
          "Status",
        ]
      : [
          "Staff Name",
          "Staff ID",
          "Institute Name",
          "Department",
          "Designation",
          "Stop Name",
          "Status",
        ]),
  ];

  const createRowData = (user, index) => ({
    id: user._id,
    data: {
      select: (
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={selectedUsers.includes(user._id)}
            onChange={() => handleRowClick(user._id)}
          />
          <span className="checkbox-checkmark"></span>
        </label>
      ),
      sNo: index + 1,
      name: user.basicDetails.name,
      regNo: user.studentDetails?.regNo || "N/A",
      rollNo: user.studentDetails?.rollNo || "N/A",
      year: user.studentDetails?.year || "N/A",
      department: user.studentDetails?.department || "N/A",
      section: user.studentDetails?.section || "N/A",
      institute: user.studentDetails?.instituteName || "N/A",
      stopName: user.locationDetails?.stopName || "N/A",
      status: (
        <span
          className={`status-badge ${
            user.status ? user.status.toLowerCase() : "pending"
          }`}
        >
          {user.status || "Not Approved"}
        </span>
      ),
    },
    onClick: () => handleRowClick(user._id),
  });

  const paginatedData = (type, currentPage) =>
    pendingUsers
      .filter((user) => user.type === type)
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const renderTable = (type, headers, currentPage, setCurrentPage) => (
    <>
      <h3>{type === "student" ? "Student Table" : "Staff Table"}</h3>
      <TableContainer
        headers={headers}
        rows={paginatedData(type, currentPage).map((user, index) =>
          createRowData(user, index)
        )}
        onRowClick={(row) => handleRowClick(row.id)}
        selectedRowId={selectedUsers}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(
          pendingUsers.filter((user) => user.type === type).length /
            itemsPerPage
        )}
        onPageChange={setCurrentPage}
      />
    </>
  );

  return isLoading ? (
    <Loading message="Loading New User Requests..." />
  ) : (
    <div className="new-user-requests">
      <ToastNotification />
      <TopBar title="New User Requests" onBack={onBack} backButton />
      <main className="new-user-requests-main-content">
        <div className="new-user-requests-controls">
          <SearchBar
            placeholder="Search by Stop Name"
            onSearch={setSearchTerm}
          />
          <div className="new-user-action-buttons-container">
            <ActionButton
              label="Approve"
              onClick={() => handleAction("approve")}
            />
            <ActionButton
              label="Decline"
              onClick={() => handleAction("decline")}
            />
          </div>
        </div>
        <div className="new-user-requests-table-container">
          {renderTable(
            "student",
            headers("student"),
            currentPageStudent,
            setCurrentPageStudent
          )}
        </div>
        <div className="new-user-requests-table-container">
          {renderTable(
            "staff",
            headers("staff"),
            currentPageStaff,
            setCurrentPageStaff
          )}
        </div>
      </main>
    </div>
  );
}

export default NewUserRequest;
