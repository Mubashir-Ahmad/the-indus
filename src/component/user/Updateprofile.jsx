import React ,{useEffect,useState,useRef}from 'react'
import'./update.css'
import {useNavigate} from 'react-router-dom'
import Metatitle from '../title/title'
import Profile from '../../image/Profile.png'
import {useSelector , useDispatch} from 'react-redux'
import { clearError ,load_user,update_profile} from '../../actions/UserAction'
// import {useAlert} from 'react-alert'
import Loading from '../loading/Loading'
function Updateprofile() {
    const navigate=useNavigate();
    // const alert = useAlert()
    // const updateFormRef = useRef(null);
    
    const dispatch = useDispatch();
    const {user}=useSelector((state)=>state.user)
    
    const {error,isUpdated,loading} = useSelector((state)=>state.profile)
    const [avatar, setAvatar] = useState("");
    const[avatarPreview,setAvatarPreview]=useState(Profile)
    const [name,setName]=useState("")
    const[email,setEmail]=useState("")
    const [filedata, setFileData] = useState();
    useEffect(()=>{
        if(user){
            console.log(user)
            setName(user.user.name);
            setEmail(user.user.email);
            setAvatarPreview(user.user.avatar);
        }
        if(error){
            // alert.error(error);
            dispatch(clearError());
        }
        if(isUpdated){
            // alert.success("Profile updated successfully");
            dispatch(load_user());
            navigate('/account')
            dispatch({
                type:'updated_profile_reset'
            });
        }
    },[dispatch ,error,user,isUpdated])
    
   
    const updateprofilesubmit = (e)=>{
        e.preventDefault() 
        const myform = new FormData()
        myform.append('name',name);
        myform.append('email',email);
        myform.append('avatar',filedata)
        console.log('Form Data:', myform);
        console.log('File Data:', filedata);
        dispatch(update_profile(myform));
    }
    const updateprofiledatechange = (e) => {
        console.log('sdsdsdsdsdasaeer',e.target.files[0])
        setFileData(e.target.files[0]);
      };
  return (
    <>
        {
            loading ? <Loading/> :(
                <>
    <Metatitle title={`Update Profile`}/>
    <div className="update-container" >
        <div className="update-box">
                <form   className='updateform' encType='multipart/form-data' onSubmit={updateprofilesubmit}>
                    <h3 className='updateheading'>Update</h3>        
                <div className="updatename">
                    {/* <FaceIcon /> */}
                    <input type='text' name='name' value={name} placeholder='Name' required onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="updateemail">
                {/* <MailOutlineIcon/> */}
                    <input type='email' placeholder='Email' required name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                    <div id='updateimage'>
                    <img src={avatarPreview} alt='Avatar Preview' />
                    <input type='file' name='avatar' src={avatar} accept='image/*' onChange={updateprofiledatechange} />
                </div>
                <input type='submit' value='update' className='updatebtn'/>
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


