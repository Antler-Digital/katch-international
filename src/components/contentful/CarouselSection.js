import React from 'react'
import { graphql } from 'gatsby';
import Slide from './Slide';
import Carousel from '../elements/Carousel';
import CaseStudySlide from './CaseStudySlide';


function CarouselSection({ slides }) {
  const [activeSlide, setActiveSlide ] = React.useState(0);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 8000,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '10px',
    beforeChange: (_slide, newSlide) => setActiveSlide(newSlide)
    
    // cssEase: "ease-in"
  };

  return (
    <div className="h-screen min-h-600 relative overflow-hidden " >
      <Carousel settings={settings} className="" >
        {slides && slides.map((slide, index) => {

          if (slide.internal.type === 'ContentfulSlide') {
            return <Slide key={slide.id} {...slide} isActive={activeSlide === index} />
          }
          return <CaseStudySlide key={slide.id} {...slide} isActive={activeSlide === index}/>
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
      ...ContentfulCaseStudyCardFragment
    }
  }

`