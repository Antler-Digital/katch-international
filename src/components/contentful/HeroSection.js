import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

function HeroSection({
  backgroundImage,
  carouselImages,
  header,
  textColour,
  showForm = true,
  centerHeading,
}) {
  const colorText =
    textColour === "White"
      ? "text-gray-100"
      : textColour === "Pink"
      ? "text-secondary"
      : "text-black"

  const title = header.trim().split(" ")

  return (
    <>
      <section>
        <div
          className={` h-[500px] ${
            backgroundImage || carouselImages
              ? "h-[500px]"
              : "-min-h-[300px] lmd:min-h-[400px]"
          } relative ${(centerHeading || !showForm) && "flex items-center"}`}
        >
          <div className="absolute top-0 z-10 w-full h-full bg-black bg-opacity-25 sm:px-4" />
          {backgroundImage && (
            <GatsbyImage
              className="absolute top-0 w-full h-full "
              style={{ position: "absolute" }}
              image={backgroundImage.gatsbyImageData}
              alt={backgroundImage.title}
            />
          )}
        </div>
        {/* </div> */}
        <div
          className={`mt-[-43px] md:mt-[-64px] lg:mt-[-97px] relative max-w-screen-2xl mx-auto  w-full h-full flex flex-wrap px-4 z-50 self-end`}
        >
          {/* <div className={` w-full md:h-full text-left relative bottom-0 `}> */}
          {header && (
            <h1
              className={`md:text-7xl lg:text-[110px] font-bold block self-end ${colorText}`}
            >
              <span>{title[0]}</span>
              <span className="block last:text-black">
                {title.slice(1, title.length).join(" ")}
              </span>
            </h1>
          )}
        </div>
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
