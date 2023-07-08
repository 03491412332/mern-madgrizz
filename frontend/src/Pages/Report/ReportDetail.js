import React from "react";
import FormRowInput from "../../Components/FormRowInput";
import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import Button from "../../Components/Button";
import TableActionLink from "../../Components/TableActionLink";
import ResolvedAction from "../../Components/ResolvedAction";
import EditAction from "../../Components/EditAction";
import { useParams } from "react-router-dom";
import apiClient from "../../Utils/apiClient";
import { useQuery } from "react-query";
import Loader from "../../Components/Loader";
import usePostMutation from "../../Utils/usePostMutation";
import { Formik } from "formik";

const ReportDetail = () => {
  const { id } = useParams();
  const { mutate } = usePostMutation();

  const getData = async () => {
    const { data } = await apiClient(`/reports/${id}`);
    return data;
  };
  const getReport = useQuery(["reports"], getData);

  const handleUpdate = async (id) => {
    mutate(
      {
        method: "patch",
        url: `/reports/${id}`,
        values: null,
      },
      {
        onSuccess: (res) => {
          alert("form data submitted successfully");
        },
        onError: (err) => {
          alert("Error");
          console.log(err);
        },
      }
    );
  };

  if (getReport.isFetching) {
    return <Loader />;
  }

  if (getReport.isError) {
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <h1>We could not find any record</h1>
        </div>
      </div>
    );
  }
  if (getReport.isSuccess) {
    console.log("report data", getReport);
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader label="Help Center Details" />
          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-Data">
              <div className="report_row">
                <h1>Report Details</h1>
                <TableActionLink
                  icon={<ResolvedAction />}
                  text="Resolve"
                  handleSubmit={() =>
                    handleUpdate(getReport.data.data.report._id)
                  }
                />
              </div>

              <div className="help-center-detail-item">
                <h3>Full Name: </h3>
                <h5>{getReport.data.data.report.user_id.full_name}</h5>
              </div>
              <div className="help-center-detail-item">
                <h3>User Name: </h3>
                <h5>{getReport.data.data.report.user_id.user_name}</h5>
              </div>
              <div className="help-center-detail-item">
                <h3>Email: </h3>
                <h5>{getReport.data.data.report.user_id.email}</h5>
              </div>
              <div className="help-center-detail-item">
                <h3>Peport topic: </h3>
                <h5>{getReport.data.data.report.title}</h5>
              </div>
              <br />
              <h3>Report:</h3>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Reprehenderit aliquam repellendus explicabo qui cum, alias
                laborum aliquid vitae, temporibus molestiae at optio sed
                voluptatum possimus nam adipisci magnam ducimus debitis dolorem
                porro praesentium. Unde perferendis enim tempore aliquam
                quaerat, provident sit magnam temporibus ad ipsa, praesentium
                soluta facilis impedit laborum.
              </p>
              <br />
              <div className="report_row">
                <h1>Question</h1>
                <TableActionLink
                  icon={<EditAction />}
                  text="Edit"
                  redirect={`/dashboard/question/edit/${getReport.data.data.report.question_id.exam_id}/${getReport.data.data.report.question_id._id}`}
                />
              </div>
              <p>{getReport.data.data.report.question_id.title}</p>
              <ol className="questions_list">
                {getReport.data.data.report.question_id.choices.map(
                  (choice, index) => {
                    return <li>{choice}</li>;
                  }
                )}
              </ol>
              <div className="report_row_flex">
                <h3>Student's Answer</h3>
                <p>Answer 1</p>
              </div>
              <div className="report_row_flex">
                <h3>Correct Answer</h3>
                <p>{getReport.data.data.report.question_id.correct_answer}</p>
              </div>
              <Formik
                enableReinitialize
                initialValues={{
                  email_body: "",
                  answer_explanation: "",
                  email: getReport.data.data.report.user_id.email,
                }}
                onSubmit={(values) => {
                  console.log("submitted values", values);
                  // console.log(id);
                  mutate(
                    {
                      method: "patch",
                      url: `/reports/${id}`,
                      values: values,
                    },
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
                      label="Answer Explanation"
                      id="answer_explanation"
                      classes="full"
                      name="answer_explanation"
                      value={props.values.answer_explanation}
                      onChange={props.handleChange}
                    />
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

export default ReportDetail;
