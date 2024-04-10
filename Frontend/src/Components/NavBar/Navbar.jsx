import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import profile from '../Assets/profile.png'
import { Link } from 'react-router-dom'
import search from '../Assets/search.png'


const Navbar = () => {

    const [menu,setMenu] = React.useState("browse");

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" 
                width="100" 
                height="100"/>
                <p>CU@ReShop</p>
            </div>
            <ul className="nav-menu">
                <li onClick={()=>{setMenu("browse")}}><Link style={{ textDecoration: 'none'}} to='/'>Browse</Link>{menu==="browse"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("messages")}}><Link style={{ textDecoration: 'none'}} to='/messages'>Messages</Link>{menu==="messages"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("listing")}}><Link style={{ textDecoration: 'none'}} to='/listing'>Listing</Link>{menu==="listing"?<hr/>:<></>}</li>
                <li onClick={()=>{setMenu("cart")}}><Link style={{ textDecoration: 'none'}} to='/cart'>Cart</Link>{menu==="cart"?<hr/>:<></>}</li>
            </ul>
            <div className="nav-search" onClick={()=>{setMenu("products")}}>
                <Link to='/products'>
                    <img src={search} alt="" width="30" height="30"/>
                </Link>{menu==="products"?<hr/>:<></>}
            </div>
            <div className="nav-profile">
                <Link to='profile'>
                    <img src={profile} alt="" width="30" height="30"/>
                </Link>
            </div>
        </div>
    )
}

export default Navbar