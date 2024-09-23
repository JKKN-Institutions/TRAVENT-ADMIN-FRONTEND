import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import CurrentAlter from "./CurrentAlter";

const UploadAlter = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fetchedBusData, setFetchedBusData] = useState([]);
  const [planData, setPlanData] = useState([]);
  const [uploadMessage, setUploadMessage] = useState(false);

  const [unallocatedStudents, setUnallocatedStudents] = useState([]);
  const [busDetails, setBusDetails] = useState({});
  const [studentDetails, setStudentDetails] = useState({});
  const overlayClass = `loading-overlay${loading ? " visible" : ""}`;
  const [selectedFilters, setSelectedFilters] = useState([]); // Store selected filters
  const [selectedFilterOptions, setSelectedFilterOptions] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showNetworkErrorToast, setShowNetworkErrorToast] = useState(false);
  const [showServerNetworkErrorToast, setShowServerNetworkErrorToast] =
    useState(false);
  const [showUnexpectedErrorToast, setShowUnexpectedErrorToast] =
    useState(false);
  const [showChooseDate, setShowChooseDate] = useState(false);
  const [showChooseCorrectDate, setShowChooseCorrectDate] = useState(false);
  const [showAlternativePlanUpdated, setShowAlternativePlanUpdated] =
    useState(false);
  const [showNoPlanErrorToast, setShowNoPlanErrorToast] = useState(false);
  const [showAlternativePlanReverted, setShowAlternativePlanReverted] =
    useState(false);

  const [showAlterConfirmationPrompt, setShowAlterConfirmationPrompt] =
    useState(false);
  const [showRevertConfirmationPrompt, setShowRevertConfirmationPrompt] =
    useState(false);

  const [showCurrentAlter, setShowCurrentAlter] = useState(false);

  const [filterOptions, setFilterOptions] = useState({
    department: [
      "Computer Science and Engineering",
      "Civil Engineering",
      "Mechanical",
      "Information Technology",
    ],
    year: ["First Year", "Second Year", "Third Year", "Final Year"],
    section: ["A", "B", "C"],
    placed: ["yes", "no"],
    scholar: ["day-scholar", "hosteler"],
  });

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/fetch_bus_data"
        );
        if (response.status === 200) {
          setFetchedBusData(response.data);
        } else {
          console.error("Failed to fetch bus data");
        }
      } catch (error) {
        console.error("Error fetching bus data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
    fetchBusData();
  }, []);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/fetch_student_details"
        );
        if (response.status === 200) {
          setStudentDetails(response.data.studentData);
        } else {
          console.error("Failed to fetch Student data");
        }
      } catch (error) {
        console.error("Error fetching Student data:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
    fetchStudentData();
  }, []);
  useEffect(() => {
    initializeBusDetails();
  }, []);

  const handleUpload = () => {
    if (studentDetails && fetchedBusData) {
      setUploadMessage(true);
      initializeBusDetails();
    }
  };

  useEffect(() => {
    if (studentDetails && fetchedBusData) {
      setUploadMessage(true);
      initializeBusDetails();
    }
  }, [studentDetails, fetchedBusData]);

  const initializeBusDetails = () => {
    const details = {};
    if (Array.isArray(fetchedBusData.busData)) {
      fetchedBusData.busData.forEach((bus, index) => {
        const route = bus[0];
        const stopping = bus[2];
        const time = bus[3];

        if (!details[route]) {
          details[route] = {
            capacity: 60,
            remainingCapacity: 60,
            stoppings: [],
          };
        }
        details[route].stoppings.push({
          stopping,
          time,
          boardingCount: 0,
        });
      });
    } else {
      console.error(
        "Bus data is not fetched yet or is not in the correct format."
      );
    }
    setBusDetails(details);
  };

  const handleUpdateAlterPlan = async () => {
    if (!navigator.onLine) {
      setShowNetworkErrorToast(true);
      setTimeout(() => {
        setShowNetworkErrorToast(false);
      }, 5300);
      return;
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    if (
      startDate === "" ||
      endDate === "" ||
      startDate === null ||
      endDate === null
    ) {
      // alert("Choose Date before updating");
      setShowAlterConfirmationPrompt(false);
      setShowChooseDate(true);
      setTimeout(() => {
        setShowChooseDate(false);
      }, 5300);
      return;
    } else if (startDateObj >= endDateObj) {
      // alert("Start date must be before the end date");
      setShowAlterConfirmationPrompt(false);
      setShowChooseCorrectDate(true);
      setTimeout(() => {
        setShowChooseCorrectDate(false);
      }, 5300);
      return;
    }

    setShowAlterConfirmationPrompt(false);
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/update_alter_plan`,
        {
          start_date: startDate,
          end_date: endDate,
          filterOptions: selectedFilterOptions,
          planData: planData, // Assuming planData is correctly structured as an object
          plan_status: "Active Plan",
        }
      );

      if (response.status === 200) {
        setShowAlternativePlanUpdated(true);
        setTimeout(() => {
          setShowAlternativePlanUpdated(false);
          setShowCurrentAlter(true);
          setUploadMessage(false);
        }, 5300);
      } else if (response.status === 500) {
        setShowServerNetworkErrorToast(true);
        setTimeout(() => {
          setShowServerNetworkErrorToast(false);
        }, 5300);
      }
      //setMessage(response.data.message);
    } catch (error) {
      setShowUnexpectedErrorToast(true);
      setTimeout(() => {
        setShowUnexpectedErrorToast(false);
      }, 5300);
      console.error("Error updating Alter plan:", error);
      setMessage("Failed to update Alter plan");
    } finally {
      setShowAlterConfirmationPrompt(false);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  const handleRevertAlterPlan = async () => {
    if (!navigator.onLine) {
      setShowNetworkErrorToast(true);
      setTimeout(() => {
        setShowNetworkErrorToast(false);
      }, 5300);
      return;
    }

    console.log("button pressed");

    setShowRevertConfirmationPrompt(false);
    setLoading(true); // Set loading state to true before making the request
    try {
      const response = await axios.post(
        `http://localhost:3000/api/revert_alter_plan`
      );
      // Handle response if needed
      if (response.status === 200) {
        setShowAlternativePlanReverted(true);
        setTimeout(() => {
          setShowAlternativePlanReverted(false);
        }, 5300);
      } else if (response.status === 404) {
        setShowNoPlanErrorToast(true);
        setTimeout(() => {
          setShowNoPlanErrorToast(false);
        }, 5300);
      } else if (response.status === 500) {
        setShowServerNetworkErrorToast(true);
        setTimeout(() => {
          setShowServerNetworkErrorToast(false);
        }, 5300);
      }
      //setMessage(response.data.message); // revert the message state with the response from the server
    } catch (error) {
      setShowUnexpectedErrorToast(true);
      setTimeout(() => {
        setShowUnexpectedErrorToast(false);
      }, 5300);
      console.error("Error reverting regular plan:", error);
      setMessage("Failed to revert regular plan");
    } finally {
      setShowRevertConfirmationPrompt(false);
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Set loading state to false regardless of success or failure
    }
  };

  const handleSetStartDate = (event) => {
    setStartDate(event.target.value);
  };
  const handleSetEndDate = (event) => {
    setEndDate(event.target.value);
  };

  const handleFilterSelect = (filterType, value) => {
    initializeBusDetails();

    setSelectedFilterOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions };
      // Check if the value already exists in the selected options for the filter type
      if (
        updatedOptions[filterType] &&
        !updatedOptions[filterType].includes(value)
      ) {
        updatedOptions[filterType] = [...updatedOptions[filterType], value];
      } else if (!updatedOptions[filterType]) {
        updatedOptions[filterType] = [value];
      }
      return updatedOptions;
    });
  };

  // Function to handle removing a filter option
  const handleRemoveFilter = (filterType, value) => {
    initializeBusDetails();

    setSelectedFilterOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions };
      if (updatedOptions[filterType]) {
        updatedOptions[filterType] = updatedOptions[filterType].filter(
          (option) => option !== value
        );
      }
      return updatedOptions;
    });
  };

  // Apply filters directly
  useEffect(() => {
    if (studentDetails.length > 0) {
      let filteredStudents = [...studentDetails];

      // Apply filters
      Object.keys(selectedFilterOptions).forEach((filterType) => {
        const selectedOptions = selectedFilterOptions[filterType];
        if (selectedOptions.length > 0) {
          filteredStudents = filteredStudents.filter((student) =>
            selectedOptions.includes(student[filterType])
          );
        }
      });
      generatePlan(filteredStudents);
    }
  }, [selectedFilterOptions, studentDetails, uploadMessage]);

  const generatePlan = (filteredStudents) => {
    const newPlan = [];
    const unallocated = [];
    const totalBoardingCountByRoute = {};
    const allocatedStudents = new Set(); // Set to track allocated students

    for (const route in busDetails) {
      if (busDetails.hasOwnProperty(route)) {
        totalBoardingCountByRoute[route] = 0;
        const routeDetails = busDetails[route];
        routeDetails.remainingCapacity = routeDetails.capacity;
      }
    }

    filteredStudents.forEach((student) => {
      const stopping = student.bus_stopping.trim(); // Trim the stopping name
      let allocated = false;

      if (allocatedStudents.has(student.reg_no)) {
        // If student is already allocated, skip to the next student
        return;
      }

      for (const route in busDetails) {
        if (busDetails.hasOwnProperty(route)) {
          const routeDetails = busDetails[route];
          const { stoppings, capacity, remainingCapacity } = routeDetails;
          const stoppingDetails = stoppings.find(
            (stop) => stop.stopping.trim() === stopping // Trim the stopping name for comparison
          );
          if (
            stoppingDetails &&
            stoppingDetails.boardingCount < capacity &&
            remainingCapacity > 0
          ) {
            stoppingDetails.boardingCount++;
            totalBoardingCountByRoute[route]++;
            routeDetails.remainingCapacity--;
            const existingRow = newPlan.find(
              (row) => row.route === route && row.stopping === stopping
            );
            if (existingRow) {
              existingRow.boardingCount++;
              if (!existingRow.regNo.includes(student.reg_no)) {
                existingRow.regNo.push(student.reg_no);
              }
            } else {
              newPlan.push({
                route,
                stopping,
                time: stoppingDetails.time,
                boardingCount: 1,
                regNo: [student.reg_no],
                totalBoardingCountByRoute,
              });
            }
            allocatedStudents.add(student.reg_no); // Mark student as allocated
            allocated = true; // Mark the student as allocated
            break;
          }
        }
      }
      if (!allocated) {
        if (
          !unallocated.some(
            (u) => u.regNo === student.reg_no && u.stopping === stopping
          )
        ) {
          unallocated.push({ regNo: student.reg_no, stopping });
        }
      }
    });

    // Sort the planData based on route number in ascending order
    newPlan.sort((a, b) => a.route.localeCompare(b.route));

    setUnallocatedStudents(unallocated);
    setPlanData(newPlan);
  };

  function groupUnallocatedByStopping(unallocatedStudents) {
    const unallocatedByStopping = {};
    unallocatedStudents.forEach((student) => {
      const stopping = student.stopping.trim(); // Trim the stopping name
      if (!unallocatedByStopping[stopping]) {
        unallocatedByStopping[stopping] = [];
      }
      unallocatedByStopping[stopping].push(student);
    });
    return unallocatedByStopping;
  }

  const totalBoardingCounts = planData.reduce((acc, curr) => {
    acc[curr.route] = (acc[curr.route] || 0) + curr.boardingCount;
    return acc;
  }, {});

  // Call the function passing the unallocated students array
  const unallocatedByStopping = groupUnallocatedByStopping(unallocatedStudents);

  console.log("startDate,endDate", startDate, endDate);

  const handleToastClose = () => {
    if (showAlternativePlanUpdated) {
      setShowAlternativePlanUpdated(false);
    } else if (showAlternativePlanReverted) {
      setShowAlternativePlanReverted(false);
    } else if (showNetworkErrorToast) {
      setShowNetworkErrorToast(false);
    } else if (showUnexpectedErrorToast) {
      setShowUnexpectedErrorToast(false);
    } else if (showServerNetworkErrorToast) {
      setShowServerNetworkErrorToast(false);
    } else if (showChooseDate) {
      setShowChooseDate(false);
    } else if (showChooseCorrectDate) {
      setShowChooseCorrectDate(false);
    } else if (showNoPlanErrorToast) {
      setShowNoPlanErrorToast(false);
    }
  };

  const handleShowAlterPlan = (e) => {
    setShowAlterConfirmationPrompt(true);
  };

  const handleShowRevertAlterPlan = (e) => {
    setShowRevertConfirmationPrompt(true);
  };

  return (
    <div>
      {showCurrentAlter && (
        <>
          <div className="do-wrap">
            <div class="wrap-content-create-emp container">
              <a>
                <img src="./uploads/alter-plan.png" />
                Smart Plan
              </a>
            </div>
            <div className="wrap-body-container container">
              <CurrentAlter />
            </div>
          </div>
        </>
      )}
      <div className="upload-regular-container">
        <div class="wrap-content-create-emp container">
          <a>
            <img src="./uploads/update-plan.png" />
            Update Smart Plan
          </a>
        </div>
        <div className="upload-regular-sub-container">
          <div className="wrap-body-container container">
            {loading && (
              <div className="skeleton-inner-container">
                <div className="skeleton-wrap">
                  <div className="skeleton skeleton-date-section"></div>
                  <div className="skeleton skeleton-filter-section"></div>
                  <div className="skeleton-bus-wrap-inside">
                    <div className="skeleton skeleton-sub-bus-section"></div>
                    <div className="skeleton skeleton-sub-bus-section"></div>
                  </div>
                </div>
              </div>
            )}

            {showAlterConfirmationPrompt && (
              <div className="logout-overlay">
                <div className="confirmation-container">
                  <p>Are you sure you want to update the smart plan?</p>
                  <div className="confirm-buttons-container">
                    <button
                      className="confirm-button"
                      onClick={handleUpdateAlterPlan}
                    >
                      Yes
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setShowAlterConfirmationPrompt(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showRevertConfirmationPrompt && (
              <div className="logout-overlay">
                <div className="confirmation-container">
                  <p>Are you sure you want to revert the smart plan?</p>
                  <div className="confirm-buttons-container">
                    <button
                      className="confirm-button"
                      onClick={handleRevertAlterPlan}
                    >
                      Yes
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setShowRevertConfirmationPrompt(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}

            {(showAlternativePlanUpdated || showAlternativePlanReverted) && (
              <div className="toast toast-active">
                <div className="toast-content">
                  <i class="bx bx-check toast-check"></i>
                  <div className="toast-message">
                    {showAlternativePlanUpdated && (
                      <>
                        <span className="toast-text toast-text-2">
                          Smart plan updated successfully!
                        </span>
                      </>
                    )}
                    {showAlternativePlanReverted && (
                      <>
                        <span className="toast-text toast-text-2">
                          Smart plan reverted successfully!
                        </span>
                      </>
                    )}
                  </div>
                  <div className="toast-close-image" onClick={handleToastClose}>
                    <i class="bx bx-x bx-success"></i>
                  </div>
                </div>
                <div className="toast-progress toast-active"></div>
              </div>
            )}

            {(showNetworkErrorToast ||
              showUnexpectedErrorToast ||
              showServerNetworkErrorToast ||
              showChooseDate ||
              showChooseCorrectDate ||
              showNoPlanErrorToast) && (
              <div className="toast toast-active">
                <div className="toast-content">
                  <i class="bx bx-error toast-error-check"></i>
                  <div className="toast-message">
                    {showNetworkErrorToast && (
                      <span className="toast-text toast-text-2">
                        Network disconnected. Please check your network!
                      </span>
                    )}

                    {showChooseDate && (
                      <span className="toast-text toast-text-2">
                        Choose Date before updating!
                      </span>
                    )}
                    {showChooseCorrectDate && (
                      <span className="toast-text toast-text-2">
                        Start date must be before the end date!
                      </span>
                    )}
                    {showNoPlanErrorToast && (
                      <span className="toast-text toast-text-2">
                        No plan available to revert!
                      </span>
                    )}
                    {showServerNetworkErrorToast && (
                      <span className="toast-text toast-text-2">
                        Internal Server Error! Try after some time.
                      </span>
                    )}
                    {showUnexpectedErrorToast && (
                      <span className="toast-text toast-text-2">
                        Unexpected Error Occurred.
                      </span>
                    )}
                  </div>
                  <div className="toast-close-image" onClick={handleToastClose}>
                    <i class="bx bx-x"></i>
                  </div>
                </div>
                <div className="toast-error-progress toast-active"></div>
              </div>
            )}

            {/* Display bus data fetched from MongoDB if needed */}
            {/* <button className="upload-button" onClick={handleUpload}>fetch data</button> */}
            {uploadMessage && (
              <div className="date-filter-container">
                <h3>Select Date:</h3>
                <div className="main-date-container">
                  <div className="date-container">
                    <p>starting date</p>
                    <input type="date" onChange={handleSetStartDate} />
                  </div>
                  <div className="date-container">
                    <p>ending date</p>
                    <input type="date" onChange={handleSetEndDate} />
                  </div>
                </div>

                {/* {Object.keys(filterOptions).map(filterType => (
                    <div key={filterType}>
                        <h4>{filterType}</h4>
                        <div>
                            {filterOptions[filterType].map(option => (
                                <button
                                    key={option}
                                    onClick={() => handleFilterSelect(filterType, option)}
                                    className={selectedFilterOptions[filterType]?.includes(option) ? 'selected' : ''}
                                >
                                    {option}
                                </button>
                            ))}

                        </div>
                        {Object.keys(selectedFilterOptions).map(filterType => (
                            selectedFilterOptions[filterType].map(value => (
                                <span key={`${filterType}-${value}`} className="selected-filter">
                                    {value}
                                    <button onClick={() => handleRemoveFilter(filterType, value)}>x</button>
                                </span>
                            ))
                        ))}
                    </div>
                ))} */}
                <div className="main-regular-filter">
                  <h3>Apply Filters: </h3>
                  <div className="sub-regular-filter">
                    {Object.keys(filterOptions).map((filterType) => (
                      <div key={filterType} className="regular-filter">
                        <p>{filterType}</p>
                        <select
                          value=""
                          onChange={(e) =>
                            handleFilterSelect(filterType, e.target.value)
                          }
                        >
                          <option value="">Select {filterType}</option>
                          {filterOptions[filterType].map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {selectedFilterOptions[filterType]?.map((value) => (
                          <span
                            key={`${filterType}-${value}`}
                            className="selected-filter"
                          >
                            {value}
                            <a
                              onClick={() =>
                                handleRemoveFilter(filterType, value)
                              }
                            >
                              <i className="bx bx-x filter-icon"></i>
                            </a>
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="buttons-container">
              <button className="previous-btn" onClick={handleShowAlterPlan}>
                Update Smart Plan <i class="bx bx-refresh large-icon"></i>
              </button>
              <button className="nxt-btn" onClick={handleShowRevertAlterPlan}>
                Revert to Previous Plan <i class="bx bx-undo large-icon"></i>
              </button>
            </div>
          </div>

          <div className="wrap-body-table-container container">
            {loading && (
              <div className="skeleton-inner-container">
                {/* <div className="skeleton skeleton-header"></div> */}
                <div className="skeleton-wrap">
                  {/* <div className="skeleton skeleton-section"></div> */}
                  <div className="skeleton-wrap-inside">
                    {/* <div className="skeleton-wrap-inside-1">
               <div className="skeleton skeleton-sub-section"></div>
               <div className="skeleton skeleton-sub-section"></div>
             </div> */}
                    <div className="skeleton skeleton-sub-section"></div>
                  </div>
                </div>
              </div>
            )}
            {planData.length > 0 && (
              <div className="genrated-plan-table-container">
                <h3>Generated Plan:</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Route</th>
                      <th>Remaining Capacity</th>
                      <th>Total Boarding Count</th>
                      <th>Boarding Count</th>
                      <th>Stopping</th>
                      <th>Time</th>
                      <th>Reg No(s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {planData
                      .sort((a, b) => a.route - b.route)
                      .map((row, rowIndex) => {
                        const isFirstRow =
                          rowIndex === 0 ||
                          planData[rowIndex - 1].route !== row.route;
                        const rowSpan = planData.filter(
                          (r) => r.route === row.route
                        ).length;
                        return (
                          <tr key={rowIndex}>
                            {isFirstRow && (
                              <>
                                <td rowSpan={rowSpan}>{row.route}</td>
                                <td rowSpan={rowSpan}>
                                  {60 - totalBoardingCounts[row.route]}
                                </td>
                                <td rowSpan={rowSpan}>
                                  {totalBoardingCounts[row.route]}
                                </td>
                              </>
                            )}
                            <td>{row.boardingCount}</td>
                            <td>{row.stopping}</td>
                            <td>{row.time}</td>
                            <td>
                              {Array.isArray(row.regNo)
                                ? row.regNo.join(", ")
                                : row.regNo}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
            Unallocated Students
            <table>
              <tbody>
                {Object.keys(unallocatedByStopping).map((stopping, index) => (
                  <tr key={index}>
                    <td>{stopping}</td>
                    <td>
                      {unallocatedByStopping[stopping].map(
                        (student, studentIndex) => (
                          <span key={studentIndex}>
                            {student.regNo}
                            {studentIndex <
                            unallocatedByStopping[stopping].length - 1
                              ? ", "
                              : ""}
                          </span>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default UploadAlter;
