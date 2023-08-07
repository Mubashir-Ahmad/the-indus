import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate} from "react-router-dom";
import Metatitle from "../title/title";
import SideBar from "./Sidebar";
import {clearError,} from "../../actions/OrderAction";
import {deletecategory, getcategory} from "../../actions/categoryAction"
// import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const { data } = useSelector((state) => state.getcategory);
  const { isdeleted } = useSelector((state) => state.deletecategory);
  console.log(useSelector((state) => state.deletecategory))
  const deleteProductHandler = (id) => {
    dispatch(deletecategory(id));
  };
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    if(!isAuthenticated)
    {
      navigate('/login')
    }
    if (isdeleted) {
      navigate("/admin/category");
      dispatch({ type: 'DELETE_CATEGORY_RESET' });
    }

    dispatch(getcategory());
  }, [dispatch,isdeleted]);

  const columns = [
    { field: "id", headerName: "Category ID", minWidth: 300, 
    // flex: 0.4 
  },
    {
      field: "name",
      headerName: "Name",
      type: "text",
      minWidth: 300,
      // flex: 0.4,
    },
    {
      field: "active",
      headerName: "Active",
      type: "text",
      minWidth: 150,
      // flex: 0.4,
      cellClassName: (params) => {

        return params.getValue(params.id, "active") === false ? "greenColor" : "redColor";
      },
    },
    
    {
      field: "sorting",
      headerName: "Sorting",
      type: "number",
      minWidth: 200,
      // flex: 0.4,
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
          <Fragment>
            <Link to={`/admin/update/category/${params.getValue(params.id, "id")}`}>
            <i class="fa-solid fa-gears"></i>
            </Link>
            <button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <i class="fa-sharp fa-regular fa-trash"></i>
            </button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  data &&
    data.forEach((item) => {
      console.log(item)
      rows.push({
        
        id: item._id,
        name:item.Category_name,
        active: item.active,
        sorting: item.sorting,
      });
    });

  return (
    <Fragment>
      <Metatitle title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL CATEGORY</h1>

          { data&& (
  <table className="productListTable" style={({width:'90%'})}>
    <tbody>
      <tr className="tableheading">
        <th style={({width:'26%'})}><h5>Product Id</h5></th>
        <td><h5>Name</h5></td>
        <td><h5>Active</h5></td>
        <td><h5>Sorting</h5></td>
        <td><h5>Action</h5></td>
      </tr>
      { data.map((item) => (
        <tr key={item._id}>
          <td className="tablecell">{item._id}</td>
          <td className="tablecell">{item.name}</td>
          <td className="tablecell">{item.active ? 'Active' : 'Inactive'}</td>
          <td className="tablecell">{item.sorting}</td>
          <td className="tablecell">
            <Link to={`/manager/product/${item._id}`}>
              <i class="fas fa-edit"></i>
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
