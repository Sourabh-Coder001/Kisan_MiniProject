import React from 'react';
import Layout from '../Components/Layout/Layout';
import './About.css';
import img1 from '../Images/about02.jpg';
import img2 from '../Images/about03.webp';
import img3 from '../Images/about1.jpeg';
import img4 from '../Images/about04.webp';
import img5 from '../Images/about05.jpg';
import img6 from '../Images/about06.jpg';

function About() {
  return (
    <Layout title={'About us - Kisan Mart'}>
      <div className="responsive-container-block bigContainer">
        <div className="responsive-container-block Container">
          <div className="responsive-container-block leftSide">
            <p className="text-blk heading">
              Project Partner
            </p>
            <p className="text-blk subHeading">
              Semaj Africa is an online education platform that delivers video courses, programs, and resources for Individuals, Advertising &amp; Media Specialists, Online Marketing Professionals, Freelancers, and anyone looking to pursue a career in digital marketing, Accounting, Web development, Programming, Multimedia, and CAD design.
            </p>
          </div>
          <div className="responsive-container-block rightSide">
            <img className="number1img" src={img1} alt="Number 1" />
            <img className="number2img" src={img2} alt="Number 2" />
            <img className="number3img" src={img3} alt="Number 3" />
            <img className="number5img" src={img4} alt="Number 5" />
            <iframe
              allowFullScreen
              className="number4vid"
              poster="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/b242.png"
              src="https://www.youtube.com/embed/svg%3E?"
            ></iframe>
            <img className="number7img" src={img5} alt="Number 7" />
            <img className="number6img" src={img6} alt="Number 6" />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
