import "../assets/scss/ButtonAction.scss";
import { Link } from "react-router-dom";
const MyActionLink = ({ text = "Action btn", icon, redirect }) => {
  return (
    <Link className={`btn-donate`} to={redirect}>
      {icon}
      {text}
    </Link>
  );
};

export default MyActionLink;
