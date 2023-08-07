import React, { useState } from 'react';
import './navbar.css';
import pic2 from '../../image/117.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Cartt from '../cart/Cartt';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function Navbar() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartitems } = useSelector((state) => state.cart);
  console.log('NavBar',useSelector((state) => state.cart))
  const [isActive, setIsActive] = useState(false);
  const [state, setState] = useState({
    right: false,
  });
  const [keywords, setKeywords] = useState('');

  const togglePopup = () => {
    setIsActive(!isActive);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keywords.trim()) {
      // Handle the search logic here or navigate to the search results page
    } else {
      // Handle the case when no keywords are entered
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    // Check if the event target is part of the drawer content
    if (
      event.target &&
      event.target.closest('.MuiDrawer-paper')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Cartt/>
    // <Box
    //   sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    //   role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    // >
    //   <List>
    //     {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //       <ListItem key={text} disablePadding>
    //         <ListItemButton>
    //           <ListItemText primary={text} />
    //         </ListItemButton>
    //       </ListItem>
    //     ))}
    //   </List>
    //   <Divider />
    //   <List>
    //     {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //       <ListItem key={text} disablePadding>
    //         <ListItemButton>
    //           <ListItemText primary={text} />
    //         </ListItemButton>
    //       </ListItem>
    //     ))}
    //   </List>
    // </Box>
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
                <i className='fa-solid fa-cart-shopping' style={{ color: cartitems.length > 0 ? 'tomato' : 'unset' }}>{cartitems.length}</i>
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
