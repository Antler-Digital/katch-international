import React from "react"
import Layout from "../components/layout/Layout"
import SEO from "../components/SEO"
import { graphql } from 'gatsby';
import HeroSection from '../components/contentful/HeroSection';
import CollectionSection from '../components/contentful/CollectionSection';
import { GatsbyImage } from 'gatsby-plugin-image';
import Carousel from '../components/elements/Carousel';
import { renderRichText } from "gatsby-source-contentful/rich-text"
import RichTextOptions from '../components/rich-text/RichTextOptions';
import RightChevron from '../components/svgs/RightChevron';
import LeftChevron from '../components/svgs/LeftChevron';

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
    logoBlack
  } = page

  const settings = {
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
  }


  return (
    <Layout>
      <SEO title={metaTitle || title} metaDescription={metaDescription} metaImage={metaImage?.fixed?.src} />
      <HeroSection
        header={"CASE STUDY"}
        subHeader={{ subHeader: `## __${title.toUpperCase()}__` }}
        textColour="Pink"
        showForm={false}
      />
      <section className="grid grid-cols-1 md:grid-cols-2 max-w-screen-xl mx-auto py-6 md:py-12 lg:py-24 px-4">
        <div className="flex flex-col justify-center md:order-first order-last ">
          <Carousel settings={settings} className="max-w-[90vw] md:max-w-md w-full mx-auto h-full">
            {carouselImages && carouselImages.map(image => <div key={image.title} className="w-full min-w-[200px] h-full flex">
              <div className="max-w-xs md:max-w-xs lg:max-w-sm mx-auto min-h-[400px] md:min-h-[700px] flex items-center">
              <GatsbyImage className="h-full w-full mx-auto my-0" style={{ display: 'block' }} image={image.gatsbyImageData} alt={image.title} />
              </div>
             
            </div>)}
          </Carousel>
        </div>
        <div className="prose mx-auto order-first md:order-last">
          {logoBlack && <GatsbyImage className="mx-auto mb-12 h-full" imgStyle={{ marginTop: 0 }} image={logoBlack.gatsbyImageData} alt={logoBlack.title} />}
          {body && renderRichText(body, RichTextOptions)}
        </div>
      </section>

      { related && <CollectionSection customItems={related} lightTheme={true} postType="Case Studies" header="Related Case Studies" />}
    </Layout >
  )
}


const RightArrow = (props) => <RightChevron {...props} className={`text-secondary sm:text-black hover:text-secondary cursor-pointer -mt-4 right-0 sm:-right-10  md:right-10 lg:-right-5  z-front absolute top-1/2 transform scale-75 md:scale-100`} />
const LeftArrow = (props) => <LeftChevron {...props} className={`text-secondary sm:text-black hover:text-secondary cursor-pointer -mt-4 left-0 sm:-left-10  md:left-10 lg:-left-10  z-front absolute top-1/2 transform scale-75 md:scale-100`} />


export const CaseStudyQuery = graphql`
query CaseStudyQuery($id: String) {
  contentfulCaseStudy(contentful_id: {eq: $id}) {
    id
    title
    slug
    metaTitle
    metaImage {
      fixed(width: 400) {
        src
      }
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
      gatsbyImageData(width: 250, layout: FIXED, quality: 90, placeholder: TRACED_SVG)
      title
    }
    related {
      ...ContentfulCaseStudyCardFragment
    }
  }
}
`

export default CaseStudyTemplate
