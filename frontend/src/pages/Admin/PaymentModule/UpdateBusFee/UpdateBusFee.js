import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./UpdateBusFee.css";
import AddBusFee from "../AddBusFee/AddBusFee";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import apiClient from "../../../../apiClient"; // Import apiClient
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";

const UpdateBusFee = ({ onBack }) => {
  const [selectedInstitute, setSelectedInstitute] = useState(""); // Default no institute selected
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]); // Changed from selectedRow to selectedRows
  const [showAddBusFee, setShowAddBusFee] = useState(false);
  const [busFeeData, setBusFeeData] = useState([]); // All bus fee data for all institutes
  const [institutes, setInstitutes] = useState([]); // To store fetched institutes

  const institutionId = localStorage.getItem("institutionId");

  useEffect(() => {
    if (institutionId) {
      // Fetch the institutes list based on the institutionId
      apiClient
        .get(`/institutions/institutes/${institutionId}`)
        .then((response) => {
          const instituteList = response.data.institutes || [];
          setInstitutes(instituteList);
        })
        .catch((error) => {
          console.error("Error fetching institutes:", error);
        });

      // Fetch bus fee details for all institutes
      apiClient
        .get(`/institutions/bus-fee/${institutionId}`)
        .then((response) => {
          setBusFeeData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching bus fee details:", error);
        });
    } else {
      console.error("Institution ID not found in local storage.");
    }
  }, [institutionId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = busFeeData.slice(indexOfFirstItem, indexOfLastItem);

  const handleRowSelect = (row) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(row.id)
        ? prevSelected.filter((id) => id !== row.id)
        : [...prevSelected, row.id]
    );
  };
  const handleEditClick = () => {
    if (selectedRows.length === 1) {
      const selectedData = busFeeData[selectedRows[0]]; // Get the selected row data
      if (selectedData) {
        // Extract the bus fee details from the selected data
        const busFeeDetails = {
          institute: selectedData.instituteCode, // or the appropriate field for institute name
          academicYearStart: selectedData.academicYearStart,
          academicYearEnd: selectedData.academicYearEnd,
          totalBusFee: selectedData.totalBusFee,
          duration: selectedData.duration || {},
          termWisePayment: selectedData.termWisePayment || {},
        };

        setShowAddBusFee(true); // Show the AddBusFee form
        setSelectedInstitute(busFeeDetails); // Pass the bus fee details to the AddBusFee component
      }
    }
  };

  const handleDeleteClick = () => {
    if (selectedRows.length > 0) {
      const recordsToDelete = selectedRows
        .map((selectedIndex) => {
          const selectedData = busFeeData[selectedIndex];

          // Ensure instituteCode is present
          const instituteCode = selectedData?.instituteCode || "Unknown";

          return selectedData.busFees.map((fee) => ({
            institutionId: institutionId,
            instituteCode: instituteCode,
            academicYearStart: fee.academicYearStart,
            academicYearEnd: fee.academicYearEnd,
          }));
        })
        .flat();

      // Call the backend to delete the records
      apiClient
        .post("/institutions/delete-bus-fee", { records: recordsToDelete })
        .then((response) => {
          console.log("Delete response:", response.data);

          // Clear selection after deletion
          setSelectedRows([]);

          // Re-fetch bus fee data after deletion
          apiClient
            .get(`/institutions/bus-fee/${institutionId}`)
            .then((response) => {
              const updatedData = response.data;
              setBusFeeData(updatedData); // Update the bus fee data in the state
              showToast("success", "Bus fee records deleted successfully!");
            })
            .catch((error) => {
              console.error("Error fetching bus fee details:", error);
              showToast("error", "Failed to fetch updated bus fee records.");
            });
        })
        .catch((error) => {
          console.error("Error deleting bus fee records:", error);
          showToast(
            "error",
            "Failed to delete bus fee records. Please try again."
          );
        });
    }
  };

  const handleSave = (updatedData) => {
    if (selectedRows.length === 1) {
      setBusFeeData((prevData) =>
        prevData.map((item, index) =>
          index === selectedRows[0] ? updatedData : item
        )
      );
    } else {
      setBusFeeData([...busFeeData, updatedData]);
    }
    setShowAddBusFee(false);
    setSelectedRows([]);
  };

  const headers = [
    <label className="custom-checkbox">
      <input
        type="checkbox"
        checked={selectedRows.length === currentItems.length}
        onChange={() => {
          if (selectedRows.length === currentItems.length) {
            setSelectedRows([]); // Deselect all
          } else {
            setSelectedRows(currentItems.map((item) => item.id)); // Select all
          }
        }}
      />
      <span className="checkbox-checkmark"></span>
    </label>,
    "S.No",
    "Academic Year",
    "Institute",
    "Total Bus Fee",
    "Duration",
    "Term-wise Payment",
  ];

  const rows = currentItems
    .map((item, index) => {
      if (!item.busFees || item.busFees.length === 0) {
        return null; // Skip rows where bus fees are empty
      }

      return {
        id: indexOfFirstItem + index,
        data: {
          select: (
            <label className="custom-checkbox">
              <input
                type="checkbox"
                checked={selectedRows.includes(indexOfFirstItem + index)}
                onChange={() =>
                  handleRowSelect({ id: indexOfFirstItem + index })
                }
              />
              <span className="checkbox-checkmark"></span>
            </label>
          ),
          "S.No": indexOfFirstItem + index + 1,
          Institute: item.instituteName,
          "Academic Year": item.busFees
            .map((fee) => `${fee.academicYearStart}-${fee.academicYearEnd}`)
            .join(", "),
          "Total Bus Fee": item.busFees
            .map((fee) => `₹${fee.totalBusFee}`)
            .join(", "),
          Duration: item.busFees.map((fee) => (
            <div key={fee.academicYearStart}>
              {Object.entries(fee.duration).map(([term, { start, end }]) => (
                <div key={term} className="duration-item">
                  <span className="duration-term">
                    {term.charAt(0).toUpperCase() + term.slice(1)}:
                  </span>
                  <span className="duration-dates">
                    {new Date(start).toLocaleDateString()} to{" "}
                    {new Date(end).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )),
          "Term-wise Payment": item.busFees.map((fee) => (
            <div key={fee.academicYearStart}>
              {Object.entries(fee.termWisePayment).map(
                ([term, { amount, dueDate }]) => (
                  <div key={term} className="payment-item">
                    <span className="payment-term">
                      {term.charAt(0).toUpperCase() + term.slice(1)}:
                    </span>
                    <span className="payment-amount">₹{amount}</span>
                    <span className="payment-due-date">
                      Due: {new Date(dueDate).toLocaleDateString()}
                    </span>
                  </div>
                )
              )}
            </div>
          )),
        },
      };
    })
    .filter(Boolean); // Remove any null or undefined rows

  if (showAddBusFee) {
    return (
      <AddBusFee
        busFeeData={
          selectedRows.length === 1 ? busFeeData[selectedRows[0]] : null
        }
        onBack={() => setShowAddBusFee(false)}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="update-bus-fee-container">
      <ToastNotification />
      <TopBar title="Update Bus Fee" onBack={onBack} backButton={true} />
      <main className="update-bus-fee-main-content">
        <div className="update-bus-fee-controls">
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </>
            }
            onClick={handleEditClick}
            disabled={selectedRows.length !== 1}
          />
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </>
            }
            onClick={handleDeleteClick}
            disabled={selectedRows.length === 0}
          />
        </div>

        <TableContainer
          headers={headers}
          rows={rows}
          onRowClick={(row) => handleRowSelect(row)}
          selectedRowId={selectedRows}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(busFeeData.length / itemsPerPage)}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default UpdateBusFee;
