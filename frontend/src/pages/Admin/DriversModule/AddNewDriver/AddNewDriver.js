import React, { useState, useEffect } from "react";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification"; // Import ToastNotification and showToast
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
    experience: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (driver) {
      setDriverData({ ...driverData, ...driver });
    }
  }, [driver]);

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
      const loadingToastId = showToast(
        "loading",
        driver ? "Updating driver..." : "Adding new driver..."
      );

      try {
        onSave(driverData);
        showToast(
          "success",
          `Successfully ${driver ? "updated" : "added"} driver.`,
          loadingToastId
        );
      } catch (error) {
        showToast(
          "error",
          `Failed to ${driver ? "update" : "add"} driver. Please try again.`,
          loadingToastId
        );
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
                    key.charAt(0).toUpperCase() +
                    key
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                  }
                  error={errors[key]}
                  type={key === "experience" ? "number" : "text"}
                  selectOptions={
                    key === "category"
                      ? [
                          { value: "", label: "Select Category" },
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
