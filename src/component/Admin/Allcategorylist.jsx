import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate} from "react-router-dom";
import Metatitle from "../title/title";
import SideBar from "./Sidebar";
import {clearError,} from "../../actions/OrderAction";
import {deletecategory, getcategory} from "../../actions/categoryAction"
import { toast } from "react-toastify";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.warn('🦄 Deleted Succeessfully!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        dispatch({ type: 'DELETE_CATEGORY_RESET' });
        navigate("/admin/category");
    }

    dispatch(getcategory());
  }, [dispatch,isdeleted, toast]);



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
        <td><h5>Name</h5></td>
        <td><h5>Active</h5></td>
        <td><h5>Sorting</h5></td>
        <td><h5>Action</h5></td>
      </tr>
      { data.map((item) => (
        <tr key={item._id}>
          <td className="tablecell">{item.Category_name}</td>
          <td className="tablecell">{item.active ? 'Active' : 'Inactive'}</td>
          <td className="tablecell">{item.sorting}</td>
          <td className="tablecell">
            <Link to={`/admin/update/category/${item._id}`}>
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
      <ToastContainer
                  position="bottom-center"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                   pauseOnHover
                  theme="light"
          />
    </Fragment>
  );
};

export default OrderList;
