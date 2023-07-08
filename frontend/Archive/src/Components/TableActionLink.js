import "../assets/scss/MyActionButton.scss";
import { Link } from "react-router-dom";
const TableActionLink = ({
  text = "Action btn",
  icon,
  handleSubmit,
  redirect,
}) => {
  return (
    <Link to={redirect} className="my_action_btn" onClick={handleSubmit}>
      {icon}
      {text}
    </Link>
  );
};

export default TableActionLink;
