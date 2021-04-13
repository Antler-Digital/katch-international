import React from "react"
import Layout from "../components/layout/Layout"
import SEO from "../components/SEO"
import { graphql } from 'gatsby';
import ThreeCardsSection from "../components/contentful/ThreeCardsSection";
import CarouselSection from '../components/contentful/CarouselSection';
import HeroSection from '../components/contentful/HeroSection';
import CollectionSection from '../components/contentful/CollectionSection';
import SocialSection from '../components/contentful/SocialSection';
import TwoColumnSection from '../components/contentful/TwoColumnSection';
import TextSection from '../components/contentful/TextSection';

const PageTemplate = ({ data: { contentfulPage } }) => {

  const page = contentfulPage
  const {
    metaDescription,
    metaImage,
    metaTitle,
    title,
    sections
  } = page
  return (
    <Layout>
      <SEO title={metaTitle || title} metaDescription={metaDescription} metaImage={metaImage?.fixed?.src} />
      {/* Content goes here */}


      { sections && sections.map(section => {
        switch (section.internal?.type) {
          case "ContentfulThreeCardsSection":
            return <ThreeCardsSection {...section} />
          case "ContentfulCarouselSection":
            return <CarouselSection {...section} />
          case "ContentfulHeroSection":
            return <HeroSection {...section} />
          case "ContentfulCollectionSection":
            return <CollectionSection {...section} />
          case "ContentfulSocialSection":
            return <SocialSection {...section} />
          case "ContentfulTwoColumnSection":
            return <TwoColumnSection {...section} />
          case "ContentfulTextSection":
            return <TextSection {...section} />
          default:
            break;
        }

      })}

    </Layout>
  )
}


export const PageTemplateQuery = graphql`
query PageTemplateQuery($id: String) {
  contentfulPage(contentful_id: {eq: $id}) {
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
    sections {
      ... on ContentfulThreeCardsSection {
        ...ContentfulThreeCardsSectionFragment
      }
      ... on ContentfulHeroSection {
        ...ContentfulHeroSectionFragment
      }
      ... on ContentfulCollectionSection {
        ...ContentfulCollectionSectionFragment
      }
      ... on ContentfulCarouselSection {
        ...ContentfulCarouselSectionFragment
      }
      ... on ContentfulSocialSection {
        ...ContentfulSocialSectionFragment
      }
      ... on ContentfulTwoColumnSection {
        ...ContentfulTwoColumnSectionFragment
      }
      ... on ContentfulTextSection {
        ...ContentfulTextSectionFragment
      }
    }
  }
}




`

export default PageTemplate
