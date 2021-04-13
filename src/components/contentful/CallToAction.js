import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Linked from '../elements/Linked'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function CallToAction({ displayAs, linkTo, text, className, style }) {
  const buttonClass = "bg-secondary text-black px-3 uppercase py-3 hover:text-white"
  const linkClass = ""
  return (
    <Linked style={style} linkTo={linkTo} className={`${displayAs === "Button" ? buttonClass : linkClass} ${className}`} >
      { text} <DoubleChevron />
    </Linked>
  )
}

const DoubleChevron = () => <span>
  <FontAwesomeIcon icon={faChevronRight} />
  <FontAwesomeIcon icon={faChevronRight} />
</span>
