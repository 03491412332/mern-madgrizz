import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import { Formik } from "formik";
import usePostMutation from "../../Utils/usePostMutation";
import { useParams } from "react-router-dom";
import apiClient from "../../Utils/apiClient";
import { useQuery } from "react-query";

const EditSubject = () => {
  const { id } = useParams();

  let subjectValues = {};

  const { mutate } = usePostMutation();

  const loadSubject = async () => {
    const sub = await apiClient.get(`/subjects/${id}`);
    return sub.data;
  };

  const subjectData = useQuery(["subject"], loadSubject);

  if (subjectData.isError) {
    return <h1>Error while loading data</h1>;
  }
  if (subjectData.isSuccess) {
    subjectValues = { ...subjectData.data.data };
    console.log("initial values", subjectValues);

    return (
      <Formik
        enableReinitialize
        initialValues={subjectValues}
        onSubmit={(values) => {
          // console.log(values);
          // console.log(id);
          mutate(
            { method: "patch", url: `/subjects/${id}`, values: values },
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
        }}
      >
        {(props) => (
          <div className="form-wrapper">
            <div className="dashboard-form">
              <FormHeader text="Update Subject" />
              <form onSubmit={props.handleSubmit}>
                <FormRowInput
                  label="Name"
                  id="name"
                  value={props.values.name}
                  onChange={props.handleChange}
                />

                <Button text="Update" type="submit" />
              </form>
            </div>
          </div>
        )}
      </Formik>
    );
  }
  //
};

export default EditSubject;
