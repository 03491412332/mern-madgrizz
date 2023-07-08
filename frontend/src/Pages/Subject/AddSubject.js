import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import { useFormik } from "formik";
import usePostMutation from "../../Utils/usePostMutation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddSubject = () => {
  const { mutate } = usePostMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
      mutate(
        { url: "/subjects", values: values },
        {
          onSuccess: (res) => {
            console.log(res);
            //alert("Subject added successfully");
            toast.success("Subject added successfully");
          },
          onError: (response) => {
            toast.success("An error occured while adding new Subject");
            //alert("An error occured while submiting the form");
            console.log(response);
          },
        }
      );
    },
  });

  return (
    <div className="form-wrapper">
      <div className="dashboard-form">
        <FormHeader text="Add Subject" />
        <form onSubmit={formik.handleSubmit}>
          <FormRowInput
            label="Name"
            placeholder="Please enter name of subject"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <Button text="Add Subject" type="submit" />
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddSubject;
