import React from 'react';
import {NavLink} from 'react-router-dom';
import '../../Pages/style/AdminMenu.css';
const AdminMenu=()=> {
  return (
    <>
   <div className="list-group m-5
   ">
  <div className="text-center">
  <h2 className='kisan_title' style={{ margin: '0 auto' }}>
  <span style={{ color: '#e30022',fontFamily:'Georgia',fontWeight:700 }}>Admin</span>
  <span style={{ color: '#464e47',fontFamily:'Georgia',fontWeight:700 }}> Panel</span>
</h2>
<table className='table_width'>
  <tr>
    <td>
      <NavLink to="/dashboard/admin/createcategory" className="list-group-item">Create Category</NavLink>
    </td>
  </tr>
  <tr>
    <td>
      <NavLink to="/dashboard/admin/createproduct" className="list-group-item ">Create Products</NavLink>
    </td>
  </tr>
  <tr>
    <td>
      <NavLink to="/dashboard/admin/products" className="list-group-item ">Products</NavLink>
    </td>
  </tr>
  <tr>
    <td>
      <NavLink to="/dashboard/admin/orders" className="list-group-item ">Orders</NavLink>
    </td>
  </tr>
</table>
  </div>
 
</div>
    </>
  )
}

export default AdminMenu;