import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import "../../assets/scss/utils.scss";
import CheckBox from "../../Components/CheckBox";
import { useState, useEffect, useRef } from "react";
import CustomCalendar from "../../Components/CustomCalendar";
import CalenderIcon from "../../Components/CalenderIcon";
import FormRowSelect from "../../Components/FormRowSelect";
import SearchRowInput from "../../Components/SearchRowInput";
import { Formik, Form, FieldArray } from "formik";
import apiClient from "../../Utils/apiClient";
import { useQuery } from "react-query";
import Loader from "../../Components/Loader";
import { BsCheckLg } from "react-icons/bs";
import Calendar from "react-calendar";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const EditBulk = () => {
  const exam_list = ["Exam 1", "Exam 2", "Exam 3"];
  const sorting_list = ["Old-to-new", "New-to -old"];
  const plan_list = ["plan 1", "plan 2"];
  const [startDate, setStartDate] = useState(new Date());
  const [value, onChange] = useState(new Date());
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [selectedAll, setSelectedAll] = useState([]);

  const getUsers = async () => {
    const { data } = await apiClient.get("/users");
    return data;
  };
  const getPlans = async () => {
    const { data } = await apiClient.get("/plans");
    return data;
  };
  const getAllUsers = useQuery(["users"], getUsers, {
    refetchOnWindowFocus: false,
    //refetchOnMount: false,
    onSuccess: (res) => {
      console.log("res", res.data.users);

      setSelectedAll(
        res.data.users.map((user) => {
          const { _id, email } = user;
          return { _id, email, isChecked: false };
        })
      );
    },
  });
  const getAllPlans = useQuery(["plans"], getPlans, {
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    //console.log("re-rendered", isCheckAll);
    //console.log("check all value", isCheckAll);
    console.log("selected value after re-render", selectedAll);
    if (isCheckAll === true) {
      let checkedAll = selectedAll.map((user, index) => {
        return { ...user, isChecked: true };
      });
      setSelectedAll(checkedAll);
      //console.log("selected all true", selectedAll);
    }
  }, [isCheckAll]);

  const selectAllHandler = (e, formik1) => {
    setIsCheckAll(!isCheckAll);

    if (e.target.checked) {
      let checkedAll = getAllUsers.data.data.users.map((user, index) => {
        const { _id, email } = user;
        return { _id, email, isChecked: true };
      });
      setSelectedAll(checkedAll);

      formik1.setFieldValue("users_ids_all", selectedAll);
    } else {
      formik1.setFieldValue("users_ids_all", []);
    }
  };
  console.log("check all state ", isCheckAll);
  const onChangeHandler = (id) => {
    console.log("before check box value", isCheckAll);
    setIsCheckAll(false);
    console.log("after check box value", isCheckAll);

    const newStata = selectedAll.map((obj) => {
      // 👇️ if id equals 2, update country property
      if (obj._id === id) {
        return { ...obj, isChecked: false };
      }
      // 👇️ otherwise return the object as is
      return obj;
    });
    setSelectedAll(newStata);

    // console.log("selected after state changes", selectedAll);
  };

  if (getAllUsers.isFetching) {
    return <Loader />;
  }
  if (getAllUsers.isError && getAllPlans.isError) {
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
  if (getAllUsers.isSuccess && getAllPlans.isSuccess) {
    console.log("all plans", getAllPlans);
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
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <Formik
                enableReinitialize
                initialValues={{
                  plans_ids: getAllPlans.data.data.plans,
                  users_ids_all: [],
                  planIds: [],
                }}
                onSubmit={(values) => {
                  console.log("values", values);
                  // mutate(
                  //   {
                  //     method: "patch",
                  //     url: `/exams/${id}`,
                  //     values,
                  //   },
                  //   {
                  //     onSuccess: (res) => {
                  //       alert("Data updated successfully");
                  //     },
                  //     onError: (err) => {
                  //       alert("Error while updating data");
                  //       console.log(err);
                  //     },
                  //   }
                  // );
                }}
              >
                {(formik1) => (
                  <Form onSubmit={formik1.handleSubmit}>
                    <CheckBox
                      text="Select all"
                      classes="filters"
                      name="users_ids_all"
                      id="users_ids_all"
                      isDefaultChecked={isCheckAll}
                      handleChange={(e) => {
                        selectAllHandler(e, formik1);
                      }}
                    />
                    <div
                      className="edit-bulk"
                      role="group"
                      aria-labelledby="checkbox-group"
                    >
                      {selectedAll.map((user, index) => {
                        //console.log("single user of selected values", user);
                        return (
                          <div className="item" key={user._id}>
                            <CheckBox
                              text={user.email}
                              name="users_ids"
                              id="users_ids"
                              value={user._id}
                              handleChange={() => onChangeHandler(user._id)}
                              isDefaultChecked={user.isChecked}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <h2>Plans</h2>
                    <div className="edit-plans">
                      {/*getAllPlans.data.data.plans.map((plan, index) => {
                        return (
                          <div className="item" key={plan._id}>
                            <CheckBox
                              text={`${plan.name} Price ${plan.full_price}`}
                              name={`plans_ids[${index}].name`}
                              label="Name"
                              id="name"
                              type="text"
                              value={formik1.values.plans_ids[`${index}`].name}
                              onChange={formik1.handleChange}
                            />

                            <FormRowInput
                              type="date"
                              label="Set Expiration Date"
                              containerClasses="fit"
                              name={`plans_ids[${index}].name`}
                              id={`plans_ids[${index}].name`}
                              value={formik1.values.plans_ids[`${index}`].date}
                              onChange={formik1.handleChange}
                            />
                          </div>
                        );
                      })*/}
                      <FieldArray
                        name="plans_ids"
                        render={(arrayHelpers) => {
                          return (
                            <div>
                              {getAllPlans.data.data.plans.map(
                                (plan, index) => (
                                  <div className="item" key={plan._id}>
                                    <CheckBox
                                      text={`${plan.name} Price ${plan.full_price}`}
                                      name={`plans_ids[${index}].name`}
                                      label="Name"
                                      id="name"
                                      type="text"
                                      value={plan._id}
                                      handleChange={(e, plans_ids, index) => {
                                        console.log(arrayHelpers);
                                        console.log("plan", plan);

                                        // Format the date to YYYY-MM-DD
                                        // const formattedDate =
                                        //   formik1.values.planIds.date
                                        //     .toLocaleDateString("en-GB", {
                                        //       year: "numeric",
                                        //       month: "2-digit",
                                        //       day: "2-digit",
                                        //     })
                                        //     .split("/")
                                        //     .reverse()
                                        //     .join("-");
                                        // console.log(
                                        //   "formatted date",
                                        //   formik1.values.planIds.date
                                        // );
                                        console.log(
                                          "plan data",
                                          formik1.values.planIds.date
                                        );

                                        console.log(
                                          "plan value",
                                          e.target.value
                                        );
                                        arrayHelpers.insert(
                                          formik1.values.planIds.push({
                                            ...plan,
                                          })
                                        );
                                        // formik1.handleChange();
                                      }}
                                    />
                                    <DatePicker
                                      selected={startDate}
                                      onChange={(date) => {
                                        console.log(date);
                                        setStartDate(date);
                                      }}
                                    />
                                    <FormRowInput
                                      type="date"
                                      label="Set Expiration Date"
                                      containerClasses="fit"
                                      name={`plansIds[${index}].date`}
                                      id={`plans_ids[${index}].date`}
                                      value={`plans_ids[${index}].date`}
                                      handleChange={(e) => {
                                        // formik1.handleChange();
                                        console.log(
                                          "date on change",
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </div>
                                )
                              )}
                              <Button
                                text="Add Pricing"
                                type="button"
                                handleSubmit={() => {
                                  console.log("formik values", formik1.values);
                                  arrayHelpers.insert(
                                    formik1.values.plans_ids.length + 1,
                                    {}
                                  );
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          );
                        }}
                      />
                    </div>

                    <Button text="Update Exam" type="submit" />
                  </Form>
                )}
              </Formik>

              <Button text="Add" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EditBulk;
