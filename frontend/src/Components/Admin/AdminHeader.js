import "../../assets/scss/AdminHeader.scss";
import user from "../../assets/images/user.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
const AdminHeader = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  //console.log("user in local storage", user);

  return (
    <>
      <div className="admin-header">
        <AiOutlineArrowLeft
          size="1.5rem"
          className="arrow-section"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </>
  );
};

export default AdminHeader;
