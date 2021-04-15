import React from 'react'
import { graphql } from 'gatsby';
import CallToAction from './CallToAction';
import InstagramFeed from '../elements/InstagramFeed';

function SocialSection({ header, callToAction, contentfulid }) {
  return (
    <section id={contentfulid} className="bg-primary py-12 lg:py-24 text-center">

      <div className="text-center max-w-screen-lg mx-auto px-4">
        {header && <h2 className="text-7xl mb-8 leading-normal text-white bg-secondary px-4 py-1 inline-block text-center">{header}</h2>}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 max-w-screen-lg mx-auto px-4">
        <InstagramFeed />
      </div>
      { callToAction && <CallToAction className="mt-12" {...callToAction} />}
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