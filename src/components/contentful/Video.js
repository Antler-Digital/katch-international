import React from "react"


const Video = ({ videoSrcURL, videoTitle, ...props }) => (
  <iframe
    className="h-48 sm:h-96"
    src={videoSrcURL}
    // title={videoTitle}
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    frameBorder="0"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    allowFullScreen
    width="100%"
  />
)
export default Video