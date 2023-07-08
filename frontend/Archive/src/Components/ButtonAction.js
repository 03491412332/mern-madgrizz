import "../assets/scss/ButtonAction.scss";

const ButtonAction = ({ text = "button", className, handleSubmit }) => {
  return (
    <button className={`btn-donate ${className}`} onClick={handleSubmit}>
      {text}
    </button>
  );
};

export default ButtonAction;
