import React from 'react'
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Markdown from 'markdown-to-jsx';
import HubspotForm from '../forms/HubspotForm';


function HeroSection({ backgroundImage, subHeader, header, textColour, showForm = true, headerClasses, centerHeading }) {


  const colorText = textColour === "White" ? "text-white" : textColour === "Pink" ? "text-secondary" : "text-black"
  return (
    <section className={`${backgroundImage ? "h-[500px]" : "min-h-[300px] md:min-h-[400px]"}  relative  ${(centerHeading || !showForm) && 'flex items-center'}`}>
      <div className={`max-w-screen-xl mx-auto  w-full h-full  flex flex-wrap relative  z-20`}>
        <div className={` w-full md:h-full text-left px-2  ${colorText} `}>
          {header && <h1 className={`-bottom-[178px] absolute text-8xl sm:text-6xl lg:text-[160px] font-bold block`}>
            {
              header.split(' ').map(t => <span className="block last:text-black">{t}</span>)  
            }
            </h1>
          }
        </div>
      </div>

      <div className="h-full absolute top-0 z-10 w-full sm:px-4 bg-black bg-opacity-25" />
      {
        backgroundImage && <GatsbyImage
          className="absolute h-full w-full top-0"
          style={{ position: 'absolute' }}
          image={backgroundImage.gatsbyImageData}
          alt={backgroundImage.title}
        />
      }
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

{/* {subHeader && <Markdown
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
          >{subHeader.subHeader}</Markdown>} */}

{/* {showForm && <div
        data-aos="fade-left"
        data-aos-duration="1000"
        className="relative z-20 md:absolute right-0 bottom-0 py-8 md:py-12 xl:py-16 flex items-center max-w-md md:max-w-lg xl:max-w-[450px] mx-auto w-full md:w-1/2 bg-black text-white ">
        <div className="px-4 mx-auto">
          <HubspotForm />
        </div>
      </div>} */}