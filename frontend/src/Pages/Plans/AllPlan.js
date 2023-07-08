import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import DeleteAction from "../../Components/DeleteAction";
import EditAction from "../../Components/EditAction";
import MyActionButton from "../../Components/MyActionButton";
const AllPlan = () => {
  return (
    <div className="dashboard-wrapper">
      <MyCustomSidebar />
      <div className="admin-nested">
        <AdminHeader />
        {/** This is inner page */}
        <div className="form-wrapper">
          <div className="dashboard-table">
            <h1>All Pricing Plans</h1>
            <table id="customers">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Silver Plan</td>
                  <td>300$</td>

                  <td className="actions">
                    <MyActionButton icon={<EditAction />} text="Edit" />
                    <MyActionButton icon={<DeleteAction />} text="Delete" />
                  </td>
                </tr>
                <tr>
                  <td>Golden Plan</td>
                  <td>1200$</td>

                  <td className="actions">
                    <MyActionButton icon={<EditAction />} text="Edit" />
                    <MyActionButton icon={<DeleteAction />} text="Delete" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPlan;
