import React from "react"
import { graphql } from 'gatsby';
import PageTemplate from "../templates/PageTemplate";

const IndexPage = ({ data }) => {
  return (
    <PageTemplate data={data} />
  )
}

export const HomePageQuery = graphql`
query HomePageQuery {
  contentfulPage(slug: {eq: "/"}) {
    id
    title
    slug
    metaTitle
    metaImage {
      gatsbyImageData(width: 400, layout: FIXED)
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




`

export default IndexPage
