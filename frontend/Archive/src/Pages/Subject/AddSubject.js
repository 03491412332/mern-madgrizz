import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import { useFormik } from "formik";
import usePostMutation from "../../Utils/usePostMutation";

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
          onSuccess: () => {
            alert("Form submitted successfully");
          },
          onError: (response) => {
            alert("An error occured while submiting the form");
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
      </div>
    </div>
  );
};

export default AddSubject;
