import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "markdown-to-jsx"
import HubspotForm from "../forms/HubspotForm"

function AltHeroSection({
  backgroundImage,
  subHeader,
  header,
  textColour,
  textBackgroundColour,
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

  const backgroundText =
    textBackgroundColour === "White"
      ? "bg-white max-w-screen-md mx-auto"
      : textBackgroundColour === "Pink"
      ? "bg-secondary max-w-screen-md mx-auto"
      : ""

  return (
    <section
      className={`${
        backgroundImage
          ? "h-full md:h-screen min-h-[600px]"
          : "min-h-[300px] md:min-h-[400px]"
      } overflow-hidden relative bg-gradient-to-t from-black to-[#2C3656] max-h-[900px] ${
        (centerHeading || !showForm) && "flex items-center"
      }`}
    >
      <div
        className={`max-w-screen-xl mx-auto  w-full h-full  flex flex-wrap relative z-20`}
      >
        <div
          className={`flex flex-col justify-center ${
            showForm ? "w-full md:w-1/2 md:text-left mt-24 mb-16 md:mt-0" : ""
          } w-full md:h-full text-center px-2  ${colorText} ${backgroundText}`}
        >
          {header && (
            <h1
              className={`${
                headerClasses
                  ? headerClasses
                  : "text-3xl sm:text-6xl lg:text-7xl block leading-relaxed"
              }`}
            >
              {header}
            </h1>
          )}
          {subHeader && (
            <Markdown
              options={{
                overrides: {
                  strong: {
                    props: {
                      className:
                        "text-2xl lg:text-4xl leading-tight lg:leading-loose p-2 bg-secondary text-white",
                    },
                  },
                  h2: {
                    props: {
                      className: "text-5xl leading-relaxed text-secondary",
                    },
                  },
                  a: {
                    props: {
                      className: "hover:text-secondary",
                    },
                  },
                },
              }}
            >
              {subHeader.subHeader}
            </Markdown>
          )}
        </div>
      </div>
      {showForm && (
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          className="relative z-20 md:absolute right-0 bottom-0 py-8 md:py-12 xl:py-16 flex items-center max-w-md md:max-w-lg xl:max-w-[450px] mx-auto w-full md:w-1/2 bg-black text-white "
        >
          <div className="px-4 mx-auto">
            <HubspotForm />
          </div>
        </div>
      )}
      <div className="h-full absolute top-0 z-10 w-full sm:px-4 bg-black bg-opacity-25" />
      {backgroundImage ? (
        <GatsbyImage
          className="absolute h-full w-full top-0"
          style={{ position: "absolute" }}
          image={backgroundImage.gatsbyImageData}
          alt={backgroundImage.title}
        />
      ) : (
        <div></div>
      )}
    </section>
  )
}

export default AltHeroSection
