import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

import CollectionSection from "../../components/contentful/CollectionSection"
import HeroSection from "../../components/contentful/HeroSection"
import TabSection from "../../components/contentful/TabSection"
import Carousel from "../../components/elements/Carousel"
import Layout from "../../components/layout/Layout"
import SEO from "../../components/SEO"
import LeftChevron from "../../components/svgs/LeftChevron"
import RightChevron from "../../components/svgs/RightChevron"
import SpacerSection from "../../components/contentful/SpacerSection"

const CaseStudyTemplate = ({ data: { contentfulCaseStudy } }) => {
  const page = contentfulCaseStudy
  const {
    metaDescription,
    metaImage,
    metaTitle,
    title,
    related,
    body,
    carouselImages,
    logoBlack,
    category,
    theChallenge,
    theSolution,
    theResults,
  } = page

  return (
    <Layout>
      <SEO
        title={metaTitle || title}
        metaDescription={metaDescription}
        metaImage={metaImage?.gatsbyImageData?.images?.fallback?.src}
      />
      <HeroSection
        header={title.toUpperCase()}
        subHeader={{ subHeader: `## __${title.toUpperCase()}__` }}
        textColour="White"
        showForm={false}
        centerHeading={true}
        backgroundImage={carouselImages[0]}
        carouselImages={carouselImages.slice(1)}
      />

      <SpacerSection size={"Medium"} backgroundColour="Black" />

      <section className="flex w-full container mx-auto py-6 md:py-12 lg:py-24 gap-y-10 gap-x-12">
        <div className="w-[70%]">
          <TabSection
            sections={[
              { header: "The Challenge", text: theChallenge },
              { header: "The Solution", text: theSolution },
              { header: "The Results", text: theResults },
            ]}
          />
        </div>
        <div className="w-[40%] flex justify-between gap-x-8">
          <div className="grow">
            <h5 className="uppercase mb-12 text-sm sm:text-base">
              The Service
            </h5>
            <div className="grid-cols-2 grid">
              {category.map((category) => (
                <p className="text-base font-thin font-sans mt-1">{category}</p>
              ))}
            </div>
          </div>
          <div className="w-[30%]">
            <h5 className="uppercase mb-12 text-sm sm:text-base">The Client</h5>
            <p className="text-base font-thin font-sans mt-1">{title}</p>
          </div>
        </div>
      </section>

      {related && (
        <CollectionSection
          customItems={related}
          lightTheme={true}
          postType="Case Studies"
          header="Related Case Studies"
        />
      )}
    </Layout>
  )
}

export const CaseStudyQuery = graphql`
  query CaseStudyQuery($id: String) {
    contentfulCaseStudy(id: { eq: $id }) {
      id
      title
      slug
      metaTitle
      metaImage {
        gatsbyImageData(width: 248, layout: FIXED)
        title
      }
      metaDescription {
        text: metaDescription
      }
      publishedDate
      category
      body {
        raw
      }
      carouselImages {
        gatsbyImageData(
          layout: CONSTRAINED
          width: 350
          quality: 90
          placeholder: BLURRED
        )
        title
      }
      logoBlack {
        gatsbyImageData(
          width: 250
          layout: FIXED
          quality: 90
          placeholder: TRACED_SVG
        )
        title
      }
      theChallenge {
        raw
      }
      theSolution {
        raw
      }
      theResults {
        raw
      }
      related {
        ...ContentfulCaseStudyCardFragment
      }
    }
  }
`

export default CaseStudyTemplate
