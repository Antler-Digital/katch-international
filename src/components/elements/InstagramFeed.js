import React from 'react'
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import Linked from './Linked';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
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
        {console.log(node.preview)}
        <Linked linkTo={'http://instagram.com/p/' + node.id}>
          {node.localFile?.childImageSharp ?
            <GatsbyImage image={node.localFile?.childImageSharp.gatsbyImageData} alt={node.caption} /> :
            <LazyLoadComponent delayTime={1000} >
              <img src={`${node.preview}`} height={350} width={350} alt={node.caption} />
              </LazyLoadComponent>
          }
        </Linked>
      </div>
    </div>
  ))
}

export default InstagramFeed


