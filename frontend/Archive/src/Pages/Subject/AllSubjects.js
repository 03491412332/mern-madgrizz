import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import MyActionButton from "../../Components/MyActionButton";
import DeleteAction from "../../Components/DeleteAction";
import EditAction from "../../Components/EditAction";
import { useState } from "react";
import CustomModel from "../../Components/CustomModel";
import AddSubject from "./AddSubject";
import ButtonAction from "../../Components/ButtonAction";
import apiClient from "../../Utils/apiClient";
import { useQuery } from "react-query";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import usePostMutation from "../../Utils/usePostMutation";
const AllSubjects = () => {
  const { mutate } = usePostMutation();
  const [isOpen, setIsOpen] = useState(false);

  const getAllSubjects = async () => {
    const { data } = await apiClient("/subjects");
    return data.data;
  };

  const allSubjects = useQuery(["allSubjects"], getAllSubjects);

  const handleOpen = () => {
    console.log(`click on Add Question`);
    setIsOpen(!isOpen);
  };

  const handleDelete = (id) => {
    console.log(`handle delete clicked`);
    mutate(
      { method: "delete", url: `/subjects/${id}`, values: null },
      {
        onSuccess: () => {
          alert("Subject deleted successfully");
        },
        onError: (response) => {
          alert("An error occured while submiting the form");
          console.log(response);
        },
      }
    );
  };

  if (allSubjects.isLoading) {
    return <Loader />;
  }
  if (allSubjects.isError) {
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />
          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-table">
              <div className="dashboard-table__header">
                <h1>All Subjects</h1>
                <div className="action_btns">
                  {isOpen ? (
                    <CustomModel
                      component={<AddSubject />}
                      className="show"
                      handleSubmit={handleOpen}
                    />
                  ) : (
                    <ButtonAction text="Add New +" handleSubmit={handleOpen} />
                  )}
                </div>
              </div>
              <h1>Error while fetching data</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (allSubjects.isSuccess) {
    console.log(allSubjects);
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />
          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-table">
              <div className="dashboard-table__header">
                <h1>All Subjects</h1>
                <div className="action_btns">
                  {isOpen ? (
                    <CustomModel
                      component={<AddSubject />}
                      className="show"
                      handleSubmit={handleOpen}
                    />
                  ) : (
                    <ButtonAction text="Add New +" handleSubmit={handleOpen} />
                  )}
                </div>
              </div>
              <table id="customers">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allSubjects.data.subjects.map((subject, index) => {
                    return (
                      <tr key={index}>
                        <td>{subject.name}</td>

                        <td>{subject.createdAt}</td>
                        <td className="actions">
                          <Link to={`/dashboard/subject/edit/${subject._id}`}>
                            <MyActionButton icon={<EditAction />} text="Edit" />
                          </Link>
                          <MyActionButton
                            icon={<DeleteAction />}
                            text="Delete"
                            handleSubmit={() => handleDelete(subject._id)}
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

export default AllSubjects;
