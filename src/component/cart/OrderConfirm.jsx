import React,{useState , useEffect ,useRef} from 'react'
import './orderconfirm.css'
import {Link} from 'react-router-dom'
import Metatitle from "../title/title"
import { useSelector ,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios'
import './Payment.css'
import {CardNumberElement , CardCvcElement ,CardExpiryElement, useStripe,useElements} from '@stripe/react-stripe-js'
import { clearError,createorder } from '../../actions/OrderAction'
function OrderConfirm() {
    const navigate = useNavigate();
    const {shippinginfo, cartitems}= useSelector((state)=>state.cart)
    const [orderinfo, setOrderInfo] = useState(""); 
    const {user} =useSelector((state)=>state.user)
    const elements = useElements();
    const payBtn = useRef("");
    const stripe = useStripe();
    const [tre, setTre] = useState(false);
    const dispatch = useDispatch();
    const subtotal = cartitems.reduce(
        (acc,item)=>acc + item.quantity * item.price, 0
    );
    const shippingCharges = subtotal > 1000 ? 0 : 200
    const tax = subtotal*0.18;
    const TotalPrice=subtotal + tax + shippingCharges;
    const address = `${shippinginfo.address},${shippinginfo.city},${shippinginfo.state},${shippinginfo.pincode},${shippinginfo.country},`
    const paymentprocess =() =>{
        const data={
            subtotal,shippingCharges,tax,TotalPrice
        };
        sessionStorage.setItem("orderinfo",JSON.stringify(data));
        setOrderInfo(data);
        setTre(true);
        // navigate('/process/payment');
    }
    const order = {
        shippingInfo:shippinginfo,
        orderItem:cartitems,
        itemPrice:orderinfo.subtotal,
        taxPrice:orderinfo.tax,
        shippingPrice:orderinfo.shippingCharges,
        totalPrice:orderinfo.TotalPrice
    }
    const paymentdata = {  
        amount: Math.round(orderinfo.TotalPrice * 100),
      }
    const submithandler = async(e)=>{
        e.preventDefault();
        payBtn.current.disabled = true ;
        try{
            console.log(user)
            const token = Cookies.get('token');
            const config = { headers: { Authorization: `${token}` ,"Content-Type":"application/json" } };
            const {data} = await axios.post(`https://the-indus-beckend.vercel.app/api/v1/payment/process`,paymentdata,config);
            const client_secret = data.client_secret;

            if(!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method:{
                    card: elements.getElement(CardNumberElement),
                    billing_details:{
                        name:user.user.name,
                        email:user.user.email,
                        phone:shippinginfo.phoneNo,
                        
                        // description: 'Your export transaction description goes here',
                        address:{
                            line1:shippinginfo.address,
                            city:shippinginfo.city,
                            state:shippinginfo.state,
                            postal_code:shippinginfo.pincode,
                        }
                    }
                }
            })
            if (result.error){
                // console.log('hello',result)
                payBtn.current.disabled=false
            }
            else{
                console.log('hello',result.paymentIntent.status)
                if(result.paymentIntent.status === 'succeeded'){
                    order.paymentInfo ={
                        id: result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }
                    dispatch(createorder(order))
                    navigate('/success')
                }
                else{
                    // alert.error("Thers some issue while processing payment");
                }
            }
        }
        catch(error){
            payBtn.current.disabled=false;
        }
    }
  return (
    <>
    <Metatitle title="Confirm order"/>
    {/* <CheckoutSteps activestep={1}/> */}
    <div className="order-page">
            <div className="order-area">
        <h6>Shipping Info</h6>
        </div>
        <div className='confirmitem'>
    <div className='confirm-container'>
        {cartitems && cartitems.map((item)=>(
            <div key={item.product}>
                <img src={item.image} alt='Product'/>
                <Link to={`/product/${item.product}`}>
                    {item.name}
                </Link>{" "}
                <span>
                    {item.quantity} X PKR{item.price}={" "}
                    <b>PKR{item.price * item.quantity}</b>
                </span>
             </div>
        ))}
    </div>
    </div>

        <div>
         <div className='order-summary'>
            <h6>Order Summary</h6>
            <div>
            <div>
                <p>Subtotal</p>
                <span>PKR{subtotal}</span>
            </div>
            <div>
                <p>Shipping Charges</p>
                <span>PKR{shippingCharges}</span>
            </div>
            <div>
                <p>GST</p>
                <span>PKR{tax}</span>
            </div>
            <div className='total-price'>
                <p>Total</p>
                <span>PKR{TotalPrice}</span>
            </div>
            <button onClick={paymentprocess}>Confirm Information</button>
            </div>
            </div>
    </div>
    <div className='payment-container'>
        <form className='paymentform' onSubmit={submithandler}>
                <h6>CardInfo</h6>
                <div>
                    {/* <CreditCardIcon /> */}
                    <CardNumberElement className='paymentinput'/>
                </div>
                <div>
                    {/* <VpnKeyIcon/> */}
                    <CardExpiryElement className='paymentinput'/>
                </div>
                <div>
                    {/* <VpnKeyIcon /> */}
                    <CardCvcElement className='paymentinput' />
                </div>
                {tre && <input type='submit' value={`Pay - PKR ${TotalPrice && TotalPrice}`} ref={payBtn} className='paymentbtn' />}
            </form>
        </div>
    </div>
    </>    
  )
}

export default OrderConfirm