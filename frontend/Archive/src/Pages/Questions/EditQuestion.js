import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import FormRowSelect from "../../Components/FormRowSelect";
import { FieldArray, Formik, Form } from "formik";
import usePostMutation from "../../Utils/usePostMutation";
import { useQuery } from "react-query";
import apiClient from "../../Utils/apiClient";
import Loader from "../../Components/Loader";
import { useParams } from "react-router-dom";
const EditQuestion = () => {
  const { exam_id, question_id } = useParams();
  let questionValues = {};
  console.log("ids", exam_id, question_id);
  const difficuilty_list = ["Easy", "Medium", "Hard"];
  const status_list = ["Answered", "Flagged", "Unanswered"];
  const question_type_list = ["Unused", "Incorrect", "Correct", "All"];
  const { mutate } = usePostMutation();
  const getSystems = async () => {
    const { data } = await apiClient.get("/systems");
    return data;
  };
  const getSubjects = async () => {
    const { data } = await apiClient.get("/subjects");
    return data;
  };
  const getQuestion = async () => {
    const { data } = await apiClient.get(
      `/questions/${exam_id}/${question_id}`
    );
    return data;
  };
  const getAllSystems = useQuery(["allSystems"], getSystems);
  const getAllSubjects = useQuery(["allSubjects"], getSubjects);
  const question = useQuery(["question"], getQuestion);

  if (getAllSystems.isLoading && getAllSubjects.isLoading) {
    return <Loader />;
  }
  if (getAllSystems.isError && getAllSubjects.isError) {
    return <h1>Error while fetching data</h1>;
  }
  if (
    getAllSystems.isSuccess &&
    getAllSubjects.isSuccess &&
    question.isSuccess
  ) {
    // console.log("all Systems", getAllSystems);
    // console.log("all Subjects", getAllSubjects);
    //console.log("question data", question);
    questionValues = { ...question.data.data.question };
    return (
      <div className="form-wrapper">
        <Formik
          enableReinitialize
          initialValues={questionValues}
          onSubmit={(values) => {
            console.log(values);
            const {
              title,
              choices,
              correct_answer,
              difficulty,
              question_image,
              answer_image,
              answer_explanation,
              status,
              type,
              points,
              system_id,
              subject_id,
              exam_id,
            } = values;

            const formData = new FormData();
            formData.append("title", title);
            formData.append("answer_choices", choices);
            formData.append("correct_answer", correct_answer);
            formData.append("difficulty", difficulty);
            formData.append("question_image", question_image);
            formData.append("answer_images", answer_image);
            formData.append("answer_explanation", answer_explanation);
            formData.append("status", status);
            formData.append("type", type);
            formData.append("subject_id", subject_id);
            formData.append("system_id", system_id);
            formData.append("points", points);
            formData.append("exam_id", exam_id);

            mutate(
              {
                method: "patch",
                url: `/questions/${exam_id}/${question_id}`,
                values: formData,
                head: {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                },
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
          }}
        >
          {(formik) => (
            <Form
              encType="multipart/form-data"
              className="dashboard-form"
              onSubmit={formik.handleSubmit}
            >
              <FormHeader text="Edit Question" />
              <FormRowInput
                label="Title"
                placeholder="Please enter title of question"
                id="title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              <h5 className="mt-20">Create Choices</h5>
              <FieldArray
                name="choices"
                render={(arrayHelpers) => {
                  return (
                    <div>
                      {formik.values.choices.map((choice, index) => {
                        return (
                          <FormRowInput
                            key={`choices.${index}`}
                            name={`choices.${index}`}
                            label={`choices ${index + 1}`}
                            placeholder="Please enter choices"
                            id="choices"
                            onChange={formik.handleChange}
                            value={formik.values.choices[`${index}`]}
                          />
                        );
                      })}
                      <Button
                        text="Add"
                        type="button"
                        handleSubmit={(value) => {
                          arrayHelpers.insert(
                            formik.values.choices.length + 1,
                            ""
                          );
                        }}
                      />
                    </div>
                  );
                }}
              />

              <FormRowSelect
                id="correct_answer"
                name="correct_answer"
                label="Correct Answer"
                list={formik.values.choices}
              />
              <FormRowInput
                label="Question Image"
                placeholder="Please enter title of question"
                id="question_image"
                type="file"
                name="question_image"
                onChange={(event) => {
                  formik.setFieldValue(
                    "question_image",
                    event.currentTarget.files[0]
                  );
                }}
              />
              <FormRowInput
                label="Answer Image"
                placeholder="Select answer image"
                id="answer_image"
                type="file"
                name="answer_image"
                onChange={(event) => {
                  formik.setFieldValue(
                    "answer_image",
                    event.currentTarget.files[0]
                  );
                }}
              />
              <FormRowInput
                label="Answer's Explanation"
                placeholder="Please enter explanation of answer"
                id="answer_explanation"
                name="answer_explanation"
                onChange={formik.handleChange}
                value={formik.values.answer_explanation}
              />
              <FormRowSelect
                id="difficulty"
                label="Select Difficulty"
                list={difficuilty_list}
                name="difficulty"
              />
              <FormRowSelect
                id="status"
                label="Status"
                list={status_list}
                name="status"
              />
              <FormRowSelect
                id="type"
                label="Type"
                list={question_type_list}
                name="type"
              />
              <FormRowSelect
                id="subject_id"
                label="Subject"
                list={getAllSubjects.data.data.subjects}
                name="subject_id"
                isApiData="true"
              />
              <FormRowSelect
                id="system_id"
                label="System"
                list={getAllSystems.data.data.systems}
                name="system_id"
                isApiData="true"
              />
              <FormRowInput
                label="Points"
                name="points"
                placeholder="Please enter points of question"
                id="points"
                onChange={formik.handleChange}
                value={formik.values.points}
              />
              <Button type="submit" text="Add" />
            </Form>
          )}
        </Formik>
      </div>
    );
  }
};

export default EditQuestion;
