import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import usePostMutation from "../../Utils/usePostMutation";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const AddSystem = () => {
  const { mutate } = usePostMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
      mutate(
        {
          url: "/systems",
          values: values,
        },
        {
          onSuccess: () => {
            //alert("System added successfully");
            toast.success("System added successfully");
            //handleOpen();
            // navigate("/dashboard/system/all");
          },
          onError: (response) => {
            // alert("An error occured during submitting system");
            toast.error("An error occured adding system");
            console.log(response);
          },
        }
      );
    },
  });

  return (
    <div className="form-wrapper">
      <div className="dashboard-form">
        <FormHeader text="System" />
        <ToastContainer />
        <form onSubmit={formik.handleSubmit}>
          <FormRowInput
            label="Name"
            placeholder="Please enter name of system"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <Button text="Add System" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddSystem;
