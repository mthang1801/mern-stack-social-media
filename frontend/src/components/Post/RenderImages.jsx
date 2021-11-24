import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
const RenderImage = ({ images, className }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: images && images.length === 1 ? 1 : 2,
    slidesToScroll: 1,
  };
  if (!images || !images.length) return null;
  return (
    <div>
      <Slider {...settings}>
        {images.map(({ src, name }) => (
          <img key={name} src={src} alt={name} />
        ))}
      </Slider>
    </div>
  );
};

export default styled(RenderImage)`
  display: flex;
  width: 100%;
  .slider-item-image {
    width: 45%;
  }
`;
