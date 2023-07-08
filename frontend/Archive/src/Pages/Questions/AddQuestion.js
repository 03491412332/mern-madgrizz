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
const AddQuestion = ({ exam_id }) => {
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
  const getAllSystems = useQuery(["allSystems"], getSystems);
  const getAllSubjects = useQuery(["allSubjects"], getSubjects);
  if (getAllSystems.isLoading && getAllSubjects.isLoading) {
    return <Loader />;
  }
  if (getAllSystems.isError && getAllSubjects.isError) {
    return <h1>Error while fetching data</h1>;
  }
  if (getAllSystems.isSuccess && getAllSubjects.isSuccess) {
    console.log("all Systems", getAllSystems);
    console.log("all Subjects", getAllSubjects);

    return (
      <div className="form-wrapper">
        <Formik
          initialValues={{
            title: "",
            answer_choices: [],
            correct_answer: "",
            difficulty: "",
            status: "",
            type: "",
            question_image: "",
            answer_image: "",
            answer_explanation: "",
            system_id: "",
            subject_id: "",
            exam_id,
            points: 1,
          }}
          onSubmit={(values) => {
            // console.log(values);
            const {
              title,
              answer_choices,
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
            formData.append("answer_choices", answer_choices);
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
                url: "/questions",
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
              <FormHeader text="Add Question" />
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
                name="answer_choices"
                render={(arrayHelpers) => {
                  return (
                    <div>
                      {formik.values.answer_choices.map((c, index) => {
                        return (
                          <FormRowInput
                            key={index}
                            name={`answer_choices.${index}`}
                            label={`choice ${index + 1}`}
                            placeholder="Please enter choices"
                            id="answer_choices"
                            onChange={formik.handleChange}
                            value={formik.values.answer_choices[`${index}`]}
                          />
                        );
                      })}
                      <Button
                        text="Add"
                        type="button"
                        handleSubmit={(value) => {
                          arrayHelpers.insert(
                            formik.values.answer_choices.length + 1,
                            ""
                          );
                        }}
                      ></Button>
                    </div>
                  );
                }}
              />
              <FormRowSelect
                id="correct_answer"
                name="correct_answer"
                label="Correct Answer"
                list={formik.values.answer_choices}
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

export default AddQuestion;
