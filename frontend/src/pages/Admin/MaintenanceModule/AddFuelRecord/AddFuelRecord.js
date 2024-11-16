import React, { useState, useEffect } from "react";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import FormInput from "../../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../../components/Shared/ActionButtons/ActionButtons";
import "./AddFuelRecord.css";

const AddFuelRecord = ({ onBack, onSave, editingRecord }) => {
  const initialFuelData = {
    billDateTime: "",
    billNumber: "",
    routeNumber: "",
    driverName: "",
    fuelType: "",
    filledVolume: "",
    pricePerLiter: "",
    totalAmount: "",
    fuelStationAddress: "",
  };

  const [fuelData, setFuelData] = useState(initialFuelData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingRecord) setFuelData(editingRecord);
  }, [editingRecord]);

  const handleChange = ({ target: { name, value } }) => {
    setFuelData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    return Object.keys(fuelData).reduce((acc, key) => {
      if (!fuelData[key]) {
        acc[key] = `${
          key.charAt(0).toUpperCase() +
          key
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .trim()
        } is required`;
      }
      return acc;
    }, {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      showToast("error", "Please fill in all required fields");
      return;
    }

    const loadingToastId = showToast(
      "loading",
      `${editingRecord ? "Updating" : "Adding"} fuel record...`
    );
    try {
      const savedRecord = await onSave(fuelData);
      showToast(
        "success",
        `Fuel record ${editingRecord ? "updated" : "added"} successfully.`,
        loadingToastId
      );
      setTimeout(() => onBack(savedRecord), 3100);
    } catch (error) {
      showToast(
        "error",
        `Failed to ${
          editingRecord ? "update" : "add"
        } fuel record. Please try again.`,
        loadingToastId
      );
      console.error("Error saving fuel record:", error);
    }
  };

  const renderFormInput = (key) => {
    const commonProps = {
      id: key,
      name: key,
      value: fuelData[key],
      error: errors[key],
      onChange: handleChange,
      placeholder:
        key.charAt(0).toUpperCase() +
        key
          .slice(1)
          .replace(/([A-Z])/g, " $1")
          .trim(),
    };

    if (key === "fuelType") {
      return (
        <FormInput
          {...commonProps}
          type="select"
          options={[
            { value: "", label: "Select Fuel Type" },
            { value: "Diesel", label: "Diesel" },
            { value: "Petrol", label: "Petrol" },
          ]}
        />
      );
    }

    if (key === "fuelStationAddress") {
      return <FormInput {...commonProps} type="textarea" />;
    }

    const inputType =
      key === "billDateTime"
        ? "datetime-local"
        : ["filledVolume", "pricePerLiter", "totalAmount"].includes(key)
        ? "number"
        : "text";

    return <FormInput {...commonProps} type={inputType} />;
  };

  return (
    <div className="add-fuel-record-container">
      <ToastNotification />
      <TopBar
        title={`${editingRecord ? "Edit" : "Add"} Fuel Record`}
        onBack={onBack}
        backButton={true}
      />
      <main className="add-fuel-record-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-fuel-record-form-grid">
            {Object.keys(fuelData).map((key) => (
              <div key={key} className="add-fuel-record-form-group">
                {renderFormInput(key)}
              </div>
            ))}
          </div>
          <ActionButtons
            onCancel={onBack}
            onSubmit={handleSubmit}
            submitText={`${editingRecord ? "Update" : "Add"} Record`}
          />
        </form>
      </main>
    </div>
  );
};

export default AddFuelRecord;
