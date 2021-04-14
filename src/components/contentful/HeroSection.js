import React from 'react'
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Markdown from 'markdown-to-jsx';

function HeroSection({ backgroundImage, subHeader, header, textColour, showForm, headerClasses }) {


  const colorText = textColour === "White" ? "text-white" : textColour === "Pink" ? "text-secondary" : "text-black"


  return (
    <section className={`${backgroundImage ? "h-screen min-h-600" : "min-h-400"} relative bg-gradient-to-t from-black to-gray-800`}>
      <div className="h-full absolute top-0 z-10 w-full px-4 bg-black bg-opacity-25">
        <div className={`max-w-screen-xl mx-auto  w-full h-full `}>
          <div className={`flex flex-col justify-center ${showForm ? "md:w-1/2 md:text-left" : ""} w-full h-full text-center  ${colorText} `}>
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
      </div>
      { backgroundImage ? <GatsbyImage className="absolute h-full w-full" image={backgroundImage.gatsbyImageData} alt={backgroundImage.title} /> : <div></div>}


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