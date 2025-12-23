import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "./data";
import "./carousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselEffect = () => {
  return (
    <>
      <Carousel
        autoplay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {
            img.map((imageItem)=>{
                return <img key={imageItem} src={imageItem} alt="carousel image" />
            })
        }
      </Carousel>
    </>
  );
};

export default CarouselEffect;
