import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col, Form,Dropdown } from 'react-bootstrap';
import Layout from '../Components/Layout/Layout';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../Components/prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { toast } from 'react-hot-toast';
import './style/homepage.css'


import { Box} from '@mui/material';
import Banner from './user/Banner';


const HomePage = () => {
  const navigate=useNavigate();
  const [cart,setCart]=useCart();
  const [products, setProducts] = useState([]);
  const[categories,setCategories]=useState([]);
  const [checked,setChecked]=useState([]);
  const[radio,setRadio]=useState([]);
  const[total,setTotal]=useState(0);
  const[page,setPage]=useState(1);
  const [loading,setLoading]=useState(false)

  const titleStyle = {
    color: 'white',
    fontWeight: 'bold', 
    textAlign:'center',
    fontSize: '25px' // Increase font size (adjust as needed)
  };
const HomePrice = {
    color: '#fff',
    fontWeight: 'bold', 
    fontSize: '20px' // Increase font size (adjust as needed)

  };
const destyle={
  color:'white',
  fontWeight:'bold'
}

// get all Categories
const getAllCategory = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/getcategorys`);
    if (data?.success) {
      setCategories(data?.category);
    }
  } catch (error) {
    console.log(error);
    
  }
};

useEffect(() => {
  getAllCategory();
  getTotal();
}, []);

//get products
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/getproduct`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
//get Total Count
const getTotal=async()=>{
  try{
    const {data}=await axios.get(`http://localhost:8080/api/productcount`);
    setTotal(data?.total);
  }
  catch(error){
    console.log(error);
  }
};

useEffect(()=>{
  if(page===1) return;
  loadMore();
},[page]);


  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/productlist/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]); // Concatenating the new data to the existing product list
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

//filter by category
const handelFilter =(value,id)=>{
  let all=[...checked];
  if(value){
    all.push(id);
  }else{
    all=all.filter((c)=>c!==id);
  }
  setChecked(all);
};

  useEffect(() => {
    if(!checked.length || !radio.length)getAllProduct();
    
  }, [checked.length,radio.length]);

  useEffect(()=>{
    if(checked.length || radio.length) filterProduct();
  },[checked,radio]);


  //get filter product
  const filterProduct=async()=>{
    try{
      const {data}=await axios.post(`http://localhost:8080/api/productfilter`,{checked,radio})
      setProducts(data?.products)
    }
    catch(error){
      console.log(error);
    }
  };


  return (
    <>
    <div>
   
    </div>
    <Layout title="All products-Best Offer">
     <Box>
     <Banner/>

      <Row>
        <Col md={1}>
    
      <div className="text-center" style={{paddingBottom:'20px'}}>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="filter-dropdown">
          Filter
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.ItemText>Filter By Category</Dropdown.ItemText>
          {categories?.map((c) => (
            <Dropdown.Item key={c._id} onClick={() => handelFilter(true, c._id)}>
              {c.name}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          <Dropdown.ItemText>Filter By Price</Dropdown.ItemText>
          {Prices?.map((p) => (
            <Dropdown.Item key={p._id} onClick={() => setRadio(p.array)}>
              {p.name}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          <Dropdown.Item>
            <Button variant="danger" onClick={() => window.location.reload()}>
              Reset Filters
            </Button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    </Col>
        <Col md={10 }>
        
          <div>
          <Row className="d-flex flex-wrap">
            
            {products?.map((p) => (
              <Col md={4} key={p._id}>
                <Card className="Card_section mt-5" >
                  <Card.Img
                    src={`http://localhost:8080/api/productphoto/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={"200px"}
                    width={"100px"}
                    
                  />
                  <Card.Body>
                    <div className="Card_name card-name-price">
                      <Card.Title style={titleStyle}>{p.name.substring(0, 60)}...</Card.Title>
                    </div>
                    <Card.Text style={destyle}>
                      {p.description.substring(0, 90)}...
                    </Card.Text>
                      <Card.Title className="card-price" style={HomePrice}>
                      ₹ {p.price}
                      </Card.Title>
                    <div className="Card-Price card-name-price">
                      <Button variant='info' className="buy--btn ms-1" onClick={() => navigate(`/product/${p.slug}`)}>
                        More Details
                      </Button>
                      <button className="buy--btn ms-1" onClick={() => {
                        setCart([...cart, p])
                        localStorage.setItem('cart', JSON.stringify([...cart, p]));
                        toast.success('Item Added to cart')
                      }}>
                        ADD TO CART
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <Button variant='warning'
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                {loading ? "Loading...." : "Loadmore"}
              </Button>
            )}
          </div>
        </Col>
      </Row>
      </Box>
    </Layout>
    </>
     
  );
};

export default HomePage;
