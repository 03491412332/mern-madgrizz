import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
const AddPlan = () => {
  return (
    <div className="dashboard-wrapper">
      <MyCustomSidebar />
      <div className="admin-nested">
        <AdminHeader />
        {/** This is inner page */}
        <div className="form-wrapper">
          <div className="dashboard-form">
            <FormHeader text="Add Plan" />
            <FormRowInput
              label="Plan Name"
              placeholder="Please enter pricing plan name"
              id="planeName"
            />
            <FormRowInput
              label="Plan Price"
              placeholder="Please enter price"
              id="planePrice"
            />
            <Button text="Add" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPlan;
