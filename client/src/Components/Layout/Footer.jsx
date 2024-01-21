import React from 'react'
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className='footer'>

        <h4 className='text-center'>All rights reserved &copy; Kisan Mart</h4>
        <p className="text-center mt-2">
        <Link to='/about'>About</Link>
        |
        <Link to='/contact'>Contact</Link>
        
     
        </p>
    </div>
  )
}

export default Footer; 