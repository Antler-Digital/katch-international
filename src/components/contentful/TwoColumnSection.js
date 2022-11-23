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
  includeHeader = true,
}) {
  if (rightColumn && leftColumn) {
    return (
      <section>
        <div className="grid md:grid-cols-2">
          <div>
            {leftColumn.map((section, index) =>
              SectionSwitcher(section, "other", index)
            )}
          </div>
          <div className="p-6 my-auto xl:px-24">
            {rightColumn.map((section, index) =>
              SectionSwitcher(section, "other", index)
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="">
      {includeHeader && <h2 className="text-center">{header}</h2>}
      <div className="grid max-w-screen-xl mx-auto prose text-left gap-x-4 md:grid-cols-2 prose-black">
        {leftColumnRichText && (
          <div>{renderRichText(leftColumnRichText, RichTextOptions)}</div>
        )}
        {rightColumnRichText && (
          <div>{renderRichText(rightColumnRichText, RichTextOptions)}</div>
        )}
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
    includeHeader
    internal {
      type
    }
  }
`
