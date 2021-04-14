import React from 'react'
import { graphql, useStaticQuery } from 'gatsby';
import ClientCard from './ClientCard';
import BlogCard from './BlogCard';
import CaseStudyCard from './CaseStudyCard';

function CollectionSection({ header, postType, showAll, totalToShow, contentfulid, customItems = false, lightTheme = false }) {


  const { blogPosts, caseStudies, clients } = useStaticQuery(graphql`
      query Collections {
        caseStudies: allContentfulCaseStudy(sort: {fields: publishedDate, order: ASC}) {
          cards: nodes {
          ...ContentfulCaseStudyCardFragment
        }
      }
      blogPosts: allContentfulBlogPost(sort: {fields: datePosted, order: DESC}) {
        cards: nodes {
          ...ContentfulBlogPostFragment
        }
      }
      clients: allContentfulClient {
        cards: nodes {
          ...ContentfulClientFragment
        }
      }
    }
  `)

  const clientsClasses = "grid lg:grid-cols-5 md:grid-cols-3  grid-cols-2"
  const caseStudiesClasses = "grid lg:grid-cols-4 md:grid-cols-3  grid-cols-2 gap-4"
  const blogPostsClasses = "grid md:grid-cols-3 sm:grid-cols-2 gap-4 "

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
          items={customItems ? customItems : caseStudies.cards}
          limitTo={showAll ? false : totalToShow || false}
          CardComponent={(props) => <CaseStudyCard {...props} />}
        />
      case "Clients":
        return <CollectionWrapper
          className={clientsClasses}
          items={customItems ? customItems : clients.cards}
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
        {header && <h2 className="text-7xl mb-8 leading-normal text-white bg-secondary px-4 py-1 inline-block text-center">{header}</h2>}
        {renderCollection()}
      </div>


    </section>
  )
}

export default CollectionSection


const CollectionWrapper = ({ className, items, limitTo = 1, CardComponent }) => {

  const itemsToRender = limitTo ? items.slice(0, limitTo) : items
  return <div className={className}>
    {items && itemsToRender.map((item, index) => <CardComponent key={item.id + index} {...item} />)}
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
      totalToShow
  }

`