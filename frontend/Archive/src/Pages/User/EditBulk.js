import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import "../../assets/scss/utils.scss";
import CheckBox from "../../Components/CheckBox";
import React, { useState } from "react";
import CustomCalendar from "../../Components/CustomCalendar";
import CalenderIcon from "../../Components/CalenderIcon";
import FormRowSelect from "../../Components/FormRowSelect";
import SearchRowInput from "../../Components/SearchRowInput";
import { Formik, Form } from "formik";
import apiClient from "../../Utils/apiClient";
import { useQuery } from "react-query";
import Loader from "../../Components/Loader";
const EditBulk = () => {
  const exam_list = ["Exam 1", "Exam 2", "Exam 3"];
  const sorting_list = ["Old-to-new", "New-to -old"];
  const plan_list = ["plan 1", "plan 2"];
  const subject_list = ["subject 1", "subject2"];
  const system_list = ["system 1", "system 2"];
  const [value, onChange] = useState(new Date());
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);

  const handleCalender = () => {
    setIsCalenderOpen(!isCalenderOpen);
  };
  const getUsers = async () => {
    const { data } = await apiClient.get("/users");
    return data;
  };

  const getAllUsers = useQuery(["users"], getUsers);

  if (getAllUsers.isFetching) {
    return <Loader />;
  }
  if (getAllUsers.isError) {
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />
          <div className="form-wrapper">
            <div className="dashboard-form w-90">
              <FormHeader text="Edit Bulk" />
              <div className="sorting_wrapper">
                <h3>Sort By:</h3>
                <div className="sorted_actions">
                  <Formik
                    initialValues={{
                      title: "",
                      answer_choices: [],
                      correct_answer: "",
                      difficulty: "",
                      status: "",
                      type: "",
                    }}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    {(formik) => (
                      <Form onSubmit={formik.handleSubmit}>
                        <FormRowSelect label="Exam" list={exam_list} />
                        <FormRowSelect label="Plan" list={plan_list} />
                        <FormRowSelect label="Sort By" list={sorting_list} />
                        <SearchRowInput />
                        <CheckBox text="Select all" classes="filters" />
                        <CheckBox text="Deselect all" classes="filters" />
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="edit-bulk">
                <div className="item">
                  <h1>No users found</h1>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (getAllUsers.isSuccess) {
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />
          <div className="form-wrapper">
            <div className="dashboard-form w-90">
              <FormHeader text="Edit Bulk" />
              <div className="sorting_wrapper">
                <h3>Sort By:</h3>
                <div className="sorted_actions">
                  <Formik
                    initialValues={{
                      title: "",
                      answer_choices: [],
                      correct_answer: "",
                      difficulty: "",
                      status: "",
                      type: "",
                    }}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    {(formik) => (
                      <Form onSubmit={formik.handleSubmit}>
                        <FormRowSelect label="Exam" list={exam_list} />
                        <FormRowSelect label="Plan" list={plan_list} />
                        <FormRowSelect label="Sort By" list={sorting_list} />
                        <SearchRowInput />
                        <CheckBox text="Select all" classes="filters" />
                        <CheckBox text="Deselect all" classes="filters" />
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="edit-bulk">
                {getAllUsers.data.data.users.map((user, index) => {
                  return (
                    <div className="item" key={user._id}>
                      <CheckBox text={user.email} />
                    </div>
                  );
                })}
              </div>
              <h2>Plans</h2>
              <div className="edit-plans">
                <div className="item">
                  <CheckBox text="plan 1" />
                  <h5>Set Expiration date</h5>
                  {isCalenderOpen ? (
                    <CustomCalendar />
                  ) : (
                    <CalenderIcon handleClick={handleCalender} />
                  )}
                </div>{" "}
                <div className="item">
                  <CheckBox text="plan 1" />
                  <h5>Set Expiration date</h5>
                  {isCalenderOpen ? (
                    <CustomCalendar />
                  ) : (
                    <CalenderIcon handleClick={handleCalender} />
                  )}
                </div>{" "}
                <div className="item">
                  <CheckBox text="plan 1" />
                  <h5>Set Expiration date</h5>
                  {isCalenderOpen ? (
                    <CustomCalendar />
                  ) : (
                    <CalenderIcon handleClick={handleCalender} />
                  )}
                </div>
              </div>
              <Button text="Add" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EditBulk;
