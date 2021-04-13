import React from "react"
import Layout from "../components/layout/Layout"
import SEO from "../components/SEO"
import { graphql } from 'gatsby';
import ThreeCardsSection from "../components/contentful/ThreeCardsSection";
import CarouselSection from '../components/contentful/CarouselSection';
import HeroSection from '../components/contentful/HeroSection';
import CollectionSection from '../components/contentful/CollectionSection';
import SocialSection from '../components/contentful/SocialSection';

const IndexPage = ({ data: { allContentfulPage } }) => {

  const homePage = allContentfulPage.pages[0]
  const {
    metaDescription,
    metaImage,
    metaTitle,
    title,
    sections
  } = homePage
  return (
    <Layout>
      <SEO title={metaTitle || title} metaDescription={metaDescription} metaImage={metaImage.fixed.src} />
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
          default:
            break;
        }

      })}

    </Layout>
  )
}


export const HomePageQuery = graphql`
query HomePageQuery {
  allContentfulPage(filter: {slug: {eq: "/"}}) {
    pages: nodes {
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
      }
    }
  }
}




`

export default IndexPage
