import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import Linked from "../elements/Linked"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

export default function CallToAction({
  displayAs,
  linkTo,
  text,
  className,
  style,
  deWrap = false,
}) {
  const buttonClass =
    "bg-secondary text-white px-3 uppercase py-1 w-fit rounded text-sm mx-auto"
  const linkClass = ""

  if (deWrap) {
    return (
      <span
        style={style}
        className={`${
          displayAs === "Button" ? buttonClass : linkClass
        } ${className}`}
      >
        {text} <DoubleChevron />
      </span>
    )
  }
  return (
    <Linked
      linkTo={linkTo}
      className={`${
        displayAs === "Button" ? buttonClass : linkClass
      } ${className}`}
    >
      {text} <DoubleChevron />
    </Linked>
  )
}

const DoubleChevron = () => (
  <span>
    <FontAwesomeIcon icon={faChevronRight} />
    <FontAwesomeIcon icon={faChevronRight} />
  </span>
)
