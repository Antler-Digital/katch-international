import React from 'react'
import { graphql } from 'gatsby';
import { renderRichText } from "gatsby-source-contentful/rich-text"
import RichTextOptions from '../rich-text/RichTextOptions';


function TextSection({ text, align }) {


  const textAlign = align === "Left" ? "text-left" : align === "Right" ? "text-right" : "text-center"
  return (
    <section className="bg-black text-white py-4" >
      <div className={`mx-auto px-4 max-w-screen-xl prose prose-white ${textAlign}`}>
        {renderRichText(text, RichTextOptions)}
      </div>
    </section>
  )
}

export default TextSection


export const ContentfulTextSectionFragment = graphql`
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