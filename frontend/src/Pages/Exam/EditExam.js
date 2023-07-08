import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import "../../assets/scss/utils.scss";
import { Formik, Form, Field, FieldArray } from "formik";
import FormRowSelect from "../../Components/FormRowSelect";
import { useParams } from "react-router-dom";
import usePostMutation from "../../Utils/usePostMutation";
import apiClient from "../../Utils/apiClient";
import { useQuery } from "react-query";
import Loader from "../../Components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditExam = () => {
  const { id } = useParams();
  const { mutate } = usePostMutation();
  console.log("exam_id", id);
  let examValues = {};
  const getExam = async () => {
    const { data } = await apiClient(`/exams/${id}`);
    return data;
  };

  const getExamData = useQuery(["exam"], getExam, {
    refetchOnWindowFocus: false,
  });

  const length_list = ["Day", "Week", "Month", "Year"];
  if (getExamData.isFetching) {
    return <Loader />;
  }
  if (getExamData.isError) {
    return <h1>Error while loading data</h1>;
  }
  if (getExamData.isSuccess) {
    console.log("examData", getExamData);
    examValues = { ...getExamData.data.data.exam };
    console.log("exam values", examValues);
    return (
      <div className="form-wrapper">
        <ToastContainer />
        <Formik
          enableReinitialize
          initialValues={examValues}
          onSubmit={(values) => {
            console.log("values", values);
            mutate(
              {
                method: "patch",
                url: `/exams/${id}`,
                values,
              },
              {
                onSuccess: (res) => {
                  //alert("Data updated successfully");
                  toast.success("Exam updated successfully");
                },
                onError: (err) => {
                  //alert("Error while updating data");
                  toast.error("Error while updating exam");
                  console.log(err);
                },
              }
            );
          }}
        >
          {(formik) => (
            <Form className="dashboard-form" onSubmit={formik.handleSubmit}>
              <FormHeader text="Edit Exam" />
              <FormRowInput
                label="Exam Name"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <h5 className="mt-20">Pricing and Plans</h5>
              <FieldArray
                name="plan_ids"
                render={(arrayHelpers) => {
                  return (
                    <div>
                      {formik.values.plan_ids.map((plan, index) => (
                        <div className="plans-card" key={index}>
                          <div className="plans_row_1">
                            <FormRowInput
                              name={`plans[${index}].name`}
                              label="Name"
                              id="name"
                              type="text"
                              value={formik.values.plans[`${index}`].name}
                              onChange={formik.handleChange}
                            />
                          </div>
                          <div className="plans_row_1">
                            <FormRowInput
                              name={`plan_ids[${index}].full_price`}
                              label="Full Price"
                              id="full_price"
                              type="number"
                              value={
                                formik.values.plan_ids[`${index}`].full_price
                              }
                              onChange={formik.handleChange}
                            />
                            <FormRowInput
                              name={`plan_ids[${index}].discounted_price`}
                              label="Discount Price"
                              id="discounted_price"
                              type="number"
                              value={
                                formik.values.plan_ids[`${index}`]
                                  .discounted_price
                              }
                              onChange={formik.handleChange}
                            />
                          </div>
                          <div className="plans_row_1">
                            <FormRowInput
                              name={`plan_ids[${index}].plan_length`}
                              label="Plan Length"
                              id="plan_length"
                              type="number"
                              value={
                                formik.values.plan_ids[`${index}`].plan_length
                              }
                              onChange={formik.handleChange}
                            />
                            <FormRowSelect
                              label="Duration"
                              name={`plan_ids[${index}].duration`}
                              list={length_list}
                              value={
                                formik.values.plan_ids[`${index}`].duration
                              }
                              // onChange={formik.handleChange}
                            />
                          </div>
                        </div>
                      ))}
                      <Button
                        text="Add Pricing"
                        type="button"
                        handleSubmit={() =>
                          arrayHelpers.insert(
                            formik.values.plan_ids.length + 1,
                            {}
                          )
                        }
                      >
                        Add
                      </Button>
                    </div>
                  );
                }}
              />
              <Button text="Update Exam" type="submit" />
            </Form>
          )}
        </Formik>
      </div>
    );
  }
};

export default EditExam;
