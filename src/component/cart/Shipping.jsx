import React ,{useState ,useRef} from 'react'
import './Shipping.css'
import { useSelector ,useDispatch } from 'react-redux'
import Metatitle from "../title/title"
// import PinDropIcon from '@material-ui/icons/PinDrop'
// import HomeIcon from '@material-ui/icons/Home'
// import PhoneIcon from '@material-ui/icons/Phone'
import { useNavigate } from 'react-router-dom'
import { shippingInfo } from '../../actions/CartAction'
import './orderconfirm.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios'
// import VpnKeyIcon from '@material-ui/icons/VpnKey'
// import CreditCardIcon from '@material-ui/icons/CreditCard'
import './Payment.css'
import {CardNumberElement , CardCvcElement ,CardExpiryElement, useStripe,useElements} from '@stripe/react-stripe-js'
import { clearError,createorder } from '../../actions/OrderAction'
function Shipping() {
    const navigate = useNavigate();
    const {shippinginfo, cartitems}= useSelector((state)=>state.cart)
    const [orderinfo, setOrderInfo] = useState(""); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [address , setAddress]= useState(shippinginfo.address)
    console.log( useState(shippinginfo.address));
    const {user} =useSelector((state)=>state.user)
    const elements = useElements();
    const payBtn = useRef(" ");
    const stripe = useStripe();
    const [tre, setTre] = useState(false);
    const dispatch = useDispatch();
    const subtotal = cartitems.reduce(
        (acc,item)=>acc + item.quantity * item.price, 0
    );
    const shippingCharges = subtotal > 1000 ? 0 : 200
    const tax = subtotal*0.18;
    const TotalPrice=subtotal + tax + shippingCharges;
    const addresss = `${shippinginfo.address},${shippinginfo.city},${shippinginfo.state},${shippinginfo.pincode},${shippinginfo.country},`
    const paymentprocess =(e) =>{
        const data={
            subtotal,shippingCharges,tax,TotalPrice
        };
        sessionStorage.setItem("orderinfo",JSON.stringify(data));
        setOrderInfo(data);
        setTre(true);
        e.preventDefault();
        if(phoneNo.length < 10 || phoneNo.length>10){
            return;
        }
        dispatch(
            shippingInfo({address,city,pincode,phoneNo})
        )
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
                // alert.error(result.error.message);
            }
            else{
                console.log('hello',result.paymentIntent.status)
                if(result.paymentIntent.status === 'succeeded'){
                    order.paymentInfo ={
                        id: result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }
                    dispatch(createorder(order))
                    // alert.success("ok ho geya")
                    navigate('/success')
                }
                else{
                    // alert.error("Thers some issue while processing payment");
                }
            }
        }
        catch(error){
            payBtn.current.disabled=false;
            // alert.error(error.response.data.message);
        }
    }
    // const {shippinginfo} = useSelector((state)=>state.cart);
   
    const [city , setCity]= useState(shippinginfo.city)
    const [phoneNo , setPhoneNo]= useState(shippinginfo.phoneNo)
    const [pincode , setPinCode]= useState(shippinginfo.pincode)
    const shippingsubmit=(e)=>{
        e.preventDefault();
        if(phoneNo.length < 10 || phoneNo.length>10){
            // alert.error("Phone Number ust be 10 digits")
            return;
        }
        dispatch(
            shippingInfo({address,city,pincode,phoneNo})
        )
        // navigate('/order/confirm')s
    }
  return (
    <>
            <Metatitle title="Shipping Details" />
            <div className="boxx">
            <div className="shippingcontainer">
            <div className="shippingbox">
                <h2 className="shippingheading">Shipping Details</h2>
                <form className='shippingform'
                encType='multipart/form-data'
                onSubmit={submithandler}>
                    <div>
                        {/* <HomeIcon /> */}
                        <input type='text' placeholder='Address' required value={address} onChange={(e)=> setAddress(e.target.value)} />
                    </div>
                    <div>
                        {/* <PinDropIcon /> */}
                        <input type='number' placeholder='Postal code' required value={pincode} onChange={(e)=> setPinCode(e.target.value)} />
                    </div>
                    <div>
                        {/* <PhoneIcon /> */}
                        <input type='number' placeholder='Phone Number' required value={phoneNo} onChange={(e)=> setPhoneNo(e.target.value)} size="10" />
                    </div>                  
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
        <div className="order-confrim">
        <div className="order-page">
            <div className="order-area">
            <h6>Order Summary</h6>
        </div>
        <div className="dropdown-container">
  <button
    className="dropdown-button"
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  >
    Cart Items <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
  </button>
  {isDropdownOpen && (
    <div className="dropdown-content">
      <div className="conrfirm-contaiiner">
        {cartitems && cartitems.map((item) => (
          <div key={item.product}>
            <img src={item.image} alt="Product" />
            <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
            <span>
              {item.quantity} X PKR{item.price} ={" "}
              <b>PKR{item.price * item.quantity}</b>
            </span>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

        <div>
         <div className='order-suummary'>
         
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
    </div>
        </div>
            </div>
    </>
  )
}

export default Shipping
