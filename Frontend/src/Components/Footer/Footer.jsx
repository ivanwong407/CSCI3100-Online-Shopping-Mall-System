import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import email_icon from '../Assets/email.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" height="100" />
        <p>CU@ReShop</p>
      </div>
      <ul className="footer-links">
        <li>Project Info</li>
        <li>About Us</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container"></div>
        <img src={email_icon} alt="" height="30" />
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
