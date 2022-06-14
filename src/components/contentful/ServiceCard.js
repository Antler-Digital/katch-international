import { graphql } from 'gatsby';
import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image';
import Linked from '../elements/Linked';
import { motion } from 'framer-motion'

function ServiceCard({ header, subHeader, link, backgroundImage, className, showAsLink }) {

  const textShadow = { textShadow: 'rgba(0, 0, 0, 0.4) 0.08em 0.08em 0em' }
  return (
    <motion.article className={`relative w-full h-full aspect-1 group  ${className}`}>
      {backgroundImage && <GatsbyImage className="absolute   top-0 h-full w-full" image={backgroundImage.gatsbyImageData} alt={backgroundImage.title} />}

      <div className="relative z-10 py-12 flex flex-col justify-center text-white p-4 hover:bg-secondary hover:mix-blend-hard-light blend cursor-pointer  w-full h-full">
        <motion.h3 className="text-7xl leading-tight w-2 " initial={{ opacity: 0 }} animate={{
          opacity: 1, transition: {
            when: 'beforeChildren',
            duration: .3,
            staggerChildren: .3,
            delayChildren: .3
          }
        }}>
          {header.split(' ').map((word, index) => <motion.span animate={{x: 0 }}  initial={{x:-100}} className='block'>{word}</motion.span>)}
        </motion.h3>
        {/* <h5 style={textShadow} className="group-hover:text-8xl text-xl duration-300 w-2 leading-tight">{subHeader} </h5> */}
        {/* {link && <CallToAction deWrap={!showAsLink} className="group-hover:text-lg text-xs opacity-0 group-hover:opacity-100 duration-300" {...link} />} */}
      </div>
    </motion.article>
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
        quality: 80
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