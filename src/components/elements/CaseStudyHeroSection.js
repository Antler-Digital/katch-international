import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"

import Carousel from "../../components/elements/Carousel"

const CaseStudyHeroSection = ({
  backgroundImage,
  carouselImages,
  subHeader,
  header,
  textColour,
  showForm = true,
  headerClasses,
  centerHeading,
}) => {
  const colorText =
    textColour === "White"
      ? "text-gray-100"
      : textColour === "Pink"
      ? "text-secondary"
      : "text-black"

  const title = header.trim().split(" ")

  const getTextStyle = (text) => {
    const textLength = text?.length || 0
    const firstWordLength = title[0].length

    if (textLength > 40 && firstWordLength < 12)
      return "-mt-[34px] md:-mt-[42px] lg:-mt-[70px] z-10  relative text-4xl md:text-5xl lg:text-[80px]"
    if (textLength > 40 && firstWordLength >= 12)
      return "-mt-[34px] md:-mt-[42px] lg:-mt-[70px] z-10  relative text-4xl md:text-5xl lg:text-[80px]"
    if (textLength > 30 && firstWordLength < 12)
      return "-mt-[42px] md:-mt-[63px] lg:-mt-[97px] z-10 relative text-5xl md:text-7xl lg:text-[110px]"
    if (textLength > 30 && firstWordLength >= 12)
      return "-mt-[42px] md:-mt-[63px] lg:-mt-[88px] z-10 relative text-5xl md:text-7xl lg:text-[100px]"
    if (firstWordLength >= 12)
      return "-mt-[42px] md:-mt-[63px] lg:-mt-[97px] z-10 relative text-5xl md:text-7xl lg:text-[110px]"
    return "-mt-[52px] md:-mt-[63px] lg:-mt-[141px] z-10  relative text-6xl md:text-7xl lg:text-[160px]"
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
        {/* <div
          className={`max-w-screen-2xl mx-auto  w-full h-full flex flex-wrap relative px-4 z-20 self-end`}
        > */}
        {/* <div className={` w-full md:h-full text-left relative bottom-0 `}> */}
        {/* {header && (
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
        </div> */}
        {/* </div> */}
        <div className="h-full absolute top-0 z-10 w-full sm:px-4 bg-black bg-opacity-25" />
        {backgroundImage && !carouselImages && (
          <GatsbyImage
            className="absolute h-full w-full top-0 "
            style={{ position: "absolute" }}
            image={backgroundImage.gatsbyImageData}
            alt={backgroundImage.title}
          />
        )}

        {(carouselImages || backgroundImage) && (
          <div className="absolute h-full w-full top-0 z-10">
            {carouselImages && !backgroundImage && (
              <Carousel
                settings={{
                  prevArrow: false,
                  nextArrow: false,
                  autoplay: true,
                  arrows: false,
                }}
                className="w-full"
              >
                {carouselImages &&
                  carouselImages.map((image) => (
                    <GatsbyImage
                      className="h-full w-full mx-auto top-0"
                      style={{ display: "absolute" }}
                      image={image.gatsbyImageData}
                      alt={image.title}
                    />
                  ))}
              </Carousel>
            )}

            {carouselImages && backgroundImage && (
              <div className="absolute h-full w-full top-0 flex flex-col md:flex-row justify-between">
                <div className="md:w-3/5 w-full">
                  <GatsbyImage
                    className="md:absolute h-[250px] md:h-full w-full top-0"
                    style={{ position: "block" }}
                    image={backgroundImage.gatsbyImageData}
                    alt={backgroundImage.title}
                  />
                </div>
                <div className="w-full md:w-2/5 h-full">
                  <Carousel
                    settings={{
                      prevArrow: false,
                      nextArrow: false,
                      autoplay: true,
                      arrows: false,
                    }}
                    className="w-full h-full"
                  >
                    {carouselImages &&
                      carouselImages.map((image) => (
                        <GatsbyImage
                          className="h-[250px] md:h-[500px] w-full mx-auto md:top-0 object-cover"
                          style={{ display: "block" }}
                          image={image.gatsbyImageData}
                          alt={image.title}
                        />
                      ))}
                  </Carousel>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
      {header && (
        <div className="max-w-screen-2xl mx-auto px-4">
          <h1
            className={`${getTextStyle(
              header?.trim()
            )} font-bold block ${colorText}`}
          >
            <span>{title[0]}</span>
            <span className="block last:text-black">
              {title.slice(1, title.length).join(" ")}
            </span>
          </h1>
        </div>
      )}
    </>
  )
}

export default CaseStudyHeroSection
