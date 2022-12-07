import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

const RelatedCaseStudiesSection = ({ caseStudies }) => {
  return (
    caseStudies && <div className="max-w-screen-2xl mx-auto px-6">
      <h3 className="uppercase text-4xl font-bold">Related Case Studies.</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 h-fit mt-12 gap-8">
        {caseStudies && caseStudies.map(({ id, mainImage, title, slug }) => mainImage?.gatsbyImageData ? (
          <Link
            key={id}
            className="relative aspect-1 group overflow-hidden cursor-pointer"
            to={`/project/${slug}`}
          >
            <GatsbyImage
              image={mainImage.gatsbyImageData}
              alt={mainImage.title}
              className="absolute top-0 left-0 brightness-[85%] object-cover w-full h-full z-0 scale-110 duration-500 group-hover:scale-100"
            />
            <div className="absolute top-0 left-0 bg-secondary h-full w-full z-10 mix-blend-hard-light group-hover:opacity-100 opacity-0 duration-300" />
            <p className="absolute bottom-4 text-white text-4xl group-hover:text-5xl lg:text-3xl group-hover:lg:text-4xl xl:text-4xl group-hover:xl:text-5xl px-4 uppercase text-left z-30 duration-500 w-3/4 group-hover:w-full">
              {title}
            </p>
          </Link>
        ) : null)}
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
