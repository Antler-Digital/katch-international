import React from "react"
import { graphql } from "gatsby"
import Slide from "./Slide"
import Carousel from "../elements/Carousel"
import CaseStudySlide from "./CaseStudySlide"
import useSnapToNext from "../../hooks/useSnapToNext"

function CarouselSection({ slides, name }) {

  const containerRef = React.useRef(null)
  const isHomePage = name === "Home Page Carousel"
  const otherRef = React.useRef(null)
  useSnapToNext(containerRef, 50 , isHomePage ? true : false)



  const [activeSlide, setActiveSlide] = React.useState(0)
  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 8000,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "10px",
    beforeChange: (_slide, newSlide) => setActiveSlide(newSlide),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "50px",
          slidesToShow: 1,
        },
      },
    ],

    // cssEase: "ease-in"
  }

  const homePageCarouselSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 8000,
    // cssEase: "ease-in"
  };

  const isCaseStudy = name === "Case Study Carousel"


  const caseStudyClasses = "max-w-screen-2xl mx-auto overflow-hidden"
  const homePageClasses = "w-full"
  return (
    <div {...isHomePage ? { ref: containerRef } : {}} 
    className="min-h-600 relative overflow-hidden pb-16" id={isCaseStudy ? 'our-work' : ''}>
      <Carousel
        settings={isHomePage ? homePageCarouselSettings : settings}
        className={isCaseStudy ? caseStudyClasses : homePageClasses}
      >
        {slides &&
          slides.map((slide, index) => {
            if (slide?.internal?.type === "ContentfulSlide") {
              return (
                <Slide
                  key={slide.id}
                  {...slide}
                  isActive={activeSlide === index}
                />
              )
            }

            return (
              <CaseStudySlide
                key={slide.id}
                {...slide}
                isActive={activeSlide === index}
              />
            )
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
