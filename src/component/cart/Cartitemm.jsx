import React from 'react'
import { Link } from 'react-router-dom'
import './cartitemm.css'
import {removeitemfromcart } from '../../actions/CartAction'
import {useSelector , useDispatch} from 'react-redux'
function Cartitem({item}) {
  const dispatch = useDispatch();
  const {cartitems} = useSelector((state) => state.cart)

  const decresecartitem = (id) => {
    console.log(id)
    dispatch(removeitemfromcart(id));
  }
  return (
        <>
        <div className="cartitemm">
            <img src={item.image} alt='saa/'/>
            <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`Price: PKR ${item.price}`}</span>
            <p onClick={()=>decresecartitem(item.product)}>Remove</p>
            </div>
        </div>

        </>
  )
}

export default Cartitem