import React from 'react'
import { graphql } from 'gatsby';
import Slide from './Slide';
import Carousel from '../elements/Carousel';


function CarouselSection({ slides }) {

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    // cssEase: "ease-in"
  };
  return (
    <div className="h-screen min-h-600 relative overflow-hidden">
      <Carousel settings={settings} className="">
        {slides && slides.map(slide => {
          return <Slide key={slide.id} {...slide} />
        })}
      </Carousel>
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