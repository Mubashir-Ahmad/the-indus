import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '../reducer/CartReducer';
import { AdminproductReducer, productReducer } from '../reducer/product';
import { allUsersReducer, userReducer } from '../reducer/UserReducer';
import { ProfileReducer , ForgetPasswordReducer } from '../reducer/profileReducer';
import { OrderReducer, MyOrderReducer, allOrdersReducer, SingleOrderReducer, PickOrderReducer, RiderearnReducer, UpdateorderReducer, SaleOrderReducer } from '../reducer/OrderReducer';
import { UpdateProductReducer, categoryReducer, newProductReducer, productDetailReducer ,productsReducer } from '../reducer/productReducer';
import { createcategoryReducer } from '../reducer/CategoryReducer';
import {updatecategoryReducer} from '../reducer/CategoryReducer';
const initialState = {
  cart: {
    cartitems: localStorage.getItem('cartitem') ? JSON.parse(localStorage.getItem('cartitem')) : [],
    shippinginfo:localStorage.getItem('shippinginfo') ? JSON.parse(localStorage.getItem('shippinginfo')) : {}
    
  },
};
const store = configureStore({
    reducer: {
      products: productReducer,
      productts: productsReducer,
      adminproduct:AdminproductReducer,
      cart: cartReducer,
      productdetail: productDetailReducer,
      user: userReducer, 
      profile: ProfileReducer,
      forgetPassword: ForgetPasswordReducer,
      order: OrderReducer,
      myorders: MyOrderReducer,
      allOrders:allOrdersReducer,
      singleorder:SingleOrderReducer,
      updateorder:UpdateorderReducer,
      deleteorder:UpdateorderReducer,
      alluser:allUsersReducer,
      pickorder:PickOrderReducer,
      riderearn:RiderearnReducer,
      // allcategory:categoryReducer,
      newProduct:newProductReducer,
      updateproduct:UpdateProductReducer,
      categorycreate:createcategoryReducer,
      getcategory:createcategoryReducer,   // For get all category
      updatecategory:updatecategoryReducer, // For update category
      deletecategory:updatecategoryReducer, // For delete category
      sales:SaleOrderReducer, // For Sales
    },
    preloadedState: initialState, // pass initialState here
  });
  export default store;