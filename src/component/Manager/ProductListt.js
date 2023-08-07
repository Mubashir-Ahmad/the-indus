import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getAdminProduct,
  
} from "../../actions/productAction";
import { Link ,useNavigate} from "react-router-dom";
import Metatitle from '../title/title'
import SideBar from "./Sidebar";
import { getproducts } from "../../actions/Action";
import {deleteProduct} from "../../actions/productAction"
const ProductList = ({ history }) => {
  const dispatch = useDispatch();
 const navigate = useNavigate();
  const { error, products } = useSelector((state) => state.adminproduct);
console.log(useSelector((state) => state.adminproduct))
  const {  isDeleted } = useSelector(
    (state) => state.updateproduct
  );
      console.log(useSelector(
        (state) => state.updateproduct
      ))
  const deleteProductHandler = (id) => {
    console.log('iddd',id)
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    console.log(isDeleted)
    if (isDeleted) {
      navigate("/admindashbord");
      dispatch({ type: 'DELETE_PRODUCT_RESET' });
    }
    dispatch(getAdminProduct());
  }, [dispatch, error, isDeleted,navigate]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, 
    // flex: 0.5
   },

    {
      field: "name",
      headerName: "Name",
      minWidth:150,
      // flex: 1,
    },
    {
      field: "active",
      headerName: "active",
      type: "boolean",
      minWidth: 200,
      // flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 150,
      // flex: 0.2,
    },

    {
      field: "actions",
      // flex: 0.1,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/manager/product/${params.getValue(params.id, "id")}`}>
              <i class="fas fa-edit"></i>
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        active: item.active,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <Metatitle title={`ALL PRODUCTS - Admin`} />

      <div className="dashboardd">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          {products && (
  <table className="productListTable" style={({width:'90%'})}>
    <tbody>
      <tr className="tableheading">
        <th style={({width:'26%'})}><h5>Product Id</h5></th>
        <td><h5>Name</h5></td>
        <td><h5>Active</h5></td>
        <td><h5>Price</h5></td>
        <td><h5>Action</h5></td>
      </tr>
      {products.map((item) => (
        <tr key={item._id}>
          <td className="tablecell">{item._id}</td>
          <td className="tablecell">{item.name}</td>
          <td className="tablecell">{item.active ? 'Active' : 'Inactive'}</td>
          <td className="tablecell">{item.price}</td>
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
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
