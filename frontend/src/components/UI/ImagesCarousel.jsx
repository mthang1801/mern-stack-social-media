import React, { useState } from 'react';
import Slider from 'react-slick';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {
  ImageContainer,
  NextArrow,
  PrevArrow,
} from './styles/ImagesCarousel.styles';
import { useTheme } from '../../theme';

function CustomNextArrow(props) {
  return <NextArrow {...props} />;
}

function CustomPrevArrow(props) {
  return <PrevArrow {...props} />;
}

const ImagesCarousel = ({ images }) => {
  const { theme } = useTheme();
  const [openLightBox, setOpenLightBox] = useState(-1);
  let dragging = false;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: images.length > 2 ? 2 : images.length,
    slidesToScroll: images.length > 2 ? 2 : images.length,
    swipeToSlide: true,
    lazyLoad: true,
    centerPadding: '60px',
    beforeChange: () => (dragging = true),
    afterChange: () => (dragging = false),
    nextArrow: <CustomNextArrow theme={theme} />,
    prevArrow: <CustomPrevArrow theme={theme} />,
  };

  if (!images.length) return null;
  return (
    <div>
      {openLightBox !== -1 && (
        <LightBox
          mainSrc={images[openLightBox].src}
          onCloseRequest={() => setOpenLightBox(-1)}
        />
      )}
      <Slider {...settings}>
        {images.map((image, idx) => (
          <ImageContainer key={image.name}>
            <img
              src={image.src}
              alt={image.src}
              onClick={() => setOpenLightBox(idx)}
            />
          </ImageContainer>
        ))}
      </Slider>
    </div>
  );
};

export default ImagesCarousel;
