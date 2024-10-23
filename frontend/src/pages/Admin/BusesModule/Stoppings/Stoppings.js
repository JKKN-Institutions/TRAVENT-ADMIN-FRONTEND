import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faArrowLeft,
  faPlus,
  faEdit,
  faTrash,
  faChevronLeft,
  faChevronRight,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import AddNewStop from "../AddNewStop/AddNewStop";
import StoppingPassengers from "../StoppingPassengers/StoppingPassengers";
import "./Stoppings.css";
import Button from "../../../../components/Shared/Button/Button";

const Stoppings = ({ route, onBack, institutionId }) => {
  const [showAddStop, setShowAddStop] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStop, setSelectedStop] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editingStop, setEditingStop] = useState(null);
  const [stops, setStops] = useState(route.stops);
  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [showStoppingPassengers, setShowStoppingPassengers] = useState(false);
  const [selectedStopForPassengers, setSelectedStopForPassengers] =
    useState(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleViewStudents = (stop) => {
    setSelectedStopForPassengers(stop);
    setShowStoppingPassengers(true);
  };

  if (showStoppingPassengers) {
    return (
      <StoppingPassengers
        stop={selectedStopForPassengers}
        onBack={() => setShowStoppingPassengers(false)}
        institutionId={institutionId}
      />
    );
  }

  const handleOutsideClick = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setSelectedStop(null);
    }
  };

  const handleStopClick = (stop) => {
    setSelectedStop(selectedStop?.stopID === stop.stopID ? null : stop);
  };

  const handleDeleteStop = () => {
    setStops(stops.filter((stop) => stop.stopID !== selectedStop.stopID));
    setShowDeleteConfirmation(false);
    setSelectedStop(null);
  };

  const handleEditStop = () => {
    if (selectedStop) {
      setEditingStop(selectedStop);
      setShowAddStop(true);
    }
  };

  const handleAddOrEditComplete = (newOrUpdatedStop) => {
    if (newOrUpdatedStop) {
      setStops((prevStops) => {
        if (editingStop) {
          return prevStops.map((stop) =>
            stop.stopID === newOrUpdatedStop.stopID ? newOrUpdatedStop : stop
          );
        } else {
          return [...prevStops, newOrUpdatedStop];
        }
      });
    }
    setShowAddStop(false);
    setEditingStop(null);
    setSelectedStop(null);
  };

  const filteredStops = stops.filter(
    (stop) => stop.stopName?.toLowerCase().includes(searchTerm.toLowerCase()) // Ensure stopName is a string
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStops.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredStops.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="stoppings-container" ref={containerRef}>
      {!showAddStop ? (
        <>
          <header className="stoppings-top-bar">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="stoppings-menu-icon"
              onClick={onBack}
            />
            <h2>Stoppings for Route {route.routeNumber}</h2>
          </header>

          <main className="stoppings-main-content">
            <div className="stoppings-search-bar-container">
              <div className="search-input-wrapper">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  className="stoppings-search-bar"
                  placeholder="Search by Stop Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="action-buttons-container">
              <Button
                label={
                  <>
                    <FontAwesomeIcon icon={faPlus} /> Add
                  </>
                }
                onClick={() => setShowAddStop(true)}
              />

              <Button
                label={
                  <>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </>
                }
                onClick={handleEditStop}
                disabled={!selectedStop}
              />

              <Button
                label={
                  <>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </>
                }
                onClick={() => setShowDeleteConfirmation(true)}
                disabled={!selectedStop}
              />
            </div>

            <div className="stoppings-table-container">
              <div className="stoppings-table-wrapper">
                <table className="stoppings-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Stop Name</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>District</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Board Time</th>
                      <th>Drop Time</th>
                      <th>Boarding Count Morning</th>
                      <th>Boarding Count Evening</th>
                      <th>View Passengers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((stop, index) => (
                      <tr
                        key={stop.stopID || index}
                        onClick={() => handleStopClick(stop)}
                        className={
                          selectedStop?.stopID === stop.stopID ? "selected" : ""
                        }
                      >
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>{stop.stopName}</td>
                        <td>{stop.latitude}</td>
                        <td>{stop.longitude}</td>
                        <td>{stop.districtName}</td>
                        <td>{stop.cityName}</td>
                        <td>{stop.stateName}</td>
                        <td>{stop.boardTime}</td>
                        <td>{stop.dropTime}</td>
                        <td>{stop.boardingCountMorning}</td>
                        <td>{stop.boardingCountEvening}</td>
                        <td>
                          <span
                            className="view-passengers-link"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewStudents(stop);
                            }}
                          >
                            <FontAwesomeIcon icon={faEye} /> View Passengers
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="stoppings-pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="stoppings-pagination-button"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`stoppings-pagination-button ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
                className="stoppings-pagination-button"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </main>

          {showDeleteConfirmation && (
            <div className="stoppings-delete-confirmation-modal">
              <div className="stoppings-delete-confirmation-content">
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete this stop?</p>
                <div className="stoppings-delete-confirmation-buttons">
                  <button
                    onClick={() => setShowDeleteConfirmation(false)}
                    className="stoppings-cancel-delete"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteStop}
                    className="stoppings-confirm-delete"
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <AddNewStop
          route={route}
          onBack={handleAddOrEditComplete}
          institutionId={institutionId}
          editingStop={editingStop}
        />
      )}
    </div>
  );
};

export default Stoppings;
