import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './App.css';
import './css/global.css'
import { useSelector,useDispatch } from 'react-redux';
import Navbar from './component/navbar/Navbar'
import Home from "./component/home/Home";
import Footer from "./component/footer/Footer";
import Login from "./component/user/Login";
import Updateprofile from "./component/user/Updateprofile";
import Updatepassword from "./component/user/Updatepassword";
import store from './store/store';
import Forgetpassword from './component/user/Forgetpassword'
import WebFont from 'webfontloader';
import Resetpassword from './component/user/Resetpassword';
import Useroption from './component/navbar/Useroption';
import Dashbord from './component/Admin/Dashboard'
import  {load_user}  from '../src/actions/UserAction'
import OrderList from './component/Admin/OrderList'
import ProductList from './component/Admin/ProductList'
import UserList from './component/Admin/UsersList'
import Cart from './component/cart/Cart';
import Shipping from './component/cart/Shipping';
import OrderConfirm from './component/cart/OrderConfirm';
import Dashhbord from './component/Rider/Dashhbord';
import Riderorderlist from './component/Rider/Riderorderlist';
import Orderdetail from './component/Rider/Orderdetail';
import Ordersuccess from './component/cart/Ordersuccess';
// import Updateprofile from './component/user/Updateprofile';
import Profile from './component/user/Profile'
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie';
import Riderearn from './component/Rider/Riderearn';
import Category from "./component/category/Category"
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import Newuser from './component/Admin/NewUser';
import UpdateUser from './component/Admin/UpdateUser';
import ProcessOrder from './component/Admin/ProcessOrder'
import Managerdasboard from './component/Manager/Managerdashboard.jsx'
import Categorylist from './component/Admin/Categorylist.jsx'
import Allcategorylist from './component/Admin/Allcategorylist.jsx'
import Updatecategory from './component/Admin/Updatecategory.jsx'
import ProductListt from "./component/Manager/ProductListt"
import NewProductt from "./component/Manager/NewProductt"
import OrderListt from "./component/Manager/OrderListt"
import ProcessOrderr from "./component/Manager/ProcessOrderr"
import UpdateProductt from "./component/Manager/UpdateProductt"
import Updatecategoryy from "./component/Manager/Updatecategoryy"
import Allcategorylistt from "./component/Manager/Allcategorylistt"
import Categorylistt from "./component/Manager/Categorylistt"
import UsersListt from "./component/Manager/UsersListt"
import UpdateUserr from "./component/Manager/UpdateUserr" 
import Homeproduct from "./component/home/Homeproduct" 
import MyOrders from './component/user/Myorders';
import NewUser from './component/Manager/Newuser';
function App() {
  const dispatch = useDispatch();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log('appp' ,useSelector((state) => state.user))
  const [stripeapikey,setstripeapikey]= useState(" ");
  const getstripeapikey = async () => {
    try {
      console.log('hello1')
      const token = Cookies.get('token');
      const config = { headers: { Authorization: `${token}` } };
      const { data } = await axios.get(`https://the-indus-beckend.vercel.app/api/v1/stripekey`, config);
      console.log('sdsdsdsdqwwq',data)
      const apiKey = data.sendstripkey;
      if (apiKey) {
        console.log('hello2',data,'fsd',apiKey)
        setstripeapikey(apiKey);
        console.log('hello2')
      } else {
        // console.log('hello2',data,'fsd',apiKey)
        throw new Error('Invalid Stripe API key');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('useeefeect',isAuthenticated)
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'chilanka']
      }
    });
    store.dispatch(load_user());
    getstripeapikey();
   
    
  }, []);

  return (
    <div className="App">
      { console.log('useeefeect1212',isAuthenticated)}
            <Router>
            <Navbar isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
              {isAuthenticated && <Useroption user={user} />}
              <Routes>
              {/* <Route path="*" element={<Login />} exact />   */}
              <Route path="/" element={<Home  setIsDrawerOpen={setIsDrawerOpen}/>} exact />
              <Route path="/login" element={<Login />} exact />
              <Route path="/password/forget" element={<Forgetpassword />} exact />
              <Route path='/password/reset/:token' element={<Resetpassword/>} />
              {/* {isAuthenticated && <Route path='/admindashbord' element={<Dashbord/>} /> : navigate('/login') } */}
              
              <Route path='/admindashbord' element={<Dashbord />} />
              <Route path='/admin/orders' element={<OrderList/>} />
              <Route path='/admin/products' element={<ProductList/>} />
              <Route path='/admin/users' element={<UserList/>} />
              
              <Route path="/riderdash" element={<Dashhbord />} exact />
              <Route path='/mangerdashbord' element={<Managerdasboard />} />
              <Route path="/products/:keyword" element={<Homeproduct />} />
              {isAuthenticated && <Route path='/cart' element={<Cart/>} /> }
              {/* {isAuthenticated &&<Route path='/shipping' element={<Shipping/>} />} */}
              {isAuthenticated &&<Route path='/order/confirm' element={<OrderConfirm/>} />}
              {isAuthenticated &&<Route path="/admin/order/:id" element={<ProcessOrder/>} />}
              {isAuthenticated &&<Route path="/admin/product" element={<NewProduct/>} />}
              {isAuthenticated &&<Route path="/create/category" element={<Categorylist/>} />}
              {isAuthenticated &&<Route path="/admin/category" element={<Allcategorylist/>} />}
              {isAuthenticated &&<Route path="/admin/update/category/:id" element={<Updatecategory/>} />}
              {isAuthenticated &&<Route path="/admin/product/:id" element={<UpdateProduct/>} />}
              {isAuthenticated &&<Route path="/admin/update/user/:id" element={<UpdateUser/>} />}
              {isAuthenticated &&<Route path="/admin/update/user/:id" element={<UpdateUser/>} />}
              {/* Manager links */}
              {isAuthenticated &&<Route path="/manager/product" element={<ProductListt/>} />}
              {isAuthenticated &&<Route path="/manager/user/create" element={<NewUser/>} />}
              {isAuthenticated &&<Route path="/myorders" element={<MyOrders/>} />}
              {isAuthenticated &&<Route path="/manger/create/product" element={<NewProductt/>} />}
              {isAuthenticated &&<Route path="/manger/order" element={<OrderListt/>} />}
              {isAuthenticated &&<Route path="/manager/user" element={<UsersListt/>} />}
              {isAuthenticated &&<Route path="/manager/order/:id" element={<ProcessOrderr/>} />}
              {isAuthenticated &&<Route path="/manager/product/:id" element={<UpdateProductt/>} />}
              {isAuthenticated &&<Route path="/manager/update/category/:id" element={<Updatecategoryy/>} />}
              {isAuthenticated &&<Route path="/manager/category" element={<Allcategorylistt/>} />}
              {isAuthenticated &&<Route path="/manager/create/category" element={<Categorylistt/>} />}
              {isAuthenticated &&<Route path="/manager/update/user/:id" element={<UpdateUserr/>} />}
             
              {isAuthenticated &&<Route path='/rider/orders' element={<Riderorderlist/>} />}
              {isAuthenticated &&<Route path='/user/create' element={<Newuser/>} />}
              {isAuthenticated &&<Route path='/orderdetail/:id' element={<Orderdetail/>} />}
              {isAuthenticated &&<Route path='/success' element={<Ordersuccess/>} />}
              {isAuthenticated &&<Route path='/account' element={<Profile/>} />}
              {isAuthenticated &&<Route path='/password/update' element={<Updatepassword/>} />}
              {isAuthenticated &&<Route path='/me/update' element={<Updateprofile/>} />}
              {isAuthenticated &&<Route path='/rider/earn' element={<Riderearn/>} />}
              {isAuthenticated && stripeapikey && <Route path='/shipping' element={<Elements stripe={loadStripe(stripeapikey)}><Shipping/></Elements>} /> }
              </Routes>
              <Footer/>
            </Router>
    </div>
  );
}

export default App;
