import React from "react";
import FormRowInput from "../../Components/FormRowInput";
import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import { useParams } from "react-router-dom";
import Button from "../../Components/Button";
import apiClient from "../../Utils/apiClient";
import { useQuery } from "react-query";
import Loader from "../../Components/Loader";
import { Formik, Form } from "formik";
import usePostMutation from "../../Utils/usePostMutation";
const HelpCenterDetails = () => {
  const { id } = useParams();
  const { mutate } = usePostMutation();
  const getHelp = async () => {
    const { data } = await apiClient(`/help/${id}`);
    return data;
  };
  const getHelpData = useQuery(["help"], getHelp);
  if (getHelpData.isFetching) {
    return <Loader />;
  }
  if (getHelpData.isError) {
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader label="Help Center Details" />
          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-Data">
              <h1>No report found </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (getHelpData.isSuccess) {
    console.log("help", getHelpData);
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader label="Help Center Details" />
          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-Data">
              <h1>Help Center Details</h1>
              <div className="help-center-detail-item">
                <h3>Full Name: </h3>
                <h5>{getHelpData.data.data.helps.user_id.full_name}</h5>
              </div>
              <div className="help-center-detail-item">
                <h3>User Name: </h3>
                <h5>{getHelpData.data.data.helps.user_id.user_name}</h5>
              </div>
              <div className="help-center-detail-item">
                <h3>Email: </h3>
                <h5>{getHelpData.data.data.helps.user_id.email}</h5>
              </div>
              <div className="help-center-detail-item">
                <h3>Peport topic: </h3>
                <h5>{getHelpData.data.data.helps.title}</h5>
              </div>

              <h3>Report:</h3>
              <p>{getHelpData.data.data.helps.issue}</p>
              <Formik
                enableReinitialize
                initialValues={{
                  email_body: "",
                  email: getHelpData.data.data.helps.user_id.email,
                }}
                onSubmit={(values) => {
                  console.log("submitted values", values);
                  // console.log(id);
                  mutate(
                    { method: "patch", url: `/help/${id}`, values: values },
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
                  <form onSubmit={props.handleSubmit}>
                    <FormRowInput
                      label="Send reply email back to user"
                      id="email_body"
                      name="email_body"
                      classes="full"
                      value={props.values.email_body}
                      onChange={props.handleChange}
                    />

                    <Button text="Send" type="submit" />
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default HelpCenterDetails;
