import { graphql } from 'gatsby'
import React from 'react'
import useSnapToNext from '../../hooks/useSnapToNext'
import LocalVideo from './LocalVideo'
import Video from './Video'

const VideoSection = ({ name, type, videoId, video, placeholder }) => {
  

  const containerRef = React.useRef(null)

  useSnapToNext(containerRef)

  const VideoComponent = () => type === 'youtube' ? (<Video videoSrcURL={`https://www.youtube.com/embed/${videoId}`} />) : (<LocalVideo />)
  return (
    <section ref={containerRef} className={`h-screen w-full`}>
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