import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Metatitle from "../title/title";
import SideBar from "./Sidebar";
import { getAllUsers, clearError, deleteUser } from "../../actions/UserAction";
import { useNavigate } from "react-router-dom";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, users } = useSelector((state) => state.alluser);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);
  console.log(useSelector((state) => state.profile))
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }

    if (deleteError) {
      dispatch(clearError());
    }

    if (isDeleted) {
      navigate("/admin/users");
      dispatch({ type: 'delete_user_reset'});
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, history, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/manager/update/user/${params.getValue(params.id, "id")}`}>
              <i class="fas fa-edit"></i>
            </Link>

            <button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <i class="fa-sharp fa-regular fa-trash"></i>
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <Metatitle title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          {users && (
  <table className="productListTable" style={({width:'90%'})}>
    <tbody>
      <tr className="tableheading">
        <th style={({width:'26%'})}><h5>User Id</h5></th>
        <td><h5>Email</h5></td>
        <td><h5>Name</h5></td>
        <td><h5>Role</h5></td>
        <td><h5>Action</h5></td>
      </tr>
      {users.map((item) => (
        <tr key={item._id}>
          <td className="tablecell">{item._id}</td>
          <td className="tablecell">{item.email}</td>
          <td className="tablecell">{item.name}</td>
          <td className="tablecell">{item.role}</td>
          <td className="tablecell">
            <Link to={`/manager/product/${item._id}`}>
              <i class="fas fa-edit"></i>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
