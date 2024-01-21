import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layout/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Col, Row } from 'react-bootstrap';
import { useCart } from '../context/Cart';
import { toast } from 'react-hot-toast';
const titleStyle = {
  color: 'Black',
  fontWeight: 'bold', 
  textAlign:'center',
  fontSize: '30px' // Increase font size (adjust as needed)
};
const HomePrice = {
  color: '#F18314',
  fontWeight: 'bold', 
  fontSize: '30px' // Increase font size (adjust as needed)

};
const destyle={
color:'Black',
fontWeight:'bold'
}

const CategoriesProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart,setCart]=useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});



 const Resultfound={
  color: 'Black',
    fontWeight: 'bold', // Increase font weight
    fontSize: '1.5rem' // Increase font size (adjust as needed)
 } 
  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/productcategory/${params.slug}`);
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container"> <h2 className='kisan_title' style={{textAlign:'center'}}>
  <span style={{ color: '#8a2be2',fontFamily:'Georgia',fontWeight:700, fontSize:'48px' }}>Category</span>
  <span style={{ color: '#114b5f',fontFamily:'Georgia',fontWeight:700,fontSize:'48px' }}>-{category?.name} </span>
</h2>

        
        <h6 className='text-center' style={Resultfound}>{products?.length} Result Found</h6>
        <Row>
          <Col md={12}>
            <Row className="d-flex flex-wrap">
              {products?.map((p) => (
                <Col md={4} key={p._id}>
                  <Card className="m-2">
                    <Card.Img
                      src={`http://localhost:8080/api/productphoto/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      height={'200px'}
                    />
                    <Card.Body>
                    <div className="Card_name card-name-price">
                      <Card.Title style={titleStyle}>{p.name}</Card.Title>
                    </div>
                    <Card.Text style={destyle}>
                      {p.description.substring(0, 60)}...
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
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default CategoriesProduct;
