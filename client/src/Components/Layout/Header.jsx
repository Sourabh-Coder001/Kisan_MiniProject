import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory  from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { GiLindenLeaf } from "react-icons/gi";
import { Badge } from "antd";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhonelinkRingIcon from '@mui/icons-material/PhonelinkRing';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const twitterLink = 'https://twitter.com/example';
  const instagramLink = 'https://instagram.com/__sourabh_skater__09?igshid=NzZlODBkYWE4Ng==';
  const facebookLink = 'https://www.facebook.com/sourabh.lakade.3?mibextid=ZbWKwL';
  const whatsappLink = 'https://wa.me/9370171615'; 
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart]=useCart();
  const categories=useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h5 style={{ marginRight: '20px' }}><PhonelinkRingIcon /> Toll Free:- 808080 555</h5>
          <h1 className='kisan_title' style={{ marginLeft:'350px' }}>
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary"  >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
            <GiLindenLeaf/> Kisan Mart
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
           <SearchInput/>
              <li className="nav-item">
                <NavLink to="/" className="navstyle nav-link ">
                 Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="http://localhost:4000/" className="navstyle nav-link ">
                 Blog
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="navstyle nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="navstyle dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <ul className="nav">
      <li className="nav-item dropdown">
        <Link
          className="navstyle nav-link dropdown-toggle"
          href="/#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
        >
          HELP
        </Link>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <NavLink to="/trainlist" className="navstyle dropdown-item">
              Trains
            </NavLink>
          </li>
          <li>
            <NavLink to="/kisanyojana" className="navstyle dropdown-item">
              Yojana
            </NavLink>
          </li>
          <li>
            <NavLink to="/Contact" className="navstyle dropdown-item">
              Contact
            </NavLink>
          </li>
        </ul>
      </li>
    </ul>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="navstyle button-login nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="navstyle button-login nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="navstyle dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="navstyle dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                <NavLink to="/cart" className="navstyle nav-link">
                  
                <ShoppingCartIcon/>    Cart 
                
                </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>
    </>
  );
};

export default Header;
