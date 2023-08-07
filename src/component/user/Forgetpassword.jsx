import React ,{useEffect,useState}from 'react'
import'./forgetpassword.css'
import {useNavigate} from 'react-router-dom'
import Metatitle from '../title/title'
// import MailOutlineIcon from '@material-ui/icons/MailOutline'
import {useSelector , useDispatch} from 'react-redux'
import {clearError,forget_password} from '../../actions/UserAction'
// import {useAlert} from 'react-alert'
import Loading from '../loading/Loading'
function Updateprofile() {
    const navigate=useNavigate();
    // const alert = useAlert()
    const dispatch = useDispatch();
    const {error,message,loading} = useSelector((state)=>state.forgetPassword)
    const[email,setEmail]=useState("")
    useEffect(()=>{
        if(error){
            // alert.error(error);
            dispatch(clearError());
        }
        if(message){
            // alert.success(message);
        }
    },[dispatch ,error,message])   
    const forgetpasswordsubmit = (e)=>{
        e.preventDefault() 
        const myform = new FormData()
        myform.set('email',email);
        dispatch(forget_password(myform));
    }

  return (
    <>
        {
            loading ? <Loading/> :(
                <>
    <Metatitle title={`Forget password`}/>
    <div className="forget-container" >
        <div className="forget-box">
                <form   className='forgetform' onSubmit={forgetpasswordsubmit}>
                    <h3 className='forgetheading'>Forget password</h3>        
                <div className="updateemail">
                {/* <MailOutlineIcon/> */}
                    <input type='email' placeholder='Email' required name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <input type='submit' value='send' className='forgetbtn'/>
            </form>
        </div>
    </div>
    </>
            )
        }
    </>
  )
}

export default Updateprofile


