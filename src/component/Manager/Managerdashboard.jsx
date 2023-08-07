import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction.jsx";
import { getAllOrders } from "../../actions/OrderAction.jsx";
import { getAllUsers } from "../../actions/UserAction.jsx";
import Metatitle from "../title/title.jsx";
import { getproduct, clearError, getproducts } from '../../actions/Action';
import { getcategory } from "../../actions/categoryAction.jsx";
const Dashboard = () => {

  const dispatch = useDispatch();

  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
)
    console.log(useSelector((state) => state.allOrders))
  const { orders } = useSelector((state) => state.allOrders);
  const { data } = useSelector((state) => state.getcategory);
  const { users } = useSelector((state) => state.alluser);
  let outOfStock = 0;
 
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
  
    dispatch(getproduct());
    dispatch(getcategory());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Metatitle title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <h6 component="h1">Manager Dashboard</h6>

        <div className="dashboardSummary">
          
          <div className="dashboardSummaryBox2">
            <Link to="/manager/product">
              <p>Product</p>
              <p>{products && productCount}</p>
            </Link>
            <Link to="/manger/order">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
            <Link to="/manager/category">
              <p>Category</p>
              <p>{data && data.length}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
