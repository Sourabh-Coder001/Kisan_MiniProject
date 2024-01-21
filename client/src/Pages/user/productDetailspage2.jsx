import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useParams } from 'react-router-dom';
import axios from 'axios';



const SmallText=styled(Box)`
font-size:14px;
vertical-align:baseline;
& > p{
    font-size:14px;
    margin-top:10px;x
}
`;
const StyleBadge=styled(LocalOfferIcon)`
    margin-right:10px;
    color:#00CC00;
    font-size:15px;
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

const ProductDetailspage2 = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
  
  
    useEffect(() => {
      if (params?.slug) 
      getProduct();
     
    }, [params?.slug]);
  
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/getproduct/${params.slug}`);
        setProduct(data?.product);
        
      } catch (error) {
        console.log(error);
      }
    };
  
    
    
  
    const date = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
  


    
  return (
    <Box bgcolor={"#f0f0f0"}>
    <Typography>{product.name}</Typography>
              <Typography style={{marginTop:5,color:'#878787',fontSize:14}}>
                8 Rating & 1 Review
               
                </Typography>
                <Typography>
                  <Box component="span" style={{fontSize:28}}>₹{product.price}</Box>
                  
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
                          </ColumnText>
                        
                            <ColumnText>
                            <TableCell style={{color:'#878787'}}>Description:</TableCell>
                            <TableCell style={{fontWeight:500}}>{product.description}</TableCell>
                        </ColumnText>
                    </TableBody>
                </Table>
                
    </Box>
  )
}

export default ProductDetailspage2;