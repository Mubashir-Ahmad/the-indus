import React, { useState } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { SpeedDial, SpeedDialAction } from '@mui/material'; // Import from @mui/material
// import DasboardIcon from '@mui/icons-material/Dashboard'; // Import from @mui/icons-material
// import PersonIcon from '@mui/icons-material/Person'; // Import from @mui/icons-material
// import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Import from @mui/icons-material
// import ListAltIcon from '@mui/icons-material/ListAlt'; // Import from @mui/icons-material
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import from @mui/icons-material
import { useDispatch, useSelector } from 'react-redux';
import { userReducer } from '../../reducer/UserReducer';
import Backdrop from '@mui/material/Backdrop'; // Import from @mui/material
import { logout_user } from '../../actions/UserAction';
function Useroption({ user }) {
  console.log('user', user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartitems } = useSelector((state) => state.cart)
  const { isAuthenticated } = useSelector((state) => state.user)
  // console.log(useSelector((state)=>state.user))
  const [open, setopen] = useState(false);
  const option = [
    // {icon: <ListAltIcon/>,name :"Orders",function:order},
    user.user.role === 'admin' ?
      {
        // <ListAltIcon/>
        icon: <i class="fa-solid fa-circle-nodes"></i>,
        name: "Orders", function: order
      } : null
    ,
    {
      icon: <i class="fa-solid fa-user"></i>,
      name: "Profile", function: account
    },
    user.user.role === 'rider' ?
      null :
      {
        icon: <i className="fa-solid fa-cart-shopping" style={{ color: cartitems.length > 0 ? 'tomato' : 'unset' }}></i>,
        // icon: <ShoppingCartIcon style={{color:cartitems.length>0 ?'tomato' : 'unset'}}/>,
        name: `Cart(${cartitems.length})`, function: cart
      },
    {
      icon: <i class="fa-solid fa-right-from-bracket"></i>,
      name: "Logout", function: logoutUser
    },
  ];
  if (user.user.role === 'admin') {
    option.unshift({
      icon: <i class="fa-solid fa-table-columns"></i>,
      name: "Dashboad",
      function: dashboard
    })
  }
  if (user.user.role === 'manger') {
    option.unshift({
      icon: <i class="fa-solid fa-table-columns"></i>,
      name: "Dashboad",
      function: dashboardd
    })
  }
  function account() {
    navigate('/account')
  }
  function order() {
    navigate('/admin/orders')
  }
  function cart() {
    navigate('/cart')
  }
   function logoutUser() {
 
      document.cookie = 'token=; Max-Age=-99999999';
      dispatch(logout_user())
      console.log('userrrrrrrrrrrrrrrrr',isAuthenticated)
        navigate('/login');
  }

  function dashboard() {
    navigate('/admindashbord')
  }
  function dashboardd() {
    navigate('/mangerdashbord')
  }
  return (
    <>
      <Backdrop open={open} style={{ zIndex: '10' }} />
      < SpeedDial className='speedDial' ariaLabel='SpeedDial tooltip example' direction='down'
        style={{ zIndex: '11' }} onClose={() => setopen(false)} onOpen={() => setopen(true)} open={open} icon={
          <img className='speedDialIcon' src={user.user.avatar ? user.user.avatar : "/Profile.png"} alt="Profile" />
        }>
        {
          option.filter(item => item !== null).map(item => (
            <SpeedDialAction
              key={item.name}
              icon={item.icon}
              tooltipTitle={item.name}
              onClick={item.function}
              tooltipOpen
            />
          ))
        }
      </SpeedDial>
    </>
  )
}

export default Useroption