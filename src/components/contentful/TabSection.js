import { Tab } from "@headlessui/react"
import React, { Fragment } from "react"
import { graphql } from "gatsby"
import { SectionSwitcher } from "../../pages/{ContentfulPage.slug}"

const TabSection = ({ sections }) => {
  return (
    <div className="px-6 mx-auto mt-10 max-w-screen-2xl">
      <Tab.Group>
        <Tab.List
          className={"flex flex-wrap justify-start gap-x-8 gap-y-4 font-bold"}
        >
          {sections?.map(({ header }, index) => {
            return (
              <Tab as={Fragment} key={`tab-${index}`}>
                {({ selected }) => (
                  <button
                    type="button"
                    className={`${
                      selected ? "text-secondary" : "text-primary"
                    } focus:ring-0 ring-transparent focus:border-none  uppercase text-sm sm:text-lg focus-visible:border-none focus:outline-none focus-visible:outline-none`}
                  >
                    {header}
                  </button>
                )}
              </Tab>
            )
          })}
        </Tab.List>
        <Tab.Panels className={"mt-6"}>
          {sections?.map((section, index) => {
            return (
              <Tab.Panel
                key={`panel-${index}`}
                className="space-y-4 text-base text-justify"
              >
                {SectionSwitcher(section, "other", index)}
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
      ... on ContentfulTwoColumnSection {
        ...ContentfulTwoColumnSectionFragment
      }
      ... on ContentfulTextSection {
        ...ContentfulTextSectionFragment
      }
    }
    internal {
      type
    }
  }
`
