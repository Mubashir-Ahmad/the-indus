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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      toast.success('🦄User Created Successfully!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        dispatch({ type:'admin_register_reset' });
      navigate("/admindashbord");
      
    }
  }, [dispatch,iscreated,toast]);

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
                    <i class="fa-solid fa-user"></i>  
                    <input type='text' name='name' value={name} placeholder='Name' required   onChange={(e) => setName(e.target.value)} />
                    {/* <input type='text' placeholder='Name' required onChange={registerdatechange} /> */}
                </div>
                <div className="signupemail">
                <i class="fa-solid fa-envelope"></i>
                    <input type='email' placeholder='Email' required name='email' value={email}   onChange={(e) => setemail(e.target.value)} />
                </div>
                <div className="signupassword">
                <i class="fa-sharp fa-solid fa-key"></i>
                    <input type='password' name='password' value={password} placeholder='Password' required   onChange={(e) => setpassword(e.target.value)} />
                </div>
                <div>
                <i class="fa-solid fa-pen-ruler"></i>
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
                <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        />
    </Fragment>
  );
};

export default Newuser;
