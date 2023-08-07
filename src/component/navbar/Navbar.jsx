import React, { useState } from 'react';
import './navbar.css';
import pic2 from '../../image/117.png';
import { Link ,useNavigate} from 'react-router-dom';
import Cartt from '../cart/Cartt';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import {useSelector , useDispatch} from 'react-redux'
import { addItem_tocart , removeitemfromcart } from '../../actions/CartAction';
function Navbar({ isDrawerOpen } ) {

  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartitems } = useSelector((state) => state.cart);
  console.log('NavBar',useSelector((state) => state.cart))
  const [isActive, setIsActive] = useState(false);
  const [state, setState] = useState({
    right: isDrawerOpen ,
  });
  const [keywords, setKeywords] = useState('');

  const togglePopup = () => {
    setIsActive(!isActive);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log('id',cartitems)
  const incresequality = (id, quantity, stock) => {
    const newQty = quantity + 1;
    console.log(stock,quantity)
    if(stock <= quantity) {
      return;
    }
    console.log('idd',id)
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
      // Handle the search logic here or navigate to the search results page
    } else {
      // Handle the case when no keywords are entered
    }
  };
  const decresecartitem = (id) => {
    console.log(id)
    dispatch(removeitemfromcart(id));
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if ((event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) || !addToCartPressed) {
      return;
    }
  
    setState({ ...state, [anchor]: open });
  };
  const checkouthandler =()=>{
    navigate('/shipping')
  }
  const list = (anchor) => (
    <>
    <div className='drawer'>
    <p>Cart{cartitems.length}</p>
    <button onClick={toggleDrawer(anchor, false)}>
    <i class="fa-solid fa-xmark" ></i>
    </button>
    </div>
    {
      cartitems && cartitems.map((item) => (
        <>
      <div className="cart-box" key={item.product}>
           <div className="cart-items">
            <img src={item.image} alt='saa/'/>
            <div className="carTInput">
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <button onClick={() => decresequality(item.product, item.quantity, item.stock)}> - </button>
              <input readOnly  value={item.quantity} />
              <button onClick={() => incresequality(item.product, item.quantity, item.stock)}> + </button>
            </div>
            <p onClick={()=>decresecartitem(item.product)}>Remove</p>
        </div> 
      </div>
    
            <div className="cartGross">
          <div></div>
          <div className="cartgrossBox">
            <p>{`Total Amount: ${cartitems.reduce(
              (acc,item)=> acc + item.quantity * item.price , 0
            )}`}</p>
          </div>
          <div></div>
          <div className="checkoutbTn">
            <button onClick={checkouthandler}>Check out</button>
          </div>
        </div>
      </>
    ))
  }
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
            <Link onClick={handleSearchSubmit} className='linkk'>
              <i className='fa-solid fa-magnifying-glass' style={{ color: 'white' }}></i>
            </Link>
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
        open={state.right}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </>
  );
}

export default Navbar;
