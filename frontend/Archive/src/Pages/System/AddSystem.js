import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import usePostMutation from "../../Utils/usePostMutation";
import { useFormik } from "formik";
const AddSystem = () => {
  const { mutate } = usePostMutation();
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
            alert("System added successfully");
          },
          onError: (response) => {
            alert("An error occured during submitting system");
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
