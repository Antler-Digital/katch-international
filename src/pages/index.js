import React from "react"
import Layout from "../components/layout/Layout"
import SEO from "../components/SEO"
import { graphql } from 'gatsby';

const IndexPage = ({ data: { allContentfulPage } }) => {

  const homePage = allContentfulPage.pages[0]
  const {
    metaDescription,
    metaImage,
    metaTitle,
    title

  } = homePage
  return (
    <Layout>
      <SEO title={metaTitle || title} metaDescription={metaDescription} metaImage={metaImage.fixed.src} />
      {/* Content goes here */}
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
    }
  }
}




`

export default IndexPage
