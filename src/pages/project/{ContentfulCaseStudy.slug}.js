import { graphql } from "gatsby"
import React from "react"

import CollectionSection from "../../components/contentful/CollectionSection"
import HeroSection from "../../components/contentful/HeroSection"
import SpacerSection from "../../components/contentful/SpacerSection"
import TabSection from "../../components/contentful/TabSection"
import Layout from "../../components/layout/Layout"
import SEO from "../../components/SEO"

const CaseStudyTemplate = ({ data: { contentfulCaseStudy } }) => {
  const page = contentfulCaseStudy
  const {
    metaDescription,
    metaImage,
    metaTitle,
    title,
    related,
    mainImage,
    carouselImages,
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
        backgroundImage={mainImage}
        carouselImages={carouselImages}
      />

      <SpacerSection size={"Medium"} backgroundColour="Black" />

      <section className="flex flex-col md:flex-row w-full container mx-auto py-6 md:py-12 lg:py-24 gap-y-10 gap-x-12">
        <div className="md:w-[70%]">
          <TabSection
            sections={[
              { header: "The Challenge", text: theChallenge },
              { header: "The Solution", text: theSolution },
              { header: "The Results", text: theResults },
            ]}
          />
        </div>
        <div className="md:w-[40%] flex flex-row md:flex-col lg:flex-row justify-between lg:justify-start gap-x-8 container mx-auto px-6">
          <div className="shrink">
            <h5 className="uppercase mb-12 text-sm sm:text-base">
              The Service
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
              {category.map((category) => (
                <p className="text-base font-thin font-sans mt-1">{category}</p>
              ))}
            </div>
          </div>
          <div className="shrink md:mt-12 lg:mt-0">
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
      mainImage {
        gatsbyImageData(
          width: 1200
          height: 500
          layout: FULL_WIDTH
          quality: 90
          placeholder: BLURRED
        )
      }
      carouselImages {
        gatsbyImageData(
          layout: FULL_WIDTH
          width: 800
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
