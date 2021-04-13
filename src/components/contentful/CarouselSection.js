import React from 'react'
import { graphql } from 'gatsby';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RightChevron from '../svgs/RightChevron';
import LeftChevron from '../svgs/LeftChevron';
import Slide from './Slide';


function CarouselSection({ slides }) {

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    // cssEase: "ease-in"
  };
  return (
    <div className="h-screen min-h-600 relative overflow-hidden">
      <Slider {...settings} className="">
        {slides && slides.map(slide => {
          return <Slide key={slide.id} {...slide} />
        })}
      </Slider>
    </div>
  )
}

export default CarouselSection


export const ContentfulCarouselSectionFragment = graphql`
  fragment ContentfulCarouselSectionFragment on ContentfulCarouselSection {
    id
    name
    internal {
      type
    }
    slides {
      ...ContentfulSlideFragment
    }
  }

`

const RightArrow = (props) => <RightChevron {...props} className={`text-white hover:text-secondary cursor-pointer -mt-4 right-12 sm:right-12 md:right-24 lg:right-20 xl:right-20 z-front absolute top-1/2`} />
const LeftArrow = (props) => <LeftChevron {...props} className={`text-white hover:text-secondary cursor-pointer -mt-4 left-12 sm:left-12 md:left-24 lg:left-20 xl:left-20 z-front absolute top-1/2`} />