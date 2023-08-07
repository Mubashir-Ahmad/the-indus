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

  return (
    <Fragment>
      <Metatitle title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          { products&& (
  <table className="productListTable" style={({width:'90%'})}>
    <tbody>
      <tr className="tableheading">
        <th style={({width:'26%'})}><h5>Product Id</h5></th>
        <td><h5>Name</h5></td>
        <td><h5>Status</h5></td>
        <td><h5>Price</h5></td>
        <td><h5>Action</h5></td>
      </tr>
      { products.map((item) => (
        <tr key={item._id}>
          <td className="tablecell">{item._id}</td>
          <td className="tablecell">{item.name}</td>
          <td className="tablecell">{item.active ? 'Active' : 'Inactive'}</td>
          <td className="tablecell">{item.price}</td>
          <td className="tablecell">
            <Link to={`/admin/product/${item._id}`}>
              <i class="fas fa-edit"></i>
            </Link>
            <Link
              onClick={() =>
                deleteProductHandler(item._id)
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
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
