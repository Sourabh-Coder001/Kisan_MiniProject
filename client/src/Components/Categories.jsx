import React from 'react';
import Layout from './Layout/Layout';
import useCategory from '../hooks/useCategory';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import "../Pages/style/Category.css";

const Categories = () => {
    const categories = useCategory();

    return (
        <Layout title={'All Categories'}>
            <div className="container">
            <h2 className='kisan_title' style={{textAlign:'center'}}>
  <span style={{ color: '#8a2be2',fontFamily:'Georgia',fontWeight:700, fontSize:'48px' }}>List Of</span>
  <span style={{ color: '#114b5f',fontFamily:'Georgia',fontWeight:700,fontSize:'48px' }}> All Category</span>
</h2>
                <Row xs={1} md={3} className="justify-content-between align-items-center">
                    {categories.map((c) => (
                        <Col key={c._id} className="mt-3 mb-3">
                            <Button className="glow-on-hover" as={Link} to={`/category/${c.slug}`}>
                                {c.name}
                            </Button>
                        </Col>
                    ))}
                </Row>
            </div>
        </Layout>
    );
};

export default Categories;
