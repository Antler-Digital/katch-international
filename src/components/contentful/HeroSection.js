import React from 'react'
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Markdown from 'markdown-to-jsx';
import HubspotForm from '../forms/HubspotForm';


function HeroSection({ backgroundImage, subHeader, header, textColour, showForm = true, headerClasses }) {


  const colorText = textColour === "White" ? "text-white" : textColour === "Pink" ? "text-secondary" : "text-black"

  return (
    <section className={`${backgroundImage ? "h-full md:h-screen min-h-600" : "min-h-400"} overflow-hidden relative bg-gradient-to-t from-black to-gray-800 `}>
      <div className={`max-w-screen-xl mx-auto  w-full h-full  flex flex-wrap relative z-20`}>
        <div className={`flex flex-col justify-center ${showForm ? "w-full md:w-1/2 md:text-left mt-24 mb-16 md:mt-0" : ""} w-full md:h-full text-center px-2  ${colorText} `}>
          {header && <h1 className={`${headerClasses ? headerClasses : "text-3xl lg:text-7xl block leading-relaxed"}`}>{header}</h1>}
          {subHeader && <Markdown
            options={{
              overrides: {
                strong: {
                  props: {
                    className: 'text-2xl lg:text-4xl  leading-tight lg:leading-loose p-2 bg-secondary text-white',
                  },
                },
                h2: {
                  props: {
                    className: 'text-5xl leading-relaxed text-secondary',
                  },
                },
              },
            }}
          >{subHeader.subHeader}</Markdown>}
        </div>
      </div>
      {showForm && <div className="relative z-20 md:absolute right-0 bottom-0 py-12 md:py-16 xl:py-24 flex items-center max-w-md md:max-w-lg xl:max-w-xl mx-auto w-full md:w-1/2 bg-black text-white ">
        <div className="px-4 mx-auto">
          <HubspotForm />
        </div>
      </div>}
      <div className="h-full absolute top-0 z-10 w-full sm:px-4 bg-black bg-opacity-25" />
      { backgroundImage ? <GatsbyImage className="absolute h-full w-full top-0" style={{position: 'absolute'}} image={backgroundImage.gatsbyImageData} alt={backgroundImage.title} /> : <div></div>}


    </section>
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