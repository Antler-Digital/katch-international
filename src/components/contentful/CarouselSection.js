import React from 'react'
import { graphql } from 'gatsby';

function CarouselSection() {
  return (
    <div>
      Carousel Section
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