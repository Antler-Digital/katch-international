import React from "react"
import { graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import RichTextOptions from "../rich-text/RichTextOptions"
import { SectionSwitcher } from "../../pages/{ContentfulPage.slug}"

function TwoColumnSection({
  leftColumnRichText,
  rightColumnRichText,
  leftColumn,
  rightColumn,
  header,
}) {
  if (rightColumn && leftColumn) {
    return (
      <section>
        <div className="grid md:grid-cols-2">
          <div>
            {leftColumn.map((section, index) =>
              SectionSwitcher(section, index)
            )}
          </div>
          <div className="my-auto p-6 xl:px-24">
            {rightColumn.map((section, index) =>
              SectionSwitcher(section, index)
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-black text-white py-4">
      {header && <h2 className="text-center">{header}</h2>}
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-4 prose prose-white px-4 ">
        <div>{renderRichText(leftColumnRichText, RichTextOptions)}</div>
        <div>{renderRichText(rightColumnRichText, RichTextOptions)}</div>
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
    leftColumn {
      ... on ContentfulFullScreenImage {
        ...ContentfulFullScreenImageFragment
      }
    }
    rightColumn {
      ... on ContentfulContactForm {
        ...ContentfulContactFormFragment
      }
    }
    header
    internal {
      type
    }
  }
`
