import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearError, load_user, login, register } from '../../actions/UserAction';
import Metatitle from '../title/title';
import './login.css';

function Login({ location}) {
  const navigate = useNavigate();
  // const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading, user } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switchTab = useRef(null);
  const id = useLocation();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [filedata, setFileData] = useState();
  const [avatarPreview, setAvatarPreview] = useState('');

  const redirect = id.state ? '/shipping' : '/';

  useEffect(() => {
    
    if (error) {
      // alert.error(error);
      dispatch(clearError());
    }


  }, [dispatch, error]);

  const switchtab = (e, tab) => {
    if (tab === 'login') {
      switchTab.current.classList.add('shifttoNeutral');
      switchTab.current.classList.remove('shifttoRight');

      registerTab.current.classList.remove('shifttoNeutralForm');
      loginTab.current.classList.remove('shifttoLeft');
    } else if (tab === 'register') {
      switchTab.current.classList.add('shifttoRight');
      switchTab.current.classList.remove('shifttoNeutral');

      registerTab.current.classList.add('shifttoNeutralForm');
      loginTab.current.classList.add('shifttoLeft');
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    // Check if the login was successful and user is authenticated
   
  };
  console.log('1  login authentication',user)
  if (user && user.user ) {
    // Redirect based on the user's role
    if (user.user.role === 'admin') {
      navigate('/admindashbord');
    } else if (user.user.role === 'manager') {
      navigate('/managerdashbord');
    } else if (user.role === 'user') {
      navigate('/');
    } else if (user.role === 'rider') {
      navigate('/riderdash');
    } 
  }
  const registerSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);
    dispatch(register(formData));
  };

  const registerDateChange = (e) => {
    setFileData(e.target.files[0]);
  };

  return (
    <>
       <Metatitle title={`Login user`} />
      <div className="Login-container">
        <div className="Login-box">
          <div>
            <div className="login-toggle">
              <p onClick={(e) => switchtab(e, 'login')}>LOGIN</p>
              <p onClick={(e) => switchtab(e, 'register')}>REGISTER</p>
            </div>
            <button ref={switchTab}></button>
          </div>
          <form className="loginform" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            {/* <MailOutlineIcon /> */}
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            {/* <LockOpenIcon /> */}
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <Link to="/password/forget">Forget Password</Link>
                        <input type="submit" value="Login" className="loginbtn" />
                    </form>
          <form className="signupform" ref={registerTab} onSubmit={registerSubmit} enctype="multipart/form-data">
                        <div className="signupname">
                            {/* <FaceIcon /> */}
                            <input
                                type="text"
                                // name="name"
                                value={name}
                                placeholder="Name"
                                required
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className="signupemail">
                            {/* <MailOutlineIcon /> */}
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className="signupassword">
                            {/* <LockOpenIcon /> */}
                            <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                required
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <div id="registerimage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file" name="avatar"  />
                        </div>
                        <input type="submit" value="register" className="siginbtn" />
                    </form>
        </div>
      </div>
    </>
  );
}

export default Login;
