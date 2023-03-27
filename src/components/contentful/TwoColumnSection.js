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
        <div className="grid md:grid-cols-2 grid-rows-1">
            {leftColumn.map((section, index) =>
              SectionSwitcher(section, "other", index)
            )}
            {rightColumn.map((section, index) =>
             <div className="first:p-6 first:my-auto first:xl:px-24">
              { SectionSwitcher(section, "other", index) }
              </div>
            )}
        </div>
      </section>
    )
  }

  return (
    <section className="">
      {includeHeader && <h2 className="text-center">{header}</h2>}
      <div className="grid max-w-screen-xl mx-auto prose text-left gap-x-4 md:grid-cols-2 prose-black prose-p:my-0 ">
        {leftColumnRichText && (
          <div className="">{renderRichText(leftColumnRichText, RichTextOptions)}</div>
        )}
        {rightColumnRichText && (
          <div className="">{renderRichText(rightColumnRichText, RichTextOptions)}</div>
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
      ... on ContentfulTextSection {
        ...ContentfulTextSectionFragment
      }
      ... on ContentfulFullScreenImage {
        ...ContentfulFullScreenImageFragment
      }
    }
    rightColumn {
      ... on ContentfulTextSection {
        ...ContentfulTextSectionFragment
      }
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
