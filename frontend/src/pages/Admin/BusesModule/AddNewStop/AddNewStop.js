import React, { useState, useEffect } from "react";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import FormInput from "../../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../../components/Shared/ActionButtons/ActionButtons";
import axios from "axios";
import "./AddNewStop.css";

const AddNewStop = ({ route, onBack, institutionId, editingStop }) => {
  const [stopData, setStopData] = useState({
    stopName: "",
    latitude: "",
    longitude: "",
    districtName: "",
    cityName: "",
    stateName: "",
    boardTime: "",
    dropTime: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStop) {
      setStopData({ ...editingStop });
    }
  }, [editingStop]);

  const handleChange = ({ target: { name, value } }) => {
    setStopData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value ? null : prev[name] }));
  };

  const validateForm = () => {
    let formErrors = {};

    // Validate Stop Name
    if (!stopData.stopName || stopData.stopName.length < 3) {
      formErrors.stopName =
        "Stop Name is required and should be at least 3 characters.";
    }

    // Validate Latitude
    if (
      !stopData.latitude ||
      isNaN(stopData.latitude) ||
      stopData.latitude < -90 ||
      stopData.latitude > 90
    ) {
      formErrors.latitude =
        "Latitude is required and should be between -90 and 90.";
    }

    // Validate Longitude
    if (
      !stopData.longitude ||
      isNaN(stopData.longitude) ||
      stopData.longitude < -180 ||
      stopData.longitude > 180
    ) {
      formErrors.longitude =
        "Longitude is required and should be between -180 and 180.";
    }

    // Validate District Name
    if (
      !stopData.districtName ||
      !/^[A-Za-z\s]+$/.test(stopData.districtName)
    ) {
      formErrors.districtName =
        "District Name is required and should only contain letters and spaces.";
    }

    // Validate City Name
    if (!stopData.cityName || !/^[A-Za-z\s]+$/.test(stopData.cityName)) {
      formErrors.cityName =
        "City Name is required and should only contain letters and spaces.";
    }

    // Validate State Name
    if (!stopData.stateName || !/^[A-Za-z\s]+$/.test(stopData.stateName)) {
      formErrors.stateName =
        "State Name is required and should only contain letters and spaces.";
    }

    // Validate Board Time
    if (
      !stopData.boardTime ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(stopData.boardTime) // 24-hour format validation
    ) {
      formErrors.boardTime =
        "Board Time is required and should be in HH:mm format.";
    }

    // Validate Drop Time
    if (
      !stopData.dropTime ||
      !/^([01]\d|2[0-3]):[0-5]\d$/.test(stopData.dropTime) // 24-hour format validation
    ) {
      formErrors.dropTime =
        "Drop Time is required and should be in HH:mm format.";
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showToast("error", "Please fill in all required fields");
      return;
    }

    const loadingToastId = showToast(
      "loading",
      editingStop ? "Updating stop..." : "Adding new stop..."
    );

    const url = editingStop
      ? "https://travent-admin-server-suryaprabajicates-projects.vercel.app/api/institutionsExtended/update-stop"
      : "https://travent-admin-server-suryaprabajicates-projects.vercel.app/api/institutionsExtended/add-stop";

    try {
      const payload = editingStop
        ? {
            institutionId,
            routeNumber: route.routeNumber,
            stopID: editingStop.stopID, // Include stopID for updates
            updates: { ...stopData }, // Pass only updated fields
          }
        : {
            institutionId,
            routeNumber: route.routeNumber,
            ...stopData,
          };

      // Remove the `_id` field if it exists in the stopData
      if (payload.updates && payload.updates._id) {
        delete payload.updates._id;
      }

      console.log("Payload being sent:", payload);

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { success, message, stop } = response.data;
      showToast(
        success ? "success" : "error",
        success
          ? `Stop ${editingStop ? "updated" : "added"} successfully.`
          : message,
        loadingToastId
      );

      if (success) setTimeout(() => onBack(stop), 3100);
    } catch (error) {
      console.error("Error saving stop:", error);
      showToast(
        "error",
        `Failed to ${editingStop ? "update" : "add"} stop. Please try again.`,
        loadingToastId
      );
    }
  };

  return (
    <div className="add-stop-container">
      <ToastNotification />
      <TopBar
        title={editingStop ? "Edit Stop" : "Add New Stop"}
        onBack={onBack}
        backButton={true}
      />
      <main className="add-stop-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-stop-form-grid">
            {/* Render fields dynamically */}
            {Object.keys(stopData)
              .filter((key) => key !== "_id") // Filter out the "_id" field
              .map((key) => (
                <div key={key} className="add-stop-form-group">
                  <FormInput
                    id={key}
                    name={key}
                    type={
                      key.includes("latitude") || key.includes("longitude")
                        ? "number"
                        : key.includes("Time")
                        ? "time"
                        : "text"
                    }
                    value={stopData[key]}
                    placeholder={
                      key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, " $1")
                    }
                    error={errors[key]}
                    onChange={handleChange}
                    disabled={key === "stopID" && editingStop} // Disable stopID field in edit mode
                  />
                </div>
              ))}
          </div>
          <ActionButtons
            onCancel={onBack}
            onSubmit={handleSubmit}
            submitText={editingStop ? "Update Stop" : "Add Stop"}
          />
        </form>
      </main>
    </div>
  );
};

export default AddNewStop;
