import "../assets/scss/IconRowInput.scss";

const IconRowInput = ({ id, name, icon, placeholder, type, handleChange }) => {
  return (
    <div className="group">
      {icon}
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        className="input"
        onChange={handleChange}
      />
    </div>
  );
};

export default IconRowInput;
