import { graphql } from 'gatsby';
import React from 'react'
import CallToAction from './CallToAction';
import { GatsbyImage } from 'gatsby-plugin-image';
import Linked from '../elements/Linked';

function ServiceCard({ header, subHeader, link, backgroundImage, className, showAsLink }) {

  const textShadow = { textShadow: 'rgba(0, 0, 0, 0.4) 0.08em 0.08em 0em' }
  return (
    <article className={`relative h-96 ${className}`}>
      { backgroundImage && <GatsbyImage className="absolute top-0 h-full w-full" image={backgroundImage.gatsbyImageData} alt={backgroundImage.title} />}

      <div className="absolute top-0 flex flex-col justify-center text-white p-4 hover:bg-secondary w-full h-full transition-colors duration-300 group">
        <h3 style={textShadow} className="text-6xl group-hover:text-xs w-2 duration-300">
          {header}
        </h3>
        <h5 style={textShadow} className="group-hover:text-8xl text-xl duration-300 w-2 leading-tight">{subHeader} </h5>
        {link && <CallToAction deWrap={!showAsLink} className="group-hover:text-lg text-xs opacity-0 group-hover:opacity-100 duration-300" {...link} />}
      </div>
    </article>
  )
}

export const LinkedServiceCard = (props) => props.link?.linkTo ? <Linked linkTo={props.link.linkTo}>
  <ServiceCard {...props} className="cursor-pointer" showAsLink={false} />
</Linked> : <ServiceCard {...props} />

export default ServiceCard

export const ContentfulServiceCardFragment = graphql`
  fragment ContentfulServiceCardFragment on ContentfulCard {
    subHeader
    header
    id
    backgroundImage {
      title
      gatsbyImageData(
        width: 400
        placeholder: BLURRED
        quality: 90
        layout: FULL_WIDTH
      )
    }
    link {
      text
      displayAs
      linkTo
    }
  }
`