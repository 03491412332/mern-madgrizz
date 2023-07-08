import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import { Formik } from "formik";
import usePostMutation from "../../Utils/usePostMutation";
import { useParams } from "react-router-dom";
import apiClient from "../../Utils/apiClient";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const EditSystem = () => {
  const { id } = useParams();
  const [system, setSystem] = useState({});

  const { mutate } = usePostMutation();

  const loadSystem = async () => {
    const sys = await apiClient.get(`/systems/${id}`);
    console.log("system data", sys);
    return sys.data;
  };
  const systemData = useQuery(["system"], loadSystem, {
    onSuccess: (res) => {
      console.log("api response", res);
      setSystem({ ...res.data });
    },
  });

  useEffect(() => {}, [systemData]);

  if (systemData.isError) {
    return <h1>Error while loading data</h1>;
  }
  if (systemData.isSuccess) {
    console.log("System variable", system);
    //let systemValues = {{ ...systemData.data.data };
    // console.log("system values", systemValues);

    return (
      <>
        <Formik
          enableReinitialize
          initialValues={system}
          onSubmit={(values) => {
            // console.log(values);
            // console.log(id);
            mutate(
              { method: "patch", url: `/systems/${id}`, values: values },
              {
                onSuccess: () => {
                  //alert("Form submitted successfully");
                  toast.success("System updated successfully");
                },
                onError: (response) => {
                  alert("An error occured while submiting the form");
                  toast.error("Error while system updated");
                  console.log(response);
                },
              }
            );
          }}
        >
          {(props) => (
            <div className="form-wrapper">
              <div className="dashboard-form">
                <FormHeader text="Update System" />
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
        <ToastContainer />
      </>
    );
  }
  //
};

export default EditSystem;
