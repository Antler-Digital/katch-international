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
      : "text-center"
  return (
    <section className="mt-44 bg-gray-100  text-black py-4">
      <div
        className={`mx-auto px-4 max-w-screen-xl prose prose-black ${textAlign}`}
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
