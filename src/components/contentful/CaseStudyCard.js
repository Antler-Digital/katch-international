import React from 'react'
import { graphql } from 'gatsby';
import Linked from '../elements/Linked';
import { GatsbyImage } from 'gatsby-plugin-image';

const CaseStudyCard = ({ title, category, publishedDate, mainImage, logoWhite, slug }) => {
  return (
    <Linked className="mx-auto" linkTo={`/projects/${slug}`}>
      <article className="w-full relative group">
        <GatsbyImage className="filter grayscale" image={mainImage.gatsbyImageData} alt={mainImage.title} />
        {/* <div className="bg-black w-full h-3 absolute bottom-0" /> */}
        <div className="bg-secondary group-hover:h-10 w-full h-0 group-hover:pt-2 group-hover:text-white text-black -mt-4 absolute bottom-2 bg-opacity-50 duration-300 text-base  text-center" >
          READ MORE
        </div>


        <div className="absolute w-full h-full flex items-center top-0 justify-center">
          <GatsbyImage className="" image={logoWhite.gatsbyImageData} alt={logoWhite.title} />
        </div>

      </article>
    </Linked>

  )
}

export const ContentfulCaseStudyCardFragment = graphql`
  fragment ContentfulCaseStudyCardFragment on ContentfulCaseStudy {
    title
    id
    category
    publishedDate(fromNow: true)
    mainImage {
      gatsbyImageData(
        quality: 90
        width: 220
        height: 220
        cropFocus: CENTER
        layout: CONSTRAINED
        placeholder: BLURRED
      )
      title
    }
    logoWhite {
      gatsbyImageData(quality: 90, layout: FIXED, width: 140)
      title
    }
    slug
}
`
export default CaseStudyCard
