import { graphql } from "gatsby"
import React from "react"
import useSnapToNext from "../../hooks/useSnapToNext"
import LocalVideo from "./LocalVideo"
import Video from "./Video"

const VideoSection = ({ name, type, videoId, video, placeholder }) => {
  const containerRef = React.useRef(null)
  const [isVerticalVideo, setIsVerticalVideo] = React.useState(false)

  const handleResize = () => {
    const y = window.innerHeight
    const x = window.innerWidth
    setIsVerticalVideo(y > x)
  }

  console.log(isVerticalVideo)

  React.useEffect(() => {
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useSnapToNext(containerRef)

  const VideoComponent = () =>
    type === "youtube" ? (
      <Video videoSrcURL={`https://www.youtube.com/embed/${videoId}`} />
    ) : (
      <LocalVideo />
    )

  const VerticalVideoComponent = () =>
    type === "youtube" ? (
      <Video videoSrcURL={`https://www.youtube.com/embed/${videoId}`} />
    ) : (
      <LocalVideo />
    )

  return (
    <section
      ref={containerRef}
      className={`h-screen w-full bg-primary flex items-center justify-center`}
    >
      {isVerticalVideo ? <VerticalVideoComponent /> : <VideoComponent />}
      <ul className="text-white flex space-x-1 relative z-0">
        <li className="border border-white w-2 h-2 rounded-full animate-bounce-big delay-1s"></li>
        <li className="border border-white w-2 h-2 rounded-full animate-bounce-big delay-2s"></li>
        <li className="border border-white w-2 h-2 rounded-full animate-bounce-big delay-3s"></li>
      </ul>
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
    placeholder {
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
