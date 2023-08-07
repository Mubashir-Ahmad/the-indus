import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link ,useNavigate } from "react-router-dom";
// import { Doughnut, Line, CategoryScale } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction.jsx";
import { getAllOrders, getadminAllOrders, salesOrder } from "../../actions/OrderAction.jsx";
import { getAllUsers } from "../../actions/UserAction.jsx";
import Metatitle from "../title/title.jsx";
import { getproduct, clearError, getproducts } from '../../actions/Action';
import { getcategory } from "../../actions/categoryAction.jsx";
import Login from "../user/Login.jsx";
import { load_user } from "../../actions/UserAction.jsx";
const Dashboard = () => {
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, products } = useSelector(
    (state) => state.products
  )
  const { productCount } = useSelector(
    (state) => state.productts
  )
  const {Todaysale,Weeklysale,Monthlysale,Yearlysale,LifetimeSale}= useSelector((state)=>state.sales)
  console.log('lloo',useSelector((state)=>state.sales))
  const { orders} = useSelector((state) => state.allOrders);
  const { oorders , order ,dorders, porder } = useSelector((state) => state.myorders);
  console.log('as',useSelector((state) => state.myorders))
  const { users } = useSelector((state) => state.alluser);
  const { data } = useSelector((state) => state.getcategory);
  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    if(!isAuthenticated)
    {
      console.log("person")
      // navigate('/login')
    }
      dispatch(load_user());
      dispatch(salesOrder());
      dispatch(getproduct());
      dispatch(getproducts());
      dispatch(getcategory());
      dispatch(getAllOrders());
      dispatch(getAllUsers());
      dispatch(getadminAllOrders());
    
   
  }, [dispatch, navigate,isAuthenticated,]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  
  return (
    <div className="dashboard">
      <Metatitle title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <h6 component="h1">Dashboard</h6>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && productCount}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
            <Link to="/admin/category">
              <p>Category</p>
              <p>{data && data.length}</p>
            </Link>
          </div>
        </div>
        <div className="productListContainner">
      <h1 id="productListHeadingg">Sales</h1>
      <div className="dataa">
        <div className="box-01">
          <h5 className="headerr" style={{ paddingLeft: '4px' }}>
            Our Sales
          </h5>
          <div className="orderRoww">
            <div className="linee">
              <span className="labell">Today Sale:</span>
              <span className="valuee">{Todaysale}</span>
            </div>
            <div className="linee">
              <span className="labell">Weekly Sale:</span>
              <span className="valuee">{Weeklysale}</span>
            </div>
            <div className="linee">
              <span className="labell">Monthly Sale:</span>
              <span className="valuee">{Monthlysale}</span>
            </div>
            <div className="linee">
              <span className="labell">Yearly Sale:</span>
              <span className="valuee">{Yearlysale}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          <div className="dataa">
          <div className="box-1">
            <h5>Placed Order</h5>
              <div className="orderRow headerRow">
                <span className="header">Order ID</span>
                <span className="header">User</span>
                <span className="header">Amount</span>
              </div>
              {oorders &&
                oorders.map((item) =>
            
                (
                  <div key={item._id} className="orderRow">
                    {    console.log(item)}
                    <span className="value">{item._id}</span>
                    <span className="value">{item.user.name}</span>
                    <span className="value">{item.orderStatus}</span>
                  </div>
                ))}
            </div>
            <div className="box-1">
            <h5>Processing Order</h5>
              <div className="orderRow headerRow">
                <span className="header">Order ID</span>
                <span className="header">User</span>
                <span className="header">Status</span>
              </div>
              {porder &&
                porder.map((item) => (
                  <div key={item._id} className="orderRow">
                    <span className="value">{item._id}</span>
                    <span className="value">{item.user.name}</span>
                    <span className="value">{item.orderStatus}</span>
                  </div>
                ))}
            </div>
            <div className="box-1">
            <h5>Dispatch Order</h5>
              <div className="orderRow headerRow">
                <span className="header">Order ID</span>
                <span className="header">User</span>
                <span className="header">Status</span>
              </div>
              {order &&
                order.map((item) => (
                  <div key={item._id} className="orderRow">
                    <span className="value">{item._id}</span>
                    <span className="value">{item.user.name}</span>
                    <span className="value">{item.orderStatus}</span>
                  </div>
                ))}
            </div>
            <div className="box-1">
            <h5>Delivered Order</h5>
              <div className="orderRow headerRow">
                <span className="header">Order ID</span>
                <span className="header">User</span>
                <span className="header">Status</span>
              </div>
              {dorders &&
                dorders.map((item) => (
                  <div key={item._id} className="orderRow">
                    <span className="value">{item._id}</span>
                    <span className="value">{item.user.name}</span>
                    <span className="value">{item.orderStatus}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
