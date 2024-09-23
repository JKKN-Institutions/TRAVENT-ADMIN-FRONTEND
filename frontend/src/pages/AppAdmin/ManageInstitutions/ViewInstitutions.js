import React, { useState } from "react";
import "./ViewInstitutions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPlus,
  faEdit,
  faTrash,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import AddInstitutionForm from "./AddInstitutionForm";

const ViewInstitutions = ({ toggleSidebar, onAdd }) => {
  const [institutions, setInstitutions] = useState([
    {
      id: 1,
      code: "1234",
      name: "JKKN College of Arts & Science",
      state: "Tamil Nadu",
      departments: 10,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 2,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 3,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 4,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 5,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 6,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 7,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 8,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 9,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
    {
      id: 10,
      code: "1235",
      name: "JKKN Dental College & Hospital",
      state: "Tamil Nadu",
      departments: 12,
      routes: 40,
      buses: 40,
      adminName: "Kathir S",
      adminContact: "9876543210",
      createdAt: "10-08-2024 10:00 AM",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleFormSave = (newInstitution) => {
    setInstitutions([
      ...institutions,
      { id: institutions.length + 1, ...newInstitution },
    ]);
    setIsAdding(false);
  };

  // Add this function to handle the back action
  const handleBack = () => {
    setIsAdding(false); // Set to false to show the ViewInstitutions component
  };

  return (
    <div className="view-institutions-container">
      <header className="view-institutions-top-bar">
        <div className="view-institutions-menu-icon">
          <FontAwesomeIcon
            icon={faBars}
            className="menu-icon"
            onClick={toggleSidebar}
          />
        </div>
        <div className="view-institutions-header">
          <h2>Manage Institutions</h2>
        </div>
      </header>

      <main className="view-institutions-main-content">
        {!isAdding ? (
          <>
            <div className="view-institutions-search-bar-container">
              <div className="search-input-wrapper">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  className="view-institutions-search-bar"
                  placeholder="Search institutions..."
                />
              </div>
            </div>

            <div className="action-buttons-container">
              <button
                className="view-institutions-action-button view-institutions-add-button"
                onClick={handleAddClick}
              >
                <FontAwesomeIcon icon={faPlus} /> Add
              </button>
              <button className="view-institutions-action-button view-institutions-edit-button">
                <FontAwesomeIcon icon={faEdit} /> Edit
              </button>
              <button className="view-institutions-action-button view-institutions-delete-button">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
            </div>

            <div className="appadmin-table-container">
              <table className="view-institutions-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Institution Code</th>
                    <th>Institute Name</th>
                    <th>Institute State</th>
                    <th>Departments Count</th>
                    <th>Total Routes</th>
                    <th>Total Buses</th>
                    <th>Admin Name</th>
                    <th>Admin Contact</th>
                    <th>Created at</th>
                  </tr>
                </thead>
                <tbody>
                  {institutions.map((institution, index) => (
                    <tr key={institution.id}>
                      <td>{index + 1}</td>
                      <td>{institution.code}</td>
                      <td>{institution.name}</td>
                      <td>{institution.state}</td>
                      <td>{institution.departments}</td>
                      <td>{institution.routes}</td>
                      <td>{institution.buses}</td>
                      <td>{institution.adminName}</td>
                      <td>{institution.adminContact}</td>
                      <td>{institution.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <AddInstitutionForm onSave={handleFormSave} onBack={handleBack} />
        )}
      </main>
    </div>
  );
};

export default ViewInstitutions;
