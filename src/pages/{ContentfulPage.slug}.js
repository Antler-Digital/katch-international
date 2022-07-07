import React from "react"
import Layout from "../components/layout/Layout"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
import ThreeCardsSection from "../components/contentful/ThreeCardsSection"
import CarouselSection from "../components/contentful/CarouselSection"
import HeroSection from "../components/contentful/HeroSection"
import CollectionSection from "../components/contentful/CollectionSection"
import SocialSection from "../components/contentful/SocialSection"
import TwoColumnSection from "../components/contentful/TwoColumnSection"
import TextSection from "../components/contentful/TextSection"
import SpacerSection from "../components/contentful/SpacerSection"
import MapSection from "../components/contentful/MapSection"
import VideoSection from "../components/contentful/VideoSection"
import useCustomSection from "../hooks/useCustomSection"
import TabSection from "../components/contentful/TabSection"
import HubspotForm from "../components/forms/HubspotForm"
import FullScreenImage from "../components/contentful/FullScreenImage"
import WhatsappIcon from "../components/contentful/WhatsappIcon"
import AltHeroSection from "../components/contentful/AltHeroSection"

export const SectionSwitcher = (section, pageType, index, slug) => {
  const isServicePage = pageType.includes("Service Page")

  const isBlogHome = slug === 'blog'
  console.log(slug)
  switch (section.internal?.type) {
    case "ContentfulThreeCardsSection":
      return (
        <div key={`${section.id}` + index}>
          <ThreeCardsSection key={`${section.id}` + index} {...section} />
          {isServicePage && (
            <SpacerSection size={"Small"} backgroundColour={"Black"} />
          )}
        </div>
      )
    case "ContentfulCarouselSection":
      return <CarouselSection key={`${section.id}` + index} {...section} />
    case "ContentfulHeroSection":
      return (
        <div key={`${section.id}` + index}>
          {isBlogHome ? <AltHeroSection {...section} /> : <HeroSection  {...section} />}
          {isServicePage && (
            <SpacerSection size={"Large"} backgroundColour={"Black"} />
          )}
        </div>
      )
    case "ContentfulCollectionSection":
      return <CollectionSection key={`${section.id}` + index} {...section} />
    case "ContentfulSocialSection":
      return <SocialSection key={`${section.id}` + index} {...section} />
    case "ContentfulTwoColumnSection":
      return <TwoColumnSection key={`${section.id}` + index} {...section} />
    case "ContentfulTextSection":
      return (
        <div key={`${section.id}` + index}>
          <TextSection key={`${section.id}` + index} {...section} />
          {isServicePage && (
            <SpacerSection size={"Small"} backgroundColour={"Black"} />
          )}
        </div>
      )
    case "ContentfulSpacerSection":
      return <SpacerSection key={`${section.id}` + index} {...section} />
    case "ContentfulMapSection":
      return <MapSection key={`${section.id}` + index} {...section} />
    case "ContentfulVideo":
      return <VideoSection key={`${section.id}` + index} {...section} />
    case "ContentfulTabsSection":
      return (
        <div key={`${section.id}` + index}>
          <TabSection key={`${section.id}` + index} {...section} />
          {isServicePage && (
            <SpacerSection size={"Small"} backgroundColour={"Black"} />
          )}
        </div>
      )
    case "ContentfulContactForm":
      return (
        <div key={`${section.id}` + index}>
          <HubspotForm  {...section} />
          {isServicePage && (
            <SpacerSection size={"Small"} backgroundColour={"Black"} />
          )}
        </div>
      )
    case "ContentfulFullScreenImage":
      return <FullScreenImage key={`${section.id}` + index} {...section} />
    // case "ContentfulWhatsappIcon":
    //   return <WhatsappIcon key={`${section.id}` + index} {...section} />
    default:
      break
  }
}

const PageTemplate = ({ data: { contentfulPage }, location }) => {
  const page = contentfulPage
  const {
    metaDescription,
    metaImage,
    metaTitle,
    pageType,
    title,
    slug,
    sections,
    extraImages,
  } = page

  const snapSections = sections.slice(0, 2)
  const restSections = sections.slice(2)

  const customSection = useCustomSection(slug, { extraImages })

  return (
    <Layout>
      <SEO
        title={metaTitle || title}
        metaDescription={metaDescription}
        metaImage={metaImage?.gatsbyImageData?.images?.fallback?.src}
      />
      <WhatsappIcon path={location.pathname} />
      {metaTitle && <h1 className="opacity-0 absolute">{metaTitle}</h1>}

      <div>
        {snapSections &&
          snapSections.map((section, index) =>
            SectionSwitcher(section, pageType, index, slug)
          )}
      </div>

      {restSections &&
        restSections.map((section, index) =>
          SectionSwitcher(section, pageType, index, slug)
        )}

      {customSection}
    </Layout>
  )
}

export const PagesQuery = graphql`
  query ($id: String) {
    contentfulPage(id: { eq: $id }) {
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
      pageType
      extraImages {
        gatsbyImageData(
          width: 1200
          layout: FULL_WIDTH
          placeholder: BLURRED
          quality: 80
        )
        title
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
        # ... on ContentfulSocialSection {
        #   ...ContentfulSocialSectionFragment
        # }
        ... on ContentfulTwoColumnSection {
          ...ContentfulTwoColumnSectionFragment
        }
        ... on ContentfulTextSection {
          ...ContentfulTextSectionFragment
        }
        ... on ContentfulSpacerSection {
          ...ContentfulSpacerSectionFragment
        }
        # ... on ContentfulMapSection {
        #  ...ContentfulMapSectionFragment
        # }
        ... on ContentfulVideo {
          ...ContentfulVideoFragment
        }
        ... on ContentfulTabsSection {
          ...ContentfulTabsSectionFragment
        }
        ... on ContentfulContactForm {
          ...ContentfulContactFormFragment
        }
        ... on ContentfulWhatsappIcon {
          ...ContentfulWhatsappIconFragment
        }
      }
    }
  }
`

export default PageTemplate
