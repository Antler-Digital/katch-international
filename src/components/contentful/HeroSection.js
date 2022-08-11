import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

import Carousel from "../../components/elements/Carousel"

function HeroSection({
  backgroundImage,
  carouselImages,
  subHeader,
  header,
  textColour,
  showForm = true,
  headerClasses,
  centerHeading,
}) {
  const colorText =
    textColour === "White"
      ? "text-gray-100"
      : textColour === "Pink"
      ? "text-secondary"
      : "text-black"

  const title = header.trim().split(" ")

  const getTextStyle = (text) => {
    const textLength = text?.length || 0

    if (textLength > 40)
      return "-bottom-[53px] md:-bottom-[63px] lg:-bottom-[140px]  relative text-4xl md:text-5xl lg:text-[80px]"
    if (textLength > 30)
      return "-bottom-[42px] md:-bottom-[63px] lg:-bottom-[176px]  relative text-5xl md:text-7xl lg:text-[110px]"
    return "-bottom-[68px] md:-bottom-[81px] lg:-bottom-[179px]  relative text-6xl md:text-7xl lg:text-[160px]"
  }

  return (
    <>
      <section
        className={` h-[500px] ${
          backgroundImage || carouselImages
            ? "h-[500px]"
            : "-min-h-[300px] lmd:min-h-[400px]"
        }  relative ${(centerHeading || !showForm) && "flex items-center"}`}
      >
        <div
          className={`max-w-screen-2xl mx-auto  w-full h-full flex flex-wrap relative px-4 z-20 self-end`}
        >
          {/* <div className={` w-full md:h-full text-left relative bottom-0 `}> */}
          {header && (
            <h1
              className={`${getTextStyle(
                header?.trim()
              )} font-bold block self-end ${colorText}`}
            >
              <span>{title[0]}</span>
              <span className="block last:text-black">
                {title.slice(1, title.length).join(" ")}
              </span>
            </h1>
          )}
        </div>
        {/* </div> */}
        <div className="h-full absolute top-0 z-10 w-full sm:px-4 bg-black bg-opacity-25" />
        {backgroundImage && (
          <GatsbyImage
            className="absolute h-full w-full top-0 "
            style={{ position: "absolute" }}
            image={backgroundImage.gatsbyImageData}
            alt={backgroundImage.title}
          />
        )}
      </section>
    </>
  )
}

export default HeroSection

export const ContentfulHeroSectionFragment = graphql`
  fragment ContentfulHeroSectionFragment on ContentfulHeroSection {
    id
    internal {
      type
    }
    showForm
    textColour
    textBackgroundColour
    header
    # body {
    #   raw
    # }
    subHeader {
      subHeader
    }
    backgroundImage {
      title
      gatsbyImageData(
        layout: FULL_WIDTH
        quality: 90
        width: 1600
        placeholder: BLURRED
      )
    }
  }
`

{
  /* {subHeader && <Markdown
            options={{
              overrides: {
                strong: {
                  props: {
                    className: 'text-2xl lg:text-4xl leading-tight lg:leading-loose p-2 bg-secondary text-white',
                  },
                },
                h2: {
                  props: {
                    className: 'text-5xl leading-relaxed text-secondary',
                  },
                },
                a: {
                  props: {
                    className: "hover:text-secondary"
                  }
                }
              },
            }}
          >{subHeader.subHeader}</Markdown>} */
}

{
  /* {showForm && <div
        data-aos="fade-left"
        data-aos-duration="1000"
        className="relative z-20 md:absolute right-0 bottom-0 py-8 md:py-12 xl:py-16 flex items-center max-w-md md:max-w-lg xl:max-w-[450px] mx-auto w-full md:w-1/2 bg-black text-white ">
        <div className="px-4 mx-auto">
          <HubspotForm />
        </div>
      </div>} */
}
