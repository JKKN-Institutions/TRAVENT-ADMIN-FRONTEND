import React, { useState, useEffect } from "react";
import apiClient from "../../../../apiClient";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import FormInput from "../../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../../components/Shared/ActionButtons/ActionButtons";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import "./AddNewRoute.css";

const AddNewRoute = ({ route, onBack, onSave, institutionId }) => {
  const [routeData, setRouteData] = useState({
    routeNumber: "",
    routeName: "",
    eta: "",
    sittingCapacity: "",
    standingCapacity: "",
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
    } else {
      // Reset form state for Add Mode
      setRouteData({
        routeNumber: "",
        routeName: "",
        eta: "",
        sittingCapacity: "",
        standingCapacity: "",
        vehicleRegistrationNumber: "",
        mainDriver: "",
        departureFromHalt: "",
        collegeArrivalTime: "",
        departureFromCollege: "",
        dropTimeFromCollege: "",
      });
    }
  }, [route]);

  const handleChange = ({ target: { name, value } }) => {
    setRouteData((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: value ? null : prev[name] }));
  };

  const validateForm = () => {
    let formErrors = {};

    if (!routeData.routeNumber || !/^\d+$/.test(routeData.routeNumber))
      formErrors.routeNumber =
        "Route Number is required and should be a valid number";

    if (!routeData.routeName || routeData.routeName.length < 3)
      formErrors.routeName =
        "Route Name is required and should be at least 3 characters";

    if (!routeData.eta) formErrors.eta = "ETA is required";

    if (
      routeData.sittingCapacity &&
      (!/^\d+$/.test(routeData.sittingCapacity) ||
        parseInt(routeData.sittingCapacity) < 0)
    )
      formErrors.sittingCapacity =
        "Sitting Capacity should be a non-negative number";

    if (
      routeData.standingCapacity &&
      (!/^\d+$/.test(routeData.standingCapacity) ||
        parseInt(routeData.standingCapacity) < 0)
    )
      formErrors.standingCapacity =
        "Standing Capacity should be a non-negative number";

    if (!routeData.vehicleRegistrationNumber)
      formErrors.vehicleRegistrationNumber = "Vehicle Registration is required";

    if (!routeData.mainDriver || !/^[A-Za-z\s]+$/.test(routeData.mainDriver))
      formErrors.mainDriver =
        "Main Driver is required and should only contain letters";

    const timeFields = [
      "departureFromHalt",
      "collegeArrivalTime",
      "departureFromCollege",
      "dropTimeFromCollege",
    ];

    timeFields.forEach((field) => {
      if (!routeData[field]) {
        formErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .trim()} is required`;
      }
    });

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showToast("error", "Please fix the errors in the form");
      return;
    }

    const loadingToastId = showToast(
      "loading",
      route ? "Updating route..." : "Adding new route..."
    );

    console.log(institutionId);

    const url = route
      ? "/institutionsExtended/update-route"
      : "/institutionsExtended/add-route";

    try {
      if (!institutionId) {
        showToast("error", "Institution ID is missing. Please re-login.");
        return;
      }

      const payload = {
        institutionId,
        ...routeData,
      };

      if (route) {
        payload.stateName = route.stateName;
        payload.routeNumber = route.routeNumber;
        payload.updates = routeData;
      }

      const response = await apiClient.post(url, payload);

      showToast(
        "success",
        `Route ${route ? "updated" : "added"} successfully.`,
        loadingToastId
      );

      if (onSave) onSave(response.data);
      setTimeout(() => onBack(), 3100);
    } catch (error) {
      showToast(
        "error",
        `Failed to ${route ? "update" : "add"} route. Please try again.`,
        loadingToastId
      );
      console.error("Error saving route:", error);
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
                  type={
                    [
                      "eta",
                      "departureFromHalt",
                      "departureFromCollege",
                      "collegeArrivalTime",
                      "dropTimeFromCollege",
                    ].includes(key)
                      ? "time"
                      : key.includes("Capacity")
                      ? "number"
                      : "text"
                  }
                  value={routeData[key]}
                  placeholder={key
                    .charAt(0)
                    .toUpperCase()
                    .concat(key.slice(1).replace(/([A-Z])/g, " $1"))}
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
