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
  
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { error, users } = useSelector((state) => state.alluser);
// console.log('hello',useSelector((state) => state.alluser))
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
    if(!isAuthenticated)
    {
      navigate('/login')
    }
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
  }, [dispatch, error, deleteError, history,navigate ,isDeleted, message]);

  return (
    <Fragment>
      <Metatitle title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          {  users&& (
  <table className="productListTable" style={({width:'90%'})}>
    <tbody>
      <tr className="tableheading">
        <th style={({width:'26%'})}><h5>Product Id</h5></th>
        <td><h5>User Id</h5></td>
        <td><h5>Name</h5></td>
        <td><h5>email</h5></td>
        <td><h5>Role</h5></td>
        <td><h5>Action</h5></td>
      </tr>
      {  users.map((item) => (
        <tr key={item._id}>
          <td className="tablecell">{item._id}</td>
          <td className="tablecell">{item.name}</td>
          <td className="tablecell">{item.email}</td>
          <td className="tablecell">{item.role}</td>
          <td className="tablecell">
            <Link to={`/admin/update/user/${item._id}`}>
              <i class="fas fa-edit"></i>
            </Link>
            <Link
              onClick={() =>
                deleteUserHandler(item._id)
              }
            >
              <i class="fa-sharp fa-solid fa-trash"></i>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}
          {/* <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
