import React from "react";

export default ({ input, label, meta: { error, touched, active } }) => {
  return (
    <div className="input-field">
      <input
        {...input}
        className={`validate ${
          touched && !active ? (error ? "invalid" : "valid") : ""
        }`}
      />
      <label
        htmlFor={input.name}
        data-error={error}
        className={input.value || active || (touched && error) ? "active" : ""}
        style={{ color: touched && error ? "#F44336" : "" }}
      >
        {label}
      </label>
    </div>
  );
};
