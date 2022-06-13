import React from 'react'
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const ClientCard = ({ name, type, logo }) => {
  return (
    <div className="text-white group relative transition-all">
      {/* <div className="absolute top-10 w-full flex justify-center group-hover:opacity-100 opacity-0 group-hover:-top-0 duration-500 z-10">
        <h6 className="bg-secondary px-3">{name}</h6>
      </div> */}

      { logo?.gatsbyImageData ? 
        <GatsbyImage className="invert" image={logo.gatsbyImageData} alt={logo.title} /> 
        : <img src={logo?.file?.url} alt={logo.title} />
      }
    </div>
  )
}


export const ContentfulClientFragment = graphql`
  fragment ContentfulClientFragment on ContentfulClient {
  id
  name
  type
  showAtTop
  logo {
    gatsbyImageData(
      layout: CONSTRAINED
      width: 100
      placeholder: TRACED_SVG
      quality: 60
    )
    title
    file {
        url
      }
  }
  }
`

export default ClientCard
