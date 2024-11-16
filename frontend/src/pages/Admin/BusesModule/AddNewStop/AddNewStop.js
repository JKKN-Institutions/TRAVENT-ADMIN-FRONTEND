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
    boardingCountMorning: "",
    boardingCountEvening: "",
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
    return Object.keys(stopData).reduce((acc, key) => {
      if (!stopData[key]) {
        acc[key] = `${key.replace(/([A-Z])/g, " $1").trim()} is required`;
      }
      return acc;
    }, {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showToast("error", "Please fill in all required fields");
    } else {
      const loadingToastId = showToast(
        "loading",
        editingStop ? "Updating stop..." : "Adding new stop..."
      );

      const url = editingStop
        ? "https://travent-admin-server.vercel.app/api/bus/update-stop"
        : "https://travent-admin-server.vercel.app/api/bus/add-stop";

      try {
        const response = await axios.post(url, {
          ...stopData,
          routeNumber: route.routeNumber,
          institutionId,
          ...(editingStop && { stopID: editingStop.stopID }),
        });

        const { success, message, stop } = response.data;
        showToast(
          success ? "success" : "error",
          success
            ? `Successfully ${editingStop ? "updated" : "added"} stop.`
            : message,
          loadingToastId
        );
        if (success) setTimeout(() => onBack(stop), 3100);
      } catch (error) {
        showToast(
          "error",
          `Failed to ${editingStop ? "update" : "add"} stop. Please try again.`,
          loadingToastId
        );
        console.error("Error saving stop:", error);
      }
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
            {Object.keys(stopData).map((key) => (
              <div key={key} className="add-stop-form-group">
                <FormInput
                  id={key}
                  name={key}
                  type={
                    key.includes("Count") ||
                    key.includes("latitude") ||
                    key.includes("longitude")
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
