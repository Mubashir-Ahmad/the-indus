import React from 'react'
import './cartt.css'
import { addItem_tocart,removeitemfromcart } from '../../actions/CartAction'
import Cartitemm from './Cartitemm'
import {useSelector , useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
// import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import { useNavigate } from 'react-router-dom'
function Cartt() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cartitems} = useSelector((state) => state.cart)
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
  const checkouthandler =()=>{
    navigate('/shipping')
  }
  // const decresecartitem = (id) => {
  //   dispatch(removeitemfromcart(id));
  // }

  return (
    <>
      {cartitems.length === 0 ?(
        <div className='emptycart'>
          {/* <RemoveShoppingCartIcon /> */}
          <h6>No Products in your Cart</h6>
          <Link to='/'>View Products</Link>
        </div>
      ): (
        <div className="cartpage">
        <div className="cartheader">
          <p>Product</p>
          <p>Quality</p>
          <p>Subtotal</p>
        </div>
        {cartitems && cartitems.map((item) => (
          <div className="cart-container" key={item.product}>
            <Cartitemm item={item} />
            <div className="cartInput">
              <button onClick={() => decresequality(item.product, item.quantity, item.stock)}> - </button>
              <input readOnly  value={item.quantity} />
              <button onClick={() => incresequality(item.product, item.quantity, item.stock)}> + </button>
            </div>
            <p className='cartsubtotal'>
              {`PKR${item.price * item.quantity}`}
            </p>
          </div>
        ))}
        <div className="cartgross">
          <div></div>
          <div className="cartgrossbox">
            <p>Gross Total</p>
            <p>{`PKR${cartitems.reduce(
              (acc,item)=> acc + item.quantity * item.price , 0
            )}`}</p>
          </div>
          <div></div>
          <div className="checkoutbtn">
            <button onClick={checkouthandler}>Check out</button>
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default Cartt
