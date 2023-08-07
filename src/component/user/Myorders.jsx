import React, { Fragment, useEffect } from "react";
import "./myorders.css";
import { useSelector, useDispatch } from "react-redux";
import { myorders , getAllOrders } from "../../actions/OrderAction";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";
import Metatitle from "../title/title";


const MyOrders = () => {
  const dispatch = useDispatch();

  // const alert = useAlert();

  const { oorders , orders ,dorders, porder } = useSelector((state) => state.myorders);
  console.log('asffffffffffffffffffff',useSelector((state) => state.myorders))
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
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
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            {/* <LaunchIcon /> */}
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItem.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    dispatch(myorders());
    // dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Fragment>
      <Metatitle title={`${user.name} - Orders`} />


        <div className="myOrdersPage">
        
 {orders && (
  <table className="productListTable" style={({width:'90%'})}>
    <tbody>
      <tr className="tableheading">
        <td style={({width:'26%'})}><h5>Order Id</h5></td>
        <td><h5>Status</h5></td>
        <td><h5>Item Qty</h5></td>
        <td><h5>Amount</h5></td>
      </tr>
      {orders.map((item) => (
        <tr key={item._id}>
          <td className="tablecell">{item._id}</td>
          <td className="tablecell">{item.orderStatus}</td>
          <td className="tablecell">{item.orderItem.length}</td>
          <td className="tablecell">{item.totalPrice}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}
          <h5 id="myOrdersHeading">{user.name}'s Orders</h5>
        </div>
      {/* )} */}
    </Fragment>
  );
};

export default MyOrders;