import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import AdminMenu from '../../Components/Layout/AdminMenu';
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Layout/Footer';

const Product = () => {
  const [products, setProducts] = useState([]);

  // Get All Product
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/getproduct`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <Row>
        <Col md={3}>
          <AdminMenu />
        </Col>
        <Col md={9}>
          <div className="d-flex flex-column align-items-center">
            <h1 className="text-center mt-4 mb-3">All Product List</h1>
            <Row className="d-flex justify-content-center">
              {products?.map((p) => (
                <Col md={4} key={p._id} className="mb-3">
                  <Link to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={`http://localhost:8080/api/productphoto/${p._id}`} alt={p.name} height={"150px"} />
                      <Card.Body>
                        <Card.Title>{p.name.substring(0, 60)}...</Card.Title>
                        <Card.Text>{p.description.substring(0, 60)}...</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
      
    </Layout>
  );
};

export default Product;
