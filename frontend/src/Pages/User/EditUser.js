import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import { useFormik, Formik } from "formik";
import usePostMutation from "../../Utils/usePostMutation";
import { useParams } from "react-router-dom";
import apiClient from "../../Utils/apiClient";
import { useQueries, useQuery } from "react-query";
import Loader from "../../Components/Loader";

const EditUser = () => {
  const { id } = useParams();
  let userValues = {};
  const plans_list = ["Plan 1 : 200$", "Plan 2 : 300$", "plan 3 : 400$"];
  const { mutate } = usePostMutation();

  const userData = async () => {
    const { data } = await apiClient(`/users/${id}`);
    return data;
  };
  const getUserData = useQuery(["user"], userData, {
    refetchOnWindowFocus: false,
  });

  const formik = useFormik({});

  if (getUserData.isFetching) {
    return <Loader />;
  }
  if (getUserData.isError) {
    return <h1>Could not find any data</h1>;
  }

  if (getUserData.isSuccess) {
    console.log("user data", getUserData);
    userValues = { ...getUserData.data.data.user };
    return (
      <div className="form-wrapper">
        <Formik
          enableReinitialize
          initialValues={userValues}
          onSubmit={(values) => {
            console.log(values);
            const { user_name, full_name, email, password, profile_image } =
              values;

            const formData = new FormData();
            formData.append("user_name", user_name);
            formData.append("full_name", full_name);
            formData.append("email", email);
            // formData.append("password", password);
            // formData.append("passwordConfirm", password);
            formData.append("profile_image", profile_image);

            mutate(
              {
                method: "patch",
                url: `/users/${id}`,
                values: formData,
                head: {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                },
              },
              {
                onSuccess: (res) => {
                  console.log("response of add user", res);
                  alert("form data submitted successfully");
                },
                onError: (err) => {
                  alert(err.response.data.message);
                  console.log(err);
                },
              }
            );
          }}
        >
          {(formik) => (
            <div className="dashboard-form">
              <FormHeader text="Edit User" />
              <form
                encType="multipart/form-data"
                onSubmit={formik.handleSubmit}
              >
                <FormRowInput
                  label="User Name"
                  placeholder="Please enter user name"
                  id="user_name"
                  name="user_name"
                  onChange={formik.handleChange}
                  value={formik.values.user_name}
                />
                <FormRowInput
                  label="Full Name"
                  placeholder="Please enter full name"
                  id="full_name"
                  name="full_name"
                  onChange={formik.handleChange}
                  value={formik.values.full_name}
                />
                <FormRowInput
                  label="Email"
                  type="email"
                  isReadOnly={true}
                  placeholder="Please enter email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />

                <FormRowInput
                  type="file"
                  label="Profile Image"
                  id="profile_image"
                  name="profile_image"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "profile_image",
                      event.currentTarget.files[0]
                    );
                  }}
                />

                <Button type="submit" text="Add" />
              </form>
            </div>
          )}
        </Formik>
      </div>
    );
  }
};

export default EditUser;
