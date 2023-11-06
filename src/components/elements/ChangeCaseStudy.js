import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Linked from "./Linked"

const ChangeCaseStudy = ({ prevCaseStudy, nextCaseStudy }) => {
  return (
    <div className="w-full max-h-32 h-16 flex overflow-hidden bg-secondary">
      <div className="relative w-2/5">
        <Linked linkTo={`/project/${nextCaseStudy.slug}`}>
          <button
            type="button"
            className="absolute z-10 left-0 uppercase text-xl text-white bg-secondary mix-blend-hard-light hover:mix-blend-normal  py-3 px-5 h-full"
          >
            Previous Project
          </button>
        </Linked>
        {prevCaseStudy?.mainImage && <GatsbyImage
          className="absolute h-18 w-full top-0"
          style={{ position: "absolute" }}
          image={prevCaseStudy.mainImage?.gatsbyImageData}
          alt={prevCaseStudy.mainImage?.title}
        />}
      </div>
      <div className="relative w-3/5  bg-primary  ">
        {nextCaseStudy?.mainImage && <GatsbyImage
          className="absolute h-18 w-full top-0"
          style={{ position: "absolute" }}
          image={nextCaseStudy?.mainImage?.gatsbyImageData}
          alt={nextCaseStudy?.mainImage?.title}
        />}
        <Linked linkTo={`/project/${nextCaseStudy.slug}`}>
          <button
            type="button"
            className="absolute z-10 right-0 uppercase text-xl text-white bg-secondary mix-blend-hard-light hover:mix-blend-normal py-3 px-5 h-full"
          >
            Next Project
          </button>
        </Linked>
      </div>
    </div>
  )
}

export default ChangeCaseStudy
