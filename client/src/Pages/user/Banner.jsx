import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Banner1 from '../../Images/banner1.jpg';
import Banner2 from '../../Images/banner2.jpg'
const Banner = () => {
  const bannerImages = [
    Banner1,
    Banner2,
    'https://agdictivelearning.files.wordpress.com/2015/09/agriculture-banner.jpg',
    'https://i.pinimg.com/originals/41/7f/b3/417fb3dc5a6454419abaf53657a7fd8b.jpg',
    'https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-08/agritech.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentImageIndex * 100}%)`,
        }}
      >
        {bannerImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            style={{ width: '100%', height: '300px', flexShrink: 0 }}
          />
        ))}
        {bannerImages.map((image, index) => (
          <img
            key={`duplicate-${index}`}
            src={image}
            alt={`Banner ${index + 1}`}
            style={{ width: '100%', height: '300px', flexShrink: 0, padding: '20px'}}
          />
        ))}
      </div>
      <button
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={prevSlide}
      >
        <ArrowBackIcon fontSize="large" />
      </button>
      <button
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={nextSlide}
      >
        <ArrowForwardIcon fontSize="large" />
      </button>
    </div>
  );
};

export default Banner;
