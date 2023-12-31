import React, { useState } from 'react';
import './navbar.css';
import pic2 from '../../image/117.png';
import { Link ,useNavigate} from 'react-router-dom';
import Cartt from '../cart/Cartt';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import {useSelector , useDispatch} from 'react-redux'
import { addItem_tocart , removeitemfromcart } from '../../actions/CartAction';
function Navbar({  isDrawerOpen, setIsDrawerOpen } ) {

  const dispatch =useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartitems } = useSelector((state) => state.cart);
  console.log('NavBar',isDrawerOpen,'navbars',setIsDrawerOpen )
  const [isActive, setIsActive] = useState(false);
  const [state, setState] = useState({
    right: false ,
  });
  const [keywords, setKeywords] = useState('');

  const togglePopup = () => {
    setIsActive(!isActive);
  };
  const navigate = useNavigate();
  // console.log('id',cartitems)
  const incresequality = (id, quantity, stock) => {
    const newQty = quantity + 1;
    console.log(stock,quantity)
    if(stock <= quantity) {
      return;
    }
    dispatch(addItem_tocart(id, newQty))
  }

  const decresequality = (id, quantity, stock) => {
    const newQty = quantity - 1;
    if(1 >= quantity) {
      return;
    }
    dispatch(addItem_tocart(id, newQty))
  }
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      navigate(`/products/${keywords}`);
    } else {
      navigate("/");
    }
  };
  const decresecartitem = (id) => {
    
    dispatch(removeitemfromcart(id));
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if ((event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))) {
      return;
    }
  
    setState({ ...state, [anchor]: open });
    setIsDrawerOpen(open);
  };
  const checkouthandler =()=>{
    navigate('/shipping')
  }
  
  const list = (anchor) => (
    <>
    <div className="drawer-box">
      <div className='drawer'>
        <p>Your Cart: {cartitems.length}</p>
        <button onClick={toggleDrawer(anchor, false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      {cartitems.length > 0 ? (
        <>
          {cartitems.map((item) => (
            <div className="cart-box" key={item.product}>
              <div className="cart-items">
                <img src={item.image} alt='saa/' />
                <div className="carTInput">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <div className='drawerinput'>
                  <button onClick={() => decresequality(item.product, item.quantity, item.stock)}> - </button>
                  <input readOnly value={item.quantity} />
                  <button onClick={() => incresequality(item.product, item.quantity, item.stock)}> + </button>
                  <Link onClick={() => decresecartitem(item.product)} className='drawer-link'>
                <i class="fa-solid fa-trash"></i>
                </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="cartGross">
            <div></div>
            <div className="cartgrossBox">
              <p>{`Total Amount: ${cartitems.reduce(
                (acc, item) => acc + item.quantity * item.price, 0
              )} PKR`}</p>
            </div>
              <div></div>
            <div className="checkoutbTn">
              <button onClick={checkouthandler}>Check out</button>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
        </div>
      )}
      </div>
    </>
  );
  

  return (
    <>
      <div className='main-container' style={{ backgroundColor: '#ce1710' }}>
        <div className='navbar'>
          <Link to='/'>
            <div className='logo'>
              <img src={pic2} alt='' />
            </div>
          </Link>
          <div className='searchbar'>
            <div className='inputt'>
              <input
                type='text'
                placeholder='Search in the Indus'
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            <button onClick={handleSearchSubmit} className='linkk'>
              <i className='fa-solid fa-magnifying-glass' style={{ color: 'white' }}></i>
            </button>
          </div>
          <div className='buttonn'>
            <div className='buttoon'>
              <IconButton onClick={toggleDrawer('right', true)}>
                <i className='fa-solid fa-cart-shopping' style={{ color: cartitems.length > 0 ? 'tomato' : 'unset' }}></i>
                {cartitems.length}
              </IconButton>
            </div>
            {isAuthenticated ? null : (
              <Link to='/login' className='linnk'>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className='banner'>
        <div className='icon'>
          <div className='icon-1'>
            <i className='fa-solid fa-ellipsis'></i>
          </div>
          <div className='icon-2'>
            <i className='fa-regular fa-heart'></i>
          </div>
        </div>
      </div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </>
  );


            }
export default Navbar;
