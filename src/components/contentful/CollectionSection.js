import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import ClientCard from "./ClientCard"
import BlogCard from "./BlogCard"
import CaseStudyCard from "./CaseStudyCard"
import { motion } from "framer-motion"
import LeftChevron from "../svgs/LeftChevron"
import RightChevron from "../svgs/RightChevron"
import { AnimatePresence, useCycle } from "framer-motion"

function CollectionSection({
  header,
  postType,
  showAll,
  totalToShow,
  contentfulid,
  customItems = false,
  lightTheme = false,
  items,
}) {
  const { blogPosts } = useStaticQuery(graphql`
    query Collections {
      blogPosts: allContentfulBlogPost(
        sort: { fields: datePosted, order: DESC }
      ) {
        cards: nodes {
          ...ContentfulBlogPostFragment
        }
      }
    }
  `)

  const clientsClasses = "grid lg:grid-cols-10 md:grid-cols-8 grid-cols-4"
  const caseStudiesClasses =
    "grid lg:grid-cols-4 md:grid-cols-3  grid-cols-2 gap-4"
  const blogPostsClasses = "grid md:grid-cols-4 sm:grid-cols-2 gap-4"

  const renderCollection = () => {
    switch (postType) {
      case "Blog Posts":
        return (
          <CollectionWrapper
            className={blogPostsClasses}
            items={customItems ? customItems : blogPosts.cards}
            limitTo={showAll ? false : totalToShow || false}
            CardComponent={(props) => <BlogCard {...props} />}
          />
        )
      case "Case Studies":
        return (
          <CollectionWrapper
            className={caseStudiesClasses}
            items={customItems ? customItems : items}
            limitTo={showAll ? false : totalToShow || false}
            CardComponent={(props) => <CaseStudyCard {...props} />}
          />
        )
      case "Clients":
        return (
          <ClientCollectionWrapper
            order={true}
            className={clientsClasses}
            items={customItems ? customItems : items}
            limitTo={showAll ? false : totalToShow || false}
            CardComponent={(props) => <ClientCard {...props} />}
          />
        )
      default:
        break
    }
  }

  return (
    <section id={contentfulid} className={`bg-gray-100 py-12 lg:py-24`}>
      <div className="text-center container mx-auto px-4">
        {header && (
          <h2 className="text-4xl md:text-6xl xl:text-7xl mb-8 leading-normal text-black  px-4 py-1 inline-block text-center">
            {header}
          </h2>
        )}
        {renderCollection()}
      </div>
    </section>
  )
}

export default CollectionSection

const CollectionWrapper = ({
  className,
  items,
  order,
  limitTo = 1,
  CardComponent,
}) => {
  const itemsToRender = limitTo ? items.slice(0, limitTo) : items

  const ordered = itemsToRender.filter((item) => item.showAtTop)
  const rest = itemsToRender.filter((item) => !item.showAtTop)

  const arrayToRender = [...ordered, ...rest]
  return (
    <div className={className}>
      {arrayToRender &&
        arrayToRender.map((item, index) => (
          <CardComponent key={item.id} {...item} />
        ))}
    </div>
  )
}

const ClientCollectionWrapper = ({
  className,
  items,
  order,
  limitTo = 1,
  CardComponent,
}) => {
  const [index, setIndex] = React.useState(0)
  const itemsToRender = limitTo ? items.slice(0, limitTo) : items

  const ordered = itemsToRender.filter((item) => item.showAtTop)
  const rest = itemsToRender.filter((item) => !item.showAtTop)

  const arrayToRender = [...ordered, ...rest]

  return (
    <div className="flex items-center justify-center">
      <button
        type="button"
        onClick={() => setIndex((prev) => (prev === 0 ? 2 : prev - 1))}
      >
        <LeftChevron className="mr-16" />
      </button>
      <div className="flex overflow-hidden">
        {Array(3)
          .fill(0)
          .map((_, i) => {
            return (
              i === index && (
                <div>
                  <motion.div
                    className={"flex overflow-hidden"}
                    key={i}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                    }}
                    layout
                  >
                    {arrayToRender &&
                      i === index &&
                      arrayToRender
                        .slice(index * 9, (index + 1) * 9)
                        .map((item) => (
                          <CardComponent key={item.id} {...item} />
                        ))}
                  </motion.div>
                  <motion.div
                    className={"flex overflow-hidden"}
                    key={i}
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                    }}
                    layout
                  >
                    {arrayToRender &&
                      i === index &&
                      arrayToRender
                        .slice(index * 9 + 9 * 3, (index + 1) * 9 + 9 * 3)
                        .map((item) => (
                          <CardComponent key={item.id} {...item} />
                        ))}
                  </motion.div>
                  <motion.div
                    className={"flex items-center overflow-hidden"}
                    key={i}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 30,
                    }}
                    layout
                  >
                    {arrayToRender &&
                      i === index &&
                      arrayToRender
                        .slice(index * 9 + 9 * 6, (index + 1) * 9 + 9 * 6)
                        .map((item) => (
                          <CardComponent key={item.id} {...item} />
                        ))}
                  </motion.div>
                </div>
              )
            )
          })}
      </div>
      <button
        type="button"
        onClick={() => setIndex((prev) => (prev === 2 ? 0 : prev + 1))}
      >
        <RightChevron className="ml-16" />
      </button>
    </div>
  )
}

export const ContentfulCollectionSectionFragment = graphql`
  fragment ContentfulCollectionSectionFragment on ContentfulCollectionSection {
    id
    internal {
      type
    }
    header
    contentfulid
    postType
    showAll
    items {
      # ... on ContentfulBlogPost {
      #   ...ContentfulBlogPostCardFragment
      # }
      ... on ContentfulCaseStudy {
        ...ContentfulCaseStudyCardFragment
      }
      ... on ContentfulClient {
        ...ContentfulClientFragment
      }
    }
    totalToShow
  }
`
