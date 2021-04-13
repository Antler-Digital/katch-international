import React from 'react'

export default function LeftChevron({ currentSlide, slideCount, ...restProps}) {
  return (
    <svg {...restProps} xmlns="http://www.w3.org/2000/svg" width="28" height="49" viewBox="0 0 28 49">
      <polyline fill="none" stroke="currentColor" strokeWidth="5" points="129 2177 160 2177 160 2208" transform="rotate(-135 -364.008 1133.146)" />
    </svg>
  )
}


