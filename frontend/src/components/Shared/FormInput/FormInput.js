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
  disabled = false, // Add the disabled prop
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
          disabled={disabled} // Add disabled here
        >
          {/* Add a disabled placeholder option */}
          <option value="" disabled hidden>
            {placeholder}
          </option>
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
          disabled={disabled} // Add disabled here
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
          disabled={disabled} // Add disabled here
        />
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FormInput;
