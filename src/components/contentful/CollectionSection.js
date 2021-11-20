import React from 'react'
import { graphql, useStaticQuery } from 'gatsby';
import ClientCard from './ClientCard';
import BlogCard from './BlogCard';
import CaseStudyCard from './CaseStudyCard';

function CollectionSection({ header, postType, showAll, totalToShow, contentfulid, customItems = false, lightTheme = false, items }) {

  const { blogPosts } = useStaticQuery(graphql`
      query Collections {
      blogPosts: allContentfulBlogPost(sort: {fields: datePosted, order: DESC}) {
        cards: nodes {
          ...ContentfulBlogPostFragment
        }
      }
    }
  `)

  const clientsClasses = "grid lg:grid-cols-10 md:grid-cols-8 grid-cols-4"
  const caseStudiesClasses = "grid lg:grid-cols-4 md:grid-cols-3  grid-cols-2 gap-4"
  const blogPostsClasses = "grid md:grid-cols-4 sm:grid-cols-2 gap-4"

  const renderCollection = () => {
    switch (postType) {
      case "Blog Posts":
        return <CollectionWrapper
          className={blogPostsClasses}
          items={customItems ? customItems : blogPosts.cards}
          limitTo={showAll ? false : totalToShow || false}
          CardComponent={(props) => <BlogCard {...props} />}
        />
      case "Case Studies":
        return <CollectionWrapper
          className={caseStudiesClasses}
          items={customItems ? customItems : items}
          limitTo={showAll ? false : totalToShow || false}
          CardComponent={(props) => <CaseStudyCard {...props} />}
        />
      case "Clients":
        return <CollectionWrapper
          order={true}
          className={clientsClasses}
          items={customItems ? customItems : items}
          limitTo={showAll ? false : totalToShow || false}
          CardComponent={(props) => <ClientCard {...props} />}
        />
      default:
        break;
    }
  }


  return (
    <section id={contentfulid} className={`${lightTheme ? "bg-gray-100" : "bg-primary"} py-12 lg:py-24`}>

      <div className="text-center max-w-screen-lg mx-auto px-4">
        {header && <h2 className="text-4xl md:text-6xl xl:text-7xl mb-8 leading-normal text-white bg-secondary px-4 py-1 inline-block text-center">{header}</h2>}
        {renderCollection()}
      </div>


    </section>
  )
}

export default CollectionSection


const CollectionWrapper = ({ className, items, order, limitTo = 1, CardComponent }) => {
  const itemsToRender = limitTo ? items.slice(0, limitTo) : items


  const ordered = itemsToRender.filter(item => item.showAtTop)
  const rest = itemsToRender.filter(item => !item.showAtTop)

  const arrayToRender = [...ordered, ...rest]
  return <div className={className}>
    {arrayToRender && arrayToRender.map((item, index) => <CardComponent key={item.id} {...item} />)}
  </div>
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