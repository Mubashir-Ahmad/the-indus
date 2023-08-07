import React ,{useEffect,useState,useRef}from 'react'
import'./updatepassword.css' 
import {useNavigate} from 'react-router-dom'
import Metatitle from '../title/title'
import {useSelector , useDispatch} from 'react-redux'
import { clearError ,load_user,update_password} from '../../actions/UserAction'
// import {useAlert} from 'react-alert'
import Loading from '../loading/Loading'
function Updatepassword() {
    const navigate=useNavigate();
    // const alert = useAlert()
    
    const dispatch = useDispatch();
    const {error,isUpdated,loading} = useSelector((state)=>state.profile)
    const [oldpassword,setoldpassword]=useState("");
    const [newpassword,setnewpassword]=useState("");
    const [confirmpassword ,setconfirmpassword]=useState("");
    useEffect(()=>{
        if(error){
            // alert.error(error);
            dispatch(clearError());
        }
        if(isUpdated){
            // alert.success("Password updated successfully");
            navigate('/account')
            dispatch({
                type:'updated_password_reset'
            });
        }
    },[dispatch ,error,isUpdated])
    
   
    const update_passwordsubmit = (e)=>{
        e.preventDefault() 
        const myform = new FormData()
        myform.set('oldpassword',oldpassword);
        myform.set('newpassword',newpassword);
        myform.set('confirmpassword',confirmpassword)
        dispatch(update_password(myform));
    }
   
  return (
    <>
        {
            loading ? <Loading/> :(
                <>
    <Metatitle title={`Updatepassword Profile`}/>
    <div className="updatepassword-container" >
        <div className="updatepassword-box">
                <form   className='updatepasswordform' onSubmit={update_passwordsubmit}>
                    <h3 className='updatepasswordheading'>Update Password</h3>        
                    <div className="loginPassword">
                    {/* <VpnKeyIcon/> */}
                    <input type='password' placeholder='Old Password' required value={oldpassword} onChange={(e)=>setoldpassword(e.target.value)} />
                    </div>
                    <div className="loginPassword">
                    {/* <LockOpenIcon/> */}
                    <input type='password' placeholder='New Password' required value={newpassword} onChange={(e)=>setnewpassword(e.target.value)} />
                    </div>
                    <div className="loginPassword">
                    {/* <LockIcon/> */}
                    <input type='password' placeholder='Confrim Password' required value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)} />
                    </div>
                <input type='submit' value='change' className='updatepasswordbtn'/>
            </form>
        </div>
    </div>
    </>
            )
        }
    </>
  )
}

export default Updatepassword