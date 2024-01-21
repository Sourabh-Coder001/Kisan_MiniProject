import React from 'react'
import Layout from '../Components/Layout/Layout';
import Table from 'react-bootstrap/Table';
import TrainPhoto from '../Images/010.png';
import { Carousel } from 'react-bootstrap';
import { bannerData } from './image';
import { Button } from 'react-bootstrap';
import Footer from '../Components/Layout/Footer';
const TrainSchedule = () => {
    
  return (
    <Layout>
        <div style={{ marginLeft:'25rem'}}>
  
  <h1 className="TrainHeading" ><img
    src={TrainPhoto}
    alt="farmer icons"
    height={100}
    style={{ marginRight: '10px' }} 
  />Train Schedule</h1>
</div>
<Carousel
            swipe={false}
            fade={true}
            interval={4000}
            keyboard={true}
            indicators={false}
            className="carousel-container"
        >
            {
                bannerData.map(image => (
                    <Carousel.Item key={image.id}>
                        <img
                            className="d-block w-100"
                            src={image.url}
                            alt="banner"
                            height={"300px"}
                            width={"200px"}
                        />
                    </Carousel.Item>
                ))
            }
        </Carousel>
        
        <div>
        <Table striped bordered hover>
        <thead>
        <tr class="table-info">
          <th>Train Number</th>
          <th>Train Name</th>
          <th>Route</th>
          <th>Departure Time</th>
          <th>Price</th>
          <th>Book Ticket</th>
        </tr>
      </thead>
      <tbody class="table-primary">
        <tr>
          <td>14520</td>
          <td>Kisan Express</td>
          <td>Bhatinda Junction (BTI) to Old Delhi (DLI)</td>
          <td>6:55</td>
          <td>₹410</td>
          <td>
  <Button variant="primary" href="https://www.irctc.co.in/nget/train-search" target="_blank">
   Book Ticket
  </Button>
</td>
        </tr>
        <tr>
          <td>14519</td>
          <td>Kisan Express</td>
          <td>Delhi (DLI) to Bhatinda Junction (BTI)</td>
          <td>17:00</td>
          <td>₹410</td>
          <td>
  <Button variant="primary" href="https://www.irctc.co.in/nget/train-search" target="_blank">
   Book Ticket
  </Button>
</td>
        </tr>
        <tr>
          <td>20331</td>
          <td>Kisan Rail</td>
          <td>Anantpur (ATP) to Adarshnagar, Delhi (DEE)</td>
          <td>18:00</td>
          <td>₹500</td>
          <td>
  <Button variant="primary" href="https://www.irctc.co.in/nget/train-search" target="_blank">
   Book Ticket
  </Button>
</td>
        </tr>
        <tr>
          <td>22140</td>
          <td>Kisan Rail</td>
          <td>Nagpur (NGP) to Adarshnagar, Delhi (DEE)</td>
          <td>19:00</td>
          <td>₹700</td>
          <td>
  <Button variant="primary" href="https://www.irctc.co.in/nget/train-search" target="_blank">
   Book Ticket
  </Button>
</td>
        </tr>
        <tr>
          <td>20759</td>
          <td>Kisan Rail</td>
          <td>Chhindwara (CWD) to Howrah (HWH)</td>
          <td>20:00</td>
          <td>₹800</td>
          <td>
  <Button variant="primary" href="https://www.irctc.co.in/nget/train-search" target="_blank">
   Book Ticket
  </Button>
</td>
        </tr>
        <tr>
          <td>22233</td>
          <td>Kisan Rail</td>
          <td>Sangola (SOL) to Howrah (HWH) (via Secunderabad)</td>
          <td>21:00</td>
          <td>₹1000</td>
          <td>
  <Button variant="primary" href="https://www.irctc.co.in/nget/train-search" target="_blank">
   Book Ticket
  </Button>
</td>
        </tr>
        <tr>
          <td>20760</td>
          <td>Kisan Rail</td>
          <td>Sangola (SOL) to Shalimar (SHLM)</td>
          <td>22:00</td>
          <td>₹1200</td>
          <td>
  <Button variant="primary" href="https://www.irctc.co.in/nget/train-search" target="_blank">
   Book Ticket
  </Button>
</td>
        </tr>
      </tbody>
    </Table>
        </div>
    </Layout>
  )
}

export default TrainSchedule