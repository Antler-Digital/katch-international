import React from "react"
import Layout from "../../components/layout/Layout"
import SEO from "../../components/SEO"
import { graphql } from "gatsby"
import HeroSection from "../../components/contentful/HeroSection"
import RichTextOptions from "../../components/rich-text/RichTextOptions"
import { GatsbyImage } from "gatsby-plugin-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import Video from "../../components/contentful/Video"
import AltHeroSection from "../../components/contentful/AltHeroSection"
import BlogHeaderSection from "../../components/elements/BlogHeaderSection"

const BlogPostTemplate = ({ data: { contentfulBlogPost } }) => {
  const page = contentfulBlogPost
  const {
    metaDescription,
    metaImage,
    metaTitle,
    title,
    mainImage,
    author,
    category,
    datePosted,
    body,
  } = page

  const assets = new Map(body.references.map((ref) => [ref.contentful_id, ref]))

  const options = {
    renderNode: {
      ...RichTextOptions.renderNode,
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const asset = assets.get(node.data.target.sys.id)
        if (asset.internal.type === "ContentfulVideo") {
          return (
            <Video
              videoSrcURL={`https://www.youtube.com/embed/${asset.videoId}`}
            />
          )
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const image = assets.get(node.data.target.sys.id)
        return image ? (
          <GatsbyImage image={image.gatsbyImageData} alt={image.title} />
        ) : (
          ""
        )
      },
    },
  }

  return (
    <Layout>
      <SEO
        title={metaTitle || title}
        metaDescription={metaDescription}
        metaImage={metaImage?.gatsbyImageData?.images?.fallback?.src}
      />
      <BlogHeaderSection
        title={title}
        subtitle={`by ${author} | ${datePosted} | ${category}`}
      />

      <section className="bg-white pb-12">
        <article className="bg-white max-w-screen-md mx-auto p-8 relative z-10 prose">
          <div className="mx-auto max-w-content mb-12">
            <GatsbyImage
              image={mainImage.gatsbyImageData}
              alt={mainImage.title}
            />
          </div>
          {body && documentToReactComponents(JSON.parse(body.raw), options)}
        </article>
      </section>
    </Layout>
  )
}

export const BlogPostQuery = graphql`
  query BlogPostQuery($id: String) {
    contentfulBlogPost(id: { eq: $id }) {
      title
      slug
      metaTitle
      metaImage {
        gatsbyImageData(width: 248, layout: FIXED)
        title
      }
      metaDescription {
        text: metaDescription
      }
      author
      datePosted(formatString: "Do MMMM YYYY")
      mainImage {
        gatsbyImageData(
          layout: CONSTRAINED
          quality: 90
          width: 800
          placeholder: BLURRED
        )
        title
      }
      category
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            internal {
              type
            }
            gatsbyImageData(
              placeholder: BLURRED
              width: 800
              layout: CONSTRAINED
              quality: 90
            )
            title
          }
          ... on ContentfulVideo {
            contentful_id
            internal {
              type
            }
            name
            type
            videoId
          }
        }
      }
    }
  }
`

export default BlogPostTemplate
