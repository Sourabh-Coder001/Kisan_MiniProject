import React from 'react';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Title = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
    <h4 style={{ marginRight: 'auto', marginLeft: '20px' }}><PhoneAndroidIcon />+91 9370171615</h4>
    <h1 className='kisan_title' style={{ margin: '0 auto' }}>
  <span style={{ color: 'orange',fontFamily:'Georgia',fontWeight:700 }}>Kisan</span>
  <span style={{ color: 'green',fontFamily:'Georgia',fontWeight:700 }}> Mart</span>
</h1>
    <h1 style={{ marginLeft: 'auto', marginRight: '20px' }}><TwitterIcon /> <InstagramIcon /> <FacebookIcon /> <WhatsAppIcon /></h1>
  </div>
  

  
  )
}

export default Title