import "../assets/scss/CustomModel.scss";
import { useNavigate } from "react-router-dom";
const CustomModel = ({ component, className, handleSubmit }) => {
  const navigate = useNavigate();
  return (
    <div className={`model_wrapper ${className}`}>
      <svg
        onClick={handleSubmit}
        width="28px"
        height="28px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M19 5L4.99998 19M5.00001 5L19 19"
            stroke=" #11009e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
      <div className="model">{component}</div>
    </div>
  );
};

export default CustomModel;
