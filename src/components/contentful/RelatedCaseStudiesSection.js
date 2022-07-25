import { GatsbyImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import React from "react"

const RelatedCaseStudiesSection = ({ caseStudies }) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-6">
      <h3 className="uppercase text-4xl font-bold">Related Case Studies.</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 h-fit mt-12 gap-8">
        {caseStudies.map(({ id, mainImage, title }) => (
          <div key={id} className="relative aspect-1">
            <GatsbyImage
              image={mainImage.gatsbyImageData}
              alt={mainImage.title}
              className="absolute brightness-90 object-cover w-full h-full"
            />
            <p className="absolute bottom-4 text-white text-5xl lg:text-3xl xl:text-5xl px-4 uppercase">
              {title}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedCaseStudiesSection

export const ContentfulRelatedCaseStudiesSectionFragment = graphql`
  fragment ContentfulRelatedCaseStudiesSectionFragment on ContentfulRelatedCaseStudies {
    title
    id
    internal {
      type
    }
    caseStudies {
      ...ContentfulCaseStudyCardFragment
    }
  }
`
