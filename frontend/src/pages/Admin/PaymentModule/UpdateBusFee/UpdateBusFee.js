import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./UpdateBusFee.css";
import AddBusFee from "../AddBusFee/AddBusFee";
import Button from "../../../../components/Shared/Button/Button";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import TableContainer from "../../../../components/Shared/TableContainer/TableContainer";
import Pagination from "../../../../components/Shared/Pagination/Pagination";
import apiClient from "../../../../apiClient"; // Import apiClient

const UpdateBusFee = ({ onBack }) => {
  const [selectedInstitute, setSelectedInstitute] = useState(""); // Default no institute selected
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRow, setSelectedRow] = useState(null);
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

  // Debugging logs to check values
  useEffect(() => {
    console.log("Selected Institute:", selectedInstitute);
    console.log("Institutes List:", institutes);
    console.log("Bus Fee Data:", busFeeData);
  }, [selectedInstitute, institutes, busFeeData]);

  // Filtering bus fee data based on selected institute
  const filteredBusFeeData = selectedInstitute
    ? busFeeData.filter((institute) => {
        console.log(
          "Checking:",
          institute.instituteCode,
          "Against:",
          selectedInstitute
        );
        return institute.instituteCode === selectedInstitute;
      })
    : busFeeData;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBusFeeData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleRowSelect = (row) => {
    setSelectedRow(selectedRow === row.id ? null : row.id);
  };

  const handleEditClick = () => {
    if (selectedRow !== null) {
      setShowAddBusFee(true);
    }
  };

  const handleSave = (updatedData) => {
    if (selectedRow !== null) {
      setBusFeeData((prevData) =>
        prevData.map((item, index) =>
          index === selectedRow ? updatedData : item
        )
      );
    } else {
      setBusFeeData([...busFeeData, updatedData]);
    }
    setShowAddBusFee(false);
    setSelectedRow(null);
  };

  const headers = [
    "S.No",
    "Academic Year",
    "Institute",
    "Total Bus Fee",
    "Duration",
    "Term-wise Payment",
  ];

  const rows = currentItems.map((item, index) => ({
    id: indexOfFirstItem + index,
    data: {
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
  }));

  if (showAddBusFee) {
    return (
      <AddBusFee
        busFeeData={selectedRow !== null ? busFeeData[selectedRow] : null}
        onBack={() => setShowAddBusFee(false)}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="update-bus-fee-container">
      <TopBar title="Update Bus Fee" onBack={onBack} backButton={true} />
      <main className="update-bus-fee-main-content">
        <div className="update-bus-fee-controls">
          <div className="update-bus-fee-institute-selector">
            <div className="update-bus-fee-select-wrapper">
              <select
                value={selectedInstitute}
                onChange={(e) => setSelectedInstitute(e.target.value)}
              >
                <option value="">Select an Institute</option>{" "}
                {/* Default option */}
                {institutes.map((institute) => (
                  <option
                    key={institute.instituteCode}
                    value={institute.instituteCode}
                  >
                    {institute.instituteName}
                  </option>
                ))}
              </select>
            </div>
            <div className="update-bus-fee-actions">
              <Button
                title="Edit"
                onClick={handleEditClick}
                disabled={selectedRow === null}
              />
            </div>
          </div>
        </div>

        <TableContainer
          headers={headers}
          rows={rows}
          onRowClick={handleRowSelect}
          selectedRow={selectedRow}
        />

        <Pagination
          currentPage={currentPage}
          totalItems={filteredBusFeeData.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
};

export default UpdateBusFee;
