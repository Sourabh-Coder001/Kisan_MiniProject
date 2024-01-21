import React,{useState,useEffect} from 'react'
import Layout from '../../Components/Layout/Layout'
import UserMenu from '../../Components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import axios from 'axios';
import '../style/profile.css';

const Profile = () => {
    const [auth,setAuth]=useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

//get user data
useEffect(()=>{
    const {email,name,phone,address}=auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
},[auth?.user]);

    // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {const {data}=await axios.put(`${process.env.REACT_APP_API}/api/profile`,
     {
        name,
        email,
        password,
        phone,
        address,
        
      });
    if(data?.error){
      toast.error(data?.error);
    }
    else{
      setAuth({...auth,user:data?.updatedUser});
      let ls =localStorage.getItem("auth");
      ls=JSON.parse(ls);
      ls.user=data.updatedUser;
      localStorage.setItem("auth",JSON.stringify(ls));
      toast.success("Successfully Updated");
    }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };



  return (
    <Layout title={"Your Profile"}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9">
                <form onSubmit={handleSubmit}>
                <div className="page-content page-container" id="page-content">
      <div className="padding" style={{paddingBottom:'100px',paddingTop:'100px'}}>
        <div className="row container d-flex justify-content-center">
          <div className="col-xl-6 col-md-12">
            <div className="card user-card-full">
              <div className="row m-l-0 m-r-0">
                <div className="col-sm-4 bg-c-lite-green user-profile">
                  <div className="card-block text-center text-white">
                    <div className="m-b-25">
                      <img
                        src="https://img.icons8.com/bubbles/100/000000/user.png"
                        className="img-radius"
                        alt="User-Profile-Image"
                      />
                    </div>
                    <h6 className="f-w-600">
                      <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
    
              autoFocus
            />
                    </h6>
                    <p>User</p>
                    <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="card-block">
                    <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Update Profile</h6>
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400"><input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
             
              disabled
            /></h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Address</p>
                        <h6 className="text-muted f-w-400"><input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
             
            /></h6>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Password</p>
                        <h6 className="text-muted f-w-400"><input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              
            /></h6>
                      </div>
                      <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Phone</p>
                        <h6 className="text-muted f-w-400"><input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
             
            /></h6>
                      </div>
                    </div>
                    <ul className="social-link list-unstyled m-t-40 m-b-10">
                      <li>
                        <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true">
                          <i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true">
                          <i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true">
                          <i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i>
                        </a>
                      </li>
                      <button type="submit" className="btn btn-primary">
            Update
          </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </form>
                </div>
            </div>
        </div>
        
        </Layout>
  )
}

export default Profile