import "../assets/scss/Button.scss";

const Button = ({ text = "button", className, handleSubmit, type }) => {
  console.log(className);
  return (
    <button
      type={type}
      className={`custom-btn ${className}`}
      onClick={handleSubmit}
    >
      {text}
    </button>
  );
};

export default Button;
