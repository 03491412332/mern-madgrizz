import "../assets/scss/MyActionButton.scss";

const MyActionButton = ({ text = "Action btn", icon, handleSubmit }) => {
  return (
    <button type="button" className="my_action_btn" onClick={handleSubmit}>
      {icon}
      {text}
    </button>
  );
};

export default MyActionButton;
