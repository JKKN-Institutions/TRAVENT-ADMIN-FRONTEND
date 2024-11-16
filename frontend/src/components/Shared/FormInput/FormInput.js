// FormInput.js
import React from "react";
import "./FormInput.css";

const FormInput = ({
  id,
  name,
  type = "text",
  value,
  placeholder,
  error,
  onChange,
  options = [],
  rows = 3,
}) => {
  return (
    <div className="form-group">
      {type === "select" ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? "input-error" : ""}
        >
          {/* Add a disabled placeholder option */}
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? "input-error" : ""}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={error ? "input-error" : ""}
        />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FormInput;
