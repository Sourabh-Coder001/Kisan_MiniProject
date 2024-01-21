import { Box, Button, styled } from '@mui/material';
import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/Cart';

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: '40%',
  padding: '40px 0 0 80px',
  [theme.breakpoints.down('lg')]: {
    padding: '20px 40px'
  }
}));

const StyleButton = styled(Button)(({ theme }) => ({
  width: '48%',
  height: '50px',
  borderRadius: '2px',
  [theme.breakpoints.down('lg')]: {
    width: '100%'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginTop: '10px'
  }
}));

const Image = styled('img')({
  padding: '10px',
  height: '250px'
});

const ActionItems = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/getproduct/${params.slug}`);
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LeftContainer>
      <Box style={{ padding: '15px 20px', border: '1px solid #f0f0f0', width: '90%' }}>
        <Image src={`http://localhost:8080/api/productphoto/${product._id}`} alt={product.name} style={{ width: '90%' }} />
      </Box>
      <StyleButton
        variant="contained"
        style={{ background: '#ff9f00', marginLeft: '5rem' }}
        onClick={() => {
          if (product) {
            setCart([...cart, product]);
            localStorage.setItem('cart', JSON.stringify([...cart, product]));
          }
        }}
      >
        <AddShoppingCartIcon /> Add to Cart
      </StyleButton>
    </LeftContainer>
  );
};

export default ActionItems;
