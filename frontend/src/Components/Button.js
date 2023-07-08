import "../assets/scss/Button.scss";

const Button = ({
  text = "button",
  className,
  handleSubmit,
  type,
  disable,
}) => {
  console.log(className);
  return (
    <button
      type={type}
      className={`custom-btn ${className}`}
      onClick={handleSubmit}
      // disabled={disable}
    >
      {text}
    </button>
  );
};

export default Button;
