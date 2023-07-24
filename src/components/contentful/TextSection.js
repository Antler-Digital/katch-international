import React from "react"
import { graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import RichTextOptions from "../rich-text/RichTextOptions"

function TextSection({ text, align, includePadding = true }) {
  const textAlign =
    align === "Left"
      ? "text-left"
      : align === "Right"
      ? "text-right"
      : "text-justify"

  return (
    <section className="py-4 text-black bg-gray-100">
      <div
        className={`max-w-screen-2xl mx-auto ${
          includePadding ? "px-6" : ""
        } ${textAlign} text-base space-y-4`}
      >
        {renderRichText(text, RichTextOptions)}
      </div>
    </section>
  )
}

export default TextSection

export const ContentfulTabSectionFragment = graphql`
  fragment ContentfulTextSectionFragment on ContentfulTextSection {
    text {
      raw
    }
    header
    align
    internal {
      type
    }
  }
`
