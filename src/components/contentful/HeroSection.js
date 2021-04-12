import React from 'react'
import { graphql } from 'gatsby';

function HeroSection() {
  return (
    <div>
      Hero Section
    </div>
  )
}

export default HeroSection


export const ContentfulHeroSectionFragment = graphql`
  fragment ContentfulHeroSectionFragment on ContentfulHeroSection {
    id
    internal {
      type
    }
    showForm
    textColour
    header
    body {
      raw
    }
    backgroundImage {
      title
      gatsbyImageData(
        layout: FULL_WIDTH
        quality: 90
        width: 1600
        placeholder: BLURRED
      )
    }
  }

`