import { graphql } from "gatsby"
import React from "react"

import AltHeroSection from "../components/contentful/AltHeroSection"
import CarouselSection from "../components/contentful/CarouselSection"
import CollectionSection from "../components/contentful/CollectionSection"
import FullScreenImage from "../components/contentful/FullScreenImage"
import HeroSection from "../components/contentful/HeroSection"
import MapSection from "../components/contentful/MapSection"
import RelatedCaseStudiesSection from "../components/contentful/RelatedCaseStudiesSection"
import SocialSection from "../components/contentful/SocialSection"
import SpacerSection from "../components/contentful/SpacerSection"
import TabSection from "../components/contentful/TabSection"
import TextSection from "../components/contentful/TextSection"
import ThreeCardsSection from "../components/contentful/ThreeCardsSection"
import TwoColumnSection from "../components/contentful/TwoColumnSection"
import VideoSection from "../components/contentful/VideoSection"
import WhatsappIcon from "../components/contentful/WhatsappIcon"
import HubspotForm from "../components/forms/HubspotForm"
import Layout from "../components/layout/Layout"
import SEO from "../components/SEO"
import useCustomSection from "../hooks/useCustomSection"

export const SectionSwitcher = (section, pageType, index, slug) => {
  const isServicePage = pageType?.includes("Service Page")

  const isBlogHome = slug === "blog"
  switch (section.internal?.type) {
    case "ContentfulThreeCardsSection":
      return (
        <div key={`${section.id}` + index} id="our-services">
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
          {isBlogHome ? (
            <AltHeroSection {...section} />
          ) : (
            <HeroSection {...section} />
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
        <TextSection
          key={`${section.id}` + index}
          {...section}
          includePadding={pageType !== "other"}
        />
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
          <TabSection
            className="mt-10"
            key={`${section.id}` + index}
            {...section}
            pageType={pageType}
          />
          {isServicePage && (
            <SpacerSection size={"Small"} backgroundColour={"Black"} />
          )}
        </div>
      )
    case "ContentfulContactForm":
      return (
        <div key={`${section.id}` + index}>
          <HubspotForm {...section} />
          {isServicePage && (
            <SpacerSection size={"Small"} backgroundColour={"Black"} />
          )}
        </div>
      )
    case "ContentfulFullScreenImage":
      return <FullScreenImage key={`${section.id}` + index} {...section} />
    // case "ContentfulWhatsappIcon":
    //   return <WhatsappIcon key={`${section.id}` + index} {...section} />
    case "ContentfulRelatedCaseStudies":
      return (
        <div key={`${section.id}` + index}>
          <RelatedCaseStudiesSection
            key={`${section.id}` + index}
            {...section}
          />
          {isServicePage && (
            <SpacerSection size={"Small"} backgroundColour={"Black"} />
          )}
        </div>
      )
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
        description={metaDescription?.text}
        metaImage={metaImage?.gatsbyImageData?.images?.fallback?.src}
        path={location.pathname}
      />
      <WhatsappIcon path={location.pathname} />
      {metaTitle && <h1 className="absolute opacity-0">{metaTitle}</h1>}

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
        ... on ContentfulRelatedCaseStudies {
          ...ContentfulRelatedCaseStudiesSectionFragment
        }
      }
    }
  }
`

export default PageTemplate
