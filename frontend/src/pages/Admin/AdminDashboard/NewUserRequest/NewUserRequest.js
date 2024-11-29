import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "../../../../components/Shared/Button/Button";
import Loading from "../../../../components/Shared/Loading/Loading";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import SearchBar from "../../../../components/Shared/SearchBar/SearchBar";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import apiClient from "../../../../apiClient";
import SpecificPassengerDetails from "../SpecificPassengerDetails/SpecificPassengerDetails";
import "./NewUserRequest.css";

// Decline Modal
const DeclineOverlay = ({ onClose, onSubmit }) => {
  const [declineReason, setDeclineReason] = useState("");

  const handleSubmit = () => {
    console.log("Decline Reason:", declineReason); // Add this log to check the reason
    if (declineReason.trim()) {
      onSubmit(declineReason);
    } else {
      showToast("warn", "Please provide a reason for declining.");
    }
  };

  return (
    <div className="new-user-decline-overlay">
      <div className="new-user-decline-overlay-content">
        <h3>Decline Reason</h3>
        <textarea
          value={declineReason}
          onChange={(e) => setDeclineReason(e.target.value)}
          placeholder="Provide a reason for declining"
        />
        <div className="new-user-decline-overlay-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

function NewUserRequest({ onBack }) {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [viewingUser, setViewingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageStudent, setCurrentPageStudent] = useState(1);
  const [currentPageStaff, setCurrentPageStaff] = useState(1);
  const [declineOverlayVisible, setDeclineOverlayVisible] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await apiClient.get("/passengers/pending-passengers");
        setPendingUsers(response.data);
      } catch (error) {
        console.error("Error fetching pending users:", error);
        showToast("error", "Failed to fetch pending users.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingUsers();
  }, []);

  const handleRowClick = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleViewUser = (user) => {
    setViewingUser(user); // Set the user being viewed
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

  // Handle the approve or decline action
  const handleAction = async (action) => {
    if (!selectedUsers.length)
      return showToast("warn", "Please select at least one user.");

    // Ensure that the reason is provided before proceeding with decline
    if (action === "decline" && !declineReason.trim()) {
      showToast("warn", "Please provide a reason for declining.");
      return;
    }

    const loadingToastId = showToast(
      "loading",
      `${action.charAt(0).toUpperCase() + action.slice(1)}ing selected users...`
    );

    try {
      const response = await apiClient.post(
        `/passengers/${action}-passengers`,
        { selectedUsers, reason: declineReason }
      );
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

      if (action === "decline") {
        // Send email notifications for declined users
        selectedUsers.forEach((userId) => {
          const user = pendingUsers.find((user) => user._id === userId);
        });
      }
    } catch (error) {
      console.error("Error response:", error.response); // Log the error details
      showToast("error", `Failed to ${action} users.`, loadingToastId);
    } finally {
      setDeclineOverlayVisible(false);
    }
  };

  const headers = (type) => [
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={
          pendingUsers.filter((user) => user.type === type).length > 0 &&
          pendingUsers.every((user) => selectedUsers.includes(user._id))
        }
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
          "View Details",
          "Status",
        ]
      : [
          "Staff Name",
          "Staff ID",
          "Institute Name",
          "Department",
          "Designation",
          "Stop Name",
          "View Details",
          "Status",
        ]),
  ];

  const createRowData = (user, index) => {
    const isStudent = user.type === "student";

    // Conditionally render data based on user type
    return {
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
        ...(isStudent
          ? {
              name: user.basicDetails.name || "N/A",
              regNo: user.studentDetails?.regNo || "N/A",
              rollNo: user.studentDetails?.rollNo || "N/A",
              year: user.studentDetails?.year || "N/A",
              department: user.studentDetails?.department || "N/A",
              section: user.studentDetails?.section || "N/A",
              institute: user.studentDetails?.instituteName || "N/A",
              stopName: user.locationDetails?.stopName || "N/A",
            }
          : {
              name: user.basicDetails.name || "N/A",
              staffId: user.staffDetails?.staffId || "N/A",
              institute: user.staffDetails?.instituteName || "N/A",
              department: user.staffDetails?.department || "N/A",
              designation: user.staffDetails?.designation || "N/A",
              stopName: user.locationDetails?.stopName || "N/A",
            }),
        viewDetails: (
          <FontAwesomeIcon
            icon={faEye}
            className="view-icon"
            onClick={(e) => {
              e.stopPropagation();
              handleViewUser(user); // Show user details on click
            }}
          />
        ),
        status: (
          <span
            className={`status-badge ${
              user.status ? user.status.toLowerCase() : "pending"
            }`}
          >
            {user.status || "Pending"}
          </span>
        ),
      },
      onClick: () => handleRowClick(user._id),
    };
  };

  const paginatedData = (type, currentPage) => {
    return pendingUsers
      .filter((user) => user.type === type)
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  };

  const renderTable = (type, currentPage, setCurrentPage) => {
    const rows = paginatedData(type, currentPage).map((user, index) =>
      createRowData(user, index)
    );

    return (
      <div className="user-table-container">
        <div className="new-user-table-header">
          <h3>{type === "student" ? "Student Table" : "Staff Table"}</h3>
          <p className="new-user-total-count">
            Total {type === "student" ? "Students" : "Staff"}:{" "}
            {pendingUsers.filter((user) => user.type === type).length}
          </p>
        </div>
        <TableContainer
          headers={headers(type)}
          rows={rows}
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
      </div>
    );
  };

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
              onClick={() => setDeclineOverlayVisible(true)}
            />
          </div>
        </div>
        <div className="new-user-requests-table-container">
          {renderTable(
            "student",

            currentPageStudent,
            setCurrentPageStudent
          )}
          {renderTable(
            "staff",

            currentPageStaff,
            setCurrentPageStaff
          )}
        </div>
        {viewingUser && (
          <SpecificPassengerDetails
            user={viewingUser}
            onClose={() => setViewingUser(null)} // Close user details view
          />
        )}
        {declineOverlayVisible && (
          <DeclineOverlay
            onClose={() => setDeclineOverlayVisible(false)}
            onSubmit={(reason) => {
              setDeclineReason(reason);
              handleAction("decline");
            }}
          />
        )}
      </main>
    </div>
  );
}

export default NewUserRequest;
