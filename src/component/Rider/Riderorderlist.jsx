import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";
import Metatitle from "../title/title";
import SideBar from "./Sidebar";
import { deleteOrder, getAllOrders, clearError } from "../../actions/OrderAction";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();

  // const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    // dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      // alert.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      // alert.success("Order Deleted Successfully");
      history.push("/admin/orders");
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, history, isDeleted]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300 },
    { field: "user", headerName: "User", type: "number", minWidth: 300 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 200,
    },
  ];

  const rows = orders
    ? orders.map((item) => ({
        id: item._id,
        user: item.user,
        itemsQty: item.orderItem.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      }))
    : [];

  return (
    <Fragment>
    <Metatitle title={`ALL ORDERS - Admin`} />

    <div className="dashboard">
      <SideBar />
      <div className="productListContainer">
        <h1 id="productListHeading">ALL ORDERS</h1>

         
        {orders && orders.length > 0 && (
  <table className="productListTable" style={{ width: '90%' }}>
    <thead>
      <tr className="tableheading">
        <td style={{ width: '26%' }}><h5>Order Id</h5></td>
        <td><h5>User</h5></td>
        <td><h5>Status</h5></td>
        <td><h5>Item Qty</h5></td>
        <td><h5>Amount</h5></td>
        <td><h5>Action</h5></td>
      </tr>
    </thead>
    <tbody>
      {orders.map((item) => (
        <tr key={item._id}>
          <td className="tablecell">{item._id}</td>
          <td className="tablecell">{item.user.name}</td>
          <td className="tablecell">{item.orderStatus}</td>
          <td className="tablecell">{item.orderItem.length}</td>
          <td className="tablecell">{item.totalPrice}</td>
          <td className="tablecell">
            <Link to={`/orderdetail/${item._id}`}>
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

export default OrderList;
