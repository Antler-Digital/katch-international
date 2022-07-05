import { Tab } from "@headlessui/react"
import React, { Fragment } from "react"
import { graphql } from "gatsby"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import RichTextOptions from "../rich-text/RichTextOptions"

const TabSection = ({ sections }) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-6">
      <Tab.Group>
        <Tab.List className={"flex justify-start gap-8 font-bold"}>
          {sections.map(({ header }, index) => {
            return (
              <Tab as={Fragment} key={`tab-${index}`}>
                {({ selected }) => (
                  <button
                    type="button"
                    className={`${
                      selected ? "text-secondary" : "text-primary"
                    } focus:ring-0 ring-transparent focus:border-none  uppercase text-sm sm:text-lg`}
                  >
                    {header}
                  </button>
                )}
              </Tab>
            )
          })}
        </Tab.List>
        <Tab.Panels className={"mt-12"}>
          {sections.map(({ text }, index) => {
            return (
              <Tab.Panel
                key={`panel-${index}`}
                className="text-base text-justify space-y-4"
              >
                {renderRichText(text, RichTextOptions)}
              </Tab.Panel>
            )
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default TabSection

export const ContentfulTabSectionFragment = graphql`
  fragment ContentfulTabsSectionFragment on ContentfulTabsSection {
    sections {
      header
      text {
        raw
      }
    }
    internal {
      type
    }
  }
`
