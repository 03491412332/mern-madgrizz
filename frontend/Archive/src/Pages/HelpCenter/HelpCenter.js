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
const HelpCenter = () => {
  const reports = async () => {
    const { data } = await apiClient.get("/reports");
    return data;
  };

  const getAllReports = useQuery(["reports"], reports);
  const list_report_topic = ["Topic 1", "Topic 2", "Topic 3"];
  const sorting_list = ["Old-to-new", "New-to -old"];
  const resolved_list = ["resolved", "unresolved"];
  const [filters, setFilters] = useState({});
  const getAllHelps = useHelpData(filters);
  const getReport = async () => {
    const { data } = await apiClient.get("/reports");
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
  if (getAllHelps.isSuccess && getAllDropdownReports) {
    console.log("my helps", getAllHelps);
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
