import { GatsbyImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import React from "react"

const FullScreenImage = ({ image }) => {
  return (
    <GatsbyImage
      className="h-[500px] md:h-full w-full"
      style={{ position: "block" }}
      image={image.gatsbyImageData}
      alt={image.title}
    />
  )
}

export default FullScreenImage

export const ContentfulFullScreenImageFragment = graphql`
  fragment ContentfulFullScreenImageFragment on ContentfulFullScreenImage {
    id
    internal {
      type
    }
    image {
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
