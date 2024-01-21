import React from 'react'
import {BiMailSend,BiPhoneCall,BiSupport} from 'react-icons/bi';
import FarmerImg from '../Images/Farmer Contact.jpg';
import Layout from '../Components/Layout/Layout';
const Contact = () => {
  
  return (
    <Layout className='Section_me' title='Contact Us-Kisan Mart'>
        <h2 className='common-heading'>Feel Free To Contact Us</h2>
    
        <div class="contact-wrapper"/>
        <div className="row contactus ">
        <div className="col-md-6 ">
        <img src={FarmerImg} alt="contactus" style={{ width: "100%" }} />
        </div>
        <div className="col-md-4">
       
          <p className="text-justify mt-2">
            Any query and info about product feel free to call anytime we 24X7
            Avaliable
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
      <br />
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7521.518662125369!2d77.292967256633!3d19.11284750045821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1688502777240!5m2!1sen!2sin" width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <div class="new_home_web">
  <div class="responsive-container-block big-container">
    <img class="imgBG" src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/aw65.png"/>
    <div class="responsive-container-block textContainer">
      <div class="topHead">
        <p class="text-blk heading">
          Get in
          <span class="orangeText">
            touch
          </span>
        </p>
        <div class="orangeLine" id="w-c-s-bgc_p-2-dm-id">
        </div>
      </div>
      <p class="text-blk subHeading">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna al iqua.
      </p>
    </div>
    <div class="responsive-container-block container">
      <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-7 wk-ipadp-10 line" id="i69b">
        <form class="form-box" action='https://formspree.io/f/mdornqqz' method='POST'>
          <div class="container-block form-wrapper">
            <div class="responsive-container-block">
              <div class="left4" >
                <div class="responsive-cell-block wk-ipadp-6 wk-tab-12 wk-mobile-12 wk-desk-6" id="i10mt-2">
                    
                  <input class="input" id="ijowk-2" name="FirstName" placeholder="First Name" autoComplete='off' required/>
                </div>
                <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                  <input class="input" id="indfi-2" name="Last Name" placeholder="Last Name" autoComplete='off' required/>
                </div>
                <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12">
                  <input class="input" id="ipmgh-2" name="Email" placeholder="Email Address" autoComplete='off' required/>
                </div>
                <div class="responsive-cell-block wk-desk-6 wk-ipadp-6 wk-tab-12 wk-mobile-12 lastPhone">
                  <input class="input" id="imgis-2" name="PhoneNumber" placeholder="Phone Number" autoComplete='off' required/>
                </div>
              </div>
              <div class="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12" id="i634i-2">
                <textarea class="textinput" id="i5vyy-2" name='message' placeholder="Message" autoComplete='off' required></textarea>
              </div>
            </div>
            <input type='submit'/>

              
            
          </div>
        </form>
      </div>
    </div>
    </div>
</div>

  

    </Layout>
  )
}

export default Contact