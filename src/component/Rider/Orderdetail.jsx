import React, { useEffect } from 'react';
import Metatitle from '../title/title';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { useAlert } from 'react-alert';
import { getsingleorder, pickorder } from '../../actions/OrderAction';
import './orderdetail.css'
function OrderDetail() {
    // const alert = useAlert();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order ,totalPrice} = useSelector((state) => state.singleorder);
    const { message} = useSelector((state) => state.pickorder);
    console.log(useSelector((state) => state.singleorder));
   
    useEffect(() => {
        dispatch(getsingleorder(id));
    }, [dispatch, id]);
    const pickorderr =() =>{
        console.log('hello',id)
        dispatch(pickorder(id))
        // alert.success(message)
    }
    return (
        <>
            <Metatitle title="Order Details" />
            <div className="orderr-page">
                <div>
                    <div className="orderr-area">
                    </div>
                    <div className="confirmmitem">
                        <div className="confirmm-container">
                            <h2>Customer Infomartion</h2>
                            {order && order.length > 0 && (
                                <div>
                                    <div className='cutom'>
                                        <p>User Name: {order[0].user.name}</p>
                                        <p>Address: {order[0].shippingInfo.address}</p>
                                        <p>Phone No: {order[0].shippingInfo.phoneNo}</p>
                                    </div>
                                    <div className='orderrdetail'>
                                    <h2>Order Infomartion</h2>
                                    {order.map((orderItem) => (
                                        <div>
                                            <h4>Order ID: {orderItem._id}</h4>
                      <div key={orderItem._id} 
                      className='all-order'>  
                        {orderItem.orderItem.map((item) => (
                          <div key={item._id} className='orderr'>
                            <p>Order Name: {item.name}</p>
                            <p>Order Quantity: {item.quantity}</p>
                            <p>Order Instruction: {item.special_ins}</p>
                          </div>
                        ))}
                      </div>
                      </div>
                    ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="orderr-summary">
                        <h6>Order Summary</h6>
                        <div>
                            <div className="totall-price">
                                <p>Total</p>
                                {order && order.length > 0 && (
                                    <span>PKR{order[0].totalPrice}</span>
                                )}
                            
                            
                            </div>
                            <button onClick={pickorderr}>Pick Up</button>
                            {/* <button onClick={paymentprocess}>Proceed to payment</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetail;
