import { graphql } from 'gatsby';
import React from 'react'

export default function Slide() {
  return (
    <div>

    </div>
  )
}


export const ContentfulSlideFragment = graphql`
fragment ContentfulSlideFragment on ContentfulSlide {
  image {
    title
    gatsbyImageData(
      width: 1600
      layout: FULL_WIDTH
      placeholder: BLURRED
      quality: 90
    )
  }
  header
  body {
    body
  }
  callToAction {
    displayAs
    linkTo
    text
  }
}

`