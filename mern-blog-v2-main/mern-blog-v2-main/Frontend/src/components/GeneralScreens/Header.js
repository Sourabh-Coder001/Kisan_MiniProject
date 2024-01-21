import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate,NavLink } from "react-router-dom";
import SearchForm from './SearchForm';
import '../../Css/Header.css'
import { RiPencilFill } from 'react-icons/ri'
import { FaUserEdit } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { BsBookmarks } from 'react-icons/bs'
import SkeletonElement from '../Skeletons/SkeletonElement';
import { AuthContext } from '../../Context/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Header = () => {
    const bool = localStorage.getItem("authToken") ? true : false
    const [auth, setAuth] = useState(bool)
    const { activeUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const twitterLink = 'https://twitter.com/example';
  const instagramLink = 'https://instagram.com/__sourabh_skater__09?igshid=NzZlODBkYWE4Ng==';
  const facebookLink = 'https://www.facebook.com/sourabh.lakade.3?mibextid=ZbWKwL';
  const whatsappLink = 'https://wa.me/9370171615'; 

    useEffect(() => {

        setAuth(bool)
        setTimeout(() => {
            setLoading(false)
        }, 1600)

    }, [bool])


    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate('/')
    };
    
      const handleExternalLink = (url) => {
        window.open(url, '_blank'); // Opens the link in a new tab
      };

    return (
        <div>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: 'white' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h1 className='kisan_title' style={{ marginLeft: '600px' }}>
        <span style={{ color: 'orange', fontFamily: 'Georgia', fontWeight: 700 }}>Kisan</span>
        <span style={{ color: 'green', fontFamily: 'Georgia', fontWeight: 700 }}> Mart</span>
      </h1>
    </div>
    <div style={{ display: 'flex',marginRight:'20px' }}>
          <h1 style={{ marginLeft: '20px' }}> <a href={twitterLink}><TwitterIcon /></a>  <a href={instagramLink}><InstagramIcon /></a>       <a href={facebookLink}><FacebookIcon /></a>
          <a style={{marginLeft:'10px'}} href={whatsappLink}><WhatsAppIcon /></a></h1>
        </div>
  </div>
  <div>
    <header>
      <div className="averager">
        <Link to="/"  className="logo">
          <h5>KISAN MART </h5>
        </Link>
        <SearchForm />
        <button className='EcomButton' onClick={() => handleExternalLink('http://localhost:3000/')}>
        Get Products
      </button>
        <div className='header_options'>
          {auth ? (
            <div className="auth_options">
              <Link className='addStory-link' to="/addstory"><RiPencilFill /> Add Story </Link>
              <Link to="/readList" className='readList-link'>
                <BsBookmarks />
                <span id="readListLength">
                  {activeUser.readListLength}
                </span>
              </Link>
              <div className='header-profile-wrapper '>
                {loading ? <SkeletonElement type="minsize-avatar" /> : (
                  <img src={`/userPhotos/${activeUser.photo}`} alt={activeUser.username} />
                )}
                <div className="sub-profile-wrap  ">
                  <NavLink className='profile-link' to="/profile"  > <FaUserEdit />  Profile </NavLink>
                 
                  <button className='logout-btn' onClick={handleLogout}> <BiLogOut />  Logout </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="noAuth_options">
           
         
              <NavLink className='login-link' to="/login"> Login </NavLink>
              <NavLink className='register-link' to="/register"> Register</NavLink>
            </div>
          )}
        </div>
      </div>
    </header>
  </div>
</div>
 

    )
}

export default Header;
