import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Metatitle from "../title/title";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import PersonIcon from "@material-ui/icons/Person";
// import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SideBar from "./Sidebar";
import { Navigate, useNavigate } from "react-router-dom";
import {
  getUserDetails,
  updateUser,
  clearError,
} from "../../actions/UserAction";
import Loading from "../loading/Loading";
import { useParams } from "react-router-dom";
// import Loader from "../layout/Loader/Loader";

const UpdateUser = ({ history, match }) => {
  const dispatch = useDispatch();
  
  const navigate =useNavigate()
  const { loading, error, user } = useSelector((state) => state.user);
console.log('saasasas',useSelector((state) => state.profile))
  const {isUpdated, } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = useParams();
  console.log(userId.id)
  useEffect(() => {
   
    if (isUpdated) {
      ;
      navigate("/admin/users");
      dispatch({ type: 'updated_profile_reset' });
    }
  }, [dispatch, error, history, isUpdated, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId.id, myForm));
  };

  return (
    <Fragment>
      <Metatitle title="Update User" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          {loading ? (
            <Loading/>
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                {/* <PersonIcon /> */}
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                {/* <MailOutlineIcon /> */}
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                {/* <VerifiedUserIcon /> */}
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <button
                id="createProductBtn"
                type="submit"
                
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateUser;
