import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"

const WhatsappIcon = ({ icon }) => {
  return (
    <button type="button" className="">
      <GatsbyImage
        className="fixed w-12 h-12 z-10 bottom-20 right-20"
        image={icon.gatsbyImageData}
        alt={icon.title}
      />
    </button>
  )
}

export default WhatsappIcon

export const ContentfulWhatsappIconFragment = graphql`
  fragment ContentfulWhatsappIconFragment on ContentfulWhatsappIcon {
    id
    internal {
      type
    }
    icon {
      title
      gatsbyImageData(
        width: 400
        placeholder: BLURRED
        quality: 80
        layout: FULL_WIDTH
      )
    }
  }
`
