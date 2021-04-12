import React from 'react'
import { graphql } from 'gatsby';

function SocialSection() {
  return (
    <div>
      ThreeCards
    </div>
  )
}

export default SocialSection


export const ContentfulSocialSectionFragment = graphql`
  fragment ContentfulSocialSectionFragment on ContentfulSocialSection {
    id
    callToAction {
      linkTo
      text
      displayAs
    }
    internal {
      type
    }
    header
    contentfulid
  }

`