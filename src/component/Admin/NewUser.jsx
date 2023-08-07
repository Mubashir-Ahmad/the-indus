import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, createProduct } from "../../actions/productAction";
import Metatitle from "../title/title";
// import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { adminregister } from "../../actions/UserAction";
import SideBar from "./Sidebar";
import { newProductReducer } from "../../reducer/productReducer";
import { useNavigate } from "react-router-dom";
// import MailOutlineIcon from '@material-ui/icons/MailOutline'
// import LockOpenIcon from '@material-ui/icons/LockOpen'
// import FaceIcon from '@material-ui/icons/Face'
const Newuser = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { iscreated } = useSelector((state) => state.user);
  console.log( useSelector((state) => state.user));
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [role, setrole] = useState("");
  const [password, setpassword] = useState("");
  const [filedata, setFileData] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [avatar, setAvatar] = useState('');
  const[avatarPreview,setAvatarPreview]=useState()

  useEffect(() => {
    if(!isAuthenticated)
    {
      navigate('/login')
    }
    if (iscreated) {
      navigate("/admindashbord");
      dispatch({ type:'admin_register_reset' });
    }
  }, [dispatch,  navigate,isAuthenticated,iscreated]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("role", role);
    myForm.append('avatar', filedata);

   
    dispatch(adminregister(myForm));
  };

  const registerdatechange = (e) => {
    setFileData(e.target.files[0]);
  };
  const roles = [
   "user",
   "rider",
   "admin",
   "manger"
  ];
  return (
    <Fragment>
      <Metatitle title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
        <form className="createProductForm"encType="multipart/form-data"onSubmit={createProductSubmitHandler}>
            <h1>Create User</h1>
            {/* <form className='signupform' ref={registerTab} encType='mutipart/form-data' onSubmit={registersubmit}> */}
                <div className="signupname">
                    {/* <FaceIcon /> */}
                    <input type='text' name='name' value={name} placeholder='Name' required   onChange={(e) => setName(e.target.value)} />
                    {/* <input type='text' placeholder='Name' required onChange={registerdatechange} /> */}
                </div>
                <div className="signupemail">
                {/* <MailOutlineIcon/> */}
                    <input type='email' placeholder='Email' required name='email' value={email}   onChange={(e) => setemail(e.target.value)} />
                </div>
                <div className="signupassword">
                    {/* <LockOpenIcon/> */}
                    <input type='password' name='password' value={password} placeholder='Password' required   onChange={(e) => setpassword(e.target.value)} />
                </div>
                <div>
              {/* <AccountTreeIcon /> */}
              <select
                value={role}
                onChange={(e) => setrole(e.target.value)}
              >
                <option value="">Choose role</option>
                {roles.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
                <div id='registerimage'>
                    <img src={avatarPreview} alt='Avatar Preview' />
                    <input type='file' name='avatar' src={avatar} accept='image/*' onChange={registerdatechange} />
                </div>
                <input type='submit' value='register' className='siginbtn'/>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Newuser;
