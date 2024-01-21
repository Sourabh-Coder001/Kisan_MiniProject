import React from 'react'
import { NavLink } from 'react-router-dom';

const UserMenu=()=> {
 
  return (
    <>
     <div className="list-group">
  <div className="text-center">
    <h2 style={{
      fontSize:'45px',
      fontFamily:'inherit',
      color:'#a0277f',
      fontWeight:'bold'
    }}>Dashboard</h2>
  <NavLink 
  to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
  <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
  </div>
</div>
    </>
  )
}

export default UserMenu;