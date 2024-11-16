import React, { useState, useEffect } from "react";
import ToastNotification, {
  showToast,
} from "../../../../components/Shared/ToastNotification/ToastNotification";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import FormInput from "../../../../components/Shared/FormInput/FormInput";
import ActionButtons from "../../../../components/Shared/ActionButtons/ActionButtons";
import "./AddBusCondition.css";

const AddBusCondition = ({ bus, onBack, onSave }) => {
  const [busData, setBusData] = useState({
    route: "",
    number: "",
    status: "",
    problem: "",
    problemStartDate: "",
    solvingStartDate: "",
    completedDate: "",
    mechanicShop: "",
    sparesUsedFromInventory: "",
    sparesPurchased: "",
    externalSpareAmount: "",
    externalSparesBillNo: "",
    mechanicCharge: "",
    totalBillAmount: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bus) {
      setBusData({
        route: bus.route || "",
        number: bus.number || "",
        status: bus.status || "",
        problem: bus.problem || "",
        problemStartDate: bus.problemStartDate || "",
        solvingStartDate: bus.solvingStartDate || "",
        completedDate: bus.completedDate || "",
        mechanicShop: bus.mechanicShop || "",
        sparesUsedFromInventory: bus.sparesUsedFromInventory || "",
        sparesPurchased: bus.sparesPurchased || "",
        externalSpareAmount: bus.externalSpareAmount || "",
        externalSparesBillNo: bus.externalSparesBillNo || "",
        mechanicCharge: bus.mechanicCharge || "",
        totalBillAmount: bus.totalBillAmount || "",
      });
    }
  }, [bus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusData({ ...busData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(busData).forEach((key) => {
      if (!busData[key]) {
        formErrors[key] = `${
          key.charAt(0).toUpperCase() +
          key
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .trim()
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
        bus ? "Updating bus condition..." : "Adding new bus condition..."
      );

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Show success toast with a delay to ensure it's visible
        showToast(
          "success",
          `Successfully ${bus ? "updated" : "added"} bus condition.`,
          loadingToastId
        );

        setTimeout(() => onSave(busData), 3100);
      } catch (error) {
        showToast(
          "error",
          `Failed to ${
            bus ? "update" : "add"
          } bus condition. Please try again.`,
          loadingToastId
        );
        console.error("Error saving bus condition:", error);
      }
    }
  };

  return (
    <div className="add-bus-condition-container">
      <ToastNotification />
      <TopBar
        title={bus ? "Edit Bus Condition" : "Add Bus Condition"}
        onBack={onBack}
        backButton={true}
      />
      <main className="add-bus-condition-main-content">
        <form onSubmit={handleSubmit}>
          <div className="add-bus-condition-form-grid">
            {Object.keys(busData).map((key) => (
              <div key={key} className="add-bus-condition-form-group">
                <FormInput
                  id={key}
                  name={key}
                  type={
                    key.includes("Date")
                      ? "date"
                      : key.includes("Amount") || key.includes("Charge")
                      ? "number"
                      : "text"
                  }
                  value={busData[key]}
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
            ))}
          </div>
          <ActionButtons
            onCancel={onBack}
            onSubmit={handleSubmit}
            submitText={bus ? "Update Bus" : "Add Bus"}
          />
        </form>
      </main>
    </div>
  );
};

export default AddBusCondition;
