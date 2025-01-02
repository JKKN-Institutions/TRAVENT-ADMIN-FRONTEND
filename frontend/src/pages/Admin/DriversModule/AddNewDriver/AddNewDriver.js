import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../../../apiClient"; // Import the custom apiClient
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import FormInput from "../../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../../components/Shared/ActionButtons/ActionButtons";
import "./AddNewDriver.css";

const AddNewDriver = ({ driver, onBack, onSave }) => {
  const [driverData, setDriverData] = useState({
    name: "",
    mobileNo: "",
    address: "",
    licenseNumber: "",
    aadharNumber: "",
    experienceInYears: "",
    category: "",
    email: "", // New field
    password: "", // New field
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Extract institutionId from localStorage
  const institutionId = localStorage.getItem("institutionId");
  console.log("Driver...", institutionId);

  useEffect(() => {
    console.log("Driver received:", driver); // Log driver object
    if (driver) {
      // Exclude email and password when editing an existing driver
      setDriverData((prevData) => ({
        ...prevData,
        name: driver.name || "",
        mobileNo: driver.mobileNo || "",
        address: driver.address || "",
        licenseNumber: driver.licenseNumber || "",
        aadharNumber: driver.aadharNumber || "",
        experienceInYears: driver.experienceInYears || "",
        category: driver.category || "",
        // Don't set email and password when editing
        email: driver.email || "",
        password: "", // Clear password field during edit
      }));
    } else {
      // Handle the case where driver is undefined
      console.error("Driver is undefined");
    }
  }, [driver]);

  console.log("Driver Data:", driverData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverData({ ...driverData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(driverData).forEach((key) => {
      // Skip email and password fields for validation when editing
      if (
        !driver &&
        !driverData[key] &&
        key !== "email" &&
        key !== "password"
      ) {
        formErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
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
      showToast("error", "Please fill in all required fields");
    } else {
      try {
        // Log the data being sent
        const dataToSend = { ...driverData, institutionId };
        console.log("Data to send:", dataToSend); // Add this line to log the data

        let response;
        if (driver) {
          // Update existing driver using apiClient
          response = await apiClient.put(
            `/admin/drivers/updateDriver/${driver.licenseNumber}`,
            dataToSend
          );
        } else {
          // Add new driver using apiClient
          response = await apiClient.post(
            "/admin/drivers/addDriver",
            dataToSend
          );
        }

        console.log("Backend response:", response); // Log the response here

        if (response.status === 200 || response.status === 201) {
          showToast(
            "success",
            `Successfully ${driver ? "updated" : "added"} driver.`
          );
          setTimeout(() => {
            onSave(driver ? { ...driver, ...driverData } : dataToSend); // This will be called after a short delay
          }, 3000);
        } else if (response.status === 400) {
          showToast("error", response.data.message);
        } else {
          throw new Error("Failed to save driver.");
        }
      } catch (error) {
        // Catch any other errors, including those for duplicate license or Aadhar numbers
        if (error.response && error.response.data) {
          // Handle errors from the backend response
          showToast(
            "error",
            error.response.data.message || "Failed to add driver."
          );
        } else {
          // Handle network or unexpected errors
          showToast(
            "error",
            `Failed to ${driver ? "update" : "add"} driver. Please try again.`
          );
        }
        console.error("Error saving driver:", error);
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="add-new-driver-container">
      <ToastNotification />
      <TopBar
        title={driver ? "Edit Driver" : "Add New Driver"}
        onBack={onBack}
        backButton={true}
      />
      <main className="add-new-driver-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-new-driver-form-grid">
            {Object.keys(driverData).map((key) => {
              // Skip email and password fields when editing an existing driver
              if (driver && (key === "email" || key === "password"))
                return null;
              return (
                <div key={key} className="add-new-driver-form-group">
                  <FormInput
                    name={key}
                    value={driverData[key] || ""}
                    onChange={(e) => handleChange(e)}
                    placeholder={
                      key === "category"
                        ? "Select Category" // No placeholder for category
                        : key.charAt(0).toUpperCase() +
                          key
                            .slice(1)
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                    }
                    error={errors[key]}
                    // Conditionally set type based on the field key
                    type={
                      key === "category"
                        ? "select"
                        : key === "experienceInYears"
                        ? "number"
                        : key === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : "text"
                    }
                    options={
                      key === "category"
                        ? [
                            { value: "main", label: "Main Driver" },
                            { value: "spare", label: "Spare Driver" },
                          ]
                        : null
                    }
                  />
                  {key === "password" && (
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <ActionButtons
            onCancel={onBack}
            onSubmit={handleSubmit}
            submitText={driver ? "Update Driver" : "Add Driver"}
          />
        </form>
      </main>
    </div>
  );
};

export default AddNewDriver;
