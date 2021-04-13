import React from 'react'
import { graphql } from 'gatsby';
import CallToAction from './CallToAction';

function SocialSection({ header, callToAction, contentfulid }) {
  return (
    <section id={contentfulid} className="bg-primary py-12 lg:py-24 text-center">

      <div className="text-center max-w-screen-lg mx-auto px-4">
        {header && <h2 className="text-7xl mb-8 leading-normal text-white bg-secondary px-4 py-1 inline-block text-center">{header}</h2>}
      </div>
      {/* ADD IN INSTAGRAM FEED */}
      { callToAction && <CallToAction className="" {...callToAction} />}
    </section>
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