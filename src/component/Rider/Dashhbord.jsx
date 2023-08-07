import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashbord.css";
import { Link } from "react-router-dom"; 
// import { Doughnut, Line, CategoryScale } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction.jsx";
import { getAllOrders, riderearn } from "../../actions/OrderAction.jsx";
import { getAllUsers } from "../../actions/UserAction.jsx";
import Metatitle from "../title/title.jsx";
import { getproduct, clearError } from '../../actions/Action';
const Dashboard = () => {

  const dispatch = useDispatch();

  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
)

  const { orders } = useSelector((state) => state.allOrders);
  const { totalEarnings }= useSelector((state)=>state.riderearn)
  const { users } = useSelector((state) => state.alluser);
  let outOfStock = 0;
 
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(riderearn());
    dispatch(getproduct());
    dispatch(getAdminProduct());
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
        <h6 component="h1">Rider Dashboard</h6>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br />{totalEarnings}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/rider/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/rider/earn">
              <p>Earning</p>
              <p>{totalEarnings}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          {/* <Line data={lineState} /> */}
        </div>

        <div className="doughnutChart">
          {/* <Doughnut data={doughnutState} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
