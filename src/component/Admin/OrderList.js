import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import Metatitle from "../title/title";
import SideBar from "./Sidebar";
import {deleteOrder,getAllOrders,clearError,} from "../../actions/OrderAction";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const {  orders } = useSelector((state) => state.allOrders);
  console.log('orrrr',orders)
  const userObject = orders && orders.length > 0 ? orders[0].User : null;
  const userName = userObject ? userObject.name : "No User Found"; // Default value when userObject is null
  console.log(userName);
  const {  isdeleted } = useSelector((state) => state.deleteorder);
  console.log(useSelector((state) => state.deleteorder))
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if(!isAuthenticated)
    {
      navigate('/login')
    }
    if (isdeleted) {
      navigate("/admin/orders");
      dispatch({ type: 'DELETE_ORDER_RESET' });
    }

    dispatch(getAllOrders());
  }, [dispatch,  isdeleted]);


  return (
    <Fragment>
      <Metatitle title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          { orders&& (
  <table className="productListTable" style={({width:'90%'})}>
    <tbody>
      <tr className="tableheading">
        <th style={({width:'26%'})}><h5>Product Id</h5></th>
        <td><h5>Order Id</h5></td>
        <td><h5>User</h5></td>
        <td><h5>Status</h5></td>
        <td><h5>itmQty</h5></td>
        <td><h5>Amount</h5></td>
        <td><h5>Action</h5></td>
      </tr>
      { orders.map((item) => (
        <tr key={item._id}>
          <td className="tablecell">{item._id}</td>
          <td className="tablecell">{item.user.name}</td>
          <td className="tablecell">{item.orderItem.length}</td>
          <td className="tablecell">{item.totalPrice}</td>
          <td className="tablecell">{item.orderStatus}</td>
          <td className="tablecell">
            <Link to={`/admin/order/${item._id}`}>
              <i class="fas fa-edit"></i>
            </Link>
            <Link
              onClick={() =>
                deleteOrderHandler(item._id)
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

export default OrderList;
