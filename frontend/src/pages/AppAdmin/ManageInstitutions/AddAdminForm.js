import React, { useState } from "react";
import "./AddAdminForm.css";

const AddAdminForm = ({ onSave }) => {
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const adminDetails = {
      adminName,
      email,
      contactNumber,
      password,
    };

    onSave(adminDetails);
    setError("");
  };

  return (
    <div className="form-container">
      <h2>Add Admin Details</h2>
      <div>
        <label>Admin Name</label>
        <input
          type="text"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Contact Number</label>
        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Create Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={error ? "input-error" : ""}
        />
        {error && <div className="error">{error}</div>}
      </div>
      <div className="button-group">
        <button onClick={() => handleSubmit()} className="form-button">
          Save
        </button>
        <button
          onClick={() => alert("Canceled")}
          className="form-button"
          style={{ backgroundColor: "var(--error-color)" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddAdminForm;
