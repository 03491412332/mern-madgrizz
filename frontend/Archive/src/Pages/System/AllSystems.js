import MyCustomSidebar from "../../Components/Admin/MySidebar/MyCustomSidebar";
import AdminHeader from "../../Components/Admin/AdminHeader";
import "../../assets/scss/Wrapper.scss";
import DeleteAction from "../../Components/DeleteAction";
import EditAction from "../../Components/EditAction";
import MyActionButton from "../../Components/MyActionButton";
import ButtonAction from "../../Components/ButtonAction";
import CustomModel from "../../Components/CustomModel";
import { useState } from "react";
import AddSystem from "./AddSystem";
import apiClient from "../../Utils/apiClient";
import { useQuery } from "react-query";
import Loader from "../../Components/Loader";
import usePostMutation from "../../Utils/usePostMutation";
import { Link } from "react-router-dom";
const AllSystems = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = usePostMutation();

  const getAllSystems = async () => {
    const { data } = await apiClient.get("/systems");
    return data;
  };

  const allSystems = useQuery(["allSystems"], getAllSystems);

  const handleOpen = () => {
    console.log(`click on Add System`);
    setIsOpen(!isOpen);
  };

  const handleDelete = (id) => {
    console.log(`handle system delete clicked `);
    mutate(
      {
        method: "delete",
        url: `/systems/${id}`,
        values: null,
      },
      {
        onSuccess: () => {
          alert("System deleted successfully");
        },
        onError: (response) => {
          alert("An error occured while adding system");
          console.log(response);
        },
      }
    );
  };

  if (allSystems.isLoading) {
    return <Loader />;
  }
  if (allSystems.isError) {
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />
          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-table">
              <div className="dashboard-table__header">
                <h1>All Systems</h1>
                <div className="action_btns">
                  {isOpen ? (
                    <CustomModel
                      component={<AddSystem />}
                      className="show"
                      handleSubmit={handleOpen}
                    />
                  ) : (
                    <ButtonAction text="Add New +" handleSubmit={handleOpen} />
                  )}
                </div>
              </div>
              <h1>Error while loading data</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (allSystems.isSuccess) {
    // console.log(allSystems.data.data.systems);
    return (
      <div className="dashboard-wrapper">
        <MyCustomSidebar />
        <div className="admin-nested">
          <AdminHeader />
          {/** This is inner page */}
          <div className="form-wrapper">
            <div className="dashboard-table">
              <div className="dashboard-table__header">
                <h1>All Systems</h1>
                <div className="action_btns">
                  {isOpen ? (
                    <CustomModel
                      component={<AddSystem />}
                      className="show"
                      handleSubmit={handleOpen}
                    />
                  ) : (
                    <ButtonAction text="Add New +" handleSubmit={handleOpen} />
                  )}
                </div>
              </div>
              <table id="customers">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Created At</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allSystems.data.data.systems.map((system, index) => {
                    return (
                      <tr key={index}>
                        <td>{system.name}</td>
                        <td>{system.createdAt}</td>
                        <td className="actions">
                          <Link to={`/dashboard/system/edit/${system._id}`}>
                            <MyActionButton icon={<EditAction />} text="Edit" />
                          </Link>
                          <MyActionButton
                            icon={<DeleteAction />}
                            text="Delete"
                            handleSubmit={() => handleDelete(system._id)}
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

export default AllSystems;
