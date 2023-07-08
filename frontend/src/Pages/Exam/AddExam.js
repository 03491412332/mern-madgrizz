import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import usePostMutation from "../../Utils/usePostMutation";
import { useFormik, Formik, FieldArray, Form } from "formik";
import FormRowSelect from "../../Components/FormRowSelect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddExam = () => {
  const { mutate } = usePostMutation();
  const length_list = ["Day", "Week", "Month", "Year"];

  return (
    <div className="form-wrapper">
      <ToastContainer />
      <Formik
        initialValues={{
          name: "",
          plans: [{}],
        }}
        onSubmit={(values) => {
          console.log("values", values);
          mutate(
            {
              url: "/exams",
              values: values,
            },
            {
              onSuccess: () => {
                //alert("Form submitted successfully");
                toast.success("Exam added successfully");
              },
              onError: (response) => {
                // alert("An error occured while submitting exam");
                toast.error("An error occured while submitting exam");
              },
            }
          );
        }}
      >
        {(formik) => (
          <Form className="dashboard-form">
            <FormHeader text="Exam" />
            <FormRowInput
              label="Exam Name"
              placeholder="Please enter exam name"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <h5 className="mt-20">Pricing and Plans</h5>
            <FieldArray
              name="plans"
              render={(arrayHelpers) => {
                return (
                  <div>
                    {formik.values.plans.map((plan, index) => (
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
                            name={`plans[${index}].full_price`}
                            label="Full Price"
                            id="full_price"
                            type="number"
                            value={formik.values.plans[`${index}`].full_price}
                            onChange={formik.handleChange}
                          />
                          <FormRowInput
                            name={`plans[${index}].discounted_price`}
                            label="Discount Price"
                            id="discounted_price"
                            type="number"
                            value={
                              formik.values.plans[`${index}`].discounted_price
                            }
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className="plans_row_1">
                          <FormRowInput
                            name={`plans[${index}].plan_length`}
                            label="Plan Length"
                            id="plan_length"
                            type="number"
                            value={formik.values.plans[`${index}`].plan_length}
                            onChange={formik.handleChange}
                          />
                          <FormRowSelect
                            label="Duration"
                            name={`plans[${index}].duration`}
                            list={length_list}
                            value={formik.values.plans[`${index}`].duration}
                            // onChange={formik.handleChange}
                          />
                        </div>
                      </div>
                    ))}
                    <Button
                      text="Add Pricing"
                      type="button"
                      handleSubmit={() =>
                        arrayHelpers.insert(formik.values.plans.length + 1, {})
                      }
                    >
                      Add
                    </Button>
                  </div>
                );
              }}
            />
            <Button text="Add Exam" type="submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddExam;
