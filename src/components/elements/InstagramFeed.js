import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image';
import Linked from './Linked';
const InstagramFeed = ({ posts }) => {

  // const { allInstaNode } = useStaticQuery(graphql`
  // query InstagramFeedQuery {
  //   allInstaNode(limit: 9, sort: {fields: timestamp, order: DESC}) {
  //     edges {
  //       node {
  //         id
  //         likes
  //         comments
  //         mediaType
  //         preview
  //         original
  //         timestamp
  //         caption
  //         thumbnails {
  //           src
  //         }
  //         localFile {
  //           childImageSharp {
  //             gatsbyImageData(
  //               quality: 90
  //               layout: CONSTRAINED
  //               width: 350
  //               height: 350
  //               placeholder: BLURRED
  //             )
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
  
  // `)
  return posts && posts.map(({ image, caption, postLink }) => (
    <div key={postLink} className="relative   ">
      <div  style={{ lineHeight: 0 }}>
        <Linked linkTo={postLink}>
          {image && 
            <GatsbyImage image={image.gatsbyImageData} alt={image.title} /> 
          }
        </Linked>
        
 
      </div>
      <div className="absolute top-0 h-full w-full group hover:">
        { caption?.text && <p className="absolute top-[100%] p-4 bg-secondary leading-tight opacity-0 pointer-events-none group-hover:top-0 w-full py-8 transition-all duration-300 group-hover:opacity-100">{ caption.text} </p> }
        </div>
    </div>
  ))
}

export default InstagramFeed


