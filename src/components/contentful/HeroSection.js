import React from 'react'
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Markdown from 'markdown-to-jsx';

function HeroSection({ backgroundImage, subHeader, header, textColour, showForm }) {


  const colorText = textColour === "White" ? "text-white" : textColour === "Pink" ? "text-secondary" : "text-black"


  return (
    <section className="h-screen min-h-600 relative bg-gray-800">
      <div className="h-full absolute top-0 z-10 w-full px-4 bg-black bg-opacity-25">
        <div className={`max-w-screen-xl mx-auto  w-full h-full `}>
          <div className={`flex flex-col justify-center md:w-1/2 w-full h-full text-center md:text-left ${colorText} `}>
            {header && <h1 className="text-7xl block leading-relaxed">{header}</h1>}
            {subHeader && <Markdown
              options={{
                overrides: {
                  strong: {
                    props: {
                      className: 'text-6xl  leading-relaxed p-2 bg-secondary',
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
      <GatsbyImage className="absolute h-full w-full" image={backgroundImage.gatsbyImageData} alt={backgroundImage.title} />


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