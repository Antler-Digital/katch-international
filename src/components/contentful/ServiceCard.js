import { graphql } from 'gatsby';
import React from 'react'

export default function ServiceCard() {
  return (
    <div>
      Service Card
    </div>
  )
}


export const ContentfulServiceCardFragment = graphql`
  fragment ContentfulServiceCardFragment on ContentfulCard {
    subHeader
    header
    backgroundImage {
      title
      gatsbyImageData(
        width: 400
        placeholder: BLURRED
        quality: 90
        layout: FULL_WIDTH
      )
    }
    link {
      text
      displayAs
      linkTo
    }
  }
`