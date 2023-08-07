import React, { useEffect } from 'react'
import './profile.css'
import Metatitle from '../title/title'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Loading from '../loading/Loading';
import { useNavigate } from 'react-router-dom';
function Profile() {
    const navigate =useNavigate();
    const {isAuthenticated,error,user ,loading}=useSelector((state)=>state.user)
    console.log("dfghjkhgfdsdfgh",useSelector((state)=>state.user))
    useEffect(()=>{
        if(isAuthenticated===false){
            navigate('/login')
        }
    },[isAuthenticated])
  return (
    <>
    {
        loading ?(
            <Loading/>
        ):(
            <>
    <Metatitle title={`${user.user.name}'s Profile`}/>
    <div className="profile-container">
        <div>
            <h1>My Profile</h1>
            {/* <img src="mongodb+srv://mubbashirahmad:ahmad1122@the-indus.d06tuep.mongodb.net/the-indus?retryWrites=true&w=majority/the-indus/649ac82ca09f14eca442f563" alt="Avatar" /> */}
            <img src={user.user.avatar} alt={user.user.name}/>
            <Link to='/me/update'>Edit Profile</Link>
        </div>
        <div>
            <div className='profile-box'>
            <h4>Name</h4>
            <p>{user.user.name}</p>
            </div>
            <div className='profile-box'>
                <h4 >Email</h4>
                <p>{user.user.email}</p>
            </div>
            <div className='profile-box'>
                <h4>Joined on</h4>
                <p>{String(user.user.createdAt).substring(0,10)}</p>
            </div>
            <div>
                <Link to='/myorders'>My Order</Link>
                <Link to='/password/update'>Change password</Link>
            </div>
            </div>
        </div>
    </>
        )
    }
    </>
  )
}

export default Profile