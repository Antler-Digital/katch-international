import React from 'react'
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import Linked from './Linked';

const InstagramFeed = () => {

  const { allInstaNode } = useStaticQuery(graphql`
  query InstagramFeedQuery {
    allInstaNode(limit: 9, sort: {fields: timestamp, order: DESC}) {
      edges {
        node {
          id
          likes
          comments
          mediaType
          preview
          original
          timestamp
          caption
          thumbnails {
            src
          }
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 90
                layout: CONSTRAINED
                width: 350
                height: 350
                placeholder: BLURRED
              )
            }
          }
        }
      }
    }
  }
  
  `)
  return allInstaNode && allInstaNode.edges.map(({ node }) => (
    <div sm={4} md={4} lg={4} key={node.id}>
      <div className="instafeed-post" style={{ lineHeight: 0 }}>
        <Linked linkTo={'http://instagram.com/p/' + node.id}>
          <GatsbyImage image={node.localFile?.childImageSharp.gatsbyImageData} />
        </Linked>
      </div>
    </div>
  ))
}

export default InstagramFeed


