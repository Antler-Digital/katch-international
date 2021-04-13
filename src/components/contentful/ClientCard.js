import React from 'react'
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const ClientCard = ({ name, type, logo }) => {
  return (
    <div className="text-white group relative transition-all">
      <div className="absolute top-10 w-full flex justify-center group-hover:opacity-100 opacity-0 group-hover:-top-0 duration-500">
        <h6 className="bg-secondary px-3">{name}</h6>
      </div>
      <GatsbyImage image={logo.gatsbyImageData} alt={logo.title} />
    </div>
  )
}


export const ContentfulClientFragment = graphql`
  fragment ContentfulClientFragment on ContentfulClient {
  id
  name
  type
  logo {
    gatsbyImageData(
      layout: CONSTRAINED
      width: 150
      placeholder: TRACED_SVG
      quality: 90
    )
    title
  }
  }
`

export default ClientCard
