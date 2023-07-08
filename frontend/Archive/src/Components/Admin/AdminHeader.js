import "../../assets/scss/AdminHeader.scss";
import user from "../../assets/images/user.jpg";
const AdminHeader = () => {
  return (
    <>
      <div className="admin-header">
        <img src={user} alt="This is user logo" />
        <h6>Logout</h6>
      </div>
    </>
  );
};

export default AdminHeader;
