import React from 'react'
import { graphql } from 'gatsby';
import { renderRichText } from "gatsby-source-contentful/rich-text"
import RichTextOptions from '../rich-text/RichTextOptions';


function TwoColumnSection({ leftColumnRichText, rightColumnRichText, header }) {
  return (
    <section className="bg-black text-white py-4" >
      { header && <h2 className="text-center">{header}</h2>}
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-4 prose prose-white px-4 ">
        <div >
          {renderRichText(leftColumnRichText, RichTextOptions)}
        </div>
        <div >
          {renderRichText(rightColumnRichText, RichTextOptions)}
        </div>
      </div>
    </section>
  )
}

export default TwoColumnSection


export const ContentfulTwoColumnSectionFragment = graphql`
  fragment ContentfulTwoColumnSectionFragment on ContentfulTwoColumnSection {
    leftColumnRichText {
      raw
    }
    rightColumnRichText {
      raw
    }
    header
    internal {
      type
    }
  }

`