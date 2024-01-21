import React from 'react'
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';
import AdminPhoto from '../../Images/AdminImg.jpg';
import '../style/Admindashboard.css'
const AdminDashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout>
        <div className="container-fluid m-1   p-3" >
          <div className="row">
            <div className="col-md-3">
            <AdminMenu/>
            </div>
            <div className="container mt-5 col-md-9">
      <div className="row d-flex justify-content-center">
        <div className="col-md-7">
          <div className="profile-card p-3 py-4">
            <div className="text-center">
              <img
                src={AdminPhoto}
                width="150"
                height={'200px'}
                className="rounded-circle"
                alt="User Profile"
              />
            </div>
            <div className="text-center mt-3">
              <span className="bg-secondary p-1 px-4 rounded text-white">Admin</span>
              <h5 className="AdminName">{auth?.user?.name}</h5>
              <span></span>
              <div className="px-4 mt-1">
                <p className="fonts">
                The Admin for Building Farming Ecommerce Websites is a versatile toolset designed to facilitate the creation and management of online platforms tailored for agricultural businesses. With intuitive interfaces and customizable templates, it enables easy website setup, allowing administrators to feature products, manage inventory, and oversee sales effortlessly. This admin system integrates robust security measures and payment gateways, ensuring safe transactions for buyers and sellers within the farming community. 
                </p>
              </div>
              <ul className="social-list">
                <li>
                  <i className="fa fa-facebook"></i>
                </li>
                <li>
                  <i className="fa fa-dribbble"></i>
                </li>
                <li>
                  <i className="fa fa-instagram"></i>
                </li>
                <li>
                  <i className="fa fa-linkedin"></i>
                </li>
                <li>
                  <i className="fa fa-google"></i>
                </li>
              </ul>
              <div className="buttons">
                <button className="btn btn-outline-primary px-4">{auth?.user?.email}</button>
                <button className="btn btn-primary px-4 ms-3">{auth?.user?.phone}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
          </div>
        </div>
        
        </Layout>
  )
};

export default AdminDashboard;