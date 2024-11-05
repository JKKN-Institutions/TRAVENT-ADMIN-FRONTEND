import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./AddNewRoute.css";

const AddNewRoute = ({ route, onBack, onSave, institutionId }) => {
  const [routeData, setRouteData] = useState({
    routeNumber: "",
    routeName: "",
    eta: "",
    sittingCapacity: 0,
    standingCapacity: 0,
    vehicleRegistrationNumber: "",
    mainDriver: "",
    departureFromHalt: "",
    collegeArrivalTime: "",
    departureFromCollege: "",
    dropTimeFromCollege: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (route) {
      const { stops, boardingCount, stoppingCount, _id, ...editableFields } =
        route;
      setRouteData(editableFields);
    }
  }, [route]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRouteData({ ...routeData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(routeData).forEach((key) => {
      if (!routeData[key] && key !== "standingCapacity") {
        formErrors[key] = `${
          key.charAt(0).toUpperCase() +
          key
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .trim()
        } is required`;
      }
    });
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Please fill in all required fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // Show loading toast
      const loadingToastId = toast.loading(
        route ? "Updating route..." : "Adding new route...",
        {
          position: "top-right",
        }
      );
      try {
        const url = route
          ? "https://travent-admin-server.vercel.app/api/bus/update-route"
          : "https://travent-admin-server.vercel.app/api/bus/add-route";
        const response = await axios.post(url, {
          ...routeData,
          institutionId: institutionId,
        });
        if (response.data.success) {
          toast.dismiss(loadingToastId);
          setTimeout(() => {
            toast.success(
              <div>
                Successfully {route ? "updated" : "added"} route.
                <br />
                <small>Route details have been saved.</small>
              </div>,
              {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              }
            );
          }, 100);

          onSave(response.data.route);
        } else {
          toast.dismiss(loadingToastId);
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        toast.dismiss(loadingToastId);
        toast.error(
          `Failed to ${route ? "update" : "add"} route. Please try again.`,
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
        console.error("Error saving route:", error);
      }
    }
  };

  return (
    <div className="add-new-route-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
      />
      <header className="add-new-route-top-bar">
        <button className="add-new-route-back-button" onClick={onBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="add-new-route-header">
          <h2>{route ? "Edit Route" : "Add New Route"}</h2>
        </div>
      </header>
      <main className="add-new-route-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-new-route-form-grid">
            {Object.keys(routeData).map((key) => (
              <div key={key} className="add-new-route-form-group">
                <input
                  type={key.includes("Capacity") ? "number" : "text"}
                  id={key}
                  name={key}
                  value={routeData[key]}
                  onChange={handleChange}
                  placeholder={
                    key.charAt(0).toUpperCase() +
                    key
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                  }
                  className={errors[key] ? "input-error" : ""}
                />
                {errors[key] && <p className="error">{errors[key]}</p>}
              </div>
            ))}
          </div>
          <div className="add-new-route-buttons-container">
            <button
              type="button"
              className="add-new-route-cancel-button"
              onClick={onBack}
            >
              Cancel
            </button>
            <button type="submit" className="add-new-route-save-button">
              {route ? "Update Route" : "Add Route"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddNewRoute;
