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
  isReadOnly = false,
}) => {
  return (
    <div className="coolinput">
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
      />
    </div>
  );
};

export default FormRowInput;
