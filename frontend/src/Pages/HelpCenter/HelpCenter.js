import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import ResolvedAction from "../../Components/ResolvedAction";
import MyActionButton from "../../Components/MyActionButton";
import FormRowSelect from "../../Components/FormRowSelect";
import TableActionLink from "../../Components/TableActionLink";
import { Formik, Form } from "formik";
import apiClient from "../../Utils/apiClient";
import { useQuery } from "react-query";
import useHelpData from "../../Helpers/useHelpData";
import { useState } from "react";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";
const HelpCenter = () => {
  const list_report_topic = ["Topic 1", "Topic 2", "Topic 3"];
  const sorting_list = ["Old-to-new", "New-to -old"];
  const resolved_list = ["resolved", "unresolved"];
  const [filters, setFilters] = useState({});
  const getAllHelps = useHelpData(filters);
  const getReport = async () => {
    const { data } = await apiClient.get("/help");
    return data;
  };
  const getAllDropdownReports = useQuery(["dropDownReports"], getReport);
  if (getAllHelps.isFetching) {
    return <Loader />;
  }
  if (getAllHelps.isError) {
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />
          <div className="form-wrapper">
            <div className="dashboard-table">
              <h1>Help Center</h1>
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
                          label="Report Topic"
                          list={list_report_topic}
                        />
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
              <h1>We could not found any data</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (getAllHelps.isSuccess && getAllDropdownReports.isSuccess) {
    console.log("my helps", getAllHelps);
    console.log("all report topic", getAllDropdownReports);
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />

          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-table">
              <h1>Help Center</h1>
              <div className="sorting_wrapper">
                <h3>Sort By:</h3>
                <div className="sorted_actions">
                  <Formik
                    initialValues={{
                      title: "",
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
                        <FormRowSelect
                          name="title"
                          id="title"
                          label="Report Topic"
                          list={getAllDropdownReports.data.data.helps}
                          isApiData={true}
                        />
                        <FormRowSelect
                          name="date"
                          id="date"
                          label="Sorted By Date"
                          list={sorting_list}
                        />
                        <FormRowSelect
                          name="resolved"
                          id="resolved"
                          label="Status"
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
                    <th>Reported Date</th>
                    <th>User</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getAllHelps.data.data.helps.map((help, index) => {
                    return (
                      <tr key={help._id}>
                        <td>{help.title}</td>
                        <td>{help.createdAt}</td>
                        <td>{help.user_id.full_name}</td>
                        <td className="actions">
                          <TableActionLink
                            icon={<ResolvedAction />}
                            text="Resolve"
                            redirect={`/dashboard/help/help_center_details/${help._id}`}
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

export default HelpCenter;
