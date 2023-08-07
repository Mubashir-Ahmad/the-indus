import React from "react";
import "./sidebar.css";
// import logo from "../../image/logo.png";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
      </Link>
      <Link to="/admindashbord">
        <p>
        <i class="fa-solid fa-table-columns"></i>
       Dashboard
        </p>
      </Link>
      <Link to="/admin/products">
        <p>
        <i class="fa-solid fa-bars-progress"></i>
       Products
        </p>
      </Link>
    <Link to="/admin/product">
      <p>
      <i class="fa-solid fa-box-tissue"></i>
    Create Product
    </p>
    </Link>
      <Link to="/admin/orders">
        <p>
        <i class="fa-solid fa-circle-nodes"></i>
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
        <i class="fa-solid fa-user-gear"></i>
           Users
        </p>
      </Link>
      <Link to="/user/create">
      <p>
      <i class="fa-solid fa-user-plus"></i>
    Create User
    </p>
    </Link>
      <Link to="/create/category">
      <p>
      <i class="fa-solid fa-toolbox"></i>
    Create Category
    </p>
    </Link>
    </div>
  );
};

export default Sidebar;
