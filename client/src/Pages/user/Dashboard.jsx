import React from 'react';
import Layout from '../../Components/Layout/Layout';
import UserMenu from '../../Components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import '../style/Dashboard.css';

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <div>
      <Layout title="Dashboard - Kisan Mart">
        <div className="container-fluid mt-3 p-3 dashboard">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9" style={{marginLeft:'40rem',marginTop:'-10rem'}}>
              <div className="row py-5 px-4">
                <div className="col-md-5 mx-auto">
                <div className="card shadow rounded overflow-hidden" style={{
  background: 'rgb(0,209,34)',
  backgroundImage: 'linear-gradient(347deg, rgba(0,209,34,1) 0%, rgba(204,213,93,1) 68%)',
}}>
                    <div className="card-body text-center">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/9576/9576233.png"
                        alt="Profile"
                        width="130"
                        className="rounded-circle mb-4 img-thumbnail"
                      />
                      <h3 className="card-title mb-2" style={{fontSize:'45px',fontFamily:'sans-serif',
                    fontWeight:'bold'}}>{auth?.user?.name}</h3>
                      <p className="card-text font-italic mb-0"
                      style={{fontSize:'30px',
                      fontFamily:'serif',
                      fontWeight:'bold'}}>{auth?.user?.email}</p>
                      <p className="card-text font-italic mb-0"
                      style={{fontSize:'25px',
                      fontFamily:'serif',
                      fontWeight:'bold'}}>{auth?.user?.phone}</p>
                      <p className="card-text font-italic mb-0"
                      style={{fontSize:'25px',
                      fontWeight:'bold',
                      fontFamily:'serif'}}>User</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
