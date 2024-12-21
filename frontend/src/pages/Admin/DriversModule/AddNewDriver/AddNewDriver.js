import React, { useState, useEffect } from "react";
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
  });

  const [errors, setErrors] = useState({});

  // Extract institutionId from localStorage
  const institutionId = localStorage.getItem("institutionId");
  console.log("Driver...", institutionId);

  useEffect(() => {
    if (driver) {
      setDriverData({ ...driverData, ...driver });
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
      if (!driverData[key]) {
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
            `/admin/drivers/updateDriver/${driver._id}`,
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

        if (response.status === 201) {
          showToast(
            "success",
            `Successfully ${driver ? "updated" : "added"} driver.`
          );

          // Delay calling onSave to allow toast to appear
          setTimeout(() => {
            onSave(); // This will be called after a short delay
          }, 3000); // Delay in milliseconds (3 seconds in this case)
        } else if (response.status === 400) {
          // Handle specific backend errors for duplicate license number or Aadhar number
          showToast("error", response.data.message); // Use message from backend
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
            {Object.keys(driverData).map((key) => (
              <div key={key} className="add-new-driver-form-group">
                <FormInput
                  name={key}
                  value={driverData[key]}
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
              </div>
            ))}
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
