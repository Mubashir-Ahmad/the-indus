import React from 'react'
import './footer.css'
import { NavLink } from 'react-router-dom'
function Footer() {
  return (
    <>
    <div className="setion">
        <div className="our-servicess">
      <div className="sevice-content ">
          <h5 className='section-tittle'>Opening Time</h5>
          <ul className='ulfooter'>
            <li>Monday - Friday</li>
            <li>Lunch 12:00-14:45</li>            
            <li>Diner 17:45-00:00</li>            
          </ul>
          <ul className='ulfooter'>
            <li>Saturday - Sunday</li>
            <li>Lunch 12:00-14:45</li>            
            <li>Diner 17:45-23:00</li>            
          </ul>
          <ul className='ulfooter'>
            <li>We are open on Bank Holidays</li>
            </ul>
        </div>
        <div className="sevice-content">
          <h5 className='section-tittle'>Visit Us</h5>
          <ul className='ulfooter' style={({padding:'10px 50px'})}>
            <li>Cell:<NavLink to='/' className='navlink'>(+41) 22 786 00 00</NavLink></li>
            <li>Web:<NavLink to='/' className='navlink'> www.theindus.ch</NavLink></li>
            <li>Rue Docteur-Alfred-Vincent 13, 1201 Genève, Switzerland</li>
          </ul>
        </div>
        <div className="sevice-content">
          <h5 className='section-tittle'>Located us</h5>
          <p className='section-paragarph'><iframe src="https://maps.google.com/maps?width=674&amp;height=383&amp;hl=en&amp;q=The university of lahore&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe></p>
        </div>
      </div>
      </div>
      <div className='footer'>
      <p className='paragraph'> The Indus Resturent &copy; All Rights Reserved </p>
      </div>
      
      </>
  )
}

export default Footer