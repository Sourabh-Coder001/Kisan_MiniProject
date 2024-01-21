<div>
<div className="row d-flex flex-wrap">
  {products?.map((p) => (
    <div className="col-md-4" key={p._id}>
      <div className="mt-5" style={{ marginLeft: '2rem' }}>
        <img
          src={`http://localhost:8080/api/productphoto/${p._id}`}
          alt={p.name}
          height={100}
          style={{ objectFit: 'cover', width: '100%' }}
        />
        <div>
          <div className="card-name-price">
            <h5>{p.name}</h5>
            <p className="card-price">₹ {p.price}</p>
          </div>
          <p>{p.description.substring(0, 60)}...</p>
          <div className="card-name-price">
            <Button variant='info' className="ms-1" onClick={() => navigate(`/product/${p.slug}`)}>
              More Details
            </Button>
            <Button variant='dark' className="ms-1" onClick={() => {
              setCart([...cart, p]);
              localStorage.setItem('cart', JSON.stringify([...cart, p]));
              toast.success('Item Added to cart');
            }}>
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
</div>

<div className='m-2 p-3'>
{products && products.length < total && (
  <Button variant='warning' onClick={(e) => {
    e.preventDefault();
    setPage(page + 1);
  }}>
    {loading ? "Loading...." : "Loadmore"}
  </Button>
)}
</div>
</div>













<div className="d-flex flex-wrap">
{products?.map((p) => (
  <div className="card m-2" key={p._id}>
    <img
      src={`http://localhost:8080/api/productphoto/${p._id}`}
      className="card-img-top"
      alt={p.name}
    />
    <div className="card-body">
      <div className="card-name-price">
        <h5 className="card-title">{p.name}</h5>
        <h5 className="card-title card-price">
          {p.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h5>
      </div>
      <p className="card-text ">
        {p.description.substring(0, 60)}...
      </p>
      <div className="card-name-price">
        <button
          className="btn btn-info ms-1"
          onClick={() => navigate(`/product/${p.slug}`)}
        >
          More Details
        </button>
        <button
          className="btn btn-dark ms-1"
          onClick={() => {
            setCart([...cart, p]);
            localStorage.setItem(
              "cart",
              JSON.stringify([...cart, p])
            );
            toast.success("Item Added to cart");
          }}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  </div>
))}
</div>








import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Row, Card } from 'react-bootstrap';
import {Box, Table, TableBody, TableCell, TableRow, Typography,styled } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
const date=new Date(new Date().getTime()+(5*24*60*60*1000));
const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/getproduct/${params.slug}`);
      setProduct(data?.product);
      getSimilarProducts(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/relatedproduct/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
  const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';

  const StyleBadge=styled(LocalOfferIcon)`
  margin-right:10px;
  color:#00CC00;
  font-size:15px;
`;
const SmallText=styled(Box)`
font-size:14px;
vertical-align:baseline;
& > p{
    font-size:14px;
    margin-top:10px;x
}
`;

const ColumnText=styled(TableRow)`
font-size:14px;
vertical-align:baseline;
& > td{
    font-size:14px;
    margin-top:10px;
    border:none;
}
`;
const LeftContainer=styled(Box)(({theme})=>({
    minWidth:'20%',
    padding:'40px 0 0 80px',
    [theme.breakpoints.down('lg')]:{
      padding:'20px 40px'
    }
  }))
const Image=styled('img')({
  padding:'10px',
  height:'250px'

})
const StyleButton=styled(Button)(({theme})=>({
  width:'15%',
  height:'50px',
  borderRadius:'2px',
  [theme.breakpoints.down('lg')]:{
    width:'100%'
  
  },
  [theme.breakpoints.down('sm')]:{
    width:'100%',
    marginTop:'10px'
  }
  }))
  return (
    <Layout>
 <LeftContainer item lg={4} md={4} sm={8} xs={8}>
      <Box style={{padding:'15px 20px',border:'1px solid #f0f0f0',width:'30%'}}>
        <Image src={`http://localhost:8080/api/productphoto/${product._id}`} alt={product.name}/>
        </Box>
        <StyleButton variant='contained'  style={{marginRight:10,background:'#ff9f00'}}><AddShoppingCartIcon/>Add to Cart</StyleButton>
        <StyleButton variant='contained'  style={{background:'#fb541b'}}><FlashOnIcon/>Buy Now</StyleButton>
    </LeftContainer>
<>
      <component item lg={8} md={8} sm={8} xs={12}>
      <Typography>{product.name}</Typography>
              <Typography style={{marginTop:5,color:'#878787',fontSize:14}}>
                8 Rating & 1 Review
                <Box component="span"><img src={fassured} alt="" style={{marginLeft:20,width:77}} />
                </Box>
                </Typography>
                <Typography>
                  <Box component="span" style={{fontSize:28}}>₹{product.price}</Box>&nbsp;&nbsp;&nbsp;
                  
                </Typography>
                <Typography>Available Offers</Typography>
                <SmallText>
                    <Typography><StyleBadge/> Bank OfferFlat ₹1,250 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹15,000 to ₹39,999T&C</Typography>
                    <Typography><StyleBadge/>Bank Offer10% Instant Discount on HDFC Bank Credit Cards, up to ₹1,000 on orders of ₹5,000 and aboveT&C</Typography>
                    <Typography><StyleBadge/>Bank OfferFlat ₹3,000 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹40,000 to ₹49,999T&C</Typography>
                    <Typography><StyleBadge/>Special PriceGet extra 27% off (price inclusive of cashback/coupon)T&C</Typography>
                    <Typography><StyleBadge/>Extra ₹500 Off on Bikes & Scooters on purchase of ₹30,000 or moreT&C</Typography>
                    <Typography><StyleBadge/>Bank OfferFlat ₹4,000 Off on HDFC Bank Credit Card EMI Trxns on orders of ₹50,000 and aboveT&C</Typography>
                </SmallText>
                <Table>
                    <TableBody>
                        <ColumnText>
                            <TableCell style={{color:'#878787'}}>Delivery:</TableCell>
                            <TableCell style={{fontWeight:600}}>Delivery Date: {date.toDateString()} |₹ 40</TableCell>
                        </ColumnText>
                        <ColumnText>
                            <TableCell style={{color:'#878787'}}>Warrenty:</TableCell>
                            <TableCell style={{fontWeight:500,color:'#287F40'}}>2 Year Warranty (1 year standard warranty + 1 year additional warranty from the date of purchase made by the customer.)</TableCell>
                        </ColumnText>
                        <ColumnText>
                            <TableCell style={{color:'#878787'}}>Seller:</TableCell>
                            <TableCell >
                            <Box component="span" style={{color:'#0096FF'}}>Super ComNet </Box>
                            <Typography>14 Days Policy</Typography>
                            <Typography>GST Invoice Avaliable</Typography>
                            </TableCell>
                        </ColumnText>
                        <ColumnText>
                            <TableCell colSpan={2}>
                                <img src={adURL} alt="ads" width={390} />
                            </TableCell>
                        </ColumnText>
                            <ColumnText>
                            <TableCell style={{color:'#878787'}}>Description:</TableCell>
                            <TableCell style={{fontWeight:500}}>{product.description}</TableCell>
                        </ColumnText>
                    </TableBody>
                </Table>
                </component>
                </>
      <Row>
        <h1 className="container">Similar Products</h1>
        {relatedProducts.length < 1 && <p className="text-center">No Similar Products found</p>}
        <div className="d-flex flex-wrap container">
          {relatedProducts?.map((p) => (
            <Card className="m-2" key={p._id} style={{ width: '18rem' }}>
              <Card.Img
                variant="top"
                src={`http://localhost:8080/api/productphoto/${p._id}`}
                alt={p.name}
                height={"200px"}
              />
              <Card.Body>
                <Card.Title>{p.name}</Card.Title>
                <Card.Text>{p.description.substring(0, 60)}...</Card.Text>
                <Card.Text>
                  {p.price}
                </Card.Text>
                <Button className="btn btn-dark ms-1">Add to Cart</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Row>
    </Layout>
  );
};

export default ProductDetails;





<div className="container-flui m-3 p-3 dashboard">
          <div className="row">
            <div className="col-md-3">
              <UserMenu/>
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-3">
                <h3>{auth?.user?.name}</h3>
                <h3>{auth?.user?.email}</h3>
                <h3>{auth?.user?.address}</h3>
                <h3>{auth?.user?.phone}</h3>
                
              </div>
            </div>
          </div>



           <form onSubmit={handleSubmit}>
          <h4 className="title">User Profile</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
    
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
             
              disabled
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
             
            />
          </div>
          <div className="mb-3">
            
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>


        <h3>{auth?.user?.name}</h3>
                <h3>{auth?.user?.email}</h3>
                <h3>{auth?.user?.address}</h3>
                <h3>{auth?.user?.phone}</h3>