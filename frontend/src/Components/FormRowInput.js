import { useState } from "react";
import "../assets/scss/FormRowInput.scss";
const FormRowInput = ({
  type,
  label = "My label",
  name,
  id,
  placeholder,
  classes = "",
  onChange,
  value,
  containerClasses,
  isReadOnly = false,
  aspformat,
}) => {
  const [date, setDate] = useState();
  return (
    <div className={`coolinput ${containerClasses} `}>
      <label htmlFor={id} className="text">
        {label}:
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className={`input ${classes}`}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        readOnly={isReadOnly}
        asp-format={aspformat}
      />
    </div>
  );
};

export default FormRowInput;
