import React from 'react'
import { graphql } from 'gatsby';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RightChevron from '../svgs/RightChevron';
import LeftChevron from '../svgs/LeftChevron';


function Carousel({ settings = {}, className, children, theme = "dark" }) {

  const defaultSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    nextArrow: <RightArrow theme={theme} />,
    prevArrow: <LeftArrow theme={theme} />,
    cssEase: "ease-in"
  };
  const settingsToUse = { ...defaultSettings, ...settings }
  return (
    <Slider {...settingsToUse} className={className}>
      { children}
    </Slider>
  )
}

export default Carousel


const RightArrow = (props) => <RightChevron {...props} className={`${props.theme === "dark" ? "text-white" : "text-black"} hover:text-secondary cursor-pointer -mt-4 right-12 sm:right-12 md:right-24 lg:right-20 xl:right-20 z-front absolute top-1/2`} />
const LeftArrow = (props) => <LeftChevron {...props} className={`${props.theme === "dark" ? "text-white" : "text-black"} hover:text-secondary cursor-pointer -mt-4 left-12 sm:left-12 md:left-24 lg:left-20 xl:left-20 z-front absolute top-1/2`} />