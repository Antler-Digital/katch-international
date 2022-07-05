import React from "react"
import { graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import RichTextOptions from "../rich-text/RichTextOptions"

function TextSection({ text, align }) {
  const textAlign =
    align === "Left"
      ? "text-left"
      : align === "Right"
      ? "text-right"
      : "text-justify"
  return (
    <section className="bg-gray-100  text-black py-4">
      <div
        className={`max-w-screen-2xl mx-auto px-6 ${textAlign} text-base space-y-4`}
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
    align
    internal {
      type
    }
  }
`
