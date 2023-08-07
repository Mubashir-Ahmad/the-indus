import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">{/* <img src={logo} alt="Ecommerce" /> */}</Link>
      <Link to="/mangerdashbord">
        <p>
          {/* <DashboardIcon />  */}
          Dashboard
        </p>
      </Link>
      <Link to="/manager/product">
        <p>
          {/* <PostAddIcon /> */}
          Products
        </p>
      </Link>
      <Link to="/manger/create/product">
        <p>
          {/* <PostAddIcon /> */}
          Create Product
        </p>
      </Link>
      <Link to="/manger/order">
        <p>
          {/* <ListAltIcon /> */}
          Orders
        </p>
      </Link>
      <Link to="/manager/user">
        <p>
          {/* <PeopleIcon />  */}
          Users
        </p>
      </Link>
      <Link to="/manager/user/create">
        <p>
          {/* <PostAddIcon /> */}
          Create User
        </p>
      </Link>
      <Link to="/manager/create/category">
        <p>
          {/* <AccountTreeIcon /> */}
          Create Category
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
