import React, { useState,useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import { useCart } from '../context/Cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import EmptyCard from './user/EmptyCard';
import { Button } from '@mui/material';

const CartUserName={
    textAlign:'Center',
    padding:2,
    fontWeight:'Bold',
    fontFamily:'Times New Roman',
    fontSize:'45px'

}

const CartLength={
    textAlign:'center',
    fontWeight:'Bold',
    fontFamily:'Times New Roman',
    fontSize:'25px'
}  

const CartProductName={
    textAlign:'center',
    textWeight:'Bold',
    fontSize:'25px',
    fontFamily:'Times New Roman',
    color:'#F13908'
}
const CartDesProduct={
    fontSize:'18px',
    fontFamily:'Times New Roman',
    color:'#050404'
}
const CartPrice={
    fontSize:'28px',
    textWeight:'Bold',
    fontFamily:'Times New Roman',
    color:'#255A31'
}
const SummaryStyle={
    fontSize:'38px',
    textWeight:'Bold',
    fontFamily:'Times New Roman',
    color:'#255A31'   
}
const TotalStyle={
    fontSize:'18px',
    textWeight:'Bold',
    fontFamily:'Times New Roman',
    color:'#4E858C'
}
const PriceStyle={
    fontSize:'38px',
    textWeight:'Bold',
    fontFamily:'Times New Roman',
    color:'#EE9224'
}
const CurrentStyle={
    fontSize:'28px',
    textWeight:'Bold',
    fontFamily:'Times New Roman',
    color:'#52D3CB'
}
const AddressStyle={
    fontSize:'22px',
    textWeight:'Bold',
    fontFamily:'Times New Roman',
    color:'#193056'
}

const Cartpage = () => {
    const [auth,setAuth]=useAuth();
    const[cart,setCart]=useCart();
    const[clientToken,setClientToken]=useState("");
    const [instance,setInstance]=useState(null);
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total +  item.price;
            });
            return total.toLocaleString("en-US",);
        } catch (error) {
            console.log(error);
            return "Error"; // Return a default value if there's an error
        }
    }

    //delete item
    const removeCartItem=(pid)=>{
        try{
        let myCart=[...cart];
        let index=myCart.findIndex((item)=>item._id===pid);
        myCart.splice(index,1);
        setCart(myCart);
        localStorage.setItem("cart",JSON.stringify(myCart));
    }
    catch(error){
        console.log(error);
    }

    };

    // get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/braintree/token`);
            setClientToken(data?.clientToken || ""); // Set token or an empty string
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, [auth?.token]);


    //handel payment
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`http://localhost:8080/api/braintree/payment`, {
                nonce,
                cart
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully");
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Payment Failed");
        }
    }
  return (
    <Layout>
        {cart.length ?
        <div className="conatiner">
            <div className="row">
                <div className="col-md-12">
                    <h1 style={CartUserName}>{`${auth?.token && auth?.user?.name}`}</h1>
                    <h4 style={CartLength}>
  {cart?.length > 0 ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please login to check out"}` : "Your Cart is Empty"}
</h4>

                    </div> 
            </div>
            <div className="row">
                <div className="col-md-8">
                    {cart?.map((p)=>(
                        <div className="row mb-2 p-3 card flex-row">
                            <div className="col-md-4">
                            <img
                  src={`http://localhost:8080/api/productphoto/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  width="100px"
                  height="120px"
                />
                            </div>
                            <div className="col-md-8">
                                <p style={CartProductName}>{p.name.substring(0,60)}...</p>
                                <p style={CartDesProduct}>{p.description.substring(0,120)}...</p>
                                <p style={CartPrice}>Price : ₹ {p.price}</p>
                                <Button variant='contained' style={{marginRight:'2rem'}}
                                onClick={()=>removeCartItem(p._id)}
                                >Remove</Button>

                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-4 text-center bg-light" >
                        <h2 style={SummaryStyle}>Cart Summary</h2>
                        <p style={TotalStyle}>Total | Checkout | Payment</p>
                        <hr />
                        <h4 style={PriceStyle}>Total : ₹{totalPrice()} </h4>
                        {auth?.user?.address? (
                            <>
                            <div className="mb-3">
                                <h4 style={CurrentStyle}>Current Address</h4>
                                <h5 style={AddressStyle} >{auth?.user?.address}</h5>
                                <button className='btn btn-outline-warning' onClick={()=>navigate('/dashboard/user/profile')}>Updated Address</button>
                            </div>
                            </>
                        ):(
                            <div className="mb-3">
                                {
                                    auth?.token?(
                                        <button className='btn btn-outlined-warning'
                                        onClick={()=>navigate('/dashboard/user/profile')}
                                        >Updated Password</button>
                                    ):(
                                        <button className='btn btn-outlined-warning'
                                        onClick={()=>navigate('/login',{
                                            state:'/cart', 
                                        })}
                                        >Please Login</button>
                                    )
                                }
                            </div>
                        )}
                         {/* <div className="col-md-4 text-center"> */}
                {/* ... */}
                <div className="mt-2">
                    {(!clientToken || !cart?.length) ? (
                        ""
                    ) : (
                        <>
                            <DropIn
                                options={{
                                    authorization: clientToken,
                                    paypal: {
                                        flow: 'vault'
                                    },
                                }}
                                onInstance={(instance) => setInstance(instance)}
                            />
                            <button
                                className='btn btn-primary'
                                onClick={handlePayment}
                                disabled={!instance || loading || !auth?.user?.address}
                            >
                                {loading ? "Processing..." : "Make Payment"}
                            </button>
                        </>
                    )}
                </div>
            </div>
                </div>
            </div>
            :<EmptyCard/>
}
        
    </Layout>
  )
}

export default Cartpage