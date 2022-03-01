import React, { useContext } from "react";
import { FormContext } from "../../FormContext";

const Input = ({ uid, label, field_placeholder, field_value }) => {
  const { handleChange } = useContext(FormContext);

  return (
    <div className="mb-4">
      <label htmlFor="inputElement" className="form-label">
        {label}
      </label>

      <input
        type="text"
        className="form-control"
        id="inputElement"
        placeholder={field_placeholder ? field_placeholder : ""}
        value={field_value}
        onChange={(event) => handleChange(uid, event)}
      />
    </div>
  );
};

export default Input;
