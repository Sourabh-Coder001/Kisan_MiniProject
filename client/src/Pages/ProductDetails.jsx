import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { Box, Grid, styled } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProductDetailspage2 from './user/productDetailspage2';
import ActionItems from './ActionItems';
import { Button, Row, Card,Col } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/Cart';



const Component = styled(Box)(({ theme }) => ({
  background: '#f0f0f0',
  marginTop: '55px',
  [theme.breakpoints.down('md')]: {
    margin: 0,
  },
}));

const Container = styled(Grid)`
  background: #f0f0f0;
  display: 'flex';
`;
const RightContainer = styled(Grid)`
  margin-top: 50px;
`;

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const [cart,setCart]=useCart();
 

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/getproduct/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/relatedproduct/${pid}/${cid}`);
      setRelatedProducts(data?.products);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
   return (
    <Layout>
      <Component>
        {product && Object.keys(product).length && (
          <Container container>
            <Grid item lg={4} md={4} sm={8} xs={8}>
              <ActionItems product={product} />
            </Grid>
            <RightContainer item lg={8} md={8} sm={8} xs={12}>
              <ProductDetailspage2 product={product} />
            </RightContainer>
          </Container>
        )}
      </Component>
      <Row className="container similar-products">
        <h4 style={{fontSize:'35px',
      fontFamily:'sans-serif',
      fontWeight:'bold',
      color:'#280137'}}>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center" style={{
            fontSize:'35px',
            fontWeight:'bold',
            fontFamily:'serif'
          }}>No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <Col md={4} >
            <Card className="mt-5" key={p._id} style={{marginLeft:'2rem'}}>
              <Card.Img
                variant="top"
                src={`http://localhost:8080/api/productphoto/${p._id}`}
                alt={p.name}
                height={"200px"}
              />
              <Card.Body>
                <div className="card-name-price">
                  <Card.Title>{p.name}</Card.Title>
                  <Card.Title className="card-price">
                  ₹ {p.price}
                  </Card.Title>
                </div>
                <Card.Text>
                  {p.description.substring(0, 60)}...
                </Card.Text>
                <div className="card-name-price">
                  <Button
                   className="buy--btn ms-1" onClick={() => {
                    setCart([...cart, p])
                    localStorage.setItem('cart', JSON.stringify([...cart, p]));
                    toast.success('Item Added to cart')
                  }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
            </Col>
          ))}
        </div>
      </Row>
      
    </Layout>
  );
};

export default ProductDetails;
