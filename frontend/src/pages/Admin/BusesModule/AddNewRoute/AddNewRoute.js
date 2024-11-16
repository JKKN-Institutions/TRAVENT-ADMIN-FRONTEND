import React, { useState, useEffect } from "react";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import axios from "axios";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import FormInput from "../../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../../components/Shared/ActionButtons/ActionButtons";
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

  const handleChange = ({ target: { name, value } }) => {
    setRouteData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value ? null : prev[name] }));
  };

  const validateForm = () =>
    Object.keys(routeData).reduce((acc, key) => {
      if (!routeData[key] && key !== "standingCapacity") {
        acc[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
      return acc;
    }, {});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showToast("error", "Please fill in all required fields");
    } else {
      const loadingToastId = showToast(
        "loading",
        route ? "Updating route..." : "Adding new route..."
      );
      const url = route
        ? "https://travent-admin-server.vercel.app/api/bus/update-route"
        : "https://travent-admin-server.vercel.app/api/bus/add-route";

      try {
        const response = await axios.post(url, { ...routeData, institutionId });
        const { success, message, route: updatedRoute } = response.data;
        showToast(
          success ? "success" : "error",
          success
            ? `Successfully ${route ? "updated" : "added"} route.`
            : message,
          loadingToastId
        );
        if (success) onSave(updatedRoute);
      } catch (error) {
        showToast(
          "error",
          `Failed to ${route ? "update" : "add"} route. Please try again.`,
          loadingToastId
        );
        console.error("Error saving route:", error);
      }
    }
  };

  return (
    <div className="add-new-route-container">
      <ToastNotification />
      <TopBar
        title={route ? "Edit Route" : "Add New Route"}
        onBack={onBack}
        backButton={true}
      />
      <main className="add-new-route-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-new-route-form-grid">
            {Object.keys(routeData).map((key) => (
              <div key={key} className="add-new-route-form-group">
                <FormInput
                  id={key}
                  name={key}
                  type={key.includes("Capacity") ? "number" : "text"}
                  value={routeData[key]}
                  placeholder={
                    key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")
                  }
                  error={errors[key]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <ActionButtons
            onCancel={onBack}
            onSubmit={handleSubmit}
            submitText={route ? "Update Route" : "Add Route"}
          />
        </form>
      </main>
    </div>
  );
};

export default AddNewRoute;
