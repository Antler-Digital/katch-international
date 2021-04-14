import React from "react"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import { AnchorLink } from "gatsby-plugin-anchor-links";
const Linked = ({ linkTo, children, style, className, underline = false }) => {
  const regex = RegExp("https?|wwww")
  const mailRegex = RegExp("mailto")
  const phoneRegex = RegExp("tel")
  const outward = regex.test(linkTo)
  const mail = mailRegex.test(linkTo)
  const tel = phoneRegex.test(linkTo)

  if (mail || tel) {
    return (
      <a href={linkTo} style={style} className={className}>
        {children}
      </a>
    )
  }
  return outward ? (
    <OutboundLink
      style={style}
      className={className}
      href={`${linkTo.replace(/^\//, "")}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </OutboundLink>
  ) : (
    <AnchorLink to={linkTo} style={style} className={className}>
      {children}
      {underline && <Underline />}
    </AnchorLink>
  )
}

export const Underline = () => <span className="group-hover:w-full w-0 transition-all duration-500 absolute h-1 bg-secondary left-0 bottom-2" />

Linked.propTypes = {}

export default Linked
