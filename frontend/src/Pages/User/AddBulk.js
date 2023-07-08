import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import FormHeader from "../../Components/FormHeader";
import FormRowInput from "../../Components/FormRowInput";
import Button from "../../Components/Button";
import "../../assets/scss/utils.scss";
import CheckBox from "../../Components/CheckBox";
import React, { useState } from "react";
import CustomCalendar from "../../Components/CustomCalendar";
import CalenderIcon from "../../Components/CalenderIcon";

const AddBulk = () => {
  const [value, onChange] = useState(new Date());
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);

  const handleCalender = () => {
    setIsCalenderOpen(!isCalenderOpen);
  };
  return (
    <div className="dashboard-wrapper">
      <MyCustomSidebar />
      <div className="admin-nested">
        <AdminHeader />
        <div className="form-wrapper">
          <div className="dashboard-form w-90">
            <FormHeader text="Add Bulk" />
            <FormRowInput
              label="Email"
              placeholder="Please enter emails"
              id="email"
              type="email"
            />
            <h2>Select Plans for new Users</h2>
            <div className="edit-plans">
              <div className="item">
                <CheckBox text="Exam 1" />
                <h5>Set Expiration date</h5>
                {isCalenderOpen ? (
                  <CustomCalendar />
                ) : (
                  <CalenderIcon handleClick={handleCalender} />
                )}
              </div>{" "}
              <div className="item">
                <CheckBox text="Exam 2" />
                <h5>Set Expiration date</h5>
                {isCalenderOpen ? (
                  <CustomCalendar />
                ) : (
                  <CalenderIcon handleClick={handleCalender} />
                )}
              </div>{" "}
              <div className="item">
                <CheckBox text="Exam 3" />
                <h5>Set Expiration date</h5>
                {isCalenderOpen ? (
                  <CustomCalendar />
                ) : (
                  <CalenderIcon handleClick={handleCalender} />
                )}
              </div>
            </div>

            <FormRowInput
              label="Password"
              placeholder="Please enter password"
              id="password"
              type="password"
            />
            <Button text="Add" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBulk;
