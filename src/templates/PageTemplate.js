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
import SpacerSection from '../components/contentful/SpacerSection';

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


      { sections && sections.map((section, index) => {
        switch (section.internal?.type) {
          case "ContentfulThreeCardsSection":
            return <ThreeCardsSection key={`${section.id}` + index} {...section} />
          case "ContentfulCarouselSection":
            return <CarouselSection key={`${section.id}` + index} {...section} />
          case "ContentfulHeroSection":
            return <HeroSection key={`${section.id}` + index} {...section} />
          case "ContentfulCollectionSection":
            return <CollectionSection key={`${section.id}` + index} {...section} />
          case "ContentfulSocialSection":
            return <SocialSection key={`${section.id}` + index} {...section} />
          case "ContentfulTwoColumnSection":
            return <TwoColumnSection key={`${section.id}` + index} {...section} />
          case "ContentfulTextSection":
            return <TextSection key={`${section.id}` + index} {...section} />
          case "ContentfulSpacerSection":
            return <SpacerSection key={`${section.id}` + index} {...section} />
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
      ... on ContentfulSpacerSection {
        ...ContentfulSpacerSectionFragment
      }
    }
  }
}
`

export default PageTemplate
