import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import Photo1 from '../Images/PradhanMantriKisanSammanNidhi.jpg';
import Photo2 from '../Images/PM_KISAN_Creative_2.jpg';
import Photo3 from '../Images/National-Mission-For-Sustainable-Agriculture.jpg';
import Photo4 from '../Images/Rashtriya-Krishi-Vikas-Yojana.webp';

import { Card, Row, Col,Button } from 'react-bootstrap';
import YojanaPhoto from '../Images/011.png';

const Yojana = ({ products }) => {
  return (
    <Layout>
       <div style={{ marginLeft:'25rem'}}>
  
  <h1 className="TrainHeading" ><img
    src={YojanaPhoto}
    alt="farmer icons"
    height={100}
    style={{ marginRight: '60px' }} 
  />KISAN YOJANA</h1>
</div>
      <Row className="justify-content-center">
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src={Photo1} height={"200px"} />
          <Card.Body>
            <Card.Title>Pradhan Mantri Kisan Samman Nidhi Yojana (PM-Kisan)
</Card.Title>
            <Card.Text>
            PM-Kisan is a Central Sector Scheme that provides income support to all eligible agricultural families. Under the scheme, an income support of Rs.6,000/- per year is transferred in three equal installments of Rs.2,000/- each, directly into the bank accounts of the beneficiary farmers.
            </Card.Text>
            <Button variant="primary" href="https://pmkisan.gov.in/" target="_blank">
                
                More Details</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src={Photo2}  height={"200px"}/>
          <Card.Body>
            <Card.Title>Pradhan Mantri Krishi Sinchai Yojana (PMKSY)</Card.Title>
            <Card.Text>
            PMKSY is a Centrally Sponsored Scheme that aims to enhance farm-level water use efficiency, promote precision irrigation, and support sustainable water management practices. The scheme covers various components such as drip and sprinkler irrigation, micro-irrigation systems, and on-farm water management.
            </Card.Text>
            <Button variant="primary" href="https://pmksy.gov.in/" target="_blank">More Details</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src={Photo3} />
          <Card.Body>
            <Card.Title>National Mission on Sustainable Agriculture (NMSA)</Card.Title>
            <Card.Text>
            NMSA is a Centrally Sponsored Scheme that aims to promote sustainable agriculture practices among farmers. The scheme covers various components such as soil health management, pest and disease management, water resource management, and climate resilient agriculture.
            </Card.Text>
            <Button variant="primary" href="https://nmsa.dac.gov.in/" target="_blank">More Details</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src={'https://www.jatinverma.org/uploads/2020_03/soil-health-card-scheme-completes-5-years-as-on-19-february.jpg'} />
          <Card.Body>
            <Card.Title> Soil Health Card Scheme</Card.Title>
            <Card.Text>
            The Soil Health Card (SHC) Scheme is a program that provides farmers with information about the nutrient status of their soil. The scheme also advises farmers on fertilizer dosage and soil amendments. The goal of the program is to promote balanced fertilizer use and higher yields at lower costs.
            </Card.Text>
            <Button variant="primary" href="https://rkvy.nic.in/" target="_blank">More Details</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src={Photo4} />
          <Card.Body>
            <Card.Title> Rashtriya Krishi Vikas Yojana (RKVY)</Card.Title>
            <Card.Text>
            RKVY is a Centrally Sponsored Scheme that provides financial assistance to state governments for implementing various agricultural development programs and schemes. The scheme covers a wide range of activities such as crop diversification, horticulture development, livestock development, and post-harvest management.
            </Card.Text>
            <Button variant="primary" href="https://rkvy.nic.in/" target="_blank">More Details</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src={'https://cdn2.slideserve.com/5133475/national-mission-for-sustainable-agriculture-nmsa-operational-guidelines-n.jpg'} />
          <Card.Body>
            <Card.Title> National Mission on Sustainable Agriculture (NMSA)</Card.Title>
            <Card.Text>
            The National Mission on Sustainable Agriculture (NMSA) is a comprehensive initiative launched by the Government of India to promote sustainable agricultural practices. It aims to enhance agricultural productivity, especially in the rainfed and marginal areas, while also focusing on water conservation, soil health management, and integrated farming systems. 
            </Card.Text>
            <Button variant="primary" href="https://rkvy.nic.in/" target="_blank">More Details</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src={'https://adda247-wp-multisite-assets.s3.ap-south-1.amazonaws.com/wp-content/uploads/multisite/sites/5/2021/10/14190645/Pradhan-Mantri-Fasal-Bima-Yojana.jpg'} />
          <Card.Body>
            <Card.Title> Pradhan Mantri Fasal Bima Yojana (PMFBY)</Card.Title>
            <Card.Text>
            The Pradhan Mantri Fasal Bima Yojana (PMFBY) is an agricultural insurance scheme in India launched in 2016. It aims to provide financial support to farmers in the event of crop failure due to natural calamities, pests, or diseases. Under this scheme, farmers pay a nominal premium, and the rest is subsidized by the government. The PMFBY seeks to ensure the financial stability of farmers and encourage them to adopt innovative and modern agricultural practices.
            </Card.Text>
            <Button variant="primary" href="https://nationalinsurance.nic.co.in/en/pradhan-mantri-fasal-bima-yojana-pmfby" target="_blank">More Details</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3} sm={6} className="mb-4">
        <Card>
          <Card.Img variant="top" src= {"https://www.ibc24.in/wp-content/uploads/2023/09/PM-Kisan-15th-installment.jpg"} />
          <Card.Body>
            <Card.Title> 15th Installment of PM-Kisan</Card.Title>
            <Card.Text>
            he Pradhan Mantri Kisan Samman Nidhi Scheme is all set to make the payment under the PM Kisan 15th Installment 2023 on 27 November 2023. The amount will be credited in the beneficiaries account on the given date. One can check the PM Kisan 15th Beneficiary List 2023 by logging at pmkisan.gov.in.
            </Card.Text>
            <Button variant="primary" href="https://pmkisan.gov.in/" target="_blank">More Details</Button>
          </Card.Body>
        </Card>
      </Col>  
      
    </Row>
    </Layout>
  );
};

export default Yojana;
