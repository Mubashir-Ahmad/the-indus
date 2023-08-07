// import React,{useEffect,useState , useRef} from 'react'
// import {CardNumberElement , CardCvcElement ,CardExpiryElement, useStripe,useElements} from '@stripe/react-stripe-js'
// import CheckoutSteps from './CheckoutStep'
// import Metatitle from '../title/title'
// import { useAlert } from 'react-alert'
// import axios from 'axios'
// import './Payment.css'
// import CreditCardIcon from '@material-ui/icons/CreditCard'
// import EventIcon from '@material-ui/icons/Event'
// import VpnKeyIcon from '@material-ui/icons/VpnKey'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import Cookies from 'js-cookie';
// import { clearError,createorder } from '../../actions/OrderAction'
// function Payment() {
//     const navigate = useNavigate();
//     const orderinfo = JSON.parse(sessionStorage.getItem('orderinfo'));
//     const dispatch = useDispatch();
//     const elements = useElements();
//     const stripe = useStripe();
//     const alert = useAlert();
//     const payBtn = useRef("")
//     const {shippinginfo , cartitems} = useSelector((state)=> state.cart);
//     const {user} = useSelector((state)=> state.user);
//     const {error} = useSelector((state)=> state.order)
//     const order = {
//         shippingInfo:shippinginfo,
//         orderItem:cartitems,
//         itemPrice:orderinfo.subtotal,
//         taxPrice:orderinfo.tax,
//         shippingPrice:orderinfo.shippingCharges,
//         totalPrice:orderinfo.TotalPrice
//     }
//     const paymentdata = {  
//         amount: Math.round(orderinfo.TotalPrice * 100),
//       }
//     const submithandler = async(e)=>{
//         e.preventDefault();
//         payBtn.current.disabled = true ;
//         try{
//             console.log(user)
//             const token = Cookies.get('token');
//             const config = { headers: { Authorization: `${token}` ,"Content-Type":"application/json" } };
//             const {data} = await axios.post(`http://localhost:4000/api/v1/payment/process`,paymentdata,config);
//             const client_secret = data.client_secret;

//             if(!stripe || !elements) return;
//             const result = await stripe.confirmCardPayment(client_secret,{
//                 payment_method:{
//                     card: elements.getElement(CardNumberElement),
//                     billing_details:{
//                         name:user.user.name,
//                         email:user.user.email,
//                         phone:shippinginfo.phoneNo,
                        
//                         // description: 'Your export transaction description goes here',
//                         address:{
//                             line1:shippinginfo.address,
//                             city:shippinginfo.city,
//                             state:shippinginfo.state,
//                             postal_code:shippinginfo.pincode,
//                             country:shippinginfo.country,
//                         }
//                     }
//                 }
//             })
//             if (result.error){
//                 // console.log('hello',result)
//                 payBtn.current.disabled=false
//                 alert.error(result.error.message);
//             }
//             else{
//                 console.log('hello',result.paymentIntent.status)
//                 if(result.paymentIntent.status === 'succeeded'){
//                     order.paymentInfo ={
//                         id: result.paymentIntent.id,
//                         status:result.paymentIntent.status
//                     }
//                     dispatch(createorder(order))
//                     navigate('/success')
//                 }
//                 else{
//                     alert.error("Thers some issue while processing payment");
//                 }
//             }
//         }
//         catch(error){
//             payBtn.current.disabled=false;
//             alert.error(error.response.data.message);
//         }
//     }
//   return (
//     <>
//         <Metatitle title="Payment" />
//         <CheckoutSteps activestep={2}/>
//         <div className='payment-container'>
//         <form className='paymentform' onSubmit={submithandler}>
//                 <h6>CardInfo</h6>
//                 <div>
//                     <CreditCardIcon />
//                     <CardNumberElement className='paymentinput'/>
//                 </div>
//                 <div>
//                     <VpnKeyIcon/>
//                     <CardExpiryElement className='paymentinput'/>
//                 </div>
//                 <div>
//                     <VpnKeyIcon />
//                     <CardCvcElement className='paymentinput' />
//                 </div>
//                 <input type='submit' value={`Pay - PKR ${orderinfo && orderinfo.TotalPrice}`} ref={payBtn} className='paymentbtn' />
//             </form>
//         </div>
//     </>
//   )
// }

// export default Payment

