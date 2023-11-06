import React from "react"
import { graphql } from "gatsby"
import Linked from "../elements/Linked"
import { GatsbyImage } from "gatsby-plugin-image"
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer"

const BlogCard = ({ slug, mainImage, title, datePosted, body, category }) => {
  return (
    <Linked className="mx-auto" linkTo={`/blog/${slug}`}>
      <article className="w-full h-full max-w-xs rounded-lg overflow-hidden">
        <figure>
          {mainImage && <GatsbyImage
            image={mainImage?.gatsbyImageData}
            alt={mainImage?.title}
          />}
        </figure>

        <div className="text-left bg-white p-5 h-full">
          <h3
            style={{ minHeight: 55 }}
            className="text-lg uppercase mb-2 text-secondary"
          >
            {title}
          </h3>
          <p className="text-sm  font-sans text-primary">
            {datePosted} |{" "}
            <span className="text-secondary">{category?.join(", ")}</span>
          </p>
          <p className="text-sm font-sans text-primary mt-2">
            {body?.raw && documentToPlainTextString(JSON.parse(body.raw)).slice(0, 140)}...
          </p>
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
        height: 190
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
