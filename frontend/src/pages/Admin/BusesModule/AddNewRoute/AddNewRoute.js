import React, { useState, useEffect } from "react";
import apiClient from "../../../../apiClient";
import AsyncSelect from "react-select/async";
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
    sittingCapacity: "",
    standingCapacity: "",
    vehicleRegistrationNumber: "",
    mainDriver: "",
    collegeArrivalTime: "",
    departureFromCollege: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (route) {
      console.log("Driver License Number: ", route.mainDriver?.licenseNumber);
      console.log("Driver Name: ", route.mainDriver?.name);

      const {
        stops,
        boardingCount,
        stoppingCount,
        mainDriverLicense,
        _id,
        ...editableFields
      } = route;

      console.log("Route MainDriver Name: ", route.mainDriver?.name);
      console.log(
        "Route MainDriver License: ",
        route.mainDriver?.licenseNumber
      );
      setRouteData({
        ...editableFields,
        mainDriver: route.mainDriver
          ? {
              name: route.mainDriver.name,
              licenseNumber: route.mainDriver.licenseNumber,
            }
          : "",
      });
    } else {
      // Reset form state for Add Mode
      setRouteData({
        routeNumber: "",
        routeName: "",
        sittingCapacity: "",
        standingCapacity: "",
        vehicleRegistrationNumber: "",
        mainDriver: "",
        collegeArrivalTime: "",
        departureFromCollege: "",
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

    if (!routeData.mainDriver) {
      formErrors.mainDriver = "Main Driver is required";
    }

    const timeFields = ["collegeArrivalTime", "departureFromCollege"];

    timeFields.forEach((field) => {
      if (!routeData[field]) {
        formErrors[field] = `${field
          .replace(/([A-Z])/g, " $1")
          .trim()} is required`;
      }
    });

    return formErrors;
  };

  const loadDriverOptions = async (inputValue) => {
    if (!inputValue) return [];

    try {
      console.log("Searching drivers with name:", inputValue);
      const response = await apiClient.get(
        "/institutionsExtended/search-available-drivers",
        {
          params: { institutionId, driverName: inputValue },
        }
      );
      console.log("Drivers Response Data:", response.data);
      return response.data.map((driver) => ({
        label: driver.name,
        value: driver.licenseNumber,
      }));
    } catch (error) {
      console.error("Error fetching drivers:", error);
      showToast("error", "Error fetching drivers.");
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the routeData to check the current state of mainDriver
    console.log(routeData);

    const formErrors = validateForm();
    console.log("Form Errors:", formErrors); // Debugging form errors

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
        mainDriver: routeData.mainDriver
          ? routeData.mainDriver.licenseNumber
          : null,
      };

      // Only update mainDriver with the licenseNumber (not the whole object)
      if (routeData.mainDriver) {
        payload.updates = {
          ...routeData,
          mainDriver: routeData.mainDriver
            ? routeData.mainDriver.licenseNumber
            : null,
        };
      }

      const response = await apiClient.post(url, payload);

      // Check if the response contains a success message
      if (response.data.message === "Route added successfully.") {
        showToast("success", `Route added successfully.`, loadingToastId);
      } else if (response.data.message === "Route updated successfully.") {
        showToast("success", `Route updated successfully.`, loadingToastId);
      } else if (response.data.message) {
        // Display the backend error message
        showToast("error", response.data.message, loadingToastId);
      } else {
        showToast(
          "error",
          `Failed to ${route ? "update" : "add"} route. Please try again.`,
          loadingToastId
        );
      }

      if (onSave) onSave(response.data);
      setTimeout(() => onBack(), 3100);
    } catch (error) {
      // Handle AxiosError (for 400 or other error status codes)
      if (error.response && error.response.status === 400) {
        // Backend validation error
        showToast(
          "error",
          error.response.data.message || "Bad request. Please check the input.",
          loadingToastId
        );
      } else {
        // Generic error handling for other errors
        showToast(
          "error",
          `Failed to ${route ? "update" : "add"} route. Please try again.`,
          loadingToastId
        );
      }
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
                {key === "mainDriver" ? (
                  <div className="add-new-route-form-group">
                    <label>Main Driver</label>
                    <AsyncSelect
                      cacheOptions
                      loadOptions={loadDriverOptions}
                      defaultOptions
                      value={
                        routeData.mainDriver
                          ? {
                              label: routeData.mainDriver.name,
                              value: routeData.mainDriver.licenseNumber,
                            }
                          : null
                      }
                      onChange={(selectedOption) => {
                        console.log("Selected Driver: ", selectedOption);
                        setRouteData({
                          ...routeData,
                          mainDriver: selectedOption
                            ? {
                                name: selectedOption.label,
                                licenseNumber: selectedOption.value,
                              }
                            : "",
                        });
                        console.log(
                          "Route Data after selected driver: ",
                          routeData
                        );
                      }}
                      getOptionLabel={(e) => e.label}
                      placeholder="Main Driver"
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#2e323b",
                          color: "white",
                          borderColor: "#2e323b",
                          borderRadius: "10px",
                          padding: "1px",
                          borderBottom: "2px solid #666",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                        }),
                        option: (base) => ({
                          ...base,
                          backgroundColor: "#2e323b",
                          color: "white",
                          ":hover": {
                            backgroundColor: "#3a4049",
                          },
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: "white",
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: "#666",
                        }),
                        input: (base) => ({
                          ...base,

                          color: "white", // Ensures the typed text is white
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#2e323b", // Set the dropdown background color
                          borderBottom: "2px solid #666",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                          borderRadius: "10px",
                        }),
                        menuList: (base) => ({
                          ...base,
                          backgroundColor: "#2e323b",
                          borderBottom: "2px solid #666",

                          borderRadius: "10px",
                        }),
                      }}
                    />
                  </div>
                ) : key === "collegeArrivalTime" ? (
                  <div className="add-new-route-form-group">
                    <label>In Time</label>
                    <FormInput
                      id={key}
                      name={key}
                      type="time"
                      value={routeData[key]}
                      error={errors[key]}
                      onChange={handleChange}
                    />
                  </div>
                ) : key === "departureFromCollege" ? (
                  <div className="add-new-route-form-group">
                    <label>Out Time</label>
                    <FormInput
                      id={key}
                      name={key}
                      type="time"
                      value={routeData[key]}
                      error={errors[key]}
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <div className="add-new-route-form-group">
                    <label>
                      {key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/([A-Z])/g, " $1")}
                    </label>
                    <FormInput
                      id={key}
                      name={key}
                      type={
                        ["departureFromCollege", "collegeArrivalTime"].includes(
                          key
                        )
                          ? "time"
                          : "text"
                      }
                      value={routeData[key]}
                      placeholder={
                        key.charAt(0).toUpperCase() +
                        key
                          .slice(1)
                          .replace(/([A-Z])/g, " $1")
                          .trim()
                      }
                      error={errors[key]}
                      onChange={handleChange}
                    />
                  </div>
                )}
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
