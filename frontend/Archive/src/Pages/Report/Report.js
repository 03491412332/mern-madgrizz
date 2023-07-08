import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import ResolvedAction from "../../Components/ResolvedAction";
import TableActionLink from "../../Components/TableActionLink";
import FormRowSelect from "../../Components/FormRowSelect";
import { Formik, Form } from "formik";
import apiClient from "../../Utils/apiClient";
import { useQuery } from "react-query";
import Loader from "../../Components/Loader";
import { useState } from "react";
import useReportData from "../../Helpers/useReportData";
import Button from "../../Components/Button";
const Report = () => {
  const [filters, setFilters] = useState({});
  const list_report_topic = ["report title 1", "Topic 2", "Topic 3"];
  const sorting_list = ["Old-to-new", "New-to-old"];
  const resolved_list = ["resolved", "unresolved"];
  const getSystems = async () => {
    const { data } = await apiClient.get("/systems");
    return data;
  };
  const getSubjects = async () => {
    const { data } = await apiClient.get("/subjects");
    return data;
  };
  const getReport = async () => {
    const { data } = await apiClient.get("/reports");
    return data;
  };
  const getAllSystems = useQuery(["systems"], getSystems);
  const getAllSubjects = useQuery(["subjects"], getSubjects);
  const getAllDropdownReports = useQuery(["dropDownReports"], getReport);

  const getAllReports = useReportData(filters);

  if (getAllReports.isFetching) {
    return <Loader />;
  }
  if (getAllReports.isError) {
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />

          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-table">
              <div className="sorting_wrapper">
                <h1>Report</h1>
                <div className="sorted_actions">
                  <Formik
                    initialValues={{
                      title: "",
                      system_id: "",
                      subject_id: "",
                      date: "",
                      resolved: "",
                    }}
                    onSubmit={(values) => {
                      console.log(values);
                      console.log("we are selecting the system", values);
                      setFilters(values);
                      console.log("filters", filters);
                    }}
                  >
                    {(formik) => (
                      <Form onSubmit={formik.handleSubmit}>
                        <h3>Sort By:</h3>
                        <FormRowSelect
                          name="title"
                          id="title"
                          label="Report Topic"
                          list={list_report_topic}
                        />
                        <FormRowSelect label="System" />
                        <FormRowSelect label="Subject" />
                        <FormRowSelect
                          label="Sorted By Date"
                          list={sorting_list}
                        />
                        <FormRowSelect label="Status" list={resolved_list} />
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <br />
              <h1>We could not find any data</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (getAllReports.isSuccess && getAllSystems && getAllSubjects) {
    console.log("reports", getAllReports.data.data.reports);
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />

          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-table">
              <div className="sorting_wrapper">
                <h1>Report</h1>
                <div className="sorted_actions">
                  <Formik
                    initialValues={{
                      title: "",
                      system_id: "",
                      subject_id: "",
                      date: "",
                      resolved: "",
                    }}
                    onSubmit={(values) => {
                      console.log("we are selecting the system", values);
                      setFilters(values);
                      console.log("filters", filters);
                    }}
                  >
                    {(formik) => (
                      <Form onSubmit={formik.handleSubmit}>
                        <h3>Sort By:</h3>
                        <FormRowSelect
                          name="title"
                          id="title"
                          label="Report Topic"
                          list={getAllDropdownReports.data.data.reports}
                          isApiData={true}
                        />
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
                          label="Sorted By Date"
                          list={sorting_list}
                          name="date"
                        />
                        <FormRowSelect
                          id="resolved"
                          name="resolved"
                          label="Sorted By Date"
                          list={resolved_list}
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
                    <th>Report Topic</th>
                    <th>Subject Area</th>
                    <th>System</th>
                    <th>Reported Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getAllReports.data.data.reports.map((report, index) => {
                    return (
                      <tr key={report._id}>
                        <td>{report.title}</td>
                        <td>{report.question_id.system_id.name}</td>
                        <td>{report.question_id.subject_id.name}</td>
                        <td>{report.createdAt}</td>

                        <td className="actions">
                          <TableActionLink
                            icon={<ResolvedAction />}
                            text="Resolve"
                            redirect={`/dashboard/reports/report_details/${report._id}`}
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

export default Report;
