import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
      </Link>
      <Link to="/riderdash">
        <p>
          {/* <DashboardIcon />  */}
          Dashboard
        </p>
      </Link>
      <Link to="/rider/orders">
        <p>
          {/* <ListAltIcon /> */}
          Orders
        </p>
      </Link>
      
    </div>
  );
};

export default Sidebar;
