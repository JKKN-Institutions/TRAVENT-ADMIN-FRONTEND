import React, { useState, useEffect } from "react";
import axios from "axios";

const ActivePlan = () => {
  const [loading, setLoading] = useState(true);
  const [activePlan, setActivePlan] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentActivePlanName, setcurrentActivePlanName] = useState("");
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   if (currentPlan === "Regular Plan") {
  //     const fetchRegularPlan = async () => {
  //       try {
  //         const response = await axios.get(
  //           "http://localhost:3000/api/current_regular_plan"
  //         );
  //         if (response.status === 200) {
  //           setActivePlan(response.data.plan);
  //           console.log(activePlan);
  //         } else {
  //           setErrorMessage(
  //             response.data.message || "Failed to fetch regular plan"
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Error fetching regular plan:", error);
  //         setErrorMessage("Failed to fetch regular plan");
  //       } finally {
  //         setTimeout(() => {
  //           setLoading(false);
  //         }, 6000);
  //       }
  //     };
  //     fetchRegularPlan();
  //   } else {
  //     const fetchAlterPlan = async () => {
  //       try {
  //         const response = await axios.get(
  //           "http://localhost:3000/api/current_alter_plan"
  //         );
  //         if (response.status === 200) {
  //           setActivePlan(response.data.plan);
  //         } else {
  //           setErrorMessage(
  //             response.data.message || "Failed to fetchk alter plan"
  //           );
  //         }
  //       } catch (error) {
  //         console.error("Error fetching alter plan:", error);
  //         setErrorMessage("Failed to fetched alter plan");
  //       } finally {
  //         setTimeout(() => {
  //           setLoading(false);
  //         }, 2000);
  //       }
  //     };
  //     fetchAlterPlan();
  //   }
  // }, []);

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/current_plan_type"
        );
        if (response.status === 200) {
          setcurrentActivePlanName(response.data.currentPlan);
        } else {
          //setMessage(response.data.message || 'Failed to fetch current plan type');
        }
      } catch (error) {
        console.error("Error fetching current plan type:", error);
        setMessage("Failed to fetch current plan type");
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentPlan();
  }, []);

  useEffect(() => {
    console.log("Current Plan Type: ", currentActivePlanName); // Debugging currentPlan prop
    const fetchPlan = async () => {
      try {
        let response;
        if (currentActivePlanName === "Regular Plan") {
          response = await axios.get(
            "http://localhost:3000/api/current_regular_plan"
          );
        } else {
          response = await axios.get(
            "http://localhost:3000/api/current_alter_plan"
          );
        }

        if (response.status === 200) {
          setActivePlan(response.data.plan);
        } else {
          setErrorMessage(response.data.message || "Failed to fetch plan");
        }
      } catch (error) {
        console.error("Error fetching plan:", error);
        setErrorMessage("Failed to fetch plan");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [currentActivePlanName]);

  console.log("activeee plan", activePlan);

  const calculateRemainingCapacity = (boardingCount) => {
    return 60 - boardingCount;
  };

  const mergeRoutes = (plans) => {
    const mergedRoutes = {};

    // Check if plans is an array and has elements
    if (Array.isArray(plans) && plans.length > 0) {
      plans.forEach((plan) => {
        const route = plan.route;
        const stopping = plan.stopping;
        const boardingCount = plan.boardingCount;
        if (!mergedRoutes[route]) {
          mergedRoutes[route] = {
            remainingCapacity: 60 - boardingCount,
            boardingCount: boardingCount,
            stops: {},
          };
        } else {
          mergedRoutes[route].remainingCapacity -= boardingCount;
          mergedRoutes[route].boardingCount += boardingCount;
        }

        if (!mergedRoutes[route].stops[stopping]) {
          mergedRoutes[route].stops[stopping] = [];
        }
        mergedRoutes[route].stops[stopping].push(...plan.regNo);
      });
    }

    return mergedRoutes;
  };

  return (
    <div>
      {loading ? (
        <div className="skeleton-inner-container">
          {/* <div className="skeleton skeleton-header"></div> */}
          <div className="skeleton-wrap">
            <div className="skeleton skeleton-section"></div>
            <div className="skeleton-wrap-inside">
              {/* <div className="skeleton-wrap-inside-1">
              <div className="skeleton skeleton-sub-section"></div>
              <div className="skeleton skeleton-sub-section"></div>
            </div> */}
              <div className="skeleton skeleton-sub-section"></div>
            </div>
          </div>
        </div>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : activePlan ? (
        <div className="active-plan-container">
          <div className="active-plan-details">
          <h3>Generated Plan:</h3>
            <p>
              Duration:{" "}
              {new Date(activePlan.start_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
             {" - "}
              {new Date(activePlan.end_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>

            {/* <p>Plan Type: {currentActivePlanName}</p>
            <p>Plan Status: {activePlan.plan_status}</p> */}
          </div>
          <div className="active-plan-table-container">
        
            {/*<table border="1">
                            <thead>
                                <tr>
                                    <th>Route</th>
                                    <th>Remaining Capacity</th>
                                    <th>Boarding Count</th>
                                    <th>Stopping</th>
                                    <th>Reg No(s)</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {activePlan.plans.length > 0 && Object.entries(mergeRoutes(activePlan.plans)).map(([route, details], index) => (
                                    <tr key={index}>
                                        <td>{route}</td>
                                        <td>{details.remainingCapacity}</td>
                                        <td>{details.boardingCount}</td>
                                        <td colSpan="2">
                                            <table border="1">
                                                <tbody>
                                                    {Object.entries(details.stops).map(([stop, regNos], stopIndex) => (
                                                        <tr key={stopIndex} >
                                                            <td>{stop}</td>
                                                            <td>{regNos.join(', ')}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>*/}

            <table className="main-table">
              <thead>
                <tr>
                  <th className="main-table-small">Route</th>
                  <th className="main-table-small">Remaining Capacity</th>
                  <th className="main-table-small">Boarding Count</th>
                  <th className="nested-stop">Stopping</th>
                  <th className="nested-time">Time</th>
                  <th className="nested-regnos">Reg No(s)</th>
                </tr>
              </thead>
              <tbody>
                {activePlan.plans.length > 0 &&
                  Object.entries(mergeRoutes(activePlan.plans)).map(
                    ([route, details], index) => (
                      <tr key={index}>
                        <td className="main-table-small">{route}</td>
                        <td className="main-table-small">
                          {details.remainingCapacity}
                        </td>
                        <td className="main-table-small">
                          {details.boardingCount}
                        </td>
                        <td>
                          {Object.entries(details.stops).map(
                            ([stop, regNos], stopIndex) => (
                              <div key={stopIndex} className="center-align">
                                <td
                                  className="nested-stop center-align"
                                  style={{ border: "none" }}
                                >
                                  {stop}
                                </td>
                              </div>
                            )
                          )}
                        </td>

                        <td>
                          {Object.entries(details.stops).map(
                            ([stop, regNos], stopIndex) => (
                              <div key={stopIndex} className="center-align">
                                <td
                                  className="nested-time center-align"
                                  style={{ border: "none" }}
                                >
                                  {
                                    activePlan.plans.find(
                                      (plan) =>
                                        plan.route === route &&
                                        plan.stopping === stop
                                    ).time
                                  }
                                </td>
                              </div>
                            )
                          )}
                        </td>
                        <td>
                          {Object.entries(details.stops).map(
                            ([stop, regNos], stopIndex) => (
                              <div key={stopIndex} className="center-align">
                                <td
                                  className="nested-regnos center-align"
                                  style={{ border: "none" }}
                                >
                                  {regNos.join(", ")}
                                </td>
                              </div>
                            )
                          )}
                        </td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ActivePlan;
