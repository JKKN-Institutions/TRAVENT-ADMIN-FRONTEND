import React, { useState } from "react";
import { showToast } from "../../../../components/Shared/ToastNotification/ToastNotification";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import ActionButtons from "../../../../components/Shared/ActionButtons/ActionButtons";
import FormInput from "../../../../components/Shared/FormInput/FormInput";
import ToastNotification from "../../../../components/Shared/ToastNotification/ToastNotification";
import "./AddAmuletFees.css";

const AddAmuletFees = ({ student, onBack, onAdd }) => {
  const [formData, setFormData] = useState({
    feeAmount: "",
    amuletsToRefill: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: null,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.feeAmount) newErrors.feeAmount = "Fee Amount is required";
    if (!formData.amuletsToRefill)
      newErrors.amuletsToRefill = "Amulets Count is required";

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("error", "Please fill in all required fields");
      return;
    }

    try {
      const loadingToastId = showToast("loading", "Adding amulet fees...");

      await onAdd(formData);

      showToast("success", "Successfully added amulet fees", loadingToastId);

      onBack();
    } catch (error) {
      showToast("error", "Failed to add amulet fees. Please try again.");
      console.error("Error saving amulet fees:", error);
    }
  };

  return (
    <div className="add-amulet-fee-container">
      <ToastNotification />

      <TopBar title="Refill Amulets" onBack={onBack} backButton />
      <main className="add-amulet-fee-main-content">
        <div className="add-amulet-fee-form-grid">
          {/* Student Information Section */}
          <div className="add-amulet-fee-column">
            <div className="add-amulet-fee-form-group">
              <h3 className="text-primary-500 mb-4">Student Information</h3>
              <div className="student-info-grid">
                <div className="info-item">
                  <label>Name:</label>
                  <span>{student.name}</span>
                </div>
                <div className="info-item">
                  <label>Register No:</label>
                  <span>{student.regNo}</span>
                </div>
                <div className="info-item">
                  <label>Roll No:</label>
                  <span>{student.rollNo}</span>
                </div>
                <div className="info-item">
                  <label>Year / Dept / Section:</label>
                  <span>
                    {student.year} / {student.department} / {student.section}
                  </span>
                </div>
                <div className="info-item">
                  <label>Institute Name:</label>
                  <span>{student.instituteName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Details Section */}
          <div className="add-amulet-fee-column">
            <div className="add-amulet-fee-form-group">
              <h3>Fee Details</h3>
              <FormInput
                type="number"
                id="feeAmount"
                name="feeAmount"
                value={formData.feeAmount}
                onChange={(e) => handleChange("feeAmount", e.target.value)}
                placeholder="Fee Amount"
                error={errors.feeAmount}
                min={0}
              />
              <FormInput
                type="number"
                id="amuletsToRefill"
                name="amuletsToRefill"
                value={formData.amuletsToRefill}
                onChange={(e) =>
                  handleChange("amuletsToRefill", e.target.value)
                }
                placeholder="Amulets Count"
                error={errors.amuletsToRefill}
                min={0}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <ActionButtons
          onCancel={onBack}
          onSubmit={handleSubmit}
          submitText="Add"
        />
      </main>
    </div>
  );
};

export default AddAmuletFees;
