import React from 'react'
import { Box, Button, Typography ,styled} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, useNavigate } from 'react-router-dom';
const Component=styled(Box)`

height:65vh;
width:80%;
backgound:#fff;
margin:80px 140px;
`;
const Container=styled(Box)`
text-align:center;
padding-top:70px;
`;
const ShopButton=styled(Button)`
background:#34E76A;
height:45px;
font-size:20px;
color:#F39F1C
`;

const EmptyCard = () => {
  const navigate=useNavigate();
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';
  return (
    <Component>
        <Container>
            <img src={imgurl} alt="empty" style={{width:'50%'}} />
            <Typography>Your Cart is Empty!</Typography>
            <Typography>Add items to it now</Typography>
           <NavLink to={'/'}> <ShopButton><ShoppingCartIcon/>Shop Now</ShopButton></NavLink>
        </Container>
    </Component>
  )
}

export default EmptyCard