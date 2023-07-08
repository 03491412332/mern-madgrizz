import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import DeleteAction from "../../Components/DeleteAction";
import EditAction from "../../Components/EditAction";
import MyActionButton from "../../Components/MyActionButton";
import CustomModel from "../../Components/CustomModel";
import AddQuestion from "./AddQuestion";
import ButtonAction from "../../Components/ButtonAction";
import { useState } from "react";
import SearchRowInput from "../../Components/SearchRowInput";
import { Formik, Form } from "formik";
import { Link, useParams } from "react-router-dom";
import FormRowSelect from "../../Components/FormRowSelect";
import { useQuery } from "react-query";
import apiClient from "../../Utils/apiClient";
import Loader from "../../Components/Loader";
import usePostMutation from "../../Utils/usePostMutation";
import Button from "../../Components/Button";
import useQuestionData from "../../Helpers/useQuestionsData";
const AllQuestions = () => {
  const { exam_id } = useParams();
  const { mutate } = usePostMutation();
  const [filters, setFilters] = useState({});
  const list_report_topic = ["Topic 1", "Topic 2", "Topic 3"];
  const sorting_list = ["Old-to-new", "New-to-old"];
  const resolved_list = ["resolved", "unresolved"];

  const system_list = ["Error.."];
  const [isOpen, setIsOpen] = useState(false);
  console.log("exam id ", exam_id);
  const handleOpen = () => {
    console.log(`click on Add Question`);
    setIsOpen(!isOpen);
  };

  const getAllQuestions = useQuestionData(exam_id, filters);

  const getSystems = async () => {
    const { data } = await apiClient.get("/systems");
    return data;
  };
  const getSubjects = async () => {
    const { data } = await apiClient.get("/subjects");
    return data;
  };
  const getAllSystems = useQuery(["systems"], getSystems);
  const getAllSubjects = useQuery(["subjects"], getSubjects);

  if (getAllQuestions.isFetching) {
    return <Loader />;
  }

  const handleDelete = (id) => {
    mutate(
      {
        method: "delete",
        url: `questions/${exam_id}/${id}`,
        values: null,
      },
      {
        onSuccess: (res) => {
          alert("Question deleted successfully");
          getAllQuestions.refetch();
        },
        onError: (response) => {
          alert("An error occured while deleting question");
          console.log(response);
        },
      }
    );

    //getAllQuestions();
  };
  if (getAllQuestions.isFetching) {
    return <Loader />;
  }
  if (getAllQuestions.isError) {
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />
          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-table">
              <div className="dashboard-table__header">
                <h1>Exam No Questions List</h1>
                <div className="action_btns">
                  {isOpen ? (
                    <CustomModel
                      component={<AddQuestion exam_id={exam_id} />}
                      className="show"
                      handleSubmit={handleOpen}
                    />
                  ) : (
                    <ButtonAction
                      text="Add Question"
                      handleSubmit={handleOpen}
                    />
                  )}
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
                        <FormRowSelect
                          id="type"
                          label="Type"
                          list={system_list}
                          name="type"
                        />
                        <SearchRowInput />
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <h1>Error while loading data</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (
    getAllQuestions.isSuccess &&
    getAllSystems.isSuccess &&
    getAllSubjects.isSuccess
  ) {
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />
          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-table">
              <div className="dashboard-table__header">
                <h1>Exam No Questions List</h1>
                <div className="action_btns">
                  {isOpen ? (
                    <CustomModel
                      component={<AddQuestion exam_id={exam_id} />}
                      className="show"
                      handleSubmit={handleOpen}
                    />
                  ) : (
                    <ButtonAction
                      text="Add Question"
                      handleSubmit={handleOpen}
                    />
                  )}
                </div>
              </div>
              <div className="sorting_wrapper">
                <h3>Sort By:</h3>
                <div className="sorted_actions">
                  <Formik
                    initialValues={{
                      title: "",
                      system_id: "",
                      subject_id: "",
                      date: "",
                    }}
                    onSubmit={(values) => {
                      console.log("we are selecting the system", values);
                      setFilters(values);
                      console.log("filters", filters);
                    }}
                  >
                    {(formik) => (
                      <Form onSubmit={formik.handleSubmit}>
                        <FormRowSelect
                          id="system_id"
                          label="System"
                          list={getAllSystems.data.data.systems}
                          name="system_id"
                          isApiData="true"
                        />
                        <FormRowSelect
                          id="subject_id"
                          label="Subject"
                          list={getAllSubjects.data.data.subjects}
                          name="subject_id"
                          isApiData="true"
                        />
                        <FormRowSelect
                          id="date"
                          label="Date"
                          list={sorting_list}
                          name="date"
                        />
                        <SearchRowInput
                          name="title"
                          handleChange={formik.handleChange}
                          val={formik.values.title}
                        />
                        <Button type="submit" text="Search" />
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <table id="customers">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Content</th>

                    <th>Difficulty</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getAllQuestions.data.data.questions.map(
                    (question, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{question.title}</td>

                          <td>{question.difficulty}</td>

                          <td className="actions">
                            <Link
                              to={`/dashboard/question/edit/${exam_id}/${question._id}`}
                            >
                              <MyActionButton
                                icon={<EditAction />}
                                text="Edit"
                              />
                            </Link>

                            <MyActionButton
                              icon={<DeleteAction />}
                              text="Delete"
                              handleSubmit={() => handleDelete(question._id)}
                            />
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default AllQuestions;
