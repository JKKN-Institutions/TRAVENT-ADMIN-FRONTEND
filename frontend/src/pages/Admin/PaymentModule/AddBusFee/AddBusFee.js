import React, { useState, useEffect } from "react";
import { showToast } from "../../../../components/Shared/ToastNotification/ToastNotification";
import TopBar from "../../../../components/Shared/TopBar/TopBar";
import ActionButtons from "../../../../components/Shared/ActionButtons/ActionButtons";
import ToastNotification from "../../../../components/Shared/ToastNotification/ToastNotification";
import apiClient from "../../../../apiClient";
import "./AddBusFee.css";

const AddBusFee = ({ busFeeData, onBack }) => {
  const initialFormState = {
    academicYearStart: new Date().getFullYear(),
    academicYearEnd: new Date().getFullYear() + 1,
    institute: "",
    totalBusFee: "",
    duration: {
      term1: { start: "", end: "" },
      term2: { start: "", end: "" },
      term3: { start: "", end: "" },
    },
    termWisePayment: {
      term1: { amount: "", dueDate: "" },
      term2: { amount: "", dueDate: "" },
      term3: { amount: "", dueDate: "" },
    },
  };

  const [formData, setFormData] = useState(initialFormState);
  const [institutes, setInstitutes] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch institution ID from localStorage
    const institutionId = localStorage.getItem("institutionId");

    if (institutionId) {
      // Fetch institutes for this institutionId using apiClient
      apiClient
        .get(`/institutions/institutes/${institutionId}`)
        .then((response) => {
          const data = response.data; // Parse response JSON directly
          console.log(data);

          if (data.institutes) {
            setInstitutes(data.institutes);
          } else {
            setErrors("No institutes found for this institution");
          }
        })
        .catch((error) => {
          console.error("Error fetching institutes:", error);
          setErrors(`Failed to fetch institutes: ${error.message}`);
        });
    } else {
      setErrors("Institution ID not found in localStorage");
    }

    if (busFeeData) {
      setFormData(busFeeData);
    }
  }, [busFeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "academicYearStart") {
      const newStartYear = Number(value); // Ensure it's a number
      setFormData({
        ...formData,
        academicYearStart: newStartYear,
        academicYearEnd: newStartYear + 1, // Ensure the end year is always 1 year after start
      });
    } else if (name === "academicYearEnd") {
      setFormData({
        ...formData,
        academicYearEnd: Number(value), // Ensure it's a number
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const handleNestedChange = (key, subKey, term, value) => {
    setFormData({
      ...formData,
      [key]: {
        ...formData[key],
        [term]: { ...formData[key][term], [subKey]: value },
      },
    });
  };

  const validateForm = () => {
    const formErrors = {};
    if (!formData.institute) formErrors.institute = "Institute is required";
    if (!formData.totalBusFee)
      formErrors.totalBusFee = "Total bus fee is required";

    // Validate each term (Term 1, Term 2, and Term 3)
    ["term1", "term2", "term3"].forEach((term) => {
      const { start, end } = formData.duration[term];
      const { amount, dueDate } = formData.termWisePayment[term];
      if (!start)
        formErrors[`${term}Start`] = `Start date for ${term} is required`;
      if (!end) formErrors[`${term}End`] = `End date for ${term} is required`;
      if (!amount)
        formErrors[`${term}Amount`] = `Amount for ${term} is required`;
      if (!dueDate)
        formErrors[`${term}DueDate`] = `Due date for ${term} is required`;
    });

    return formErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showToast("error", "Please fill in all required fields");
    } else {
      try {
        const institutionId = localStorage.getItem("institutionId");

        const requestData = {
          institutionId,
          instituteCode: formData.institute,
          busFeeData: {
            academicYearStart: formData.academicYearStart,
            academicYearEnd: formData.academicYearEnd,
            totalBusFee: formData.totalBusFee,
            duration: formData.duration,
            termWisePayment: formData.termWisePayment,
          },
        };

        const response = await apiClient.post(
          "/institutions/add-bus-fee",
          requestData
        );

        if (response.status === 201) {
          showToast(
            "success",
            `Successfully ${busFeeData ? "updated" : "added"} bus fee`
          );
          setTimeout(() => {
            onBack();
          }, 3000);
        }
      } catch (error) {
        // Handle different error cases based on status codes
        if (error.response && error.response.status === 400) {
          showToast("error", error.response.data.message);
        } else {
          console.error("Error saving bus fee:", error);
          showToast(
            "error",
            `Failed to ${
              busFeeData ? "update" : "add"
            } bus fee. Please try again.`
          );
        }
      }
    }
  };

  const renderFormFields = () => {
    const terms = ["term1", "term2", "term3"];
    return (
      <>
        <div className="add-bus-fee-column">
          <h3>Duration</h3>
          {terms.map((term) => (
            <div key={term} className="add-bus-fee-form-group">
              <label>{term.charAt(0).toUpperCase() + term.slice(1)}</label>
              <div className="date-inputs">
                <input
                  type="date"
                  value={formData.duration[term].start}
                  onChange={(e) =>
                    handleNestedChange(
                      "duration",
                      "start",
                      term,
                      e.target.value
                    )
                  }
                  className={errors[`${term}Start`] ? "input-error" : ""}
                />
                <input
                  type="date"
                  value={formData.duration[term].end}
                  onChange={(e) =>
                    handleNestedChange("duration", "end", term, e.target.value)
                  }
                  className={errors[`${term}End`] ? "input-error" : ""}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="add-bus-fee-column">
          <h3>Term wise payment and due date</h3>
          {terms.map((term) => (
            <div key={term} className="add-bus-fee-form-group">
              <label>{term.charAt(0).toUpperCase() + term.slice(1)}</label>
              <div className="payment-inputs">
                <input
                  type="number"
                  value={formData.termWisePayment[term].amount}
                  onChange={(e) =>
                    handleNestedChange(
                      "termWisePayment",
                      "amount",
                      term,
                      e.target.value
                    )
                  }
                  placeholder="Amount"
                  className={errors[`${term}Amount`] ? "input-error" : ""}
                />
                <input
                  type="date"
                  value={formData.termWisePayment[term].dueDate}
                  onChange={(e) =>
                    handleNestedChange(
                      "termWisePayment",
                      "dueDate",
                      term,
                      e.target.value
                    )
                  }
                  className={errors[`${term}DueDate`] ? "input-error" : ""}
                />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="add-bus-fee-container">
      <ToastNotification />
      <TopBar
        title={busFeeData ? "Edit Bus Fee" : "Add Bus Fee"}
        onBack={onBack}
        backButton
      />
      <main className="add-bus-fee-main-content">
        <form>
          <div className="add-bus-fee-form-grid">
            <div className="add-bus-fee-column">
              <div className="add-bus-fee-form-group">
                <label>Academic Year</label>
                <div className="academic-year-inputs">
                  <input
                    type="number"
                    name="academicYearStart"
                    value={formData.academicYearStart}
                    onChange={handleChange}
                    min={new Date().getFullYear()}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    name="academicYearEnd"
                    value={formData.academicYearEnd}
                    onChange={handleChange}
                    min={formData.academicYearStart + 1}
                  />
                </div>
              </div>
              <div className="add-bus-fee-form-group">
                <label>Select Institute</label>
                <select
                  name="institute"
                  value={formData.institute}
                  onChange={handleChange}
                  className={errors.institute ? "input-error" : ""}
                >
                  <option value="">Select Institute</option>
                  {institutes.map((institute) => (
                    <option
                      key={institute.instituteCode}
                      value={institute.instituteCode}
                    >
                      {institute.instituteName}
                    </option>
                  ))}
                </select>
                {errors.institute && (
                  <p className="error">{errors.institute}</p>
                )}
              </div>
              <div className="add-bus-fee-form-group">
                <label>Total Bus Fee</label>
                <input
                  type="number"
                  name="totalBusFee"
                  value={formData.totalBusFee}
                  onChange={handleChange}
                  placeholder="Enter total bus fee"
                  className={errors.totalBusFee ? "input-error" : ""}
                />
                {errors.totalBusFee && (
                  <p className="error">{errors.totalBusFee}</p>
                )}
              </div>
            </div>
            {renderFormFields()}
          </div>
          <ActionButtons
            onCancel={onBack}
            onSubmit={handleSubmit}
            submitText={busFeeData ? "Update" : "Add"}
          />
        </form>
      </main>
    </div>
  );
};

export default AddBusFee;
