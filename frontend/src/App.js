import "./App.scss";
import HelpCenter from "./Pages/HelpCenter/HelpCenter";
import HelpCenterDetails from "./Pages/HelpCenter/HelpCenterDetails";
import Report from "./Pages/Report/Report";
import ReportDetail from "./Pages/Report/ReportDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AddUser from "./Pages/User/AddUser";
import AllUsers from "./Pages/User/AllUsers";
import AddSubject from "./Pages/Subject/AddSubject";
import AllSubjects from "./Pages/Subject/AllSubjects";
import AddSystem from "./Pages/System/AddSystem";
import AllSystem from "./Pages/System/AllSystems";
import AllQuestions from "./Pages/Questions/AllQuestions";
import AddQuestion from "./Pages/Questions/AddQuestion";
import AllExams from "./Pages/Exam/AllExams";
import AddExam from "./Pages/Exam/AddExam";
import { ToastContainer, toast } from "react-toastify";
import AddPlan from "./Pages/Plans/AddPlan";
import AllPlans from "./Pages/Plans/AllPlan";
import Login from "./Pages/Login";
import EditBulk from "./Pages/User/EditBulk";
import AddBulk from "./Pages/User/AddBulk";
import EditSubject from "./Pages/Subject/EditSubject";
import EditExam from "./Pages/Exam/EditExam";
import EditSystem from "./Pages/System/EditSystem";
import CustomModel from "./Components/CustomModel";
import EditQuestion from "./Pages/Questions/EditQuestion";
import EditUser from "./Pages/User/EditUser";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/">
            <Route path="user">
              <Route index path="add" element={<AddUser />} />
              <Route path="all" element={<AllUsers />} />
              <Route
                path="edit/:id"
                element={
                  <CustomModel
                    component={<EditUser />}
                    className="show"
                    isEdit={true}
                  />
                }
              />
              <Route path="editBulk" element={<EditBulk />} />
              <Route path="addBulk" element={<AddBulk />} />
            </Route>
            <Route path="subject">
              <Route index path="add" element={<AddSubject />} />
              <Route
                index
                path="edit/:id"
                element={
                  <CustomModel
                    component={<EditSubject />}
                    className="show"
                    isEdit={true}
                  />
                }
              />
              <Route path="all" element={<AllSubjects />} />
            </Route>
            <Route path="system">
              <Route index path="add" element={<AddSystem />} />
              <Route path="all" element={<AllSystem />} />
              <Route
                index
                path="edit/:id"
                element={
                  <CustomModel
                    component={<EditSystem />}
                    className="show"
                    isEdit={true}
                  />
                }
              />
            </Route>
            <Route path="question">
              <Route index path="add" element={<AddQuestion />} />
              <Route path=":exam_id" element={<AllQuestions />} />
              <Route
                path="edit/:exam_id/:question_id"
                element={
                  <CustomModel
                    component={<EditQuestion />}
                    className="show"
                    isEdit={true}
                  />
                }
              />
              <Route
                index
                path="edit/:id"
                element={
                  <CustomModel component={<EditSubject />} className="show" />
                }
              />
            </Route>
            <Route path="exam/">
              <Route index path="add" element={<AddExam />} />
              <Route path="all" element={<AllExams />} />
              <Route
                index
                path="edit/:exam_name/:id"
                element={
                  <CustomModel
                    component={<EditExam />}
                    className="show"
                    isEdit={true}
                  />
                }
              />
            </Route>

            <Route path="plans/">
              <Route index path="add" element={<AddPlan />} />
              <Route path="all" element={<AllPlans />} />
            </Route>
            <Route path="reports/">
              <Route index path="report" element={<Report />} />
              <Route path="report_details/:id" element={<ReportDetail />} />
            </Route>
            <Route path="help/">
              <Route index path="help_center" element={<HelpCenter />} />
              <Route
                path="help_center_details/:id"
                element={<HelpCenterDetails />}
              />
            </Route>
          </Route>
          <Route path="/report" element={<div>Report</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
