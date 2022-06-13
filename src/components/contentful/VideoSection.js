import { graphql } from 'gatsby'
import React from 'react'
import LocalVideo from './LocalVideo'
import Video from './Video'

const VideoSection = ({ name, type, videoId, video, placeholder }) => {

  const VideoComponent = () => type === 'youtube' ? (<Video videoSrcURL={`https://www.youtube.com/embed/${videoId}`} />) : (<LocalVideo />) 
  return (
    <section className={`h-screen w-full`}>
      <h1>VideoSection</h1>
     <VideoComponent />
    </section>
  )
}


export const ContentfulVideoFragment = graphql`
  fragment ContentfulVideoFragment on ContentfulVideo {
    id
    name
    internal {
      type
    }
    videoId
    placeholder  {
      gatsbyImageData(
        layout: CONSTRAINED
        quality: 80
        width: 1600
        placeholder: BLURRED
      )
      title
    }
  }

`

export default VideoSection