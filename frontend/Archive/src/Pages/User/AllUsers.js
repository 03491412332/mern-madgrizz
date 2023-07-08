import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import DeleteAction from "../../Components/DeleteAction";
import EditAction from "../../Components/EditAction";
import MyActionButton from "../../Components/MyActionButton";
import { useState } from "react";
import CustomModel from "../../Components/CustomModel";
import AddUser from "./AddUser";
import ButtonAction from "../../Components/ButtonAction";
import FormRowSelect from "../../Components/FormRowSelect";
import MyActionLink from "../../Components/MyActionLink";
import TableActionLink from "../../Components/TableActionLink";
import { Formik, Form } from "formik";
import apiClient from "../../Utils/apiClient";
import { useQuery } from "react-query";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import usePostMutation from "../../Utils/usePostMutation";
const AllUsers = () => {
  const { mutate } = usePostMutation();
  const plan_list = ["plan 1", "plan 2"];
  const date_list = ["Old-to-new", "New-to-old"];
  const exam_list = ["Exam 1", "Exam 2"];
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    console.log(`click on Add Question`);
    setIsOpen(!isOpen);
  };

  const getUsers = async () => {
    const { data } = await apiClient.get("/users");
    return data;
  };

  const getAllUsers = useQuery(["users"], getUsers, {
    refetchOnWindowFocus: false,
  });
  const handleDelete = (id) => {
    mutate(
      {
        method: "delete",
        url: `users/${id}`,
        values: null,
      },
      {
        onSuccess: (res) => {
          alert("User deleted successfully");
        },
        onError: (response) => {
          alert("An error occured while deleting question");
          console.log(response);
        },
      }
    );
  };
  if (getAllUsers.isFetching) {
    return <Loader />;
  }
  if (getAllUsers.isError) {
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />
          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-table">
              <div className="dashboard-table__header">
                <h1>All Users</h1>
                <div className="action_btns">
                  {isOpen ? (
                    <CustomModel
                      component={<AddUser />}
                      className="show"
                      handleSubmit={handleOpen}
                    />
                  ) : (
                    <ButtonAction text="Add New +" handleSubmit={handleOpen} />
                  )}
                  <MyActionLink
                    text="Edit Bulk"
                    redirect="/dashboard/user/editBulk"
                  />
                  <MyActionLink
                    text="Add Bulk"
                    redirect="/dashboard/user/addBulk"
                  />
                </div>
              </div>
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
                        <FormRowSelect label="Sort By" list={date_list} />
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>

              <h1>We could not found any user</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (getAllUsers.isSuccess) {
    console.log(getAllUsers);
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />
          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-table">
              <div className="dashboard-table__header">
                <h1>All Users</h1>
                <div className="action_btns">
                  {isOpen ? (
                    <CustomModel
                      component={<AddUser />}
                      className="show"
                      handleSubmit={handleOpen}
                    />
                  ) : (
                    <ButtonAction text="Add New +" handleSubmit={handleOpen} />
                  )}
                  <MyActionLink
                    text="Edit Bulk"
                    redirect="/dashboard/user/editBulk"
                  />
                  <MyActionLink
                    text="Add Bulk"
                    redirect="/dashboard/user/addBulk"
                  />
                </div>
              </div>
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
                        <FormRowSelect label="Sort By" list={date_list} />
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>

              <table id="customers">
                <thead>
                  <tr>
                    <th>User Name</th>

                    <th>Email</th>
                    <th>Register Date</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getAllUsers.data.data.users.map((user, index) => {
                    return (
                      <tr key={user._id}>
                        <td>{user.user_name}</td>

                        <td>{user.email}</td>
                        <td>{user.createdAt}</td>

                        <td className="actions">
                          <Link to={`/dashboard/user/edit/${user._id}`}>
                            <MyActionButton icon={<EditAction />} text="Edit" />
                          </Link>
                          <MyActionButton
                            icon={<DeleteAction />}
                            text="Delete"
                            handleSubmit={() => handleDelete(user._id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AllUsers;
