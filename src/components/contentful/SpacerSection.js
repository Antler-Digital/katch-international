import React from "react"
import { graphql } from "gatsby"

const SpacerSection = ({ size, backgroundColour }) => {
  const padding =
    size === "Small"
      ? "lg:py-12 md:py-10 py-8"
      : size === "Large"
      ? "lg:py-32 md:py-28 sm:py-24 py-20"
      : "lg:py-20 md:py-18 sm:py-16 py-12"
  const bgColour = backgroundColour !== "Black" ? "bg-black" : "bg-gray-100"
  return <div className={`${padding} ${bgColour}`} />
}

export default SpacerSection

export const ContentfulSpacerSectionFragment = graphql`
  fragment ContentfulSpacerSectionFragment on ContentfulSpacerSection {
    id
    internal {
      type
    }
    size
    backgroundColour
  }
`
