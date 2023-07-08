import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import DeleteAction from "../../Components/DeleteAction";
import EditAction from "../../Components/EditAction";
import MyActionButton from "../../Components/MyActionButton";
import Button from "../../Components/Button";
import ButtonAction from "../../Components/ButtonAction";
import { useState } from "react";
import CustomModel from "../../Components/CustomModel";

import AddExam from "./AddExam";
import EditExam from "./EditExam";
import { Link } from "react-router-dom";
import MyActionLink from "../../Components/MyActionLink";
import { useQuery } from "react-query";
import apiClient from "../../Utils/apiClient";
import Loader from "../../Components/Loader";
import usePostMutation from "../../Utils/usePostMutation";
const AllExams = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [addExamIsOpen, setAddExamIsOpen] = useState(false);
  const [isEditExamOpen, setIsEditExamOpen] = useState(false);
  const { mutate } = usePostMutation();
  const [exams, setExams] = useState([{}]);
  const getAllExams = async () => {
    const { data } = await apiClient.get("/exams");
    return data;
  };
  const allExams = useQuery(["exams"], getAllExams);
  console.log(allExams);

  const handleDelete = (id) => {
    mutate(
      {
        url: `/exams/${id}`,
        method: "delete",
        values: null,
      },
      {
        onSuccess: (res) => {
          alert("Exam deleted successfully");
        },
        onError: (err) => {
          alert("Error");
          console.log(err);
        },
      }
    );
  };

  const handleOpen = () => {
    console.log(`click on Add Question`);
    setIsOpen(!isOpen);
  };
  const handleExam = () => {
    console.log("Add Exam clicked");
    setAddExamIsOpen(!addExamIsOpen);
  };
  const handleEditExam = () => {
    setIsEditExamOpen(!isEditExamOpen);
  };
  if (allExams.isLoading) return <Loader />;
  if (allExams.isError) {
    return <h1>No data found</h1>;
  }
  if (allExams.isSuccess) {
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />
          <div className="form-wrapper">
            <div className="dashboard-table">
              <div className="dashboard-table__header">
                <h1>All Exams</h1>
                <div className="action_btns">
                  <MyActionLink
                    text="Edit System"
                    redirect="/dashboard/system/all"
                  />
                  <MyActionLink
                    text="Edit Subject Area"
                    redirect="/dashboard/subject/all"
                  />

                  {addExamIsOpen ? (
                    <CustomModel
                      component={<AddExam />}
                      className="show"
                      handleSubmit={handleExam}
                    />
                  ) : (
                    <ButtonAction text="Add Exam" handleSubmit={handleExam} />
                  )}
                </div>
              </div>
              <table id="customers">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allExams.data.data.exams.map((exam, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <Link to={`/dashboard/question/${exam._id}`}>
                            {exam.name}
                          </Link>
                        </td>
                        <td className="actions">
                          <Link
                            to={`/dashboard/exam/edit/${exam.name}/${exam._id}`}
                          >
                            <MyActionButton
                              icon={<EditAction />}
                              text="Edit"
                              handleSubmit={handleEditExam}
                            />
                          </Link>

                          <MyActionButton
                            icon={<DeleteAction />}
                            text="Delete"
                            handleSubmit={() => handleDelete(exam._id)}
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

export default AllExams;
