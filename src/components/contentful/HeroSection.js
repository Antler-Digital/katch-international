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
      ? "text-white"
      : textColour === "Pink"
      ? "text-secondary"
      : "text-black"

  return (
    <>
      <section
        className={`${
          backgroundImage ? "h-[500px]" : "min-h-[300px] md:min-h-[400px]"
        }  relative ${(centerHeading || !showForm) && "flex items-center"}`}
      >
        <div
          className={`container mx-auto  w-full h-full flex flex-wrap relative px-4 z-20`}
        >
          <div className={` w-full md:h-full text-left ${colorText}`}>
            {header && (
              <h1
                className={`-bottom-[68px] sm:-bottom-[81px] lg:-bottom-[179px] absolute text-6xl md:text-7xl lg:text-[160px] font-bold block`}
              >
                {header.split(" ").map((t) => (
                  <span className="block last:text-black">{t}</span>
                ))}
              </h1>
            )}
          </div>
        </div>
        <div className="h-full absolute top-0 z-10 w-full sm:px-4 bg-black bg-opacity-25" />
        {backgroundImage && !carouselImages && (
          <GatsbyImage
            className="absolute h-full w-full top-0"
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
              <div className=" absolute h-full w-full top-0 grid grid-cols-5">
                <div className="col-span-3">
                  <GatsbyImage
                    className="absolute h-full w-3/5 top-0 col-span-3"
                    style={{ position: "block" }}
                    image={backgroundImage.gatsbyImageData}
                    alt={backgroundImage.title}
                  />
                </div>
                <div className="col-span-2 h-full">
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
                          className="h-full w-full mx-auto top-0"
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
