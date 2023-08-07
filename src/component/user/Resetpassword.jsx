import React ,{useEffect,useState,useRef}from 'react'
import'./resetpassword.css' 
import {useNavigate} from 'react-router-dom'
import Metatitle from '../title/title'
import {useSelector , useDispatch} from 'react-redux'
import { clearError ,load_user,reset_password} from '../../actions/UserAction'
// import {useAlert} from 'react-alert'
import Loading from '../loading/Loading'
import { useParams } from 'react-router-dom';
function Resetpassword() {
    const navigate=useNavigate();
    // const alert = useAlert()
    const { token } = useParams();
    const dispatch = useDispatch();
    const {error,success,loading} = useSelector((state)=>state.forgetPassword)
    const [password,setpassword]=useState("");
    const [confrimpassword ,setconfrimpassword]=useState("");
    useEffect(()=>{
        if(error){
            // alert.error(error);
            dispatch(clearError());
        }
        if(success){
            // alert.success("Password updated successfully");
            navigate('/login')
        }
    },[dispatch ,error,success])
    
   
    const reset_passwordsubmit = (e)=>{
        e.preventDefault() 
        const myform = new FormData()
        myform.set('password',password);
        myform.set('confrimpassword',confrimpassword)
        dispatch(reset_password(token,myform));
    }
  return (
    <>
    {
        loading ? <Loading/> :(
            <>
<Metatitle title={`resetpassword Profile`}/>
<div className="resetpassword-container" >
    <div className="resetpassword-box">
            <form   className='resetpasswordform' onSubmit={reset_passwordsubmit}>
                <h3 className='resetpasswordheading'>Reset Password</h3>        
                <div className="loginPassword">
                {/* <LockOpenIcon/> */}
                <input type='password' placeholder='New Password' required value={password} onChange={(e)=>setpassword(e.target.value)} />
                </div>
                <div className="loginPassword">
                {/* <LockIcon/> */}
                <input type='password' placeholder='Confrim Password' required value={confrimpassword} onChange={(e)=>setconfrimpassword(e.target.value)} />
                </div>
            <input type='submit' value='change' className='resetpasswordbtn'/>
        </form>
    </div>
</div>
</>
        )
    }
</>
  )
}

export default Resetpassword