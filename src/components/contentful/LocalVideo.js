import React from 'react'

import LargeDesktopVideo from '../../videos/Katch_1920x1080.mp4'
// import SmallDesktopVideo from '../../videos/Katch_1280x1024.mp4'
// import MediumDesktopVideo from '../../videos/Katch_1366x768.mp4'
// import MobileVideo from '../../videos/Katch_mobile.mp4'

const LocalVideo = () => {
  return (
    <div className=''>
      <video className='h-full w-full aspect-3 absolute top-0 right-0 object-cover z-20' autoPlay="autoplay" muted playsinline>
        <source src={LargeDesktopVideo}  type="video/mp4" />
        {/* <source src={SmallDesktopVideo} type="video/mp4" />
        <source src={MediumDesktopVideo} type="video/mp4" />
        <source src={MobileVideo} type="video/mp4" /> */}

      </video>
    </div>
  )
}

export default LocalVideo