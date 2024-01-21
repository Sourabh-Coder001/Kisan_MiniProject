import React, { useState } from 'react';
import Layout from "../../Components/Layout/Layout"
import { TextField, Button} from '@mui/material';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const ForgotPassword=()=> {
        const [email, setEmail] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const[answer,setAnswer]=useState('');
     

        const navigate=useNavigate();
      
        // form Function
        const handleSubmit = async(e) => {
          e.preventDefault();
       try{
            const res=await axios.post(`http://localhost:8080/api/forgotPassword`,
            {email,newPassword,answer});
            if(res && res.data.success){
              toast.success(res.data && res.data.message);
              navigate('/login');
            }
            else{
              toast.error(res.data.message)
            }
       }
       catch (error){
         console.log(error);
         toast.error("Somthing went wrong")
       }
        };
  return (
    <Layout title="Forgot Password ">
      <div className="register">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
            <TextField
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              variant="outlined"
              color="secondary"
              label="Email"
              fullWidth
              required
            />
          <TextField
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            variant="outlined"
            color="secondary"
            label="password"
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <TextField
            type="text"
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            variant="outlined"
            color="secondary"
            label="Enter your answer"
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          
          <Button variant="outlined" color="secondary" type="submit">
            Reset
          </Button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword;