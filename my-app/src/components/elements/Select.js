import React, { useContext } from "react";
import { FormContext } from "../../FormContext";

const Select = ({ uid, label, field_options }) => {
  const { handleChange } = useContext(FormContext);

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={(event) => handleChange(uid, event)}
      >
        {field_options.length > 0 &&
          field_options.map((option, i) => (
            <option value={option.option_label} key={i}>
              {option.option_label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
