import React from 'react'
import { graphql } from 'gatsby';
import Linked from '../elements/Linked';
import { GatsbyImage } from 'gatsby-plugin-image';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

const BlogCard = ({ slug, mainImage, title, datePosted, body, category }) => {

  return (
    <Linked className="mx-auto" linkTo={`/blog/${slug}`}>

      <article className="w-full h-full">
        <GatsbyImage image={mainImage.gatsbyImageData} alt={mainImage.title} />
        <div className="bg-white p-4 -mt-3">
          <h3 className="text-xl mb-2">{title}</h3>
          <p className="text-sm  font-sans text-gray-500">{datePosted} | <span className="text-secondary">{category.join(", ")}</span></p>
          <p className="text-sm font-sans text-gray-500 mt-2">{documentToPlainTextString(JSON.parse(body.raw)).slice(0, 155)}...</p>
        </div>
      </article>
    </Linked>
  )
}

export const ContentfulBlogPostFragment = graphql`
  fragment ContentfulBlogPostFragment on ContentfulBlogPost {
  slug
  mainImage {
    title
    gatsbyImageData(
      layout: CONSTRAINED
      width: 350
      quality: 90
      placeholder: BLURRED
    )
  }
  id
  title
  datePosted(fromNow: true)
  body {
    raw
  }
  category
}

`

export default BlogCard
