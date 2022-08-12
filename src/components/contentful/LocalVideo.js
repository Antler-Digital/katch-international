import React, { useRef, useState, useEffect } from "react"

import LargeDesktopVideo from "../../videos/Katch_1920x1080.mp4"
import SmallDesktopVideo from "../../videos/Katch_1280x1024.mp4"
// import MediumDesktopVideo from '../../videos/Katch_1366x768.mp4'
// import MobileVideo from '../../videos/Katch_mobile.mp4'
import MobileCompressedVideo from "../../videos/Katch_mobile_compressed.mp4"

const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase()
  return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0
}

const LocalVideo = () => {
  const videoParentRef = useRef()
  const [shouldUseImage, setShouldUseImage] = useState(false)
  const [videoSelected, setVideoSelected] = useState(null)

  const selectVideo = (width) => {
    if (width < 768) {
      setVideoSelected(MobileCompressedVideo)
    } else if (width < 1024) {
      setVideoSelected(SmallDesktopVideo)
    } else {
      setVideoSelected(LargeDesktopVideo)
    }
  }

  const handleResize = () => {
    setVideoSelected(null)
    const width = window.innerWidth
    selectVideo(width)
  }

  useEffect(() => {
    const width = window.innerWidth
    window.addEventListener("resize", handleResize)
    selectVideo(width)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // check if user agent is safari and we have the ref to the container <div />
    if (isSafari() && videoParentRef.current) {
      // obtain reference to the video element
      const player = videoParentRef.current.children[0]

      // if the reference to video player has been obtained
      if (player) {
        // set the video attributes using javascript as per the
        // webkit Policy
        player.controls = false
        player.playsinline = true
        player.muted = true
        player.setAttribute("muted", "") // leave no stones unturned :)
        player.autoplay = true

        // Let's wait for an event loop tick and be async.
        setTimeout(() => {
          // player.play() might return a promise but it's not guaranteed crossbrowser.
          const promise = player.play()
          // let's play safe to ensure that if we do have a promise
          if (promise.then) {
            promise
              .then(() => {})
              .catch(() => {
                // if promise fails, hide the video and fallback to <img> tag
                videoParentRef.current.style.display = "none"
                setShouldUseImage(true)
              })
          }
        }, 0)
      }
    }
  }, [])

  if (!videoSelected) {
    return null
  }

  return shouldUseImage ? (
    <img src={videoSelected} alt="Muted Video" />
  ) : (
    <div
      ref={videoParentRef}
      dangerouslySetInnerHTML={{
        __html: `
        <video
          class='h-full w-full aspect-3 absolute top-0 right-0 object-cover z-20'
          loop
          muted
          autoplay
          playsinline
          preload="metadata"
        >
        <source src="${videoSelected}" type="video/mp4" />
        </video>`,
      }}
    />
  )
}

export default LocalVideo
