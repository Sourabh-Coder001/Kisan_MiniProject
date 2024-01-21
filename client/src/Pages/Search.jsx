import Layout from '../Components/Layout/Layout'
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { useSearch } from '../context/Search';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { toast } from 'react-hot-toast';
const Searching_Title={
  color: '#102C4E;',
    fontWeight: 'bold', // Increase font weight
    fontSize: '4.5rem'
};

const FoundResult={
  color:'#102C4E',
  fontWeight:'bold',
  fontSize:'2rem'
};


const Search = () => {
  const navigate=useNavigate();
    const [values,setValues]=useSearch();
    const [cart,setCart]=useCart();
  return (
    <Layout title={'Search results'}>
        <div className="container">
            <div className="text-center">
                <h1 style={Searching_Title}>Search Results</h1>
                <h6 style={FoundResult}>{values?.result.length<1 ? 'No Product Found': `Found ${values.result.length}`}</h6>
                <div className="d-flex flex-wrap mt-4">
            {values?.result.map((p) => (
              <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                <Card style={{ width: '18rem' }} className="Card_section m-2">
                  <Card.Img variant="top" src={`http://localhost:8080/api/productphoto/${p._id}`} alt={p.name} height={'200px'} />
                  <Card.Body>
                    <Card.Title>{p.name}</Card.Title>
                    <Card.Text>{p.description.substring(0,30)}...</Card.Text>
                    <Card.Text> ₹{p.price}</Card.Text>

                    <Button variant='info' className="ms-1" onClick={() => navigate(`/product/${p.slug}`)} > More Details </Button>
                    <button className="buy--btn ms-1" onClick={() => {
                        setCart([...cart, p])
                        localStorage.setItem('cart', JSON.stringify([...cart, p]));
                        toast.success('Item Added to cart')
                      }}> Add to Cart </button>
                  </Card.Body>
                </Card>
              </Link>
            ))}
          </div>
            </div>
        </div>
    </Layout>
  )
}

export default Search